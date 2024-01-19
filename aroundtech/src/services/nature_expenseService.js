export default class NatureExpService {

    static url = `${process.env.NEXT_PUBLIC_APP_URL}/api/nature_expense`;

    static async loadNaturesExp() {
        return fetch(this.url)
            .then(res => {
                return res.json();
            })
            .then(nat => {
                return nat;
            })
            .catch(error => {
                console.error("Erreur dans loadNaturesExp", error);
            });
    }

    static async addNatExpense(natExpense, idUser){

        return fetch(`${this.url}/${idUser}`,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ "name": natExpense.name, "is_capped": natExpense.is_capped, "cap_max": natExpense.cap_max})
            })
            .then((res) => {
                if (res.status == 200){
                    return true;
                }

                throw new Error("add Expense" + res);
            })
            .catch(error => {// TODO: Gestion affichage de l'erreur
                console.log(`Error dans addExpense`, error);
                return false;
            });
    }


    static async updateNatExpense(natExpense, idUser){

        return fetch(`${this.url}/${idUser}/${natExpense.id}`,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method:"PUT",
                body: JSON.stringify({ "name": natExpense.name, "is_capped": natExpense.is_capped, "cap_max": natExpense.cap_max, "id":parseInt(natExpense.id)})
            })
            .then((res) => {
                if (res.status == 200){
                    return true;
                }

                throw new Error("edit natEXp" + res);
            })
            .catch(error => {// TODO: Gestion affichage de l'erreur
                console.log(`Error dans updateNatExpense`, error);
                return false;
            });
    }

    static async deleteNatExpense(idNatExp, idUser) {

        return fetch(`${this.url}/${idUser}/${idNatExp}`,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: "DELETE",

            })
            .then(res => {
                return true;
            })
            .catch(error => {// TODO: Gestion affichage de l'erreur
                console.log(`Error dans deleteExpense`, error);
                return false;
            });
    }
}
