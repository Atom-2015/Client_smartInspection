// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { handleError } from '../../../../util';

// function Table_component() {
//   const [data, setData] = useState([]); // State to hold the data

//   // Fetch data from the API when the component mounts
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('/api/reportinside/getalldata', {
//           headers: {
//             'x-auth-token': localStorage.getItem('token'),
//             'x-company-id': localStorage.getItem('company_id'),
//           },
//         });

//         if (response && response.data.data) {
//           // Extract relevant data from the API response
//           const extractedData = response.data.data.map((item) => ({
//             inspectionName: item.inspaction.inspactionname,
//             componentNames: item.inspaction.componentname,
//             issueTypes: item.issuetype,
//           }));
//           setData(extractedData);
//         }
//       } catch (error) {
//         handleError('Unable to fetch Component Data');
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">Inspections, Components, and Issue Types</h2>
//       {data && data.length > 0 ? (
//         <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
//           <thead>
//             <tr className="bg-gray-200 text-gray-600">
//               <th className="py-2 px-4 border-b">Inspection Type</th>
//               <th className="py-2 px-4 border-b">Component Names</th>
//               <th className="py-2 px-4 border-b">Issue Types</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item, index) => (
//               <tr key={index} className="hover:bg-gray-100">
//                 <td className="py-2 px-4 border-b">{item.inspectionName}</td>
//                 <td className="py-2 px-4 border-b">
//                   {item.componentNames && item.componentNames.length > 0
//                     ? item.componentNames.join(', ')
//                     : 'No components'}
//                 </td>
//                 <td className="py-2 px-4 border-b">
//                   {item.issueTypes && item.issueTypes.length > 0
//                     ? item.issueTypes.join(', ')
//                     : 'No issue types'}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div className="text-center text-gray-500">No data for now</div>
//       )}
//     </div>
//   );
// }

// export default Table_component;








// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { handleError, handleSuccess } from '../../../../util';
// import Edit_modal_table from './edit_modal_table';

// function TableComponent() {
//   const [data, setData] = useState([]); // State to hold the data
  

//   // Fetch data from the API when the component mounts
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('/api/reportinside/getalldata', {
//           headers: {
//             'x-auth-token': localStorage.getItem('token'),
//             'x-company-id': localStorage.getItem('company_id'),
//           },
//         });

//         if (response && response.data.data) {
//           const extractedData = response.data.data.map((item) => ({
//             inspectionName: item.inspaction.inspactionname,
//             componentNames: item.inspaction.componentname,
//             issueTypes: item.issuetype,
//             _id:item._id
//           }));
//           setData(extractedData);
//         }
//       } catch (error) {
//         handleError('Unable to fetch Component Data');
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDelete = async(componentid) =>{
     
//      try {
//       const response = await axios.delete('/api/reportinside/deletecomponent', {
//         headers: {
//           'x-auth-token': localStorage.getItem('token'),
//           'x-component-id': componentid,
//         },
//       });
//       if (response.status === 200){
//         handleSuccess("Component Deleted");
//       }
//       else{
//         handleError("Data  Not Deleted");

//       }
//      } catch (error) {
//       handleError("Data Not Deleted");
//      }
//   }
//   const [componentid ,setComponentid] = useState();

//   const handleEdit = async(compid)=>{
//      setComponentid(compid)
//     setIsopen(true)
// }


// const [isOpen, setIsopen] = useState(false);
//   const closeModal = () => {
//     setIsopen(false);
// };

//   return (
//     <div className="p-2">
//       <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
//         Inspections, Components, and Issue Types
//       </h2>
//       {isOpen?(
       
//        <Edit_modal_table compid={componentid} closeModal={closeModal}/>

//       ): ""}
//       {data && data.length > 0 ? (
//         <table className="w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
//           <thead>
//             <tr className="bg-blue-100 text-gray-800">
//               <th className="py-3 px-6 text-center border-b font-semibold">Inspection Type</th>
//               <th className="py-3 px-6 text-center border-b font-semibold">Component Names</th>
//               <th className="py-3 px-6 text-center border-b font-semibold">Issue Types</th>
//               <th className="py-3 px-6 text-center border-b font-semibold">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item, index) => (
//               <tr key={index} className="even:bg-gray-100 hover:bg-blue-50">
//                 <td className="py-3 px-6 border-b">{item.inspectionName}</td>
//                 <td className="py-3 px-6 border-b">
//                   {item.componentNames && item.componentNames.length > 0
//                     ? item.componentNames.join(', ')
//                     : 'No components'}
//                 </td>
//                 <td className="py-3 px-6 border-b">
//                   {item.issueTypes && item.issueTypes.length > 0
//                     ? item.issueTypes.join(', ')
//                     : 'No issue types'}
//                 </td>
//                 <td onClick={() => handleDelete(item._id)}
//                               className="cursor-pointer text-sm text-gray-700 hover:bg-red-400 p-2 rounded h-6 ">
//                   Delete
//                 </td>

//                 <td onClick={() => handleEdit(item._id)}
//                               className="cursor-pointer text-sm text-gray-700 hover:bg-red-400 p-2 rounded h-6 ">
//                   Edit
//                 </td>

                
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div className="text-center text-gray-500 mt-10">No data available</div>

// )}
//     </div>
//   );
// }

// export default TableComponent;









// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { handleError, handleSuccess } from '../../../../util';
// import Edit_modal_table from './edit_modal_table';

// function TableComponent() {
//   const [data, setData] = useState([]);
//   const [expandedRows, setExpandedRows] = useState({});
//   const [showDeleteModal, setShowDeleteModal] = useState(false); // Manage delete modal visibility
//   const [deleteComponentId, setDeleteComponentId] = useState(null); // Store component ID to delete

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('/api/reportinside/getalldata', {
//           headers: {
//             'x-auth-token': localStorage.getItem('token'),
//             'x-company-id': localStorage.getItem('company_id'),
//           },
//         });

//         if (response && response.data.data) {
//           const extractedData = response.data.data.map((item) => ({
//             inspectionName: item.inspaction.inspactionname,
//             componentNames: item.inspaction.componentname,
//             issueTypes: item.issuetype,
//             _id: item._id,
//           }));
//           setData(extractedData);
//         }
//       } catch (error) {
//         handleError('Unable to fetch Component Data');
//       }
//     };

//     fetchData();
//   }, []);

//   const toggleRow = (index, field) => {
//     setExpandedRows((prev) => ({
//       ...prev,
//       [index]: {
//         ...prev[index],
//         [field]: !prev[index]?.[field],
//       },
//     }));
//   };

//   const renderContentWithToggle = (contentArray, isExpanded, index, field) => {
//     const preview = contentArray.slice(0, 3).join(', ');
//     const fullContent = contentArray.join(', ');

//     return (
//       <div>
//         <span>{isExpanded ? fullContent : preview}</span>
//         {contentArray.length > 3 && (
//           <button
//             onClick={() => toggleRow(index, field)}
//             className="ml-2 text-blue-500 underline text-sm"
//           >
//             {isExpanded ? 'Close' : 'More'}
//           </button>
//         )}
//       </div>
//     );
//   };

//   const handleDelete = async () => {
//     try {
//       const response = await axios.delete('/api/reportinside/deletecomponent', {
//         headers: {
//           'x-auth-token': localStorage.getItem('token'),
//           'x-component-id': deleteComponentId,
//         },
//       });
//       if (response.status === 200) {
//         handleSuccess('Component Deleted');
//         setData(data.filter((item) => item._id !== deleteComponentId)); // Remove deleted component from state
//       } else {
//         handleError('Data Not Deleted');
//       }
//     } catch (error) {
//       handleError('Data Not Deleted');
//     } finally {
//       setShowDeleteModal(false); // Close modal after delete attempt
//     }
//   };

//   const openDeleteModal = (componentId) => {
//     setDeleteComponentId(componentId);
//     setShowDeleteModal(true); // Show delete confirmation modal
//   };

//   const closeDeleteModal = () => {
//     setShowDeleteModal(false);
//   };

//   const [componentid, setComponentid] = useState();
//   const [isOpen, setIsopen] = useState(false);

//   const handleEdit = (compid) => {
//     setComponentid(compid);
//     setIsopen(true);
//   };

//   const closeModal = () => {
//     setIsopen(false);
//   };

//   return (
//     <div className="p-2">
//       <h2 className="text-3xl font-semibold mb-6 text-center text-white">
//         Inspections, Components, and Issue Types
//       </h2>
//       {isOpen && <Edit_modal_table compid={componentid} closeModal={closeModal} />}
//       {data && data.length > 0 ? (
//         <table className="w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
//           <thead>
//             <tr className="bg-blue-100 text-gray-800">
//               <th className="py-3 px-6 text-center border-b font-semibold">Inspection Type</th>
//               <th className="py-3 px-6 text-center border-b font-semibold">Component Names</th>
//               <th className="py-3 px-6 text-center border-b font-semibold">Issue Types</th>
//               <th className="py-3 px-6 text-center border-b font-semibold">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item, index) => (
//               <tr key={index} className="even:bg-gray-100 hover:bg-blue-50">
//                 <td className="py-2 px-2 border-b font-bold bg-[#1e1e1e] text-white">{item.inspectionName}</td>
//                 <td className="py-2 px-2 border-b bg-[#1e1e1e] text-white">
//                   {renderContentWithToggle(
//                     item.componentNames,
//                     expandedRows[index]?.component || false,
//                     index,
//                     'component'
//                   )}
//                 </td>
//                 <td className="py-2 px-2 border-b bg-[#1e1e1e] text-white">
//                   {renderContentWithToggle(
//                     item.issueTypes,
//                     expandedRows[index]?.issue || false,
//                     index,
//                     'issue'
//                   )}
//                 </td>
//                 <td className="py-3 px-6 flex gap-2 bg-[#1e1e1e] text-white">
//                   <button
//                     onClick={() => openDeleteModal(item._id)}
//                     className="text-sm bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded"
//                   >
//                     Delete
//                   </button>
//                   <button
//                     onClick={() => handleEdit(item._id)}
//                     className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded"
//                   >
//                     Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div className="text-center text-gray-500 mt-10">No data available</div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete?</h3>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={closeDeleteModal}
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-4 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded"
//               >
//                 Yes, Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TableComponent;






import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { handleError, handleSuccess } from '../../../../util';
import Edit_modal_table from './edit_modal_table';
import './report.css'

function TableComponent() {
  const [data, setData] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteComponentId, setDeleteComponentId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [modalContent, setModalContent] = useState([]); // State for modal content

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://13.201.248.202:3001/api/reportinside/getalldata', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
            'x-company-id': localStorage.getItem('company_id'),
          },
        });

        if (response && response.data.data) {
          const extractedData = response.data.data.map((item) => ({
            inspectionName: item.inspaction.inspactionname,
            componentNames: item.inspaction.componentname,
            issueTypes: item.issuetype,
            _id: item._id,
          }));
          setData(extractedData);
        }
      } catch (error) {
        handleError('Unable to fetch Component Data');
      }
    };

    fetchData();
  }, []);

  const toggleRow = (index, field) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: !prev[index]?.[field],
      },
    }));
  };

  const renderContentWithToggle = (contentArray, isExpanded, index, field) => {
    const preview = contentArray.slice(0, 3).join(', ');

    return (
      <div>
        <span>{isExpanded ? contentArray.join(', ') : preview}</span>
        {contentArray.length > 3 && (
          <button
            onClick={() => {
              setModalContent(contentArray); // Set content for the modal
              setIsModalOpen(true); // Open the modal
            }}
            className="ml-2 text-blue-500 underline text-sm"
          >
            More
          </button>
        )}
      </div>
    );
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete('http://13.201.248.202:3001/api/reportinside/deletecomponent', {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
          'x-component-id': deleteComponentId,
        },
      });
      if (response.status === 200) {
        handleSuccess('Component Deleted');
        setData(data.filter((item) => item._id !== deleteComponentId));
      } else {
        handleError('Data Not Deleted');
      }
    } catch (error) {
      handleError('Data Not Deleted');
    } finally {
      setShowDeleteModal(false);
    }
  };

  const openDeleteModal = (componentId) => {
    setDeleteComponentId(componentId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const [componentid, setComponentid] = useState();
  const [isOpen, setIsopen] = useState(false);

  const handleEdit = (compid) => {
    setComponentid(compid);
    setIsopen(true);
  };

  const closeModal = () => {
    setIsopen(false);
  };

  return (
    <div className="p-2 rounded mt-2 tableres">
      {/* <h2 className="text-3xl font-semibold mb-6 text-center  text-white">
        Inspections, Components, and Issue Types
      </h2> */}

<h2
  className="text-3xl font-semibold mb-6 text-center text-white animate-typing"
  style={{
    display: 'inline-block',
    overflow: 'hidden', 
    whiteSpace: 'nowrap',
    // borderRight: '2px solid #ffffff', // Cursor effect
  }}
>
  Inspections, Components, and Issue Types
</h2>

      {isOpen && <Edit_modal_table compid={componentid} closeModal={closeModal} />}
      {data && data.length > 0 ? (
        <table className="w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-100 text-gray-800">
              <th className="py-3 px-6 text-left border-b font-semibold">Inspection Type</th>
              <th className="py-3 px-6 text-left border-b font-semibold">Component Names</th>
              <th className="py-3 px-6 text-left border-b font-semibold">Issue Types</th>
              <th className="py-3 px-6 text-left border-b font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="even:bg-gray-100 hover:bg-blue-50 border-b">
                <td className="py-2 px-2 border-b font-bold bg-[#1e1e1e] text-white text-left ">{item.inspectionName}</td>
                <td className="py-2 px-2 border-b bg-[#1e1e1e] text-white text-left">
                  {renderContentWithToggle(
                    item.componentNames,
                    expandedRows[index]?.component || false,
                    index,
                    'component'
                  )}
                </td>
                  <td className="py-2 px-2 border-b bg-[#1e1e1e] text-white">
                    {renderContentWithToggle(
                      item.issueTypes,
                      expandedRows[index]?.issue || false,
                      index,
                      'issue'
                    )}
                  </td>
                <td className="py-3 px-6 flex gap-2 bg-[#1e1e1e] text-white text-left">
                  <button
                    onClick={() => openDeleteModal(item._id)}
                    className="text-sm bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(item._id)}
                    className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500 mt-10">No data available</div>
      )}

      {/* Component Names Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h3 className="text-[20px] font-bold mb-4">Component Names</h3>
            <p>{modalContent.join(', ')}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete?</h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeDeleteModal()}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete()}
                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
        
      )}

 
    </div>
  );
}

export default TableComponent;















