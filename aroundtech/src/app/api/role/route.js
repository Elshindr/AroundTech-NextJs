import { queryDb } from '@/app/lib/db'

export async function GET(request) {

    const roles = await queryDb({
        query: "SELECT * FROM role",
        params: []
    });
    let datas = JSON.stringify(roles);
    //console.log(datas)
    return new Response(datas, { status: 200 });
}







