import React from 'react'
import MainStats from '../Component/DashboardComponents/MainStats'
import SecStats from '../Component/DashboardComponents/SecStats'


function Dashbord() {
  return (
    <>
   <div className="container mx-auto min-h-[75vh] px-4 h-auto flex flex-col  gap-4">
<MainStats />
<SecStats />
    </div>
    
    
    
    
    </>
  )
}

export default Dashbord