import Adminlayout from '@/src/layouts/Adminlayout'
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'

const index = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve user data from cookie
    const storedUserData = Cookies.get("token");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);
  return (
  <Adminlayout>
   {userData && (
        <div>
          <h2>User Data</h2>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
  </Adminlayout>
  )
}

export default index

