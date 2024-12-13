// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Loader({ data = [], loading, error, handleLocation }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [activeMenuId, setActiveMenuId] = useState(null);
//   const menuRef = useRef(null);
//   const navigate = useNavigate();

//   const isEmpty = !Array.isArray(data) || data.length === 0;

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentData = isEmpty ? [] : data.slice(startIndex, endIndex);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const totalPages = isEmpty ? 0 : Math.ceil(data.length / itemsPerPage);

//   const renderData = (value) => (value ? value : '-');

//   const option = (id) => {
//     if (activeMenuId === id) {
//       setMenuVisible(false);
//       setActiveMenuId(null);
//     } else {
//       setMenuVisible(true);
//       setActiveMenuId(id);
//     }
//   };

//   const handleDelete = (id) => {
//     console.log('Delete clicked for id:', id);
//   };

//   const handleViewClick = (id) => {
//     navigate('/detail', { state: { id } });
//   };

//   const handleRowClick = (item) => {
//     const latitude = item.latitude?.$numberDecimal || item.latitude;
//     const longitude = item.longitude?.$numberDecimal || item.longitude;

//     if (latitude && longitude) {
//       handleLocation(latitude, longitude);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setMenuVisible(false);
//         setActiveMenuId(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [menuRef]);

//   return (
//     <div className="mt-10">
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-center text-red-500 py-4">Error: {error}</p>
//       ) : isEmpty ? (
//         <p className="text-center py-4">No data found</p>
//       ) : (
//         <>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 📍</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">B</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">C</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">D</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inspection</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Images Count</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assets</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {currentData.map((item) => (
//                   <tr key={item._id} className="cursor-pointer hover:bg-gray-100">
//                     <td className="px-4 py-2 text-left text-sm font-medium text-gray-900 truncate" onClick={() => handleRowClick(item)}>{renderData(item.location)}</td>
//                     <td className="px-4 py-2 text-left text-sm font-medium text-gray-900 truncate">{renderData(item.B)}</td>
//                     <td className="px-4 py-2 text-left text-sm font-medium text-gray-900 truncate">{renderData(item.C)}</td>
//                     <td className="px-4 py-2 text-left text-sm font-medium text-gray-900 truncate">{renderData(item.D)}</td>
//                     <td className="px-4 py-2 text-left text-sm font-medium text-gray-900 truncate">{renderData(item.Created)}</td>
//                     <td className="px-4 py-2 text-left text-sm font-medium text-gray-900 truncate">{renderData(item.Expires)}</td>
//                     <td className="px-4 py-2 text-left text-sm font-medium text-gray-900 truncate">{renderData(item.inspaction_name)}</td>
//                     <td className="px-4 py-2 text-left text-sm font-medium text-gray-900 truncate">{renderData(item.inspaction_company_owner)}</td>
//                     <td className="px-4 py-2 text-left text-sm font-medium text-gray-900 truncate">{renderData(item.inspaction_type)}</td>
//                     <td className="px-4 py-2 text-left text-sm font-medium text-gray-900 truncate">{renderData(item.Images)}</td>
//                     <td className="px-4 py-2 text-left text-sm font-medium text-gray-900 truncate">{renderData(item.Assets)}</td>
//                     <td className="px-4 py-2 text-left text-sm font-medium text-gray-900 cursor-pointer relative" onClick={() => option(item._id)}>
//                       ...
//                       {menuVisible && activeMenuId === item._id && (
//                         <div ref={menuRef} className="absolute bottom-2 right-0 bg-white border border-red-300 rounded-md shadow-lg p-1 m-1">
//                           <ul className="space-y-2 m-1">
//                             <li
//                               onClick={() => handleViewClick(item._id)}
//                               className="cursor-pointer text-sm text-gray-700 hover:bg-green-400 p-1 rounded mr-7"
//                             >
//                               View
//                             </li>
//                             <li
//                               onClick={() => handleDelete(item._id)}
//                               className="cursor-pointer text-sm text-gray-700 hover:bg-red-400 p-1 rounded mr-7"
//                             >
//                               Delete
//                             </li>
//                           </ul>
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="flex justify-center mt-4">
//             <button
//               className={`px-4 py-2 rounded-l-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}
//               disabled={currentPage === 1}
//               onClick={() => handlePageChange(currentPage - 1)}
//             >
//               Previous
//             </button>
//             {Array.from({ length: totalPages }, (_, index) => (
//               <button
//                 key={index}
//                 className={`px-4 py-2 border border-blue-500 mx-1 rounded-md ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-100'}`}
//                 onClick={() => handlePageChange(index + 1)}
//               >
//                 {index + 1}
//               </button>
//             ))}
//             <button
//               className={`px-4 py-2 rounded-r-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}
//               disabled={currentPage === totalPages}
//               onClick={() => handlePageChange(currentPage + 1)}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Loader;






















// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMicroscope , faCreditCard ,faFile } from '@fortawesome/free-solid-svg-icons';

// function Loader({ data = [], loading, error, handleLocation }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [activeMenuId, setActiveMenuId] = useState(null);
//   const menuRef = useRef(null);
//   const navigate = useNavigate();

//   const isEmpty = !Array.isArray(data) || data.length === 0;

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentData = isEmpty ? [] : data.slice(startIndex, endIndex);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const totalPages = isEmpty ? 0 : Math.ceil(data.length / itemsPerPage);

//   const renderData = (value) => (value ? value : '-');

//   const option = (id) => {
//     if (activeMenuId === id) {
//       setMenuVisible(false);
//       setActiveMenuId(null);
//     } else {
//       setMenuVisible(true);
//       setActiveMenuId(id);
//     }
//   };

//   const handleDelete = (id) => {
//     console.log('Delete clicked for id:', id);
//   };

//   const handleViewClick = (id) => {
//     navigate('/detail', { state: { id } });
//   };

//   const handleRowClick = (item) => {
//     const latitude = item.latitude?.$numberDecimal || item.latitude;
//     const longitude = item.longitude?.$numberDecimal || item.longitude;

//     if (latitude && longitude) {
//       handleLocation(latitude, longitude);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setMenuVisible(false);
//         setActiveMenuId(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [menuRef]);

//   return (
//     <div className="mt-10">
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-center text-red-500 py-4">Error: {error}</p>
//       ) : isEmpty ? (
//         <p className="text-center py-4">No data found</p>
//       ) : (
//         <>


