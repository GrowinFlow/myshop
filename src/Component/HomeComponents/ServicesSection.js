import React from 'react'
import { FaCircleCheck, FaLock, FaRotate, FaShieldHalved, FaTag, FaTruckFast } from 'react-icons/fa6'
import GlassCard from '../Common/GlassCard'


function ServicesSection() {
  return (
    <>
    <GlassCard>

<ul className='flex justify-center lg:justify-between items-center text-xs md:text-sm flex-wrap gap-3'>

    
<li className='flex justify-center items-center gap-2'>
<FaShieldHalved className='text-sm md:text-lg text-purple-700 dark:text-purple-400' />
Safe Payments
</li>
<li className='flex justify-center items-center gap-2'>
<FaTruckFast className='text-sm md:text-lg text-teal-700 dark:text-teal-400' />
Nationwide Delivery
</li>

<li className='flex justify-center items-center gap-2'>
<FaRotate className='text-sm md:text-lg text-blue-700 dark:text-blue-400' />
Free & Easy Returns
</li>
<li className='flex justify-center items-center gap-2'>
<FaTag className='text-sm md:text-lg text-rose-700 dark:text-rose-500' />
Best Price Guaranteed
</li>
<li className='flex justify-center items-center gap-2'>
<FaLock className='text-sm md:text-lg text-gray-700 dark:text-gray-400' />
100% Authentic Products
</li>

  
</ul>
    </GlassCard>

    </>
  )
}

export default ServicesSection