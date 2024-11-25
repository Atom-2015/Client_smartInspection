// import React, { useState } from 'react';
// import {handleError, handleSuccess } from '../../../../util'
// import axios from 'axios'

// function Input_modal({ isVisible, closeModal }) {
//   // State to store component name and issue types
//   const [component, setComponent] = useState({
//     inspactionname:'',
//     componentname: [''],
//     issuetype: [''],
//   });


//   const handleComponentChange = (event) => {
//     setComponent({ ...component, componentname: event.target.value });
//   };

  
//   const handleIssueTypeChange = (issueIndex, event) => {
//     const newIssueTypes = [...component.issuetype];
//     newIssueTypes[issueIndex] = event.target.value;
//     setComponent({ ...component, issuetype: newIssueTypes });
//   };

  
//   const addIssueType = () => {
//     setComponent({ ...component, issuetype: [...component.issuetype, ''] });
//   };

  
//   const removeIssueType = (index) => {
//     const newIssueTypes = component.issuetype.filter((_, i) => i !== index);
//     setComponent({ ...component, issuetype: newIssueTypes });
//   };

  
//   const handleSubmit = async(event) => {
//     event.preventDefault();
//     console.log('Submitted Component:', component); 
   
//     try {
//       const response = await axios.post('/api/reportinside/stotecomponent' , {
//         componentname:component.componentname,
//         issuetype:component.issuetype
//       } , {
//         headers:{
//           'Content-Type': 'application/json',
//           'x-auth-token' :  localStorage.getItem('token'),
//           'x-company-id' : localStorage.getItem('company_id')           
//         }
//       } )
//       if(response.data.message === 'Data stored successfully'){
//         handleSuccess('Data Stored')
//         closeModal();
//       }else {
//         handleError(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       const errorMessage = error.response?.data?.message || 'Something Went Wrong';
//       handleError(errorMessage);
//     }
     
//   };

//   if (!isVisible) return null; 

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold mb-4">Report Management</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="border p-4 rounded-lg bg-white shadow">
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Component Name
//               </label>
//               <input
//                 type="text"
//                 value={component.componentname}
//                 onChange={handleComponentChange}
//                 className="mt-1 p-2 border border-gray-300 rounded w-full"
//                 placeholder="Enter component name"
//                 required
//               />
//             </div>
//             {component.issuetype.map((issue, issueIndex) => (
//               <div key={issueIndex} className="mb-2 flex items-center space-x-2">
//                 <div className="w-full">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Issue Type
//                   </label>
//                   <input
//                     type="text"
//                     value={issue}
//                     onChange={(e) => handleIssueTypeChange(issueIndex, e)}
//                     className="mt-1 p-2 border border-gray-300 rounded w-full"
//                     placeholder="Enter issue type"
//                     required
//                   />
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => removeIssueType(issueIndex)}
//                   className="text-red-500 hover:underline"
//                 >
//                   ❌
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addIssueType}
//               className="text-blue-500 hover:underline"
//             >
//               + Add Issue Type
//             </button>
//           </div>
//           <div className="flex justify-end space-x-2">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//             >
//               Submit
//             </button>
//             <button
//               type="button"
//               onClick={closeModal}
//               className="text-red-500 hover:underline"
//             >
//               ❌ Close
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Input_modal;








// import React, { useState } from 'react';
// import { handleError, handleSuccess } from '../../../../util';
// import axios from 'axios';

// function Input_modal({ isVisible, closeModal }) {
//   // State to store inspection name, component names, and issue types
//   const [component, setComponent] = useState({
//     inspectionName: '',
//     componentName: [''], // Changed to an array
//     issueType: [''],
//   });

//   const handleInspectionNameChange = (event) => {
//     setComponent({ ...component, inspectionName: event.target.value });
//   };

//   const handleComponentNameChange = (index, event) => {
//     const newComponentNames = [...component.componentName];
//     newComponentNames[index] = event.target.value;
//     setComponent({ ...component, componentName: newComponentNames });
//   };

//   const addComponentName = () => {
//     setComponent({ ...component, componentName: [...component.componentName, ''] });
//   };

//   const removeComponentName = (index) => {
//     const newComponentNames = component.componentName.filter((_, i) => i !== index);
//     setComponent({ ...component, componentName: newComponentNames });
//   };

//   const handleIssueTypeChange = (issueIndex, event) => {
//     const newIssueTypes = [...component.issueType];
//     newIssueTypes[issueIndex] = event.target.value;
//     setComponent({ ...component, issueType: newIssueTypes });
//   };

//   const addIssueType = () => {
//     setComponent({ ...component, issueType: [...component.issueType, ''] });
//   };

//   const removeIssueType = (index) => {
//     const newIssueTypes = component.issueType.filter((_, i) => i !== index);
//     setComponent({ ...component, issueType: newIssueTypes });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log('Submitted Component:', component);
 
