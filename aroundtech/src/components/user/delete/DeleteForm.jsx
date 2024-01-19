"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import userService from '@/services/userService';
import { useRouter } from "next/navigation";



const DeleteUser =  (props) => {
 
	const router = useRouter();
 const [user, setUser] = useState([]);


 console.log(props)

 useEffect(() => {
	(async () => {
	    const dataUser = await userService.loadOneUser(props.id);
	    setUser(dataUser);
	 
	    
	})();
 }, []);


 

	const handleDelete = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch('/api/user/' + props.id , {
			  method: 'DELETE',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			
			});
		 
			if (response.status === 200) {
			  // Les données ont été insérées avec succès
			  setUpdateSuccess(true); 
   
			  router.push('/user');
		   
			  console.log("yes");
			  // Vous pouvez réinitialiser le formulaire ou afficher un message de réussite.
			} else {
			  // Gérer les erreurs ici
			  console.error('Erreur lors de la requête put');
			}
		   } catch (error) {
			console.error('Erreur lors de la requête put :', error);
		   }
	}
   

 

   
	
	return (
		<div>
	
		    
		  <Button className="btn-modal-success mx-3" type="submit" onClick={handleDelete} >
			 Supprimer
		    </Button>
		   
		
		</div>

	);
   }
   
   export default DeleteUser
