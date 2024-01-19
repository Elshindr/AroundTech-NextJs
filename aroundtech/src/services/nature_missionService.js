export default class NatureMisService {
  static url = `${process.env.NEXT_PUBLIC_APP_URL}/api/nature_mission`;

  static async loadNaturesMis() {
    return fetch(this.url)
      .then((res) => {
        return res.json();
      })
      .then((nat) => {
        return nat;
      })
      .catch((error) => {
        console.error("Erreur dans loadNaturesMis", error);
      });
  }

  static async loadOneNatureMission(idNatureMis) {
    let urlNat = `${this.url}/${idNatureMis}`;
    //console.log(`urlNat`, urlNat);

    return fetch(urlNat)
      .then((res) => {
        return res.json();
      })
      .then((exp) => {
        //console.log(`exp`, exp)
        return exp;
      })
      .catch((error) => {
        console.error(
          "Erreur dans loadOnNatureMission idNatureMis =",
          id,
          error
        );
      });
  }

  static async addNature(
    name,
    is_charge,
    is_bonus,
    tjm,
    percentage,
    start_date,
    end_date
  ) {
    console.log(
      JSON.stringify({
        name: name,
        is_charge: is_charge,
        is_bonus: is_bonus,
        tjm: tjm,
        percentage: percentage,
        start_date: start_date,
        end_date: end_date,
      })
    );

    return fetch(`${this.url}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: name,
        is_charge: is_charge,
        is_bonus: is_bonus,
        tjm: tjm,
        percentage: parseFloat(percentage),
        start_date: start_date,
        end_date: end_date,
      }),
    })
      .then((res) => {
        if (res.status == 200) {
          return true;
        }
        console.log(`erreur addNature`, res);
        throw new Error("addNature" + res);
      })
      .catch((error) => {
        console.log(`Error dans addNature`, error);
        return false;
      });
  }

  static async deleteNature(id) {
    return fetch(this.url + "/" + id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then((res) => {
        if (res.status == 200) {
          return true;
        }

        console.log(`erreur deleteNature `, res);
        throw new Error("deleteNature " + res);
      })
      .catch((error) => {
        console.log(`Error dans deleteNature `, error);
        return false;
      });
  }
  static async updateNature(
    id,
    name,
    is_charge,
    is_bonus,
    tjm,
    percentage,
    start_date,
    end_date
  ) {
    return fetch(this.url + "/" + id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        name: name,
        is_charge: is_charge,
        is_bonus: is_bonus,
        tjm: tjm,
        percentage: parseFloat(percentage),
        start_date: start_date,
        end_date: end_date,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return true;
        }
        console.log(`erreur dans la mise à jour `, res);
        throw new Error("updateNature " + res);
      })
      .catch((error) => {
        console.log(`Error dans updateNature !!!! `, error);
        return false;
      });
  }

  /**
   * Vérifie si une mission existe déjà pour la date en param
   * Format param : date type YYYY-MM-DD
   * Return array of nature_mission
   */
  static async selectedNatureFilterByDate(date) {
    const urlUpdated = `${this.url}/date/${date}`;

    return fetch(urlUpdated)
      .then((res) => {
        return res.json();
      })
      .then((natures) => {
        return natures;
      })
      .catch((error) => {
        console.error(
          "Erreur de la récupération des données 'mission' dans selectedNatureFilterByDate",
          error
        );
      });
  }
}
