import React from 'react'

function External() {
  return (
    <div className="bg-[#1e1e1e] shadow-lg rounded-lg p-6 border-[1px] mt-3">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold mb-4 text-white">External Links</h2>
                        <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded hover:bg-blue-200">
                            Create
                        </button>
                    </div>
                    <p className="text-white">
                        This is an overview of existing external links associated with this inspection.
                    </p>
                    <div className="mt-4 bg-blue-100 text-blue-700 p-3 rounded">
                        <p>No external links exist for this inspection.</p>
                    </div>
                </div>
  )
}

export default External
