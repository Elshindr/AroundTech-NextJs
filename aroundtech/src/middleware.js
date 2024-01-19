import { NextResponse } from 'next/server';
import { getSessionToken } from "@/services/sessionService";

export default async function middleware(request) {

  // Chemins autorisés pour chaque rôle
  const rolePaths = {
    1: ['/', '/mission', '/mission/add', '/mission/information', '/planning', '/primes', '/expense'],
    2: ['/', '/mission', '/mission/add', '/mission/information', '/planning', '/primes', '/expense', '/mission/waiting'],
    3: ['/', '/mission', '/mission/add', '/mission/information', '/planning', '/primes', '/expense', '/nature', '/motif', '/user']
  };

  // Si l'accès est à la page de connexion || non autorisée, permettre sans vérifier le token
  if (request.nextUrl.pathname.startsWith('/connexion') || request.nextUrl.pathname.startsWith('/unauthorized')) {
    return NextResponse.next();
  }

  // Obtention du jeton de session pour la requête entrante
  const token = getSessionToken(request);

  // Si aucun jeton n'est trouvé, redirige vers la page de connexion
  if (!token) {
    return NextResponse.redirect(new URL('/connexion', request.url));
  }

  // Effectue une requête à l'API pour confirmer l'état de connexion de l'utilisateur
  const response = await fetch(`${request.nextUrl.origin}/api/auth/session`, {
    headers: {
      // Transmet le cookie de la requête originale à l'API
      cookie: request.headers.get('cookie'),
    },
  });

  // Si la réponse indique que l'utilisateur n'est pas connecté, redirige vers la page de connexion
  if (response.status === 401) {
    return NextResponse.redirect(new URL('/connexion', request.url));
  }

  // Si la requête API est réussie, obtenir les informations de l'utilisateur depuis la réponse
  const user = await response.json();

  // Gestion des accès aux pages en fonction du rôle
  const path = request.nextUrl.pathname;
  const userRole = user.user.role_id;
  const userPaths = rolePaths[userRole] || [];

  // Gestion des routes dynamiques
  const dynamicPaths = {
    1: ['/expense/'],
    2: ['/expense/'],
    3: ['/user/', '/mission/', '/expense/']
  };
  const userDynamicPaths = dynamicPaths[userRole] || [];

  const isDynamicPath = userDynamicPaths.some(dynamicPath => path.startsWith(dynamicPath));

  // Si la route est dynamique et autorisée pour l'utilisateur, laisse passer
  if (isDynamicPath) {
    return NextResponse.next();
  }

  // Si le chemin statique est autorisé pour l'utilisateur, laisse passer
  if (userPaths.includes(path)) {
    return NextResponse.next();
  }

  // Si l'utilisateur n'a pas accès au chemin demandé, redirige vers /unauthorized
  return NextResponse.redirect(new URL('/unauthorized', request.url));
}

// Configuration du middleware pour qu'il s'applique à toutes les routes sauf celles spécifiées
export const config = {
  matcher: [
    /*
     * Fait correspondre tous les chemins, à l'exception de ceux commençant par :
     * - api (API routes)
     * - _next/static (fichiers statiques)
     * - _next/image (fichiers d'optimisation d'image)
     * - favicon.ico (fichier favicon)
     */
    '/((?!api|_next/static|_next/image|image|favicon.ico).*)',
  ],
}