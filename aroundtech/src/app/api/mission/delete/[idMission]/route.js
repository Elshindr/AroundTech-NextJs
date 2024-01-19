import { queryDb } from '@/app/lib/db'

export async function DELETE(request, { params }) {

    let paramQr = [];

    if (params.idMission !== undefined) {

        paramQr=[parseInt(params.idMission)];

        const missions = await queryDb({
            query: `DELETE FROM mission 
            WHERE mission.id = ?;`,
            params: paramQr
        });

        if (missions.ok === true) {
            return new Response("IS OKAY", { status: 200 });

        } else {
            return new Response("Erreur DELETE Exp affectedRows = " + missions.ok, { status: missions.status });
        }


    } else {
        return new Response("Erreur dans DELETE expense", { status: 502 });
    }

}