import React, { useContext, useEffect, useState } from 'react'
import GlassCard from '../../../Common/Components/GlassCard'
import { FaMoneyBill, FaUserAstronaut, FaUserCog, FaTags } from 'react-icons/fa'
import { FaBoxesStacked, FaUsers } from 'react-icons/fa6'
import StatsBox from './PreComponents/StatsBox'
import { LengthContext } from '../../../lib/context/admin/LengthContext'



function MainStats() {
  const {lengths, isLoading, error} = useContext(LengthContext)
  // Inside LengthProvider useEffect
useEffect(() => {
  const fetchLengths = async () => {
    try {
      console.log('Fetched lengths:', lengths); // Check what's being fetched
    } catch (error) {
      console.error("Error fetching lengths:", error);
    }
  };

  fetchLengths();
}, []);



  // const [totalSelling, setTotalSelling] = useState(products.length)
  // const [totalOffers, setTotalOffers] = useState(products.length)

  return (

    <GlassCard styleClass="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 justify-center gap-4">
      <>
        <StatsBox heading="Admins" icon={<FaUserAstronaut />} data={lengths.admins || 0} error={error} loading={isLoading} />
        <StatsBox heading="Manager" icon={<FaUserCog />} data={lengths.managers || 0} error={error} loading={isLoading} />
        <StatsBox heading="Users" icon={<FaUsers />} data={lengths.users || 0} error={error} loading={isLoading} />
        <StatsBox heading="Sells" icon={<FaMoneyBill />} data={0} error={error} loading={isLoading} />
        <StatsBox heading="Products" icon={<FaBoxesStacked />} data={lengths.products || 0} error={error} loading={isLoading} />
        <StatsBox heading="Offers" icon={<FaTags />} data={0} error={error} loading={isLoading} />
      </>
  
  </GlassCard>
    
  )
}

export default MainStats