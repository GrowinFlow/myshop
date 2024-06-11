import React from 'react'
import { FaIcons } from 'react-icons/fa'
import { Link } from 'react-router-dom'


function StatsBox(props) {
  return (
    <>
    <Link to={props.link || "/"}>
    <div className={`themeGlassBg rounded-xl flex flex-col gap-2 justify-center items-center h-20 ${props.styleClass}`}>
          <span className="text-2xl font-bold themeSpeText">{props.data || 0}</span>
            <div className="heading flex justify-center items-center gap-2 themeText">
               {props.heading || "heading"}{props.icon || <FaIcons/>}
                </div> 
        </div>
    </Link>
    
    </>
  )
}

export default StatsBox