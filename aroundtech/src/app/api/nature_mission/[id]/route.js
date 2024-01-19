import { queryDb } from '@/app/lib/db'

export async function DELETE(request, {params}) {

    //console.log('recherche params dans DELETE nature *****************************************************', params);
    if(params.id != null){
        //console.log(params);
        const nature_mis = await queryDb({
            query: "DELETE FROM nature_mission where id = "+params.id,
            params: []
        });

        if(nature_mis.affectedRows === 1){
            return new Response("nature supprimé", { status: 200 });
        }else{
            return new Response("Erreur dans la suppression"+nature_mis.affectedRows, {status: 502});
        }
    }else{
        return new Response("Erreur dans la DELETE nature_mission", {status: 502});
    }
}

export async function GET(request, {params}) {

    const natures = await queryDb({
        query: "SELECT * FROM nature_mission WHERE nature_mission.id = ?;",
        params: [params.id]
    });
    let datas = JSON.stringify(natures);

    return new Response(datas, { status: 200 });
}

export async function PUT(request, {params}){
    const data = await request.json();
    //console.log('mes données *********************************', data);
    //console.log('recherche params dans le PUT nature ****************************************************', params);
    if(params.id != null){
        //console.log(params)
        const editNature = await queryDb({
            query: "UPDATE nature_mission SET name=?, is_charge=?, is_bonus=?, tjm=?, percentage=?, start_date=?, end_date=? WHERE id="+params.id,
            params: [data.name, data.is_charge, data.is_bonus, data.tjm, data.percentage, data.start_date, data.end_date]
        });
        if(editNature.affectedRows === 1){
            return new Response("nature modifiée", { status: 200 });
        }else{
            return new Response("Erreur dans la modification"+editNature.affectedRows, {status: 502});
        }
    }else{
        return new Response("Erreur dans le PUT nature_mission", {status: 502});
    }

}

