import { queryDb } from '@/app/lib/db'

export async function GET(request, { params }) {


    const expenses = await queryDb({
        query: "SELECT * FROM city WHERE lower(name) LIKE lower(?);",
        params: [params.name]
    });
    let datas = JSON.stringify(expenses);

    return new Response(datas, { status: 200 });
}