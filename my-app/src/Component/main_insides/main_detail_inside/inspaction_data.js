import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Editmodal_inspactiondata from './inspactin_internal_component/editmodal_inspactiondata';

function Inspaction_data({ reportId }) {
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    (async () => {
      try {
        console.log(reportId);

        const response = await axios.get('/api/main/onereport', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
          params: {
            param1: reportId,
          },
        });
        if (response) {
          setData(response.data.data);
        }
      } catch (error) {
        console.log(`No data found ${error}`);
      }
    })();
  }, [reportId]);

  // Open and close modal functions
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Function to handle form submission from child
  const handleSaveChanges = (updatedData) => {
    setData(updatedData); // Update parent state with new data
    handleCloseModal(); // Close modal after saving
  };

  console.log('The log is ', data);

  return (
    <div className="bg-[#1e1e1e] border shadow-lg rounded-lg p-6 ">
      <h2 className="text-xl font-semibold mb-4 text-white">Inspection Details</h2>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <tbody>
          <tr className="border border-gray-300 text-left">
            <td className="px-4 py-2 font-bold text-white">Name</td>
            <td className="px-4 py-2 text-white">{data.inspaction_name || 'No Data'}</td>
          </tr>
          <tr className="border border-gray-300 text-left">
            <td className="px-4 py-2 font-bold text-white">Status</td>
            <td className="px-4 py-2 text-white">{data.status || 'No Data'}</td>
          </tr>
          <tr className="border border-gray-300 text-left">
            <td className="px-4 py-2 font-bold text-white">Type</td>
            <td className="px-4 py-2 text-white">{data.inspaction_type || 'No Data'}</td>
          </tr>
          <tr className="border border-gray-300 text-left">
            <td className="px-4 py-2 font-bold text-white">Company</td>
            <td className="px-4 py-2 text-white">{data.company || 'No Data'}</td>
          </tr>
          <tr className="border border-gray-300 text-left">
            <td className="px-4 py-2 font-bold text-white">Coordinate System</td>
            <td className="px-4 py-2 text-white">{data.display_coordinates_system || 'No Data'}</td>
          </tr>
        </tbody>
      </table>

      <button
        className=" flex mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600   "
        onClick={handleOpenModal}
      >
        Edit
      </button>

      {/* Edit Modal Component */}
      <Editmodal_inspactiondata
        showModal={showModal}
        handleClose={handleCloseModal}
        data={data}
        // onSaveChanges={handleSaveChanges}
      />
    </div>
  );
}

export default Inspaction_data;