// <div className="overflow-x-auto">
//   <table className="min-w-full divide-y divide-gray-200 shadow-md border border-gray-200 rounded-lg">
//     <thead className="bg-gray-100">
//       <tr>
//         <th className="px-4 py-3 text-center text-xs font-semibold text-black-600 uppercase">📍</th>
//         <th className="px-4 py-3 text-center text-xs font-semibold text-black-600 uppercase"><FontAwesomeIcon icon={faMicroscope}  /></th>
//         <th className="px-4 py-3 text-center text-xs font-semibold text-black-600 uppercase"><FontAwesomeIcon icon={faCreditCard} /></th>
//         <th className="px-4 py-3 text-center text-xs font-semibold text-black-600 uppercase"><FontAwesomeIcon icon={faFile} /></th>
//         <th className="px-4 py-3 text-center text-xs font-semibold text-black-600 uppercase">Created</th>
//         <th className="px-4 py-3 text-center text-xs font-semibold text-black-600 uppercase">Expires</th>
//         <th className="px-4 py-3 text-center text-xs font-semibold text-black-600 uppercase">Inspection</th>
//         <th className="px-4 py-3 text-center text-xs font-semibold text-black-600 uppercase">Company</th>
//         <th className="px-4 py-3 text-center text-xs font-semibold text-black-600 uppercase">Type</th>
//         <th className="px-4 py-3 text-center text-xs font-semibold text-black-600 uppercase">Images Count</th>
//         <th className="px-4 py-3 text-center text-xs font-semibold text-black-600 uppercase">Assets</th>
//         <th className="px-4 py-3 text-center text-xs font-semibold text-black-600 uppercase">Action</th>
//       </tr>
//     </thead>
//     <tbody className="bg-white divide-y divide-gray-200">
//       {currentData.map((item) => (
//         <tr key={item._id} className="cursor-pointer hover:bg-gray-50">
//           <td className="px-4 py-3 text-center text-sm text-gray-700" onClick={() => handleRowClick(item)}>
//             {renderData(item.location)}
//             {/* {console.log("**************Render Data***********",renderData(item.createdAt))} */}
//           </td>
//           <td className="px-4 py-3 text-center text-sm text-gray-700">{renderData(item.B)}</td>
//           <td className="px-4 py-3 text-center text-sm text-gray-700">{renderData(item.C)}</td>
//           <td className="px-4 py-3 text-center text-sm text-gray-700">{renderData(item.D)}</td>
//           <td className="px-4 py-3 text-center text-sm text-gray-700">{new Date(item.createdAt).getDate()}/{new Date(item.createdAt).getMonth() + 1}/{new Date(item.createdAt).getFullYear()}</td>
//           <td className="px-4 py-3 text-center text-sm text-gray-700">{renderData(item.Expires)}</td>
//           <td className="px-4 py-3 text-center text-sm text-gray-700">{renderData(item.inspaction_name)}</td>
//           <td className="px-4 py-3 text-center text-sm text-gray-700">{renderData(item.inspaction_company_owner)}</td>
//           <td className="px-4 py-3 text-center text-sm text-gray-700">{renderData(item.inspaction_type)}</td>
//           <td className="px-4 py-3 text-center text-sm text-gray-700">{renderData(item.Images)}</td>
//           <td className="px-4 py-3 text-center text-sm text-gray-700">{renderData(item.Assets)}</td>
//           <td className="px-4 py-3 text-center text-sm text-gray-700 relative" onClick={() => option(item._id)}>
//             ...
//             {menuVisible && activeMenuId === item._id && (
//               <div ref={menuRef} className="absolute top-0 right-[20px] bg-white border border-gray-300 rounded-lg shadow-lg z-10">
//                 <ul className="space-y-1 py-3 px-3">
//                   <li onClick={() => handleViewClick(item._id)} className="cursor-pointer text-sm text-gray-700 hover:bg-green-400 p-2 rounded">
//                     View
//                   </li>
//                   <li onClick={() => handleDelete(item._id)} className="cursor-pointer text-sm text-gray-700 hover:bg-red-400 p-2 rounded">
//                     Delete
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>






//           <div className="flex justify-center mt-4">
//             <button
//               className={`px-4 py-2 rounded-l-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
//               disabled={currentPage === 1}
//               onClick={() => handlePageChange(currentPage - 1)}
//             >
//               Previous
//             </button>
//             {Array.from({ length: totalPages }, (_, index) => (
//               <button
//                 key={index}
//                 className={`px-4 py-2 border mx-1 rounded-md ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-100'}`}
//                 onClick={() => handlePageChange(index + 1)}
//               >
//                 {index + 1}
//               </button>
//             ))}
//             <button
//               className={`px-4 py-2 rounded-r-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
//               disabled={currentPage === totalPages}
//               onClick={() => handlePageChange(currentPage + 1)}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Loader;







// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMicroscope, faCreditCard, faFile, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Bootstrap JS import
// import Cookies from 'js-cookie';
// import axios from 'axios'
// import { handleError, handleSuccess } from '../../util';

// function Loader({ data = [], loading, error, handleLocation }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [activeMenuId, setActiveMenuId] = useState(null);
//   const [activeTab, setActiveTab] = useState('all'); // State for handling tabs
//   const menuRef = useRef(null);
//   const navigate = useNavigate();

//   const isEmpty = !Array.isArray(data) || data.length === 0;

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentData = activeTab === 'all' && !isEmpty ? data.slice(startIndex, endIndex) : [];

//   const totalPages = isEmpty ? 0 : Math.ceil(data.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const renderData = (value) => (value ? value : '-');

//   const option = (id) => {
//     if (activeMenuId === id) {
//       setMenuVisible(false);
//       setActiveMenuId(null);
//     } else {
//       setMenuVisible(true);
//       setActiveMenuId(id);
//     }
//   };

