import React from 'react'

function Invoice() {
  return (
     
    <div className="bg-[#1e1e1e] border shadow-lg rounded-lg p-6 ">
    <h2 className="text-xl font-semibold mb-4 text-white">Invoices</h2>
    <p className="text-white">
        This is an overview of invoices associated with this inspection. Check your email for individual invoices.
    </p>
    <div className="bg-blue-100 text-blue-700 p-1 rounded mt-1">
        <p className="mt-1">
            The company who owns the inspection is not on a Pay As You Go plan and cannot retrieve any invoices.
        </p>
    </div>
</div>
  )
}

export default Invoice
