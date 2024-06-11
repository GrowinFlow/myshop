import React from 'react'
import SliderGallery from './SliderGallery'
import Logo from '../../../Common/Components/Logo'
import GlassCard from '../../../Common/Components/GlassCard'
import Button from '../../../Common/Components/Button'
import { Link } from 'react-router-dom'


function HeroSection() {
  return (
    <>
      <GlassCard styleClass="grid lg:grid-cols-2 grid-cols-1 gap-4 justify-center items-center">

        <div className='themeGlassBg rounded-xl p-4 h-full w-full flex flex-col justify-between'>
          <b className=' text-4xl flex themeSpeText font-semibold my-2'>Welcome on &nbsp;&nbsp; <Logo style="text-black dark:text-white" /></b>
          <p className='my-4 text-sm md:text-md '> Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae similique quae, laborum vitae qui repudiandae blanditiis dignissimos illo iusto possimus explicabo  laborum cum, corporis nesciunt quae blanditiis nam molestiae omnis, facere earum! Vitae minus consectetur eos reiciendis, ipsum fugiat sint obcaecati quia eveniet distinctio magni laborum adipisci deserunt laboriosam.</p>
          <Link to='/shop'>
            <Button text="Shop now" type="button" />
          </Link>

        </div>


        <SliderGallery />
      </GlassCard>
    </>
  )
}

export default HeroSection