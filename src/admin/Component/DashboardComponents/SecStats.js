import React from 'react'
import GlassCard from '../../../Common/Components/GlassCard'
import { FaCartPlus } from 'react-icons/fa'
import { FaCartArrowDown, FaCartFlatbed } from 'react-icons/fa6'
import StatsBox from './PreComponents/StatsBox'



function SecStats() {
    return (

        <GlassCard styleClass="grid grid-rows-2 grid-cols-2 lg:grid-cols-4 lg:grid-rows-1 justify-center gap-4">

            <StatsBox heading="Complete Orders" icon={<FaCartFlatbed />} data={""} />
            <StatsBox heading="Pending Orders" icon={<FaCartPlus />} data={""} />
            <StatsBox heading="Cancel Orders" icon={<FaCartArrowDown />} data={""} />
            <StatsBox heading="Total Orders" icon={<FaCartFlatbed />} data={""} />

        </GlassCard>

    )
}

export default SecStats