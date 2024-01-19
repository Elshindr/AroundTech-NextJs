export default class StatusService {


  static url = `${process.env.NEXT_PUBLIC_APP_URL}/api/status`;


  static async loadStatus() {
    return fetch(this.url)
      .then((res) => {
        return res.json();
      })
      .then((status) => {
        return status;
      })
      .catch((error) => {
        console.error("Erreur dans loadStatus", error);
      });
  }


  static async loadStatusByName(name) {

    let urlSpe = `${this.url}/FilterByName/${name}`;

    return fetch(urlSpe)
      .then((res) => {
        return res.json();
      })
      .then((status) => {
        return status;
      })
      .catch((error) => {
        console.error("Erreur dans loadStatusByName", error);
      });
  }
}
