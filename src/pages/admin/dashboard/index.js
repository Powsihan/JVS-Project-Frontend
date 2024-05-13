import Adminlayout from '@/src/layouts/Adminlayout'
import React from 'react'
import Cookies from "js-cookie";
const index = () => {
  const session = Cookies.get("token", { path: "/" });
    console.log(session,"session");
  return (
  <Adminlayout>
    Dashboard

  </Adminlayout>
  )
}

export default index

