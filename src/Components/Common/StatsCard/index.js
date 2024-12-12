import React from 'react'
import { FaArrowRotateRight } from 'react-icons/fa6'


function StatsCard({index, children, heading, headingClasses, refreshOnClick, refreshClasses, contentStyle }) {
    return (
        <div className='themeGlassBg rounded-xl p-4 flex flex-col' index={index}>
            <div className={`header flex justify-between items-center px-2 ${headingClasses}`}>
                <span className="heading themeSpeText font-medium text-ellipsis overflow-hidden w-[80%]">{heading || "heading"}</span>
                <span className={`refresh cursor-pointer active:animate-spin ${refreshClasses}`}><FaArrowRotateRight onClick={refreshOnClick || (() => { })} /></span>
            </div>
            <span className='h-1 bg my-1 rounded-md'></span>
            <div className={`${contentStyle}`}>

                {children}
            </div>
        </div>
    )
}

export default StatsCard