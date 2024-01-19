import { queryDb } from '@/app/lib/db'

export async function GET(req, {params}) {

    let paramsQr = [parseInt(params.idUser)];

    const expenses = await queryDb({
        query: `SELECT expense_report.*, nature_expense.name AS "nat_exp_name" 
                FROM expense_report 
                JOIN mission ON expense_report.mission_id = mission.id
                JOIN nature_expense ON expense_report.nature_expense_id = nature_expense.id 
                WHERE mission.user_id = ?;`,
        params: paramsQr
    });

    let datas = JSON.stringify(expenses);
    return new Response(datas, { status: 200 });
}

