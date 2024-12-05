import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { handleError, handleSuccess } from '../../../../util';
import Cookie from 'js-cookie'

function Editmodal_inspactiondata({ showModal, handleClose, data }) {
  const [formData, setFormData] = useState(data); // Initialize form state with data
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  // Update formData when data prop changes (when modal opens)
  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      setIsLoading(true); 
      const response = await axios.put(
        'http://13.201.248.202:3001/api/main/updatedata',  
        formData, 
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'), 
            // 'x-report-id': Cookie.get('reportId') 
            'x-report-id': formData._id
          },
        }
      );

      console.log('Response:', response.data);
      handleSuccess("Data Updated")
      handleClose();  
    } catch (error) {
      console.error('Error updating report:', error);
      handleError("Failed to update report. Please try again.");
    //   alert('Failed to update report. Please try again.');
    } finally {
      setIsLoading(false);  
    }
  };

  if (!showModal) return null; // Render nothing if modal is not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Inspection Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="inspaction_name">
              Name
            </label>
            <input
              type="text"
              id="inspaction_name"
              name="inspaction_name"
              value={formData.inspaction_name || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium mb-1" htmlFor="status">
              Status
            </label>
            <input
              type="text"
              id="status"
              name="status"
              value={formData.status || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div> */}

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="inspaction_type">
              Type
            </label>
            <input
              type="text"
              id="inspaction_type"
              name="inspaction_type"
              value={formData.inspaction_type || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium mb-1" htmlFor="company">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div> */}

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="display_coordinates_system">
              Coordinate System
            </label>
            <input
              type="text"
              id="display_coordinates_system"
              name="display_coordinates_system"
              value={formData.display_coordinates_system || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Editmodal_inspactiondata;
