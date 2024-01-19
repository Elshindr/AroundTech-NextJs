import cron from '@/app/lib/cron';

export async function GET() {

    try{
        cron.start();
        console.log('Tache cron démarrée !!');

        return new Response("Tâche cron démarrée", { status: 200 });

    } catch(e){
        return new Response("Erreur au démarrage de la tache cron :" + e, { status: 503 })
    }

};
