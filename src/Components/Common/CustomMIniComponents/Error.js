import React from 'react'
import { FaCircleExclamation } from 'react-icons/fa6'

function Error({children}) {
  return (
    <div className='text-red-600 flex items-center gap-2 text-lg'><FaCircleExclamation />
    {children}</div>
  )
}

export default Error