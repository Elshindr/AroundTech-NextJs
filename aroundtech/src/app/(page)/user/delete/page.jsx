import React from 'react'
import DeleteForm from '@/components/user/delete/DeleteForm';

const deleteUser = ({params}) => {
  return (
    <div className="row">
      <h1 className="text-center my-4">Suppression  Collaborateur</h1>
      <DeleteForm id={params.id}/>
    </div>
  )
}

export default deleteUser