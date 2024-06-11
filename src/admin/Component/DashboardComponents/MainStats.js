import React from 'react'
import GlassCard from '../../../Common/Components/GlassCard'
import { FaCartPlus, FaMoneyBill, FaUserAstronaut, FaUserCog, FaTags } from 'react-icons/fa'
import { FaBoxesStacked, FaUsers } from 'react-icons/fa6'
import StatsBox from './PreComponents/StatsBox'



function MainStats() {
  return (

    <GlassCard styleClass="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 justify-center gap-4">
     
<StatsBox heading="Admins" icon={<FaUserAstronaut/>} data={"33"} />
<StatsBox heading="Manager" icon={<FaUserCog/>} data={"3"} />
<StatsBox heading="Users" icon={<FaUsers/>} data={"15"} />
<StatsBox heading="Sells" icon={<FaMoneyBill/>} data={"86"} />
<StatsBox heading="Products" icon={<FaBoxesStacked/>} data={"21"} />
<StatsBox heading="Offers" icon={<FaTags/>} data={"25"} />


    </GlassCard>
    
  )
}

export default MainStats