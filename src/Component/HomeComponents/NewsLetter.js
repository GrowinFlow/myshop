import React from 'react'
import GlassCard from '../Common/GlassCard'
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa'
import Button from '../Common/Button'


function NewsLetter() {
  return (
    <>
    <GlassCard>
        <div className="h-4"></div>
        <div className="h-20 bg-[url(https://img.freepik.com/free-psd/shopping-vertical-background_23-2150409469.jpg?t=st=1717767258~exp=1717770858~hmac=6cdb459c05f7d14961ad09cb7baa3c94e26958e8dea4eca08a0fb4f8e3c66252&w=360)] bg-cover bg-fixed rounded-xl flex justify-center items-center px-4">


        <form class="w-full mx-auto flex justify-between items-center gap-4">  

        <div className="content  overflow-hidden text-ellipsis w-1/2 hidden md:inline-block ">
    <label for="default-search" class="mb-2 text-gray-900  dark:text-white text-xl lg:text-3xl font-bold">Newsletter</label>
    <p className='text-xs w-full overflow-hidden text-ellipsis text-wrap'>Stay updated with our e-commerce trends, exclusive offers, and the latest product arrivals. Subscribe to our newsletter today!</p>
        </div>
    <div class="relative flex gap-2 themeGlassBg rounded-xl items-center h-16 px-4 w-full md:w-2/3">

        <div class="absolute inset-y-0 start-0 flex items-center ps-3 ml-3 pointer-events-none">
            <FaEnvelope />
        </div>
        <input type="email" id="default-search" class="block w-full p-2 ps-10 text-sm bg rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent" placeholder="Subscribe for updates and offers. . ." required />
        
        <Button text={(<FaPaperPlane />)} type="submit"/>
    </div>
</form>

        </div>
        <div className="h-4"></div>


    </GlassCard>
    </>
  )
}

export default NewsLetter