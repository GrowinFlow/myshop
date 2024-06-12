import React from 'react'
import MainStats from '../Component/DashboardComponents/MainStats'
import SecStats from '../Component/DashboardComponents/SecStats'
import GlassCard from '../../Common/Components/GlassCard'


function Dashbord() {
  return (
    <>
   <div className="container mx-auto min-h-[75vh] px-4 h-auto flex flex-col  gap-4">
<GlassCard>
  <div className="themeGlassBg rounded-xl p-2 text-xl font-bold">
    Welcome  <span className='themeSpeText'>{"User"}!</span>
  </div>
</GlassCard>
<MainStats />
<SecStats />
    </div>
    
    
    
    
    </>
  )
}

export default Dashbord