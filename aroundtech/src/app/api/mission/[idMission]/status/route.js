import { queryDb } from '@/app/lib/db'

export async function PUT(request, {params}) {
    let requestBody = {};

    // Récupération et analyse de requestBody
    try {
        const formData = await new Response(request.body).json();
        requestBody = formData;
    } catch (error) {
        console.error("Erreur dans requestBody : ", error);
        return new Response("Erreur dans requestBody ", { status: 400 });
    }

    //console.log("requestBody = ", requestBody);

    // Récupération de l'ID de la mission et du nouveau statut
    const missionId = parseInt(params.idMission);
    const newStatus = requestBody.status;

    // Vérification que le nouveau statut soit défini
    if (newStatus === undefined) {
        return new Response(JSON.stringify({ message: "Status non défini" }), { status: 400 });
    }

    // Mise à jour du statut de la mission dans la base de données
    try {
        await queryDb({
            query: `UPDATE mission SET status_id = ? WHERE id = ?`,
            params: [newStatus, missionId]
        });
        return new Response(JSON.stringify({ message: "Statut mis à jour avec succès", newStatus: newStatus }), { status: 200 });

    } catch (error) {
        console.error("Erreur lors de la mise à jour du statut : ", error);
        return new Response(JSON.stringify({ message: "Erreur lors de la mise à jour du statut" }), { status: 500 });
    }
}
