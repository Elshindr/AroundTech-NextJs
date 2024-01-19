import { queryDb } from '@/app/lib/db'

export async function PUT(request, {params}) {

    const body = await request.json();

    if (body.length !== 0) {

        const natExpenseRes = await queryDb({
            query: `UPDATE nature_expense
                    SET name = ?, is_capped = ?, cap_value = ?
                    WHERE nature_expense.id = ?;`,
            params: [ body.name, body.is_capped, body.cap_max, parseInt(params.idNatExp)]
        });

        if (natExpenseRes.affectedRows === 1) {
            return new Response("IS OKAY", { status: 200 });

        } else {
            return new Response("Erreur Update NatExp :" + natExpenseRes, { status: 512 });
        }
        
    } else {
        return new Response(body, { status: 512 });
    }

}

export async function DELETE(req, { params }) {


    if (params.idUser !== undefined && params.idNatExp !== undefined) {

        const natExpensesRes = await queryDb({
            query: `DELETE FROM nature_expense
            WHERE nature_expense.id = ?;`,
            params: [params.idNatExp]
        });

        if (natExpensesRes.affectedRows === 1) {
            return new Response("IS OKAY", { status: 200 });

        } else {
            return new Response("Erreur DELETE Natexpense affectedRows = " + natExpensesRes.affectedRows, { status: 502 });
        }


    } else {
        return new Response("Erreur dans DELETE Natexpense", { status: 502 });
    }

}