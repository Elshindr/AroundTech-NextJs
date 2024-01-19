import CityService from "@/services/cityService";

export default class MissionService {


  static url = `${process.env.NEXT_PUBLIC_APP_URL}/api/mission`;

  static async loadMissionsFilterByUser(idUser) {

    //let urlUpdated = `${this.url}/${idUser}`;
    let urlUpdated = `${this.url}/user/${idUser}`;

    return fetch(urlUpdated)
      .then((res) => {
        return res.json();
      })
      .then((missions) => {
        return missions;
      })
      .catch((error) => {
        console.error("Erreur de la récupération des données 'mission'", error);
      });
  }

  static async loadOneMission(idUser, idMission) {
    //let url = `${this.url}/${idUser}/${idMission}`;
    let url = `${this.url}/user/${idUser}/missions/${idMission}`;

    return fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((mis) => {
        return mis;
      })
      .catch((error) => {
        console.error("Erreur dans loadOneMission", error);
      });
  }

  static async addMission(formData) {
    
    //Verification si les villes existent
    if (formData.departure_city_id !== "") {
      const departureCityPromise = this.city(formData.departure_city_id);

      const departure_city_id = await departureCityPromise;
      formData.departure_city_id = departure_city_id;
    } else {
      //return error message
      console.log(
        "Aucune ville de départ saisie"
      );
    }

    if (formData.arrival_city_id !== "") {
      const arrivalCityPromise = this.city(formData.arrival_city_id);

      const arrival_city_id = await arrivalCityPromise;
      formData.arrival_city_id = arrival_city_id;
    } else {
      //return error message
      console.log(
        "Aucune ville d'arrivée saisie"
      );
    }

    return fetch(this.url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.status;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static async city(nameOfCity) {
    let idCity;
    const response = await CityService.loadCitiesFilterByName(nameOfCity);
    if (response.length === 0) {
      //Insert new city
      const addCityResponse = await CityService.addCity(nameOfCity);
      if (addCityResponse.ok) {
        const response = await CityService.loadCitiesFilterByName(nameOfCity);
        idCity = response[0].id;
      } else {
        console.log("erreur lors de l'ajout de la ville de départ");
      }
    } else {
      //City exists
      idCity = response[0].id;
    }

    return idCity;
  }

  static async updateMission(formData, idMission) {
    //Verification si les villes existent
    if (formData.departure_city_id !== "") {
      const departureCityPromise = this.city(formData.departure_city_id);

      const departure_city_id = await departureCityPromise;
      formData.departure_city_id = departure_city_id;
    } else {
      //return error message
      console.log(
        "Aucune ville de départ saisie"
      );
    }

    if (formData.arrival_city_id !== "") {
      const arrivalCityPromise = this.city(formData.arrival_city_id);

      const arrival_city_id = await arrivalCityPromise;
      formData.arrival_city_id = arrival_city_id;
    } else {
      //return error message
      console.log(
        "Aucune ville d'arrivée saisie"
      );
    }

    let url = `${this.url}/update/${idMission}`;

    return fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.status;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static async deleteMission(idMission) {
    return fetch(`${this.url}/delete/${idMission}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then((res) => {
        return true;
      })
      .catch((error) => {
        console.log(`Error dans deleteMission`, error);
        return false;
      });
  }

  static async loadMissionsEnded() {
    let urlUpdated = `${this.url}`;

    return fetch(urlUpdated)
      .then((res) => {
        return res.json();
      })
      .then((missions) => {
        return missions;
      })
      .catch((error) => {
        console.error("Erreur de la récupération des données 'missions' dans loadMissionsEnded", error);
      });
  }



  // Recupération des missions pour les managers
  static async getMissionsForManager(idGestion, status) {
    const url = `${this.url}/gestion/${idGestion}/status/${status}`;

    return fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Erreur de la récupération des données');
      })
      .then((missions) => {
        return missions;
      })
      .catch((error) => {
        console.error("Erreur dans getMissionsForManager", error);
        return [];
      });
  }

  // Mise à jour du statut de la mission
  static async updateMissionStatus(missionId, statusId) {
    const response = await fetch(`${this.url}/${missionId}/status`, {
      method: 'PUT',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: statusId }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du statut de la mission');
    }

    const data = await response.json();
    // console.log(data.message);
    // console.log("Nouveau statut : ",data.newStatus);
    return {
      message: data.message,
      newStatus: data.newStatus
    };

  }

    /**
     * Vérifie si une mission existe déjà pour la date en param
     * Format param : date type YYYY-MM-DD
     * Return boolean
     */
    static async selectedDateIsValid(date, idUser, idMission) {
      const urlUpdated = `${this.url}/user/${idUser}/date/${date}`;
      
      return fetch(urlUpdated)
      .then((res) => {
        return res.json();
      })
      .then((missions) => {
        //la date est valide car elle n'existe pas dans la BDD
        if(Object.keys(missions).length === 0) {
          return true;
        } else {
          //une mission existe déjà pour cette date

          //Dans le cas d'un update, vérifier que l'idMission est celui returner dans la requete
          if (idMission !== missions[0].id) {
            return true;
          } else {
            return false;
          }
          
        }
      })
      .catch((error) => {
        console.error("Erreur de la récupération des données 'mission' dans selectedDateIsValid", error);
      });
  
    }
  
       /**
     * Vérifie si une mission existe déjà pour la date en param
     * Format param : date type YYYY-MM-DD
     * Return boolean
     */
       static async coupleOfDatesIsValid(startedDate, arrivalDate , idUser, idMission) {
        const urlUpdated = `${this.url}/user/${idUser}/twoDates/${startedDate}/${arrivalDate}`;
        
        return fetch(urlUpdated)
        .then((res) => {
          return res.json();
        })
        .then((missions) => {
          //la date est valide car elle n'existe pas dans la BDD
          if(Object.keys(missions).length === 0) {
            return true;
          } else {
            //une mission existe déjà pour cette date
            if (idMission !== missions[0].id) {
              return true;
            } else {
              return false;
            }
          }
        })
        .catch((error) => {
          console.error("Erreur de la récupération des données 'mission' dans coupleOfDatesIsValid", error);
        });
    
      }


}
