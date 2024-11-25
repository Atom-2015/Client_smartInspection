import React from 'react'

function Inspaction_type_group() {
  return (
    <div className="bg-[#1e1e1e] shadow-lg rounded-lg p-6 mt-2 border">
                    <h2 className="text-xl font-semibold mb-4 text-white">Inspection Issue Type Groups</h2>
                    <p className="text-white mb-4">
                        Choose specific groups to limit available issue types during inspection. Deselect all for default options
                        based on inheritance and inspection type.
                    </p>
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-500 border-gray-300 rounded mr-2"
                            checked
                        />
                        <label className="font-semibold text-white">Default</label>
                        <span className="ml-auto bg-gray-200 text-gray-700 px-2 py-1 rounded">2</span>
                    </div>
                </div>
  )
}

export default Inspaction_type_group
