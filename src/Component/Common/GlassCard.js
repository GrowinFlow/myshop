import React from 'react'

function GlassCard({styleClass, children}) {
  return (
    <>
    <div className={`card rounded-xl  border-2 border-gray-800 dark:border-gray-200 themeCard p-4 backdrop-blur-md shadow-xl dark:shadow-2xl text-black dark:text-white color-ani ${styleClass}`}>{children}</div>
    </>
  )
}

export default GlassCard