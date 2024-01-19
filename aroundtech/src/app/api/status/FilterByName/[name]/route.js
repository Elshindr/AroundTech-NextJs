import { queryDb } from '@/app/lib/db'

export async function GET(request, {params}) {

    const updateName = params.name + '%'
    const expenses = await queryDb({
        query: "SELECT * FROM status WHERE name LIKE ?",
        params: [updateName]
    });
    let datas = JSON.stringify(expenses);

    return new Response(datas, { status: 200 });
}