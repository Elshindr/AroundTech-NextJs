import { queryDb } from '@/app/lib/db'

export async function DELETE(req, { params }) {

    let paramQr = [];

    if (params.idUser !== undefined && params.idMission !== undefined && params.idExpense !== undefined) {

        paramQr = [parseInt(params.idMission), parseInt(params.idUser), parseInt(params.idExpense)];

        const expensesRes = await queryDb({
            query: `DELETE FROM expense_report 
            WHERE EXISTS (
                SELECT 1
                FROM mission
                WHERE mission.id = ? AND mission.user_id = ?
            ) AND expense_report.id = ?;`,
            params: paramQr
        });

        if (expensesRes.affectedRows === 1) {
            return new Response("IS OKAY", { status: 200 });

        } else {
            return new Response("Erreur DELETE Exp affectedRows = " + expensesRes.affectedRows, { status: 502 });
        }


    } else {
        return new Response("Erreur dans DELETE expense", { status: 502 });
    }

}

export async function PUT(request, { params }) {

    const body = await request.json();
    let paramsQr = [];

    if (params.idUser !== undefined && params.idMission !== undefined && params.idExpense !== undefined) {


        for (const key in body) {
            paramsQr.push(body[key]);
        }

        paramsQr.push(parseInt(params.idMission));
        paramsQr.push(parseInt(params.idUser));
        paramsQr.push(parseInt(params.idExpense));

        const expensesRes = await queryDb({
            query: `UPDATE expense_report
                    SET created_at=?, amount=?, nature_expense_id=?
                    WHERE EXISTS (
                        SELECT 1
                        FROM mission
                        WHERE mission.id = ? AND mission.user_id = ?
                    ) AND expense_report.id = ?;`,
            params: paramsQr
        });

        if (expensesRes.affectedRows === 1) {
            return new Response("IS OKAY", { status: 200 });

        } else {
            return new Response("Erreur Update Exp affectedRows = " + expensesRes.affectedRows, { status: 502 });
        }


    } else {
        return new Response("Erreur dans Update expense", { status: 502 });
    }


}