import React from 'react'
import HeroSection from '../Component/HomeComponents/HeroSection'
import ServicesSection from '../Component/HomeComponents/ServicesSection'
import Feature from '../Component/HomeComponents/Feature'
import NewsLetter from '../Component/HomeComponents/NewsLetter'
import Testimonial from '../Component/HomeComponents/Testimonial'


function Home() {
  return (
    <>
    <div className="container mx-auto px-4 h-auto flex flex-col  justify-center gap-4">

     <HeroSection/>
     <ServicesSection/>
     <Feature />
     <NewsLetter />
     <Testimonial />


    </div>
    </>
  )
}

export default Home