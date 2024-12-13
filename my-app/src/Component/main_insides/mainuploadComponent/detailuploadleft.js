import React from 'react'

function Detailuploadleft({filelength}) {
  return (
  
    <div className="w-1/4 h-full bg-[#1e1e1e] shadow-lg p-4 flex flex-col border-r border-red-200 overflow-y-auto">
      <form >
        {/* <h6 className="text-blue-600 mb-4">Upload Method</h6> */}
        {/* <input
          type="file"
          multiple
          onChange={handleFileChange} 
          className="w-full border px-4 py-2 mb-6"
        /> */}

        <h6 className="text-white mb-4 text-left">Asset Upload History</h6>
        <div className="border p-3 rounded mb-6 bg-[#1e1e1e] shadow-sm text-left  ">
          <p className=' text-white' > 1 - Building</p>
          <small className='text-white'>Sep 21, 2024, 3:28:58 PM</small>
        </div>

        <h6 className="text-white mb-4 text-left">Billing Status</h6>
        <div className="border p-3 rounded  shadow-sm mb-3 text-left bg-[#1e1e1e]">
          <p className="mb-1 text-white">
            Subscription Status:
            <span className="bg-yellow-400 px-2 py-1 rounded-full text-xs text-white">Trial</span>
          </p>
          <p className="mb-2 text-white">Expires: Sep 27, 2024</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '46%' }}></div>
          </div>
          <small className='text-white'>Image Usage: 464 / 1000</small>
        </div>

        <div className="  p-4 bg-[#1e1e1e] rounded-lg shadow-md border border-gray-200">
              <p className="text-lg font-semibold text-white">Total Image Count:</p>
              <p className="text-xl font-bold text-white">{filelength}</p>
            </div>

        <div className="mt-auto text-sm text-gray-500">Powered by Smart Inspection</div>
      </form>
    </div>
    
  )
}

export default Detailuploadleft
