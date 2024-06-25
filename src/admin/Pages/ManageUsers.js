import React from 'react'
import UsersControlCard from '../Component/ManageUsersComponents/UsersControlCard'
import Footer from '../../Common/Layout/Footer'
import { TotalUsersProvider } from '../../lib/context/admin/TotalUsersContext'

function ManageUsers() {
  return (
    <>
<TotalUsersProvider>
      <div className="container mx-auto px-4 flex flex-col  gap-4 ">
    
   
        <UsersControlCard />
        <Footer/>
      </div>
</TotalUsersProvider>
    </>
  )
}

export default ManageUsers