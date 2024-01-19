"use client"
import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import roleService from '@/services/roleService';
import userService from '@/services/userService';
import { useRouter } from "next/navigation";
import '@/components/user/add/UserForm.css'



const UserForm = () => {
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [role, setRole] = useState([]);
  const [listeUser, setUser] = useState([]);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role_id:'',
    manager_id:'',
  });

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const roles = await roleService.loadRoles();
      setRole(roles)  
      const data = await userService.loadUsers();
          setUser(data);
      
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 // UserForm.js
const handleSubmit = async (e) => {
	e.preventDefault();
	try {
	  const response = await fetch('/api/user', {
	    method: 'POST',
	    headers: {
		 'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(formData),
	  });
   
	  if (response.status === 200) {
	    // Les données ont été insérées avec succès
      setUpdateSuccess(true); 
	
	    // Vous pouvez réinitialiser le formulaire ou afficher un message de réussite.
	  } else {
	    // Gérer les erreurs ici
	    console.error('Erreur lors de la requête POST');
	  }
	} catch (error) {
	  console.error('Erreur lors de la requête POST :', error);
	}
   };
   

  return (
    <div>
    {updateSuccess && (
      <div className="update-success-message">
        La mise à jour a été effectuée avec succès.
      </div>
    )}
    
       <Form onSubmit={handleSubmit}>
      
      <Form.Group controlId="firstname" className="d-flex mb-3">
          <Form.Label className="col-3">Prénom</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            placeholder="Prénom"
            value={formData.firstname}
            onChange={handleChange}
            required
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
            required
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
            required
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
            required
          />
        </Form.Group>
        <Form.Group
          controlId="role_id"
          className="d-flex mb-3"
          onChange={handleChange}
          required
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
            {role.length > 0 &&
              role.map((r) => {
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
          required
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
            { listeUser.map((user)=>{ if(user.role_id==2){return (
                  <option key={user.id} value={user.id}>
                    {user.firstname +" "+user.lastname}
                  </option>
                );}}) }

           
          </Form.Select>
        </Form.Group>
          
        <Button className="button_add" type="submit" onClick={() => router.push('/user')} >
            Valider
          </Button>
         
      </Form>
      </div>
  
  );
};

export default UserForm;