//   const handleDelete = async (id) => {
//     console.log('Delete clicked for id:', id);
//      try {
//       const response  = await axios.delete('/api/main/deletereport' , {
//         headers:{
//           'x-auth-token':localStorage.getItem('token'),
//           'x-report-id' : Cookies.get('reportId')
//         }
//       })
//       if(response.status === 200){
//         handleSuccess("Report Deleted")
//       }else{
//         handleError(response.data.message);
//       }
//      } catch (error) {
//       handleError("Report Not Deleted");
//      }
//   };

//   const handleViewClick = (id , inspaction_type) => {

//     let inspactintype = inspaction_type
//     Cookies.set('inspactiontype', inspactintype ,{ expires: 7 })
//     navigate('/detail/analyse', { state: { id } });
//   };

//   const handleRowClick = (item) => {
//     const latitude = item.latitude?.$numberDecimal || item.latitude;
//     const longitude = item.longitude?.$numberDecimal || item.longitude;

//     if (latitude && longitude) {
//       handleLocation(latitude, longitude);
//     }
//   };   

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setMenuVisible(false);
//         setActiveMenuId(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [menuRef]);

//   useEffect(() => {
//     try {
//       // Initialize tooltips
//       const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
//       tooltipTriggerList.forEach((tooltipTriggerEl) => {
//         new window.bootstrap.Tooltip(tooltipTriggerEl, {
//           delay: { show: 0, hide: 0 }, // Instant tooltip on hover
//         });
//       });
//     } catch (error) {
//       console.error('Error initializing tooltips:', error); 
//     }
//   }, []);

