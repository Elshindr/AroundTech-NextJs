import { queryDb } from '@/app/lib/db'

export async function GET(request) {

    const expenses = await queryDb({
        query: "SELECT * FROM transport",
        params: []
    });
    let datas = JSON.stringify(expenses);

    return new Response(datas, { status: 200 });
}