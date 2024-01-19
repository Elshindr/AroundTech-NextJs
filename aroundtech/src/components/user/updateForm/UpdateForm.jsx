"use client"
import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import roleService from '@/services/roleService';
import userService from '@/services/userService';
import { useRouter } from "next/navigation";
import '@/components/user/updateForm/UpdateForm.css'


const UpdateForm =  (props) => {
 
	const router = useRouter();

 const [updateSuccess, setUpdateSuccess] = useState(false);
 const [user, setUser] = useState([]);
 const [roles, setRole]=useState([]);
 const [listeUser, setManagerUser] = useState([]);

 //console.log(props)

 useEffect(() => {
	(async () => {
	    const dataUser = await userService.loadOneUser(props.id);
	    setUser(dataUser);
	    const data = await userService.loadUsers();
	    setManagerUser(data);
	    const roles = await roleService.loadRoles();
	    setRole(roles)  
	 

	    
	})();
 }, []);
 const [formData, setFormData] = useState({
	id:props.id,
	firstname: '',
	lastname: '',
	email: '',
	password: '',
	role_id:'',
	manager_id:'',
   });
   //setFormData(props.id)
   const handleChange = (e) => {
	const { name, value } = e.target;
	setFormData({ ...formData, [name]: value });
   };
 

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
		  const response = await fetch('/api/user/', {
		    method: 'PUT',
		    headers: {
			 'Content-Type': 'application/json',
		    },
		    body: JSON.stringify(formData),
		  });
	   
		  if (response.status === 200) {
		    // Les données ont été insérées avec succès
		    setUpdateSuccess(true); 

		    router.push('/user');
		

		    // Vous pouvez réinitialiser le formulaire ou afficher un message de réussite.
		  } else {
		    // Gérer les erreurs ici
		    console.error('Erreur lors de la requête put');
		  }
		} catch (error) {
		  console.error('Erreur lors de la requête put :', error);
		}
	   };
   

 

   
	
	return (
		<div>
		{updateSuccess && (
		  <div className="update-success-message">
		    La mise à jour a été effectuée avec succès.
		  </div>
		)}
		<h1>Mettre a jour l'utilisateur : </h1>
		<Form onSubmit={handleSubmit}>
      
		<Form.Group controlId="firstname" className="d-flex mb-3">
		    <Form.Label className="col-3">Prénom</Form.Label>
		    <Form.Control
			 type="text"
			 name="firstname"
			 placeholder="Prénom"
			 defaultValue={user.firstname}
			 onChange={handleChange}
		    />
		  </Form.Group>
		<Form.Group controlId="lastname" className="d-flex mb-3">
		    <Form.Label className="col-3">Nom</Form.Label>
		    <Form.Control
			 type="text"
			 name="lastname"
			 placeholder="Nom"
			 defaultValue={user.lastname}
			 onChange={handleChange}
		    />
		  </Form.Group>
	    
		<Form.Group controlId="email" className="d-flex mb-3">
		    <Form.Label className="col-3">E-mail</Form.Label>
		    <Form.Control
			 type="email"
			 name="email"
			 placeholder="email@example.com"
			 defaultValue={user.email}
			 onChange={handleChange}
		    />
		  </Form.Group>
	   
		<Form.Group controlId="password" className="d-flex mb-3">
		    <Form.Label className="col-3">Mot de passe</Form.Label>
		    <Form.Control
			 type="password"
			 name="password"
			 placeholder="Mot de passe"
			 defaultValue=""
			 onChange={handleChange}
		    />
		  </Form.Group>
		  <Form.Group
		    controlId="role_id"
		    className="d-flex mb-3"
		    onChange={handleChange}
		  >
		    <Form.Label className="col-3">Role</Form.Label>
		    <Form.Select
			 aria-label="role"
			 name="role_id"
			 defaultValue=""
		    >
			 <option value="" disabled>
			  --- Selectionner un rôle --- 
			 </option>
			 {roles.length > 0 &&
			   roles.map((r) => {
				return (
				  <option key={r.id} value={r.id}>
				    {r.name}
				  </option>
				);
			   })}
		    </Form.Select>
		  </Form.Group>
		  <Form.Group
          controlId="manager_id"
          className="d-flex mb-3"
          onChange={handleChange}
        >
          <Form.Label className="col-3">Manager</Form.Label>
          <Form.Select
            aria-label="Manager"
            name="manager_id"
            defaultValue=""
          >
            <option value="" disabled>
             --- Selectionner un Manager --- 
            </option>
            { listeUser.map((us)=>{ if(us.role_id==2){return (
                  <option key={us.id} value={us.id}>
                    {us.firstname +" "+us.lastname}
                  </option>
                );}}) }

           
          </Form.Select>
        </Form.Group>
		    
		  <Button className="button_add" type="submit" onClick={handleSubmit} >
			 Mettre à jour
		    </Button>
		   
		</Form>
		</div>

	);
   }
   
   export default UpdateForm
