import React from 'react'
import GlassCard from '../../Common/Components/GlassCard'
import WelcomeCard from '../Component/PreComonents/WelcomeCard'
import UsersControlCard from '../Component/ManageUsersComponents/UsersControlCard'
import Footer from '../../Common/Layout/Footer'

function ManageUsers() {
  return (
    <>

      <div className="container mx-auto h-[100vh] px-4 flex flex-col  gap-4">
        <WelcomeCard data="Add Clients/ Managers/ Admins" />
        <UsersControlCard />
        <Footer/>
      </div>
    </>
  )
}

export default ManageUsers