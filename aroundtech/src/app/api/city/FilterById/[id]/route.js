import { queryDb } from '@/app/lib/db'

export async function GET(request, { params }) {


    const city = await queryDb({
        query: "SELECT * FROM city WHERE id = ?;",
        params: [params.id]
    });
    let datas = JSON.stringify(city);

    return new Response(datas, { status: 200 });
}