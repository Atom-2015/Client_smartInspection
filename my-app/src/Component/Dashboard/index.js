import React from 'react'
import Dashboard from './dashboard'
import BarChart from './Barchart'
import DoughnutChart from './donatchart'

function index() {
  
  return (
    <div>
      <Dashboard/>
      {/* <BarChart/> */}
      <DoughnutChart/>
    </div>
  )
}

export default index
