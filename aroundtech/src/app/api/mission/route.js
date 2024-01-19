import { queryDb } from "@/app/lib/db";

export async function POST(request) {
  const body = await request.json();

  //console.log("body", body);

  let paramsQr = [];
  for (const key in body) {
    paramsQr.push(body[key]);
  }

  let columns =
    "(`nature_mission_id`, `departure_city_id`, `arrival_city_id`, `start_date`, `end_date`, `status_id`, `user_id`, `transport_id`, `init_nat_mis_id`)";

  const missions = await queryDb({
    query: `INSERT INTO mission ${columns} VALUES (?, ?, ?, ?, ?, ?, ?, ?,?);`,
    params: [
      parseInt(body.nature_mission_id),
      body.departure_city_id,
      body.arrival_city_id,
      body.start_date,
      body.end_date,
      body.status_id,
      body.user_id,
      parseInt(body.transport_id),
      parseInt(body.nature_mission_id),
    ],
  });

  return new Response(missions, { status: 200 });
}
