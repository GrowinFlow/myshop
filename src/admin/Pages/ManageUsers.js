import React from 'react'
import UsersControlCard from '../Component/ManageUsersComponents/UsersControlCard'
import { TotalUsersProvider } from '../../lib/context/admin/TotalUsersContext'

function ManageUsers() {
  return (
    <>
<TotalUsersProvider>
      <div className="container mx-auto px-4 flex  overflow-x-hidden overflow-y-auto flex-col  gap-4 ">
    
   
        <UsersControlCard />
      </div>
</TotalUsersProvider>
    </>
  )
}

export default ManageUsers