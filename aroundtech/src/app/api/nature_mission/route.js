import { queryDb } from '@/app/lib/db'

export async function GET(request) {

    const natures = await queryDb({
        query: "SELECT * FROM nature_mission",
        params: []
    });
    let datas = JSON.stringify(natures);

    return new Response(datas, { status: 200 });
}


export async function POST(request){
    const body = await request.json();
    const natureAdd = await queryDb({
        query: "INSERT INTO nature_mission (name, is_charge, is_bonus, tjm, percentage, start_date, end_date) VALUES (?, ?, ?, ? ,?, ?, ?)",
        params: [body.name, body.is_charge, body.is_bonus, body.tjm, body.percentage, body.start_date, body.end_date]
    });
    let data = JSON.stringify(natureAdd);

    return new Response(data, { status: 200 });
}