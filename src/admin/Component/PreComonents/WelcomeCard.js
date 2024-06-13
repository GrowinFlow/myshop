import React from 'react'
import GlassCard from '../../../Common/Components/GlassCard'

function WelcomeCard(props) {
  return (
    <>
<GlassCard>
  <div className="themeGlassBg rounded-xl p-4 themeText">
    <div className="heading  text-xl  flex justify-center items-center">
      <span className='ThemeText'>{props.text}</span>
      <span className='themeSpeText font-bold'>{props.data}</span>
    </div>
  </div>

  
</GlassCard>
</>
  )
}

export default WelcomeCard