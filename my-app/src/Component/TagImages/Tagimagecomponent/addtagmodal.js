import axios from 'axios';
import React, { useState } from 'react';
import { handleSuccess } from '../../../util';
import Cookies from 'js-cookie'

function Addtagmodal({ itemId ,imagetag }) {
    const [ismodalopen, setIsmodalopen] = useState(false);
    const [tagnumber, setTagnumber] = useState([0]);
    const [tagname, setTagname] = useState([]);

    async function handleAddTag(id) {
        // alert(`Tag for item ID: ${id}`);
        // console.log("Tags are : ", tagname);

        try {
            const response = await axios.post('/api/tagimage/storetag', { tags: tagname }, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                    'x-report-id': Cookies.get('reportId'),
                    'x-group-id': id,
                    'x-tagimage-id': imagetag
                }
            }
            );
            if(response.status === 200){
                handleSuccess("Data Added Sucessfully")
                console.log(response.data.data);
                setTagname([]); 
            }
            
        } catch (error) {
            console.error('Error adding tag:', error);
        }
    }

    const handleTagChange = (index, value) => {
        const updatedTags = [...tagname];
        updatedTags[index] = value;
        setTagname(updatedTags);
    };

    const addTagInput = () => {
        setTagnumber([...tagnumber, tagnumber.length]);
    };

    const toggleModal = () => {
        setIsmodalopen((prev) => !prev); // Toggle modal open/close
    };

    return (
        <div className="flex flex-col items-center p-2 space-y-1">
            {/* Add Tags Button */}
            <button
                className=" text-white font-semibold py-2 px-4 rounded hover:bg-teal-600 transition w-[100%] border-gray-600 border "
                onClick={toggleModal}
            >
                {ismodalopen ? 'Close Tags' : 'Add Tags'}
            </button>

            {/* Modal Section */}
            {ismodalopen && (
                <div className="bg-white shadow-lg rounded-lg p-2 w-96 border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold text-gray-700">Insert Tag List</span>
                        <button
                            onClick={() => setIsmodalopen(false)}
                            className="text-gray-500 hover:text-gray-700 transition"
                        >
                            ✖
                        </button>
                    </div>

                    {/* Input Fields */}
                    <div className="space-y-3">
                        {tagnumber.map((index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={`Tag ${index + 1}`}
                                    value={tagname[index] || ''}
                                    onChange={(e) => handleTagChange(index, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Add Tag and Submit Buttons */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={addTagInput}
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                        >
                            Add Tags
                        </button>
                        <button
                            onClick={() => handleAddTag(itemId)}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                        >
                            Submit Tags
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Addtagmodal;















