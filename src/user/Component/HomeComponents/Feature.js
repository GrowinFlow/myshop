import React from 'react'
import GlassCard from '../../../Common/Components/GlassCard'
import Timer from '../../../Common/Components/Timer'
import ProductBox from '../../../Common/Components/ProductBox'


function Feature() {
  return (
    <>
    <GlassCard>
        <Timer days={2} hours={4}/>
        <div className="hr border-black dark:border-white"></div>
       
       <ul className='my-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4'>
        <ProductBox link="/" title="Shoe" price="189"/>
        <ProductBox link="/" title="Shoe" price="189"/>
        <ProductBox link="/" title="Shoe" price="189"/>
        <ProductBox />
        <ProductBox />
        <ProductBox />

       </ul>

    </GlassCard>
    
    </>
  )
}

export default Feature