import { serialize } from 'cookie';

export async function POST() {
  // Crée un cookie d'authentification avec une date d'expiration passée, ce qui l'efface
  const cookie = serialize('authToken', '', {
    path: '/',
    expires: new Date(0), // La date d'expiration dans le passé supprime le cookie
    httpOnly: true, // Sécurise le cookie pour qu'il ne soit accessible que par le serveur HTTP (pas par JavaScript côté client)
    sameSite: 'strict' // Restreint l'envoi du cookie aux requêtes du même site
  });

  // Envoie une réponse avec le cookie mis à jour (effacé) pour déconnecter l'utilisateur
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Set-Cookie': cookie, // En-tête qui définit le nouveau cookie dans le navigateur de l'utilisateur
      'Content-Type': 'application/json'
    }
  });
}