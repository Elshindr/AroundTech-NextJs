import React from 'react'
import UserForm from '@/components/user/add/UserForm';

const newUser = () => {
  return (
    <div className="row">
      <h1>Ajout Collaborateur</h1>
      <UserForm />
    </div>
  )
}

export default newUser