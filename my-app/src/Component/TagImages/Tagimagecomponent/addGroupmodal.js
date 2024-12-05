import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { handleError, handleSuccess } from '../../../util';

function AddGroupmodal() {
    const [openmodal, setOpenmodal] = useState(false);
    const [groupName, setGroupName] = useState("");

    async function submitgrupdata(e) {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://13.201.248.202:3001/api/tagimage/storegroup',
                { taggroup: groupName },
                {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                        'x-report-id': Cookies.get('reportId'),
                    },
                }
            );
            if (response) {
                setOpenmodal(false);
                handleSuccess("Group Added");
            }
        } catch (error) {
            console.log(error);
            handleError("Error While Adding Group");
        }
    }

    return (
        <div className="flex flex-col items-center  p-2">
            {/* Open Modal Button */}
            <button
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
                onClick={() => setOpenmodal(true)}
            >
                Add Group
            </button>

            {/* Modal Section */}
            {openmodal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80 border border-gray-300">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-700">Add Group</h2>
                            <button
                                onClick={() => setOpenmodal(false)}
                                className="text-gray-500 hover:text-gray-700 transition"
                            >
                                ✖
                            </button>
                        </div>

                        {/* Input Field */}
                        <input
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            placeholder="Enter Group Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        />

                        {/* Submit Button */}
                        <button
                            onClick={(e) => submitgrupdata(e)}
                            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddGroupmodal;
