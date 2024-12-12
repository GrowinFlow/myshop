import React, { useContext, useState } from 'react'
import MainStats from '../Component/DashboardComponents/MainStats'
import SecStats from '../Component/DashboardComponents/SecStats'
import { AuthContext } from '../../lib/context/Auth'
import WelcomeCard from '../Component/PreComonents/WelcomeCard'

import { LengthProvider } from '../../lib/context/admin/LengthContext'



function Dashbord() {

  const { user } = useContext(AuthContext)

  const [useName, setUserName] = useState(user.username)
  return (
    <>
    <LengthProvider>

      <div className="container mx-auto min-h-[81vh] px-4 h-auto flex flex-col  gap-4">


        <WelcomeCard text="Welcome &nbsp;" data={useName + "! -- "+ process.env.REACT_APP_BASE_URL} />
<b>{process.env.API_BASE_URL}</b>
        <MainStats />
        <SecStats />

      </div>
    </LengthProvider>
    </>
  )
}

export default Dashbord