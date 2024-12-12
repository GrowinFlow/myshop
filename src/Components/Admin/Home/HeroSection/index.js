import React from 'react'
import img from '../../../../assets/images/two-cheerful-girls-sweaters-.png'
function HeroSection() {
  return (
    <>
    <div className="themeGlassBg rounded-xl p-2 grid grid-cols-2 w-full grid-rows-1">
        <div className="s">
           left side
        </div>
        <div className="s flex justify-center items-center">
         <div className="iimg h-[700px]">
            <img src={img} alt="img"  className='h-full'/>
         </div>
        </div>
    </div>
    </>
  )
}

export default HeroSection