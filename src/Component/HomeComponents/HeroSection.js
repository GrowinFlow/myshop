import React from 'react'
import SliderGallery from './SliderGallery'
import Logo from '../Logo'
import GlassCard from '../Common/GlassCard'
import Button from '../Common/Button'
import { Link } from 'react-router-dom'


function HeroSection() {
  return (
    <>
      <GlassCard styleClass="grid lg:grid-cols-2 grid-cols-1 gap-4 justify-center items-center">

        <div className='themeGlassBg rounded-xl p-4 h-full w-full flex flex-col justify-between'>
          <b className=' text-4xl flex themeSpeText font-semibold my-2'>Welcome on &nbsp;&nbsp; <Logo style="text-black dark:text-white" /></b>
          <p className='my-4 text-sm md:text-sm lg:text-lg '> Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae similique quae, laborum vitae qui repudiandae blanditiis dignissimos illo iusto possimus explicabo excepturi labore fuga quasi quam assumenda, earum corporis eos quis laudantium repellendus quod voluptate iure incidunt. Labore officia minus nesciunt earum quod vitae ipsam sed odit beatae eos blanditiis, libero quibusdam quaerat.  Ullam exercitationem laboriosam laborum cum, corporis nesciunt quae blanditiis nam molestiae omnis, facere earum! Vitae minus consectetur eos reiciendis, ipsum fugiat sint obcaecati quia eveniet distinctio magni laborum adipisci deserunt laboriosam quaerat expedita perferendis aspernatur exercitationem doloribus architecto voluptas nostrum esse quod? Possimus suscipit quisquam architecto quos.</p>
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