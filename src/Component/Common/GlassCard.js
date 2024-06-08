import React from 'react'

function GlassCard({styleClass, children}) {
  return (
    <>
    <div className={`card rounded-xl themeCard p-4 backdrop-blur-md shadow-xl dark:shadow-2xl text-black dark:text-white color-ani ${styleClass}`}>{children}</div>
    </>
  )
}

export default GlassCard