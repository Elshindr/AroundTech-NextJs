import { queryDb } from '@/app/lib/db'

export async function GET(request, {params}) {
    //console.log(params)
 

    const user = await queryDb({
        query: `SELECT * FROM user where id = ?;`,
        params: [params.id]
    });

    let datas = JSON.stringify(user);
    //console.log(datas);
    
    return new Response(datas, { status: 200 });
}




