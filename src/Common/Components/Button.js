import React from 'react'

function Button(props) {
  return (
    <>
     <button 
     type={props.type} 
     class={` flex  my-6 focus:outline-none text-white bg-orange-700 dark:bg-orange-400 focus:ring-2 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900 ${props.styleClass}`}>
      {props.text}
      {props.icon || ""}
      </button>
    </>
  )
}

export default Button