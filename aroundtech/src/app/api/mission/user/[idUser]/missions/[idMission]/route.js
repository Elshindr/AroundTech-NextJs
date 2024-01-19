import { queryDb } from '@/app/lib/db'

/* export async function GET(request, {params}) {

    const missions = await queryDb({
        query: `SELECT * FROM mission where id = ?;`,
        params: [params.idMission]
    });

    let datas = JSON.stringify(missions);
    
    return new Response(datas, { status: 200 });
} */


export async function GET(request, {params}) {

    let strFrom = ` mission 
                    JOIN status ON status.id = mission.status_id
                    JOIN nature_mission ON nature_mission.id = mission.nature_mission_id
                    JOIN transport ON transport.id = mission.transport_id
                    JOIN city AS city_dep ON city_dep.id = mission.departure_city_id
                    JOIN city AS city_arr ON city_arr.id = mission.arrival_city_id
                    `;


    const missions = await queryDb({
        query: `SELECT mission.*, 
                    nature_mission.name AS "nat_mis_name", nature_mission.percentage AS "nat_mis_percent", nature_mission.tjm AS "nat_mis_tjm", 
                    status.name AS "stat_name", transport.name AS 'tran_name',
                    city_dep.name AS "city_dep_name", city_arr.name AS "city_arr_name"
                FROM ${strFrom} WHERE mission.user_id = ? AND mission.id = ?`,
        params: [parseInt(params.idUser), parseInt(params.idMission)]
    });

    let datas = JSON.stringify(missions);
    return new Response(datas, { status: 200 });
}