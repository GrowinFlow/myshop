import React, { useContext, useState } from 'react'
import MainStats from '../Component/DashboardComponents/MainStats'
import SecStats from '../Component/DashboardComponents/SecStats'
import GlassCard from '../../Common/Components/GlassCard'
import { AuthContext } from '../../lib/context/Auth'
import WelcomeCard from '../Component/PreComonents/WelcomeCard'
import Footer from '../../Common/Layout/Footer'
function Dashbord() {

  const { user } = useContext(AuthContext)

  const [useName, setUserName] = useState(user.username)
  return (
    <>
      <div className="container mx-auto min-h-[75vh] px-4 h-auto flex flex-col  gap-4">


        <WelcomeCard text="Welcome &nbsp;" data={useName + "!"} />

        <MainStats />
        <SecStats />

        <Footer/>
      </div>
    </>
  )
}

export default Dashbord