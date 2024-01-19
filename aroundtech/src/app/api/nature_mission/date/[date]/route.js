import { queryDb } from "@/app/lib/db";

export async function GET(request, { params }) {
  const missions = await queryDb({
    query: `SELECT * FROM nature_mission WHERE (end_date IS NOT NULL AND '2023-01-01' BETWEEN start_date and end_date) OR (end_date IS NULL AND '2023-01-01' >= start_date);`,
    params: [params.date],
  });

  let datas = JSON.stringify(missions);
  return new Response(datas, { status: 200 });
}
