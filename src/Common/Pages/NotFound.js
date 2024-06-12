import React from 'react'
import GlassCard from '../Components/GlassCard'
import Button from '../Components/Button'
import { FaArrowLeft } from 'react-icons/fa'

function NotFound() {
  return (
    <>
       <div className="container mx-auto min-h-[75vh] px-4 h-auto flex flex-col  gap-4">
        <GlassCard>
            <div className="themeGlassBg rounded-xl p-4">
            <div className="404 flex flex-col gap-2 items-center">
                <bc className="text-[10rem]">4<span className='themeSpeText'>0</span>4</bc>
                <span>Page Not Found</span>
            </div>
            <Button link="/" icon={FaArrowLeft} styleClass="justify-center gap-2 items-center" text="Go To Home" order="order-1" />

        
            </div>
        </GlassCard>
</div>
    
    </>
  )
}

export default NotFound