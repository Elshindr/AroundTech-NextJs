export default class CityService {
  
  static url = `${process.env.NEXT_PUBLIC_APP_URL}/api/city`;

  static async loadCities() {
    return fetch(this.url)
      .then((res) => {
        return res.json();
      })
      .then((cit) => {
        return cit;
      })
      .catch((error) => {
        console.error("Erreur dans loadCities", error);
      });
  }

  static async loadCitiesFilterByName(name) {
    let urlUpdated = `${this.url}/FilterByName/${name}`;

    return fetch(urlUpdated)
      .then((res) => {
        return res.json();
      })
      .then((cit) => {
        return cit;
      })
      .catch((error) => {
        console.error("Erreur de la récupération des données 'villes'", error);
      });
  }

  static async loadCitiesFilterById(id) {
    let urlUpdated = `${this.url}/FilterById/${id}`;

    return fetch(urlUpdated)
      .then((res) => {
        return res.json();
      })
      .then((cit) => {
        return cit;
      })
      .catch((error) => {
        console.error("Erreur de la récupération des données 'villes'", error);
      });
  }

  static async addCity(name) {
    let urlUpdated = `${this.url}/add/${name}`;

    return fetch(urlUpdated, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: name,
    })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
