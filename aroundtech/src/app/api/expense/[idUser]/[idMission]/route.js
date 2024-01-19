import { queryDb } from '@/app/lib/db'

export async function GET(req, {params}) {

    let paramsQr = [parseInt(params.idUser), parseInt(params.idMission)];

    const expenses = await queryDb({
        query: `SELECT expense_report.*, nature_expense.name AS "nat_exp_name" 
                FROM expense_report 
                JOIN mission ON expense_report.mission_id = mission.id
                JOIN nature_expense ON expense_report.nature_expense_id = nature_expense.id 
                WHERE mission.user_id = ? AND mission.id = ?;`,
        params: paramsQr
    });

    let datas = JSON.stringify(expenses);
    return new Response(datas, { status: 200 });
}


export async function PUT(request, { params }) {

    const body = await request.json();

    if (params.idUser !== undefined && params.idMission !== undefined ) {

        const expensesRes = await queryDb({
            query: `UPDATE expense_report
                    SET valid_at=?
                    WHERE EXISTS (
                        SELECT 1
                        FROM mission
                        WHERE mission.id = ? AND mission.user_id = ?
                    ) AND  FIND_IN_SET(expense_report.id, ?) > 0;`,
            params: [body.valid_at, parseInt(params.idMission), parseInt(params.idUser), body.ids.join(',')]
        });

        if (expensesRes.affectedRows === body.ids.length) {
            return new Response("IS OKAY", { status: 200 });

        } else {
            return new Response("Erreur Update Exp affectedRows = " + expensesRes.affectedRows, { status: 502 });
        }


    } else {
        return new Response("Erreur dans Update expense", { status: 502 });
    }


}


export async function POST(request, {params}) {

    const body = await request.json();
    let paramsQr = [];

    for (const key in body) {
        paramsQr.push(body[key]);
    }

    if (paramsQr.length !== 0) {

        const expensesRes = await queryDb({
            query: `INSERT INTO expense_report (created_at, amount, mission_id, nature_expense_id) VALUES (?,?,?,?);`,
            params: paramsQr
        });

        if (expensesRes.affectedRows === 1) {
            return new Response("IS OKAY", { status: 200 });

        } else {
            return new Response("Erreur INSERT Exp :" + expensesRes, { status: 512 });
        }
        
    } else {
        return new Response(body, { status: 512 });
    }

}