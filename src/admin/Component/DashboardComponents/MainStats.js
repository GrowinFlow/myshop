import React, { useContext, useEffect, useState } from 'react'
import GlassCard from '../../../Common/Components/GlassCard'
import { FaCartPlus, FaMoneyBill, FaUserAstronaut, FaUserCog, FaTags } from 'react-icons/fa'
import { FaBoxesStacked, FaUsers } from 'react-icons/fa6'
import StatsBox from './PreComponents/StatsBox'
import { GetDataContext } from '../../../lib/context/GetDataContext'




function MainStats() {
  const {products, users} = useContext(GetDataContext)
  
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalManagers, setTotalManagers] = useState()
  const [totalUsers, setTotalUsers] = useState()
  const [totalAdmins, setTotalAdmins] = useState()

  useEffect(() => {
    if (users && users.length > 0) {
      const roleCounts = users.reduce((counts, user) => {
        counts[user.roles] = (counts[user.roles] || 0) + 1;
        return counts;
      }, {});
  
      setTotalUsers(roleCounts["client"] || 0);
      setTotalManagers(roleCounts["manager"] || 0);
      setTotalAdmins(roleCounts["admin"] || 0);

      setTotalProducts(products.length);
    }
  }, [users]);


  // const [totalSelling, setTotalSelling] = useState(products.length)
  // const [totalOffers, setTotalOffers] = useState(products.length)

  return (

    <GlassCard styleClass="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 justify-center gap-4">
     
<StatsBox heading="Admins" icon={<FaUserAstronaut/>} data={totalAdmins} />
<StatsBox heading="Manager" icon={<FaUserCog/>} data={totalManagers} />
<StatsBox heading="Users" icon={<FaUsers/>} data={totalUsers} />
<StatsBox heading="Sells" icon={<FaMoneyBill/>} data={""} />
<StatsBox heading="Products" icon={<FaBoxesStacked/>} data={totalProducts} />
<StatsBox heading="Offers" icon={<FaTags/>} data={""} />


    </GlassCard>
    
  )
}

export default MainStats