//   return (
//     <div className="mt-2">
//       {/* Tabs for All Inspections and Pending Inspections */}
//       <div className="flex justify-start mb-4 border-b-2 pb-2">
//         <button
//           className={`px-4 py-2 ${activeTab === 'all' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-500'}`}
//           onClick={() => setActiveTab('all')}
//         >
//           All Inspections
//         </button>
//         <button
//           className={`ml-4 px-4 py-2 ${activeTab === 'pending' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-500'}`}
//           onClick={() => setActiveTab('pending')}
//         >
//           Pending Inspections
//         </button>
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-center text-red-500 py-4">Error: {error}</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200 shadow-md border border-gray-200 rounded-lg">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-3 py-2 text-center text-xs font-semibold text-black-600 uppercase">
//                   <FontAwesomeIcon
//                     icon={faLocationCrosshairs}
//                     data-bs-toggle="tooltip"
//                     data-bs-placement="top"
//                     title="Map Visibility"
//                   />
//                 </th>
//                 <th className="px-3 py-2 text-center text-xs font-semibold text-black-600 uppercase">
//                   <FontAwesomeIcon
//                     icon={faMicroscope}
//                     data-bs-toggle="tooltip"
//                     data-bs-placement="top"
//                     title="Evaluation assigned"
//                   />
//                 </th>
//                 <th className="px-3 py-2 text-center text-xs font-semibold text-black-600 uppercase">
//                   <FontAwesomeIcon
//                     icon={faCreditCard}
//                     data-bs-toggle="tooltip"
//                     data-bs-placement="top"
//                     title="Billing status"
//                   />
//                 </th>
//                 <th className="px-3 py-2 text-center text-xs font-semibold text-black-600 uppercase">
//                   <FontAwesomeIcon
//                     icon={faFile}
//                     data-bs-toggle="tooltip"
//                     data-bs-placement="top"
//                     title="Review state"
//                   />
//                 </th>
//                 <th className="px-3 py-2 text-center text-xs font-semibold text-black-600 uppercase">Created</th>
//                 <th className="px-3 py-2 text-center text-xs font-semibold text-black-600 uppercase">Expires</th>
//                 <th className="px-3 py-2 text-center text-xs font-semibold text-black-600 uppercase">Inspection</th>
//                 <th className="px-3 py-2 text-center text-xs font-semibold text-black-600 uppercase">Company</th>
//                 <th className="px-3 py-2 text-center text-xs font-semibold text-black-600 uppercase">Type</th>
//                 <th className="px-3 py-2 text-center text-xs font-semibold text-black-600 uppercase">Images Count</th>
//                 <th className="px-3 py-2 text-center text-xs font-semibold text-black-600 uppercase">Assets</th>
//                 <th className="px-3 py-2 text-center text-xs font-semibold text-black-600 uppercase">Action</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {activeTab === 'all' && currentData.length > 0 ? (
//                 currentData.map((item) => (
//                   <tr key={item._id} className="cursor-pointer hover:bg-gray-50">
//                     <td
//                       className="px-4 py-3 text-center text-sm text-gray-700"
//                       onClick={() => handleRowClick(item)}
//                     >
//                       {renderData(item.location)}
//                     </td>
//                     <td className="px-3 py-2 text-center text-sm text-gray-700" onClick={() => handleViewClick(item._id , item.inspaction_type)}>{renderData(item.B)}</td>
//                     <td className="px-3 py-2 text-center text-sm text-gray-700" onClick={() => handleViewClick(item._id , item.inspaction_type)}>{renderData(item.C)}</td>
//                     <td className="px-3 py-2 text-center text-sm text-gray-700" onClick={() => handleViewClick(item._id , item.inspaction_type)}>{renderData(item.D)}</td>
//                     <td className="px-3 py-2 text-center text-sm text-gray-700" onClick={() => handleViewClick(item._id , item.inspaction_type)}>
//                       {new Date(item.createdAt).getDate()}/{new Date(item.createdAt).getMonth() + 1}/
//                       {new Date(item.createdAt).getFullYear()}
//                     </td>
//                     <td className="px-3 py-2 text-center text-sm text-gray-700" onClick={() => handleViewClick(item._id , item.inspaction_type)}>{renderData(item.Expires)}</td>
//                     <td className="px-3 py-2 text-center text-sm text-gray-700" onClick={() => handleViewClick(item._id , item.inspaction_type)}>{renderData(item.inspaction_name)}</td>
//                     <td className="px-3 py-2 text-center text-sm text-gray-700" onClick={() => handleViewClick(item._id , item.inspaction_type)}>
//                       {renderData(item.inspaction_company_owner)}
//                     </td>
//                     <td className="px-4 py-3 text-center text-sm text-gray-700" onClick={() => handleViewClick(item._id , item.inspaction_type)}>{renderData(item.inspaction_type)}</td>
//                     <td className="px-4 py-3 text-center text-sm text-gray-700" onClick={() => handleViewClick(item._id , item.inspaction_type)}>{renderData(item.totalImagesProcessed)}</td>
//                     <td className="px-4 py-3 text-center text-sm text-gray-700" onClick={() => handleViewClick(item._id , item.inspaction_type)}>{renderData(item.Assets)}</td>
//                     <td
//                       className="px-3 py-2 text-center text-sm text-gray-700 relative"
//                       // onClick={() => option(item._id)}
//                     >
//                       <button
//                               onClick={() => handleDelete(item._id)}
//                               className="cursor-pointer text-sm text-gray-700 hover:bg-red-400 p-2 rounded"
//                             >
//                               Delete
//                             </button>
//                       {/* ...
//                       {menuVisible && activeMenuId === item._id && (
//                         <div
//                           ref={menuRef}
//                           className="absolute top-0 right-[20px] bg-white border border-gray-300 rounded-lg shadow-lg z-10"
//                         >
//                           <ul className="space-y-1 py-3 px-3">
//                             <li
//                               // onClick={() => handleViewClick(item._id)}
//                               className="cursor-pointer text-sm text-gray-700 hover:bg-green-400 p-2 rounded"
//                             >
//                               View
//                             </li>
//                             <li
//                               onClick={() => handleDelete(item._id)}
//                               className="cursor-pointer text-sm text-gray-700 hover:bg-red-400 p-2 rounded"
//                             >
//                               Delete
//                             </li>
//                           </ul>
//                         </div>
//                       )} */}
//                     </td>
//                   </tr>
//                 ))
//               ) : activeTab === 'pending' ? (
//                 <tr>
//                   <td colSpan="12" className="text-center py-4 text-gray-500">No pending inspections</td>
//                 </tr>
//               ) : (
//                 <tr>
//                   <td colSpan="12" className="text-center py-4 text-gray-500">No data found</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//           {/* Pagination Section */}
//           <div className="flex justify-center mt-4">
//             <button
//               className={`px-4 py-2 rounded-l-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
//               disabled={currentPage === 1}
//               onClick={() => handlePageChange(currentPage - 1)}
//             >
//               Previous
//             </button>
//             {Array.from({ length: totalPages }, (_, index) => (
//               <button
//                 key={index}
//                 className={`px-4 py-2 border mx-1 rounded-md ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-100'}`}
//                 onClick={() => handlePageChange(index + 1)}
//               >
//                 {index + 1}
//               </button>
//             ))}
//             <button
//               className={`px-4 py-2 rounded-r-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
//               disabled={currentPage === totalPages}
//               onClick={() => handlePageChange(currentPage + 1)}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Loader;







































 












