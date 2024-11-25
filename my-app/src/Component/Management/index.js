import React from 'react'
import Management from './management'
import ManagementSide from './management_side'
import { Outlet } from 'react-router-dom'

function index() {
  return (
    <div className="flex">
            {/* Sidebar for Management */}
            <ManagementSide />
            {/* Content Area */}
            <div className="flex-1 p-1 bg-[#1e1e1e]">
                <Outlet />
            </div>
        </div>
  )
}

export default index
