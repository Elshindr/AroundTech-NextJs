import { queryDb } from '@/app/lib/db'


export async function DELETE(req, { params }) {


    if (params.idUser !== undefined  && params.idNatExp !== undefined) {

        const expensesRes = await queryDb({
            query: `DELETE FROM nature_expense 
            WHERE  nature_expense.id = ?;`,
            params:  [parseInt(params.idNatExp)]
        });

        if (expensesRes.affectedRows === 1) {
            return new Response("IS OKAY", { status: 200 });

        } else {
            return new Response("Erreur DELETE NatExp affectedRows = " + expensesRes.affectedRows, { status: 502 });
        }


    } else {
        return new Response("Erreur dans DELETE NatExp", { status: 502 });
    }

}

export async function POST(request, {params}) {

    const body = await request.json();
    let paramsQr = [];


    for (const key in body) {
        paramsQr.push(body[key]);
    }

    if (paramsQr.length !== 0) {

        const natExpenseRes = await queryDb({
            query: `INSERT INTO nature_expense (name, is_capped, cap_value) VALUES (?,?,?);`,
            params: paramsQr
        });


        if (natExpenseRes.affectedRows === 1) {
            return new Response("IS OKAY", { status: 200 });
        } else {
            return new Response("Erreur INSERT NatExp :" + natExpenseRes, { status: 512 });
        }
        
    } else {
        return new Response(body, { status: 512 });
    }

}