import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS import
import Cookies from 'js-cookie';
import axios from 'axios';
import { handleError, handleSuccess } from '../../util';
import mapimg from '../Media/1865269.png';
import Evaluation from '../Media/2666505.png';
import Cardimage from '../Media/2965335.png';
import filesimage from '../Media/8983163.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { PDFDownloadLink, PDFViewer, Document, Page } from '@react-pdf/renderer';
// import Generatepdfdocument from '../main_insides/GenerateRepotLogics/generatepdfdocument';
import Generatepdfdocumentmain from './pdfmain'
import { NavbarOffcanvas } from 'react-bootstrap';
import Pdfbutton from './pdfbutton';
import './mainrespon.css'

function Loader({ data = [], loading, error, handleLocation , activetabb }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const isEmpty = !Array.isArray(data) || data.length === 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const currentData = activeTab === 'all' && !isEmpty ? data.slice(startIndex, endIndex) : [];
  const currentData = activeTab === 'all' && !isEmpty ? data.slice().reverse().slice(startIndex, endIndex) : [];

  const totalPages = isEmpty ? 0 : Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
   
  useEffect(()=>{
    setActiveTab(activetabb)
  },[activetabb])

    
  const renderData = (value) => (value ? value : '-');
  const handleDelete = async (id) => {

    try {
      const response = await axios.delete('http://13.201.248.202:3001/api/main/deletereport', {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
          // 'x-report-id': Cookies.get('reportId'),
          'x-report-id': id
        },
      });
      response.status === 200 ? handleSuccess('Report Deleted') : handleError(response.data.message);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch {
      handleError('Report Not Deleted');
    }
  };

  const handleViewClick = (id, inspaction_type) => {
    localStorage.setItem('reportpdf' , undefined);
    Cookies.set('inspactiontype', inspaction_type, { expires: 7 });
    navigate('/detail/analyse', { state: { id } });
  };

  const handleRowClick = (item) => {
    const latitude = item.latitude?.$numberDecimal || item.latitude;
    const longitude = item.longitude?.$numberDecimal || item.longitude;
    if (latitude && longitude) handleLocation(latitude, longitude);
  };

  function navigatetopdf (id){
    // // Cookies.set('reportId2', id, { expires: 7 });
    // localStorage.setItem('reportpdf' , id); 
    // alert(Cookies.get('reportId2'))
    // let reportId = id;
    // navigate(`/detail/generateReport/${reportId}`, { state: { from: '/main' } });
    navigate('/download' , {state:{reportid:id}})
  }

   

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuRef]);

 
  useEffect(() => {
    try {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.forEach((tooltipTriggerEl) => {
        new window.bootstrap.Tooltip(tooltipTriggerEl);
      });
    } catch (error) {
      console.error('Error initializing tooltips:', error);
    }
  }, []);
  const [reportId, setReportId] = useState(null);

  const capitalizeWords = (str) => {
    if (!str) return '';
    let word = "";

    for (let i = 0; i < str.length; i++) {
        if (i === 0 || str.charAt(i - 1) === ' ') {
            word += str.charAt(i).toUpperCase();
        } else {
            word += str.charAt(i);
        }
    }
    return word;


    // return str
    //   .split(' ')
    //   .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    //   .join(' ');
  };
  
 

  return (
    <div className="mt-2 tableresponsive">
      

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 py-4">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto ">
          <table className="min-w-full divide-y divide-black-100  border border-gray-100 rounded ">
            <thead className=" bg-[#1e1e1e] text-white">
              <tr>
                {[
                  { img: mapimg, title: 'Map Visibility' },
                  { img: Evaluation, title: 'Evaluation Assigned' },
                  { img: filesimage, title: 'Billing Status' },
                  { img: Cardimage, title: 'Review State' },
                ].map((icon, index) => (
                  <th key={index} className="px-3 py-2 text-center">
                    <div className="flex justify-center items-center">
                      <img
                        src={icon.img}
                        alt={icon.title}
                        width={20}
                        height={20}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={icon.title}
                      />
                    </div>
                  </th>
                ))}
                {['Created', 'Expires', 'Inspection', 'Company', 'Type', 'Images Count', 'Assets', 'Action', 'Download Report'].map(
                  (header) => (
                    <th key={header} className="px-3 py-2 text-center text-xs font-semibold uppercase ">
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className=" divide-y divide-white-50 ">
              {activeTab === 'all' && currentData.length > 0 ? (
                currentData.map((item) => (
                  <tr
                    key={item._id}
                    className="cursor-pointer hover:bg-gray-200"
                    onClick={() => handleViewClick(item._id, item.inspaction_type)}
                  >
                    <td className="px-4 py-3 text-center bg-[#1e1e1e] text-white">{renderData(item.location)}</td>
                    <td className="px-3 py-2 text-center bg-[#1e1e1e] text-white">{renderData(item.B)}</td>
                    <td className="px-3 py-2 text-center bg-[#1e1e1e] text-white">{renderData(item.C)}</td>
                    <td className="px-3 py-2 text-center bg-[#1e1e1e] text-white">{renderData(item.D)}</td>
                    <td className="px-3 py-2 text-center bg-[#1e1e1e] text-white">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-2 text-center bg-[#1e1e1e]">{renderData(item.Expires)}</td>
                    {/* <td className="px-3 py-2 text-center bg-[#1e1e1e] text-white">{renderData(item.inspaction_name)}</td> */}

                    <td className="px-3 py-2 text-center bg-[#1e1e1e] text-white ">
  {capitalizeWords(item.inspaction_name)}
</td>


                    <td className="px-3 py-2 text-center bg-[#1e1e1e] text-white">{renderData(item.inspaction_company_owner)}</td>
                    <td className="px-3 py-2 text-center bg-[#1e1e1e] text-white">{renderData(item.inspaction_type)}</td>
                    <td className="px-3 py-2 text-center bg-[#1e1e1e] text-white">{renderData(item.image_on_cloudanary_uri.length)}</td>
                    <td className="px-3 py-2 text-center bg-[#1e1e1e] text-white">{renderData(item.Assets)}</td>
                    <td className="px-3 py-2 text-center bg-[#1e1e1e] text-white">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click when delete is clicked
                          handleDelete(item._id);
                        }}
                        className="text-sm text-white bg-danger p-2 px-3 rounded"
                      >
                        Delete
                      </button>



                    </td>

                    <td className="px-3 py-2 text-center bg-[#1e1e1e]" onClick={(e) => e.stopPropagation()}>
                       {/* <FontAwesomeIcon icon={faFileArrowDown} onClick={()=> navigatetopdf(item._id, item.inspaction_type)} /> */}
                       < Pdfbutton id={item._id}  onClick={()=> navigatetopdf(item._id, item.inspaction_type)} />
                    </td>




                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center py-4 text-white bg-[#1e1e1e]">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-center mt-2">
            <button
              className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`px-4 py-2 mx-1 rounded ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-white'}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Loader;

