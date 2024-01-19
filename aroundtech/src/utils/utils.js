import { isWeekend, addDays } from "date-fns";
import Holidays from "date-holidays";

export default class Utils {
  /**
   * Formater la date donnée inputDate  en "JJ/MM/YYYY"
   * @param {date timestamp} inputDate
   * @returns {string}
   */
  static formatDateTimestampToStr(inputDate) {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }

  /**
   * Formater la date str donnée inputDate  en timestamp
   * @param {string} inputDate
   * @returns {date timestamp}
   */
  static formatDateStrToTimestamp(inputDate) {
    return new Date(inputDate).toISOString().slice(0, 19).replace("T", " ");
  }

  /**
   * Formater les dates au format ISO
   */
  static formatDateToISO(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  /**
   * Formater le montant donné inputAmount avec 2 chiffres apres la virgule
   * @param {float} inputAmount
   * @returns {string}
   */
  static formatAmount(inputAmount) {
    return inputAmount.toFixed(2);
  }

  /**
   * Modifier la première lettre du nom en majuscule
   * @param {string} - chaine de caractère à modifier
   * @returns {string} - chaine de caractère avec la première lettre en majuscule
   */
  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * Calcul de la prime selon le nombre de jour travaillés et la nature de mission
   * @returns {string}
   */
  static getPrime(mission, nature) {
    const nbWorkingDays = Utils.getNbWorkingDate(mission);
    let prime = Utils.setPrime(nbWorkingDays, nature);

    return prime;
  }

  /**
   * Get the number of worked day in one mission
   * @param {*} mission
   * @returns {int}
   */
  static getNbWorkingDate(mission) {
    let nbWorkingDays = 0;
    let curDate = new Date(mission.start_date);
    let endDate = new Date(mission.end_date);

    while (curDate <= endDate) {
      if (Utils.isWorkingDay(curDate)) {
        nbWorkingDays++;
      }
      curDate = addDays(curDate, 1);
    }

    return nbWorkingDays;
  }

  /**
   * Check si le jour donné est un jour travaillé
   * Sinon weekend ou vacances
   * @returns {boolean}
   */
  static isWorkingDay(date) {
    if (isWeekend(date) || Utils.isHoliday(date)) {
      return false;
    }

    // jour travaillé
    return true;
  }

  /**
   * Check si le jour donné est un jour férié en france
   * @returns {boolean}
   */
  static isHoliday(date) {
    const year = date.getFullYear();
    const holidays = new Holidays("FR");
    const lstHolidaysFr = holidays.getHolidays(year);

    for (const holiday of lstHolidaysFr) {
      let dateHolidays = new Date(holiday.date);
      if (
        dateHolidays.getDate() === date.getDate() &&
        dateHolidays.getMonth() === date.getMonth()
      ) {
        return true;
      }
    }

    return false;
  }

  /**
   * List oh holidays in France
   * @returns {array}
   */
  static listOfHoliday(date) {
    const year = date.getFullYear();
    const holidays = new Holidays("FR");
    const lstHolidaysFr = holidays.getHolidays(year);

    return lstHolidaysFr;
  }

  /**
   * Calcul the prime return the amount in formated string like 0.00
   * @param {int} nbWorkDays
   * @param {NatureMission} nature
   * @returns {string}
   */
  static setPrime(nbWorkDays, nature) {

    if (nature.is_bonus && nature.is_charge) {
      return parseFloat(nbWorkDays * nature.tjm * nature.percentage /100 ).toFixed(2);
    }

    return 0;
  }
}
