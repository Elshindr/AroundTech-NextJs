export default class userServiceMis {


	static url = `${process.env.NEXT_PUBLIC_APP_URL}/api/user/`;

	static async loadUsers() {
		return fetch(this.url)
			.then(res => {
				return res.json();
			})
			.then(us => {
				return us;
			})
			.catch(error => {
				console.error("Erreur dans loadUser", error);
			});
	}
	

	static async loadOneUser(id) {

		let url1 = this.url + id;
		return fetch(url1)
			.then(res => {
				return res.json();
			})
			.then(us => {
				return us[0];
			})
			.catch(error => {
				console.error("Erreur dans loadOneUser", error);
			});
	}

	static async loadManagerUser(id) {

		let url1 = this.url + id;

		return fetch(url1)
			.then(res => {
				return res.json();
			})
			.then(us => {

				//console.log(`us manager ====> `, us[0])
				return us[0];
			})
			.catch(error => {
				console.error("Erreur dans loadOneUser", error);
			});
	}

	static async addUSER(lastname, firstname, email, password, id_role) {


		return fetch(this.url+ id,
			{
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				method: "POST",
				body: JSON.stringify({ "lastname": lastname, "firstname": firstname, "email": email, "password": password, "id_role": id_role }),
			})
			.then((res) => {

				console.log(`addUSER is okay`, res);
				return res;
			})
			.catch(error => {
				console.log(`Error dans addCard`, error);
				return false;
			});
	}

	static async deleteUSER(id) {
		return fetch(this.url + id,
			{
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				method: "DELETE",

			})
			.then(res => {
				console.log(`deleteUSER is okay`, res);
				return true;
			})
			.catch(error => {
				console.log(`Error dans deleteUSER`, error);
				return false;
			});
	}
}