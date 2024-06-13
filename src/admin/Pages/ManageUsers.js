import React from 'react'
import GlassCard from '../../Common/Components/GlassCard'
import WelcomeCard from '../Component/PreComonents/WelcomeCard'
import UsersControlCard from '../Component/ManageUsersComponents/UsersControlCard'

function ManageUsers() {
  return (
    <>

      <div className="container mx-auto min-h-[75vh] px-4 h-auto flex flex-col  gap-4">
        <WelcomeCard data="Add Clients/ Managers/ Admins" />
        <UsersControlCard />
      </div>
    </>
  )
}

export default ManageUsers