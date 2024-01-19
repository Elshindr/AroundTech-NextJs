import { getUserFromSession } from "@/services/authService";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Tente de récupérer l'utilisateur associé à la session
    const user = await getUserFromSession(req);

    // Si réussi, retourne une réponse indiquant que l'utilisateur est connecté
    return new NextResponse(JSON.stringify({ isLoggedIn: true, user }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // En cas d'échec (ex : session invalide), renvoie une réponse indiquant que l'utilisateur n'est pas connecté
    return new NextResponse(JSON.stringify({ isLoggedIn: false }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}