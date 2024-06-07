import React from 'react'
import SliderGallery from '../Component/SliderGallery'
import Logo from '../Layout/PreComponents/Logo'

function Home() {
  return (
    <>
    <div className="container mx-auto px-4 h-auto flex flex-col  justify-center">
      <div className="card rounded-xl  border-2 border-gray-800 dark:border-gray-200 themeCard grid lg:grid-cols-2 grid-cols-1 gap-4 justify-center items-center p-4 backdrop-blur-md shadow-xl dark:shadow-2xl text-black dark:text-white color-ani">
     

      <p>
      <b className=' text-4xl flex themeSpeText font-semibold my-2'>Welcome on &nbsp;&nbsp; <Logo /></b>
       <article className='my-4'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae similique quae, laborum vitae qui repudiandae blanditiis dignissimos illo iusto possimus explicabo excepturi labore fuga quasi quam assumenda, earum corporis eos quis laudantium repellendus quod voluptate iure incidunt. Labore officia minus nesciunt earum quod vitae ipsam sed odit beatae eos blanditiis, libero quibusdam quaerat.  Ullam exercitationem laboriosam laborum cum, corporis nesciunt quae blanditiis nam molestiae omnis, facere earum! Vitae minus consectetur eos reiciendis, ipsum fugiat sint obcaecati quia eveniet distinctio magni laborum adipisci deserunt laboriosam quaerat expedita perferendis aspernatur exercitationem doloribus architecto voluptas nostrum esse quod? Possimus suscipit quisquam architecto quos.</article>
        <button type="button" class=" block  my-6 focus:outline-none text-white bg-orange-700 dark:bg-orange-400 focus:ring-2 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Shop now</button>

      </p>
      <SliderGallery />
      </div>
    </div>
    </>
  )
}

export default Home