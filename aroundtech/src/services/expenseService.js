export default class ExpenseService {

    static url = `${process.env.NEXT_PUBLIC_APP_URL}/api/expense`;

    static async loadExpensesFromOneMission(idUser, idMission){

        let urlP= `${this.url}/${idUser}/${idMission}`;
        
        return fetch(urlP)
        .then(res => {
            return res.json();
        })
        .then(exp => {
            return exp;
        })
        .catch(error => {
            console.error("Erreur dans loadExpensesFromOneMission idMission =", idMission, error);
        });
    }

    static async loadAllExpensesForUser(idUser){

        let urlP= `${this.url}/${idUser}`;

        return fetch(urlP)
        .then(res => {
            return res.json();
        })
        .then(exp => {
            return exp;
        })
        .catch(error => {
            console.error("Erreur dans loadAllExpensesForUser, idUser = ", idUser, error);
        });
    }

    static async addExpense(date, idNatExp, amount, idMission, idUser){

        return fetch(`${this.url}/${idUser}/${idMission}`,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ "created_at": date, "amount": parseFloat(amount),  "mission_id": idMission, "nature_expense_id": idNatExp})
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

    static async deleteExpense(idUser, idMission, idExp) {

        return fetch(`${this.url}/${idUser}/${idMission}/${idExp}`,
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

    static async updateOneExpense(date, idNatExp, amount, idUser, idMission, idExp) {

        return fetch(`${this.url}/${idUser}/${idMission}/${idExp}`,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: "PUT",
                body: JSON.stringify({ "created_at": date, "amount": parseFloat(amount), "nature_expense_id": idNatExp})
            })
            .then(res => {
                return true;
            })
            .catch(error => {// TODO: Gestion affichage de l'erreur
                console.log(`Error dans updateExpense`, error);
                return false;
            });
    }

    static async updateDateExpenses(lstExpenses, idUser, idMission){

        const date_valid = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const ids = lstExpenses.map(exp => exp.id);

        return fetch(`${this.url}/${idUser}/${idMission}`,
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify({ "ids": ids,  "valid_at": date_valid})
        })
        .then(res => {
            return true;
        })
        .catch(error => {// TODO: Gestion affichage de l'erreur
            console.log(`Error dans updateExpense`, error);
            return false;
        });
    }

}
