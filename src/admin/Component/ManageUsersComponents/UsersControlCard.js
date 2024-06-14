import React from 'react'
import GlassCard from '../../../Common/Components/GlassCard'
import UsersDetailsForm from '../PreComonents/UsersDetailsForm'
import UsersPrevCards from './UsersPrevCards'

function UsersControlCard() {
  return (
    <>
    
    <GlassCard>
  <div className=" grid grid-cols-1 md:grid-cols-2 gap-4  h-[735px] overflow-hidden">
    


    {/* form  */}
<div className="form ">
    <UsersDetailsForm/>
</div>



{/* preview */}
<div className="prev">
<UsersPrevCards />
</div>







  </div>
</GlassCard>
    </>
  )
}

export default UsersControlCard