//     try {
//       const response = await axios.post('/api/reportinside/stotecomponent', {
//         inspactionname: component.inspectionName,
//         componentname: component.componentName,
//         issuetype: component.issueType,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           'x-auth-token': localStorage.getItem('token'),
//           'x-company-id': localStorage.getItem('company_id'),
//         },
//       });
//       if (response.data.message === 'Data stored successfully') {
//         handleSuccess('Data Stored');
//         closeModal();
//       } else {
//         handleError(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       const errorMessage = error.response?.data?.message || 'Something Went Wrong';
//       handleError(errorMessage);
//     }
//   };

//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="w-[600px] p-4 bg-gray-100 rounded-lg shadow-lg">
//         <h2 className="text-[30px] font-bold mb-4">Report Management</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="border p-4 rounded-lg bg-white shadow">
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Inspection Type
//               </label>
//               <input
//                 type="text"
//                 value={component.inspectionName}
//                 onChange={handleInspectionNameChange}
//                 className="mt-1 p-2 border border-gray-300 rounded w-full"
//                 placeholder="Enter inspection name"
//                 required
//               />
//             </div>
//             {component.componentName.map((name, index) => (
//               <div key={index} className="mb-4 flex items-center space-x-2">
//                 <div className="w-full">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Component Name
//                   </label>
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => handleComponentNameChange(index, e)}
//                     className="mt-1 p-2 border border-gray-300 rounded w-full"
//                     placeholder="Enter component name"
//                     required
//                   />
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => removeComponentName(index)}
//                   className="text-red-500 hover:underline"
//                 >
//                   ❌
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addComponentName}
//               className="text-blue-500 hover:underline mb-3"
//             >
//               + Add Component Name
//             </button>
//             {component.issueType.map((issue, issueIndex) => (
//               <div key={issueIndex} className="mb-2 flex items-center space-x-2">
//                 <div className="w-full">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Issue Type
//                   </label>
//                   <input
//                     type="text"
//                     value={issue}
//                     onChange={(e) => handleIssueTypeChange(issueIndex, e)}
//                     className="mt-1 p-2 border border-gray-300 rounded w-full"
//                     placeholder="Enter issue type"
//                     required
//                   />
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => removeIssueType(issueIndex)}
//                   className="text-red-500 hover:underline"
//                 >
//                   ❌
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addIssueType}
//               className="text-blue-500 hover:underline mb-3"
//             >
//               + Add Issue Type
//             </button>
//           </div>
//           <div className="flex justify-center space-x-14">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//             >
//               Submit
//             </button>
//             <button
//               type="button"
//               onClick={closeModal}
//               className="text-red-500 hover:underline"
//             >
//               ❌ Close
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Input_modal;









import React, { useState } from 'react';
import { handleError, handleSuccess } from '../../../../util';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function InputModal({ isVisible, closeModal }) {
  const [component, setComponent] = useState({
    inspectionName: '',
    componentName: [''],
    issueType: [''],
  });

  const handleInspectionNameChange = (event) =>
    setComponent({ ...component, inspectionName: event.target.value });

  const handleComponentNameChange = (index, event) => {
    const newComponentNames = [...component.componentName];
    newComponentNames[index] = event.target.value;
    setComponent({ ...component, componentName: newComponentNames });
  };

  const addComponentName = () =>
    setComponent({ ...component, componentName: [...component.componentName, ''] });

  const removeComponentName = (index) =>
    setComponent({
      ...component,
      componentName: component.componentName.filter((_, i) => i !== index),
    });

  const handleIssueTypeChange = (index, event) => {
    const newIssueTypes = [...component.issueType];
    newIssueTypes[index] = event.target.value;
    setComponent({ ...component, issueType: newIssueTypes });
  };

  const addIssueType = () =>
    setComponent({ ...component, issueType: [...component.issueType, ''] });

  const removeIssueType = (index) =>
    setComponent({
      ...component,
      issueType: component.issueType.filter((_, i) => i !== index),
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        '/api/reportinside/stotecomponent',
        {
          inspactionname: component.inspectionName,
          componentname: component.componentName,
          issuetype: component.issueType,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token'),
            'x-company-id': localStorage.getItem('company_id'),
          },
        }
      );

      if (response.data.message === 'Data stored successfully') {
        handleSuccess('Data Stored');
        closeModal();
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      handleError(
        error.response?.data?.message || 'Something Went Wrong'
      );
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[900px] max-h-[90vh] p-6 bg-white rounded-lg shadow-lg overflow-y-auto">
        <h2 className="text-[30px] font-bold mb-6 text-center">Report Management</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border p-4 rounded-lg bg-gray-50 shadow">
            <label className="block text-[20px] font-medium text-gray-700 mb-2">
              Inspection Type
            </label>
            <input
              type="text"
              value={component.inspectionName}
              onChange={handleInspectionNameChange}
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter inspection name"
              required
            />

            {/* Component Names */}
            <div className="space-y-2">
              <label className="block text-[20px] font-medium text-gray-700">
                Component Names
              </label>
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
                      onClick={() => removeComponentName(index)}
                      className="ml-2 text-black"
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

            {/* Issue Types */}
            <div className="space-y-2 mt-4">
              <label className="block text-[20px] font-medium text-gray-700">
                Issue Types
              </label>
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
                      className="ml-2 text-black"
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
              <button className=' '>      Close           <FontAwesomeIcon icon={faXmark} beat /> </button>

            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InputModal;
