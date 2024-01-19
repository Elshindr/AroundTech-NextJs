"use client"
import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import roleService from '@/services/roleService';
import { useRouter } from "next/navigation";
import userServiceMis from '@/services/userService';



const UpdateForm = (props) => {
 


 const [user, setUser] = useState([]);
 const [roles, setRole]=useState([]);
 //console.log(props.id)

 useEffect(() => {
	(async () => {
	    const dataUser = await userService.loadOneUser(props.id);
	    setUser(dataUser);
	    const roles = await roleService.loadRoles();
	    setRole(roles)  
	    
	})();
 }, []);
 async function onUpdate(id) {
	try {
	  const response = await fetch(`/api/user/`+props.id, {
	    method: 'PUT',
	    headers: {
		 'Content-Type': 'application/json',
	    },
	    body: JSON.stringify({ "id": id,"lastname": lastname, "firstname": firstname, "email": email, "password": password, "role_id": role_id }),
	  });
   
	  if (response.status === 200) {
	    // Les données ont été mises à jour avec succès
	    // Vous pouvez effectuer une action appropriée ici
	  } else {
	    // Gérer les erreurs ici
	    console.error('Erreur lors de la requête PUT');
	  }
	} catch (error) {
	  console.error('Erreur lors de la requête PUT :', error);
	}
   }
   const [formData, setFormData] = useState({
	id:'',
	firstname: '',
	lastname: '',
	email: '',
	password: '',
	role_id:'',
   });


   
	const handleChange = (e) => {
	  const { name, value } = e.target;
	  setFormData({ ...formData, [name]: value });
	};
   
	const handleSubmit = (e) => {
	  e.preventDefault();
	  //console.log(formData)
	  onUpdate(formData);
	};
   
	return (
		<Form onSubmit={handleSubmit}>
      
		<Form.Group controlId="firstname" className="d-flex mb-3">
		    <Form.Label className="col-3">Prénom</Form.Label>
		    <Form.Control
			 type="text"
			 name="firstname"
			 placeholder="Prénom"
			 value={formData.firstname}
			 onChange={handleChange}
		    />
		  </Form.Group>
		<Form.Group controlId="lastname" className="d-flex mb-3">
		    <Form.Label className="col-3">Nom</Form.Label>
		    <Form.Control
			 type="text"
			 name="lastname"
			 placeholder="Nom"
			 value={formData.lastname}
			 onChange={handleChange}
		    />
		  </Form.Group>
	    
		<Form.Group controlId="email" className="d-flex mb-3">
		    <Form.Label className="col-3">E-mail</Form.Label>
		    <Form.Control
			 type="email"
			 name="email"
			 placeholder="email@example.com"
			 value={formData.email}
			 onChange={handleChange}
		    />
		  </Form.Group>
	   
		<Form.Group controlId="password" className="d-flex mb-3">
		    <Form.Label className="col-3">Mot de passe</Form.Label>
		    <Form.Control
			 type="password"
			 name="password"
			 placeholder="Mot de passe"
			 value={formData.password}
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
		    
		  <Button className="btn-modal-success mx-3" type="submit" onClick={() => router.push('/user')} >
			 Mettre à jour
		    </Button>
		   
		</Form>
	);
   }
   
   export default UpdateForm
