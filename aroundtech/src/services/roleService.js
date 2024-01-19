export default class roleService {

	static url = `${process.env.NEXT_PUBLIC_APP_URL}/api/role`;

	static async loadRoles() {
	    return fetch(this.url)
		   .then(res => {
			  return res.json();
		   })
		   .then(us => {
			  return us;
		   })
		   .catch(error => {
			  console.error("Erreur dans loadRole", error);
		   });
	}

	
	}