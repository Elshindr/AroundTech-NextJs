import { queryDb } from "@/app/lib/db";

export async function GET(request, { params }) {
  const missions = await queryDb({
    query: `SELECT * FROM mission where ? between start_date and end_date and mission.user_id = ?;`,
    params: [params.date, parseInt(params.idUser)],
  });

  let datas = JSON.stringify(missions);
  return new Response(datas, { status: 200 });
}
