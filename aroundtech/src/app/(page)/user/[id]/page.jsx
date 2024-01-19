
import React from 'react'
import User from '@/components/user/user'
import userService from '@/services/userService'
import UserPage from '@/components/user/[id]/UserPage'
import UpdateForm from '@/components/user/updateForm/UpdateForm'

const  GetUserPage = ({params}) => {
 
      


  return(
    <>
    <div>
      <UpdateForm id={params.id} />
    </div>
    </>
    
  )

 
}

export default GetUserPage;
