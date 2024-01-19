

export default class CronService {

    static url = `${process.env.NEXT_PUBLIC_APP_URL}/api/cron`;

    static async launchCron() {

        return fetch(this.url)
            .then((res) => {
                return res;
            })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error("Erreur dans launchCron", error);
            });
    }
}  