"use client"
import React from 'react'
import User from '@/components/user/user'
import userService from '@/services/userService'

import { useState, useEffect } from 'react';

const GetUser = () => {

  const [listeUser, setUser] = useState([]);

  useEffect(() => {
      (async () => {
          const data = await userService.loadUsers();
          setUser(data);
          //console.log(listeUser)
      })();
  }, []);


  return (
    <div>
       <User listeUser={listeUser} />
    </div>
   
  )
}

export default GetUser;