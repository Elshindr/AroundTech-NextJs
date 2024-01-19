import { queryDb } from "@/app/lib/db";

export async function POST(request, { params }) {
  const city = await queryDb({
    query: `INSERT INTO city (name) VALUES (?);`,
    params: [params.name],
  });

  return new Response(city, { status: 200 });
}
