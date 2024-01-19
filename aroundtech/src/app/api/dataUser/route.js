import { PrismaClient } from "@prisma/client";
import { getSessionToken, verifySessionToken } from "@/services/sessionService";

const prisma = new PrismaClient();
export async function GET(request) {
  try {
// Obtention et vérification du token de session pour authentifier l'utilisateur.
    const token = getSessionToken(request);

    // Si aucun token n'est fourni, renvoie une erreur 401 (Non autorisé).
    if (!token) {
      return new Response(JSON.stringify({ message: 'Absence de token' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Si le token est fourni, vérifie sa validité.
    const session = verifySessionToken(token);
    if (!session) {
      return new Response(JSON.stringify({ message: 'Token invalide' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Si le token est valide, récupère les informations de l'utilisateur associé à partir de la base de données avec Prisma
    const user = await prisma.user.findUnique({
      where: {
        id: session.sub
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        role_id: true,
        manager_id: true,
        role: { // Récupération du nom dans la table role
          select: {
            name: true 
          }
        }
      }
    });

    // Si aucun utilisateur n'est trouvé, renvoie une erreur 404 (Non trouvé).
    if (!user) {
      return new Response(JSON.stringify({ message: 'Utilisateur non trouvé' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // Ajoute le nom du rôle aux données de l'utilisateur
    const result = {
      ...user,
      roleName: user.role?.name 
    };

    // Supprime l'objet role pour ne pas renvoyer de données inutiles
    delete result.role;

    // Si l'utilisateur est trouvé, renvoie ses informations.
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Erreur du serveur : ', error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}