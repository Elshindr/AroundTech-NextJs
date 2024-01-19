export default class TransportService {

    static url = `${process.env.NEXT_PUBLIC_APP_URL}/api/transport`;

    static async loadTransports() {
        return fetch(this.url)
            .then(res => {
                return res.json();
            })
            .then(tra => {
                return tra;
            })
            .catch(error => {
                console.error("Erreur dans loadTransports", error);
            });
    }
}
