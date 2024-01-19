import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export function createSessionToken(user) {
  // Payload du jeton contenant les informations de l'utilisateur 
  const payload = {
    sub: user.id, // 'sub' => champ standard pour l'ID de l'utilisateur
    email: user.email,
    role: user.roleId
  };

  // Création du jeton JWT qui expire après une heure
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

export function verifySessionToken(token) {
  //console.log("Dans verifySessionToken");
  try {
    // Vérifie la validité du jeton avec la clé secrète
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded; // Retourne le jeton décodé si valide
  } catch (error) {
    // En cas d'erreur (exemple : si le jeton est expiré), retourne null
    return null;
  }
}

export function getSessionToken(req) {

  // Récupère le cookie de la requête
  // en gérant à la fois les cas où `req.headers` est un objet ou a une méthode `get` (utilisé pour dataUser).
  const cookie = typeof req.headers.get === 'function' ?
    req.headers.get('cookie') :
    req.headers['cookie'];


  if (!cookie) {
    return null; // Si aucun cookie n'est présent, retourne null
  }

  // Extrait le jeton du cookie et le retourne
  const token = cookie.split('; ').find(row => row.startsWith('authToken='));
  return token ? token.split('=')[1] : null;
}
