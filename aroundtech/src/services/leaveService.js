export default class LeaveService {
  static url = "http://localhost:8000/leaves";
  //Lecture du fichier db.json dans le dossier json-abs
  static async loadLeaves() {
    return fetch(this.url)
      .then((res) => {
        return res.json();
      })
      .then((leaves) => {
        return leaves;
      })
      .catch((e) => {
        console.log("Impossible de récupérer les résultats de leaves", e);
      });
  }

  /**
   * Vérifie si un congé existe déjà pour la date en param
   * Format param : date type YYYY-MM-DD
   * Return boolean
  */
  static async selectedDateIsValid(date, idUser, status_id) {
    return fetch(this.url)
      .then((res) => {
        return res.json();
      })
      .then((leaves) => {
        //Filtre par uilisateur et si le congé est validé
        const filteredLeaves = leaves.filter((leave) => leave.id_user === idUser && leave.status === status_id);

        //Vérifie que les dates
        const isDateValid = filteredLeaves.map((leave) => {
          
          const startDate = new Date(leave.start_date);
          const endDate = new Date(leave.end_date);
          const checkDate = new Date(date);
          
          return !(startDate <= checkDate && checkDate <= endDate || startDate === checkDate || endDate === checkDate);
        });

        // Retourne true si la date est libre et false si la date est déjà prise
        const response = isDateValid.includes(false) ? false : true;
        return response;
      })
      .catch((e) => {
        console.log("Impossible savoir si la date est valide", e);
      });
  }

    /**
   * Vérifie si un congé existe déjà entre les deux dates sélectionnées
   * Format param : date type YYYY-MM-DD
   * Return boolean
  */
    static async coupleOfDatesIsValid(startedDate, arrivalDate, idUser, status_id) {
      return fetch(this.url)
        .then((res) => {
          return res.json();
        })
        .then((leaves) => {
          //Filtre par uilisateur et si le congé est validé
          const filteredLeaves = leaves.filter((leave) => leave.id_user === idUser && leave.status === status_id);
  
          //Vérifie que les dates
          const isDateValid = filteredLeaves.map((leave) => {
            
            const startDate = new Date(leave.start_date);
            const endDate = new Date(leave.end_date);
            const checkDateDeparture = new Date(startedDate);
            const checkDateArrival = new Date(arrivalDate);
            
            return !((checkDateDeparture <= startDate && startDate <= checkDateArrival) || (checkDateDeparture <= endDate && endDate <= checkDateArrival));
          });
  
          // Retourne true si la date est libre et false si la date est déjà prise
          const response = isDateValid.includes(false) ? false : true;
          return response;
        })
        .catch((e) => {
          console.log("Impossible savoir si la date est valide", e);
        });
    }
}
