import { loginUser } from '@/services/authService';
import { serialize } from 'cookie';

export async function POST(req) {

	try {
		// Extraction des identifiants de l'utilisateur à partir du corps de la requête
		const { email, password } = await req.json();
		// Tentative de connexion de l'utilisateur
		const token = await loginUser(email, password);

		// Si la connexion réussit, retourne une réponse avec un cookie de session
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				// Définit un cookie contenant le jeton de session
				'Set-Cookie': serialize('authToken', token, {
					path: '/',
					httpOnly: true, // Sécurise le cookie pour qu'il ne soit accessible que par le serveur HTTP
					sameSite: 'strict' // Restreint l'envoi du cookie aux requêtes du même site
				}),
			},
		});
	} catch (error) {
		// En cas d'échec de la connexion, renvoie une réponse avec le message d'erreur
		return new Response(JSON.stringify({ success: false, message: error.message }), {
			status: 401,
			headers: {
				'Content-Type': 'application/json',
			}
		})
	}
};
