import { queryDb } from '@/app/lib/db'

export async function GET(request) {

    const natures = await queryDb({
        query: "SELECT * FROM nature_expense",
        params: []
    });
    let datas = JSON.stringify(natures);

    return new Response(datas, { status: 200 });
}