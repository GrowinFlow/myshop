import React from 'react'
import { Link } from 'react-router-dom'




function ProductBox(props) {
    let img = "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
  return (
    <>
<Link to={props.link}>
      <div className='itemBox h-44 rounded-xl overflow-hidden group shadow-xl dark:shadow-2xl'>
        <div className='imgBox h-32 rounded-t-lg overflow-hidden bg-cover bg-center z-20'>
            <img src={img || props.img} alt="img" className='object-fit group-hover:scale-125 trans-ani'/>

            
        </div>


        <div className="z-10 h-12 rounded-b-xl themeGlassBg p-4 backdrop-blur-sm shadow-xl dark:shadow-2xl themetext color-ani flex items-center justify-between">
            <p className="title text-sm md:text-md">{props.title || "I'm product"}</p>
            <span className="price text-[10px] md:text-xs"> <b className='themeSpeText'>$</b>{props.price || "price"} </span>

        </div>

    </div>
</Link>
    
    </>
  )
}

export default ProductBox