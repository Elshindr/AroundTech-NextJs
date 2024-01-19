import { queryDb } from "@/app/lib/db";

export async function GET(request, { params }) {
  const missions = await queryDb({
    query: `SELECT * FROM mission where  (start_date between ? and ? or end_date between ? and ?) and mission.user_id = ?;`,
    params: [params.startedDate, params.endDate, params.startedDate, params.endDate, parseInt(params.idUser)],
  });

  let datas = JSON.stringify(missions);
  return new Response(datas, { status: 200 });
}
