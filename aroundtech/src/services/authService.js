import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { createSessionToken, getSessionToken, verifySessionToken } from './sessionService';

// Initialisation de Prisma Client pour interagir avec la base de données
const prisma = new PrismaClient();

export async function loginUser(email, password) {
  // Récupération de l'utilisateur par email
  const user = await prisma.user.findUnique({
    where: { email: email }
  });

  // Si l'utilisateur existe et que le mot de passe correspond, création d'un jeton de session
  if (user && bcrypt.compareSync(password, user.password)) {
    // Génère un jeton de session pour l'utilisateur authentifié
    const token = createSessionToken(user);
    return token;
  } else {
    // Si les identifiants sont incorrects, renvoie une erreur
    throw new Error('Authentification invalide');
  }
}

export async function getUserFromSession(req) {
  //console.log("Dans getUserFromSession");
  try {
    // Récupère le jeton de la session à partir de la requête entrante
    const token = getSessionToken(req);

    // Vérifie l'existence du jeton et sa validité
    if (!token) {
      throw new Error('Aucune session trouvée');
    }

    const decoded = verifySessionToken(token);

    if (!decoded) {
      throw new Error('Session invalide');
    }

    // Si le jeton est valide, recherche l'utilisateur correspondant dans la base de données
    const user = await prisma.user.findUnique({
      where: { id: decoded.sub }
    });

    //console.log("User dans la session:", user);

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
    return user;
  } catch (error) {
    throw error;
  }
}
