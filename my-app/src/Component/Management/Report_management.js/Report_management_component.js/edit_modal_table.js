// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { handleError } from '../../../../util'

// function Edit_modal_table({compid}) {
// const [comoponetdata , setComoponetdata] = useState();

// useEffect(() => {
//     const fetchComponentData = async () => {
//         // alert(compid)
//       try {
//         const response = await axios.get('/api/reportinside/getsingleCompdata', {
//           headers: {
//             'x-auth-token': localStorage.getItem('token'),
//             'x-component-id': compid, // Access compid directly
//           },
//         });

//         if (response.status === 200) {
//             setComoponetdata(response.data.data);
//         } else {
//           console.log('Error while fetching data');
//         }
//       } catch (error) {
//         console.error('Error while fetching data:', error);
//         // handleError('Failed to fetch component data.');
//       }
//     };

//     if (compid) {
//       fetchComponentData(); // Call the async function
//     }
//   }, [compid]);

//     return (
//         <div className='h-[50vh] absolute top-[100px] p-10 w-[800px] right-[350px] bg-danger'>
//           <h1>{compid}</h1>
//         </div>
//     )
// }

// export default Edit_modal_table


import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { handleError, handleSuccess } from '../../../../util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function EditModalTable({ compid, closeModal }) {
  const [component, setComponent] = useState({
    inspectionName: '',
    componentName: [],
    issueType: [],
  });
  const modalRef = useRef(null); 

  useEffect(() => {
    const fetchComponentData = async () => {
      try {
        const response = await axios.get('/api/reportinside/getsingleCompdata', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
            'x-component-id': compid,
          },
        });

        if (response.status === 200) {
          const data = response.data.data;
          setComponent({
            inspectionName: data.inspaction.inspactionname,
            componentName: data.inspaction.componentname,
            issueType: data.issuetype,
          });
        }
      } catch (error) {
        console.error('Error fetching component data:', error);
      }
    };

    if (compid) fetchComponentData();
  }, [compid ]);

  const handleInspectionNameChange = (e) => {
    setComponent((prev) => ({ ...prev, inspectionName: e.target.value }));
  };

  const handleComponentNameChange = (index, e) => {
    const updatedComponents = [...component.componentName];
    updatedComponents[index] = e.target.value;
    setComponent((prev) => ({ ...prev, componentName: updatedComponents }));
  };

  const handleIssueTypeChange = (index, e) => {
    const updatedIssues = [...component.issueType];
    updatedIssues[index] = e.target.value;
    setComponent((prev) => ({ ...prev, issueType: updatedIssues }));
  };

  const addComponentName = () => {
    setComponent((prev) => ({
      ...prev,
      componentName: [...prev.componentName, ''],
    }));
  };

  const removeComponentName = (index) => {
    const updatedComponents = component.componentName.filter((_, i) => i !== index);
    setComponent((prev) => ({ ...prev, componentName: updatedComponents }));
  };

  const addIssueType = () => {
    setComponent((prev) => ({
      ...prev,
      issueType: [...prev.issueType, ''],
    }));
  };

  const removeIssueType = (index) => {
    const updatedIssues = component.issueType.filter((_, i) => i !== index);
    setComponent((prev) => ({ ...prev, issueType: updatedIssues }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/reportinside/updatecomponent', component, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
          'x-component-id': compid,
        },
      });

      if (response.status === 200) {
        handleSuccess('Component updated successfully!');
        window.location.reload();
        closeModal();
      } else {
        handleError('Failed to update component.');
      }
    } catch (error) {
      console.error('Error updating component:', error);
      handleError('Failed to update component.');
    }

    
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal(); // Close the modal
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    // return () => {
    //   document.removeEventListener('mousedown', handleClickOutside);
    // };
  }, []);
  return (
     
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="w-[1550px]  max-h-[100%] p-3 bg-white rounded-lg shadow-lg overflow-y-auto relative">
      <button
              type="button"
              onClick={closeModal}
              className="text-white hover:underline bg-red-500 px-3 rounded absolute top-[10px] right-[20px]"
            >

              <button> <FontAwesomeIcon icon={faXmark} beat /> </button> 
            </button>
    
        <h2 className="text-[30px] font-bold mb-6 text-center ">Report Management</h2>
      
        <form onSubmit={handleSubmit} className="space-y-4 ">
      
          <div className="border p-2 rounded-lg bg-gray-50 shadow">
            <label className="block text-lg font-[500] text-black-700 mb-2">
              Inspection Type
            </label>
            <input
              type="text"
              value={component.inspectionName}
              onChange={handleInspectionNameChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Enter inspection name"
              required
            />

            <div className="space-y-2">
              <label className="block text-lg font-[500] text-black-700 ">Component Names</label>
              <div className="flex flex-wrap gap-2">
                {component.componentName.map((name, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-100 px-3 py-1 rounded-full"
                  >
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => handleComponentNameChange(index, e)}
                      className="bg-transparent outline-none"
                      placeholder="Component Name"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeComponentName(index)} // Fixed the onClick function call
                      className="text-red-500 hover:underline"
                    >
                       <FontAwesomeIcon icon={faXmark} beat />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addComponentName}
                className="mt-2 text-blue-500 hover:underline"
              >
                + Add Component Name
              </button>
            </div>

            <div className="space-y-2 mt-2">
              <label className="block text-lg font-[500] text-black-700">Issue Types</label>
              <div className="flex flex-wrap gap-2">
                {component.issueType.map((issue, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-green-100 px-3 py-1 rounded-full"
                  >
                    <input
                      type="text"
                      value={issue}
                      onChange={(e) => handleIssueTypeChange(index, e)}
                      className="bg-transparent outline-none"
                      placeholder="Issue Type"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeIssueType(index)}
                      className="ml-2 text-red-500"
                    >
                        <FontAwesomeIcon icon={faXmark} beat />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addIssueType}
                className="mt-2 text-blue-500 hover:underline"
              >
                + Add Issue Type
              </button>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="text-white hover:underline bg-red-500 px-3 rounded"
            >

              <button> Close <FontAwesomeIcon icon={faXmark} beat /> </button> 
            </button>
          </div>
        </form>
      </div>
    </div>
     
  );
}

export default EditModalTable;
