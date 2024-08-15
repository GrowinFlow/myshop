import React from 'react'
import DbStats from './DbStats'
import UserStats from './UserStats'
import PageTitle from '../../Common/PageTitle'

// DashboardContext, DashboardProvider
function DashBoard() {
  PageTitle("Dashboard")

  return (
  
<> 

<div className="flex flex-col gap-3">
    <DbStats />
    <UserStats />
</div>

</>
    
  )
}

export default DashBoard