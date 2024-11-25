// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
// import exifParser from 'exif-parser';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { handleError, handleSuccess } from '../../util';
// import { ToastContainer } from 'react-toastify';
// import { RotatingLines , Audio  , InfinitySpin } from 'react-loader-spinner'; // Import loader spinner

// function Main_upload() {
//   const [handleUpload, setHandleUpload] = useState(false);
//   const [file, setFile] = useState(null); // To hold the selected file
//   const [metaData, setMetaData] = useState(null); // To hold the extracted metadata
//   const [isLoading, setIsLoading] = useState(false); // Loader state to show/hide spinner

//   const location = useLocation();
//   const reportId = location.state?.id;

//   // Function to handle file selection
//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setHandleUpload(true);
//       extractMetadata(selectedFile); // Extract metadata from the file
//     }
//   };

//   // Function to extract metadata using exif-parser
//   const extractMetadata = (file) => {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       const arrayBuffer = e.target.result;
//       const parser = exifParser.create(arrayBuffer);
//       const exifData = parser.parse();

//       if (exifData.tags) {
//         const { GPSLatitude, GPSLongitude } = exifData.tags;
//         setMetaData({
//           latitude: GPSLatitude || 'Not available',
//           longitude: GPSLongitude || 'Not available',
//         });
//       } else {
//         setMetaData({ latitude: 'Not available', longitude: 'Not available' });
//       }
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   // Function to handle file upload and API call for storing the metadata
//   const handleUploadClick = async () => {
//     if (!file) {
//       handleError('Please select a file before uploading.');
//       return;
//     }

//     const formDataExt = new FormData();
//     formDataExt.append('image', file);  // Append the file

//     // Append metadata to FormData if available
//     if (metaData) {
//       formDataExt.append('latitude', metaData.latitude);   
//       formDataExt.append('longitude', metaData.longitude);  
//     }

//     setIsLoading(true); // Show the loader before making the API request
//     try {
//       // Axios POST request with FormData
//       const response = await axios.post('/api/main/addimage', formDataExt, {
//         headers: {
//           'Content-Type': 'multipart/form-data',  // Multipart form for file uploads
//           'x-report-id': reportId,
//           'x-company_id': localStorage.getItem('company_id'),
//           'x-auth-token': localStorage.getItem('token')
//         }
//       });

//       if (response.status === 200) {
//         handleSuccess('Image uploaded successfully');
//         console.log('File uploaded successfully:', response.data);
//       } else {
//         handleError('Error while uploading the file.');
//       }
//     } catch (error) { 
//       console.error('Error in API response from Axios:', error);
//       handleError('Failed to upload image');
//     } finally {
//       setIsLoading(false); // Hide the loader once the request is completed
//     }
//   };


//   const handleDelete = () => {
//     setFile(null);
//     setHandleUpload(false);
//     setMetaData(null);  
//   };

//   return (
//     <div className="d-flex h-100">
//       {/* Left Sidebar */}
//       <form encType="multipart/form-data" className="w-25">
//         <div className="left-panel bg-light border-right p-4">
//           <h6>Upload Method</h6>
//           <div className="mb-4">
//             <input
//               type="file"
//               className="btn btn-outline-primary w-100"
//               onChange={handleFileChange}
//             />
//           </div>

//           <h6>Asset Upload History</h6>
//           <div className="border p-2 mb-4">
//             <p className="mb-1">1 - Building</p>
//             <small>Sep 21, 2024, 3:28:58 PM</small>
//           </div>

//           <h6>Billing Status</h6>
//           <div className="border p-3">
//             <p className="mb-1">
//               Subscription Status: <span className="badge badge-warning">Trial</span>
//             </p>
//             <p>Expires: Sep 27, 2024</p>
//             <div className="progress mb-1">
//               <div
//                 className="progress-bar"
//                 role="progressbar"
//                 style={{ width: '46%' }}
//                 aria-valuenow="46"
//                 aria-valuemin="0"
//                 aria-valuemax="1000"
//               ></div>
//             </div>
//             <small>Image Usage: 464 / 1000</small>
//           </div>
//         </div>
//       </form>

//       {/* Right Panel */}
//       <div className="right-panel d-flex flex-column justify-content-center align-items-center w-75 bg-light p-4">
//         {/* Show loader if the image is being uploaded */}
//         {isLoading ? (
//           <InfinitySpin  // Show the loader while the request is pending
//             strokeColor="blue"
//             strokeWidth="5"
//             animationDuration="0.75"
//             width="96"
//             visible={true}
//           />
//         ) : (
//           <>
//             {/* Show file details if uploaded */}
//             {handleUpload && file && (
//               <div className="uploaded-file-container bg-white border rounded p-3 w-100">
//                 <div className="row align-items-center">
//                   {/* Image on the left */}
//                   <div className="col-3">
//                     <img
//                       src={URL.createObjectURL(file)}
//                       alt="Uploaded"
//                       className="img-thumbnail"
//                       style={{ width: '100px', height: '100px' }}
//                     />
//                   </div>

//                   {/* File details in the center */}
//                   <div className="col-5">
//                     <h6 className="mb-1">{file.name}</h6>
//                     <p className="text-muted mb-1">{(file.size / 1024).toFixed(2)} KB</p>
//                     {/* Display metadata (Latitude & Longitude) */}
//                     {metaData && (
//                       <div>
//                         <p>Latitude: {metaData.latitude}</p>
//                         <p>Longitude: {metaData.longitude}</p>
//                       </div>
//                     )}
//                   </div>

//                   {/* Upload and Delete buttons on the right */}
//                   <div className="col-4 text-right">
//                     <button
//                       type="button"
//                       className="btn btn-success btn-sm mr-2"
//                       onClick={handleUploadClick}
//                     >
//                       Upload
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-danger btn-sm"
//                       onClick={handleDelete}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//       <h1>report id is : {reportId}</h1>
//       <ToastContainer />
//     </div>
//   );
// }

// export default Main_upload;















// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
// import exifParser from 'exif-parser';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { handleError, handleSuccess } from '../../util';
// import { ToastContainer } from 'react-toastify';
// import { InfinitySpin } from 'react-loader-spinner'; // Import loader spinner

// function Main_upload() {
//   const [handleUpload, setHandleUpload] = useState(false);
//   const [file, setFile] = useState(null); // To hold the selected file
//   const [metaData, setMetaData] = useState(null); // To hold the extracted metadata
//   const [isLoading, setIsLoading] = useState(false); // Loader state to show/hide spinner

//   const location = useLocation();
//   const reportId = location.state?.id;

//   // Function to handle file selection
//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setHandleUpload(true);
//       extractMetadata(selectedFile); // Extract metadata from the file
//     }
//   };

//   // Function to extract metadata using exif-parser
//   const extractMetadata = (file) => {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       const arrayBuffer = e.target.result;
//       const parser = exifParser.create(arrayBuffer);
//       const exifData = parser.parse();

//       if (exifData.tags) {
//         const { GPSLatitude, GPSLongitude } = exifData.tags;
//         setMetaData({
//           latitude: GPSLatitude || 'Not available',
//           longitude: GPSLongitude || 'Not available',
//         });
//       } else {
//         setMetaData({ latitude: 'Not available', longitude: 'Not available' });
//       }
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   // Function to handle file upload and API call for storing the metadata
//   const handleUploadClick = async () => {
//     if (!file) {
//       handleError('Please select a file before uploading.');
//       return;
//     }

//     const formDataExt = new FormData();
//     formDataExt.append('image', file);  // Append the file

//     // Append metadata to FormData if available
//     if (metaData) {
//       formDataExt.append('latitude', metaData.latitude);   
//       formDataExt.append('longitude', metaData.longitude);  
//     }

//     setIsLoading(true); // Show the loader before making the API request
//     try {
//       // Axios POST request with FormData
//       const response = await axios.post('/api/main/addimage', formDataExt, {
//         headers: {
//           'Content-Type': 'multipart/form-data',  // Multipart form for file uploads
//           'x-report-id': reportId,
//           'x-company_id': localStorage.getItem('company_id'),
//           'x-auth-token': localStorage.getItem('token')
//         }
//       });

//       if (response.status === 200) {
//         handleSuccess('Image uploaded successfully');
//         console.log('File uploaded successfully:', response.data);
//       } else {
//         handleError('Error while uploading the file.');
//       }
//     } catch (error) { 
//       console.error('Error in API response from Axios:', error);
//       handleError('Failed to upload image');
//     } finally {
//       setIsLoading(false); // Hide the loader once the request is completed
//     }
//   };


//   const handleDelete = () => {
//     setFile(null);
//     setHandleUpload(false);
//     setMetaData(null);  
//   };

//   return (
//     <div className="d-flex h-100">
//       {/* Left Sidebar */}
//       <form encType="multipart/form-data" className="w-25">
//         <div className="left-panel bg-white shadow-sm p-4 d-flex flex-column" style={{ height: '100vh' }}>
//           <h6 className="text-primary">Upload Method</h6>
//           <div className="mb-4">
//             <input
//               type="file"
//               className="btn btn-outline-primary w-100"
//               onChange={handleFileChange}
//             />
//           </div>

//           <h6 className="text-primary">Asset Upload History</h6>
//           <div className="border p-3 rounded bg-light mb-4 shadow-sm">
//             <p className="mb-1">1 - Building</p>
//             <small>Sep 21, 2024, 3:28:58 PM</small>
//           </div>

//           <h6 className="text-primary">Billing Status</h6>
//           <div className="border p-3 rounded bg-light shadow-sm mb-auto">
//             <p className="mb-1">
//               Subscription Status: <span className="badge badge-warning">Trial</span>
//             </p>
//             <p>Expires: Sep 27, 2024</p>
//             <div className="progress mb-1">
//               <div
//                 className="progress-bar bg-info"
//                 role="progressbar"
//                 style={{ width: '46%' }}
//                 aria-valuenow="46"
//                 aria-valuemin="0"
//                 aria-valuemax="1000"
//               ></div>
//             </div>
//             <small>Image Usage: 464 / 1000</small>
//           </div>

//           {/* Extra space or additional content can be added here */}
//           <div className="mt-auto">
//             <p className="text-muted small">Powered by Future Land</p>
//           </div>
//         </div>
//       </form>

//       {/* Right Panel */}
//       <div className="right-panel d-flex flex-column justify-content-center align-items-center w-75 bg-light p-4">
//         {/* Show loader if the image is being uploaded */}
//         {isLoading ? (
//           <InfinitySpin  
//             strokeColor="blue"
//             strokeWidth="5"
//             animationDuration="0.75"
//             width="96"
//             visible={true}
//           />
//         ) : (
//           <>
//             {/* Show file details if uploaded */}
//             {handleUpload && file && (
//               <div className="uploaded-file-container bg-white border rounded p-4 shadow-sm w-100">
//                 <div className="row align-items-center">
//                   {/* Image on the left */}
//                   <div className="col-3">
//                     <img
//                       src={URL.createObjectURL(file)}
//                       alt="Uploaded"
//                       className="img-thumbnail"
//                       style={{ width: '100px', height: '100px' }}
//                     />
//                   </div>

//                   {/* File details in the center */}
//                   <div className="col-5">
//                     <h6 className="mb-1 text-primary">{file.name}</h6>
//                     <p className="text-muted mb-1">{(file.size / 1024).toFixed(2)} KB</p>
//                     {/* Display metadata (Latitude & Longitude) */}
//                     {metaData && (
//                       <div>
//                         <p>Latitude: {metaData.latitude}</p>
//                         <p>Longitude: {metaData.longitude}</p>
//                       </div>
//                     )}
//                   </div>

//                   {/* Upload and Delete buttons on the right */}
//                   <div className="col-4 text-right">
//                     <button
//                       type="button"
//                       className="btn btn-success btn-sm mr-2"
//                       onClick={handleUploadClick}
//                     >
//                       Upload
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-danger btn-sm"
//                       onClick={handleDelete}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//       {/* <h1 className="text-primary">Report ID: {reportId}</h1> */}
//       <ToastContainer />
//     </div>
//   );
// }

// export default Main_upload;



// THIS ABOVE CODE IS THE MAIN ONE, SO DONT TOUCH IT

// import React, { useState, useRef } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import exifParser from 'exif-parser';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { handleError, handleSuccess } from '../../util';
// import { ToastContainer } from 'react-toastify';
// import { InfinitySpin } from 'react-loader-spinner';

// function Main_upload() {
//   const [files, setFiles] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState({});
//   const location = useLocation();
//   const reportId = location.state?.id;
//   const dropAreaRef = useRef(null);

//   const handleFileChange = (event) => {
//     const selectedFiles = Array.from(event.target.files);
//     setFiles((prev) => [...prev, ...selectedFiles]);
//   };

//   const handleCancelUpload = (index) => {
//     setFiles((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleDeleteAll = () => {
//     setFiles([]);
//     setUploadProgress({});
//   };

//   const handleUploadClick = async () => {
//     setIsLoading(true);
//     const formData = new FormData();
//     files.forEach((file) => formData.append('images', file));

//     try {
//       const response = await axios.post('/api/main/addimage', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'x-report-id': reportId,
//           'x-company_id': localStorage.getItem('company_id'),
//           'x-auth-token': localStorage.getItem('token'),
//         },
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           setUploadProgress({ overall: percentCompleted });
//         },
//       });

//       if (response.status === 200) handleSuccess('Images uploaded successfully');
//       else handleError('Error while uploading the files.');
//     } catch (error) {
//       handleError('Failed to upload images');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     dropAreaRef.current.classList.add('bg-blue-100'); // Highlight area
//   };

//   const handleDragLeave = () => {
//     dropAreaRef.current.classList.remove('bg-blue-100'); // Remove highlight
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     dropAreaRef.current.classList.remove('bg-blue-100');
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     setFiles((prev) => [...prev, ...droppedFiles]);
//   };

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Left Sidebar */}
//       <form className="w-1/4 h-full bg-white shadow-lg p-4 flex flex-col border-r border-gray-200 overflow-y-auto">
//         <h6 className="text-blue-600 mb-4">Upload Method</h6>
//         <input
//           type="file"
//           multiple
//           onChange={handleFileChange}
//           className="w-full border px-4 py-2 mb-6"
//         />

//         <h6 className="text-blue-600 mb-4">Asset Upload History</h6>
//         <div className="border p-3 rounded mb-6 bg-gray-100 shadow-sm">
//           <p>1 - Building</p>
//           <small>Sep 21, 2024, 3:28:58 PM</small>
//         </div>

//         <h6 className="text-blue-600 mb-4">Billing Status</h6>
//         <div className="border p-3 rounded bg-gray-100 shadow-sm mb-auto">
//           <p className="mb-1">
//             Subscription Status: 
//             <span className="bg-yellow-400 px-2 py-1 rounded-full text-xs text-white">Trial</span>
//           </p>
//           <p className="mb-2">Expires: Sep 27, 2024</p>
//           <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
//             <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '46%' }}></div>
//           </div>
//           <small>Image Usage: 464 / 1000</small>
//         </div>

//         <div className="mt-auto text-sm text-gray-500">Powered by Smart Inspection</div>
//       </form>

//       {/* Right Panel with Drag-and-Drop Area */}
//       <div className="w-3/4 bg-gray-50 p-6 overflow-y-auto">
//         {/* Drag-and-Drop Area */}
//         <div
//           ref={dropAreaRef}
//           className="w-full h-64 border-dashed border-2 border-gray-300 flex flex-col items-center justify-center mb-4"
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//         >
//           <h3 className="text-blue-600">Drag & Drop Files or Folders Here</h3>
//           <p>Or click below to upload</p>
//           <input
//             type="file"
//             className="hidden"
//             id="file-upload"
//             multiple
//             onChange={handleFileChange}
//           />
//           <label
//             htmlFor="file-upload"
//             className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer"
//           >
//             Browse Files
//           </label>
//         </div>

//         {/* Existing Buttons */}
//         {files.length > 0 && (
//           <>
//             <div className="w-full flex justify-between mb-4">
//               <button
//                 onClick={handleUploadClick}
//                 disabled={isLoading}
//                 className="bg-green-500 text-white px-4 py-2 rounded"
//               >
//                 Upload All
//               </button>
//               <button
//                 onClick={handleDeleteAll}
//                 className="bg-red-500 text-white px-4 py-2 rounded"
//               >
//                 Delete All
//               </button>
//             </div>

//             {/* Uploaded Files List */}
//             <div className="w-full bg-white border rounded p-4 shadow-lg">
//               {files.map((file, index) => (
//                 <div
//                   key={index}
//                   className="flex justify-between text-start items-center border-b p-2"
//                 >
//                   <div>
//                     <h6 className="text-blue-600 text-[14px]">{file.name}</h6>
//                     <p className='text-[13px]'>{(file.size / 1024).toFixed(2)} KB</p>
//                   </div>
//                   <button
//                     onClick={() => handleCancelUpload(index)}
//                     className="text-red-500 hover:text-red-700 text-[14px]"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {/* Loading Spinner */}
//             {isLoading && (
//               <div className="mt-4">
//                 <InfinitySpin width="50" color="blue" />
//                 <p>{uploadProgress.overall || 0}%</p>
//               </div>
//             )}
//           </>
//         )}

//         <ToastContainer />
//       </div>
//     </div>
//   );
// }

// export default Main_upload;






































// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import exifParser from 'exif-parser';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { handleError, handleSuccess } from '../../util';
// import { ToastContainer } from 'react-toastify';
// import { InfinitySpin } from 'react-loader-spinner';

// function Main_upload() {
//   const [handleUpload, setHandleUpload] = useState(false);
//   const [files, setFiles] = useState([]);
//   const [metaData, setMetaData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const location = useLocation();
//   const reportId = location.state?.id;

//   const handleFileChange = (event) => {
//     const selectedFiles = Array.from(event.target.files);
//     setFiles(selectedFiles);
//     setHandleUpload(true);
//     setUploadProgress(0); // Reset progress bar to 0% on new file select
//     selectedFiles.forEach((file) => {
//       extractMetadata(file);
//     });
//   };

//   const extractMetadata = (file) => {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       const arrayBuffer = e.target.result;
//       const parser = exifParser.create(arrayBuffer);
//       const exifData = parser.parse();

//       const { GPSLatitude, GPSLongitude } = exifData.tags || {};
//       setMetaData((prevMetaData) => [
//         ...prevMetaData,
//         {
//           latitude: GPSLatitude || 'Not available',
//           longitude: GPSLongitude || 'Not available',
//         },
//       ]);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const handleUploadClick = async () => {
//     if (!files.length) {
//       handleError('Please select files before uploading.');
//       return;
//     }

//     const formDataExt = new FormData();
//     files.forEach((file) => {
//       formDataExt.append('images', file);
//     });

//     if (metaData) {
//       metaData.forEach((data, index) => {
//         formDataExt.append(`latitude_${index}`, data.latitude);
//         formDataExt.append(`longitude_${index}`, data.longitude);
//       });
//     }

//     setIsLoading(true);
//     try {
//       const response = await axios.post('/api/main/addimage', formDataExt, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'x-report-id': reportId,
//           'x-company_id': localStorage.getItem('company_id'),
//           'x-auth-token': localStorage.getItem('token'),
//         },
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           setUploadProgress(percentCompleted); // Update progress percentage
//         },
//       });

//       if (response.status === 200) {
//         handleSuccess('Images uploaded successfully');
//         console.log('Files uploaded successfully:', response.data);
//       } else {
//         handleError('Error while uploading the files.');
//       }
//     } catch (error) {
//       console.error('Error in API response from Axios:', error);
//       handleError('Failed to upload images');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = () => {
//     setFiles([]);
//     setHandleUpload(false);
//     setMetaData([]);
//   };

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Left Sidebar */}
//       <form encType="multipart/form-data" className="w-1/4 h-full bg-white shadow-lg p-4 flex flex-col border-r border-gray-200 overflow-y-auto">
//         <h6 className="text-blue-600 mb-4">Upload Method</h6>
//         <div className="mb-6">
//           <input
//             type="file"
//             className="w-full border border-gray-300 px-4 py-2 text-gray-700 bg-white shadow-sm"
//             onChange={handleFileChange}
//             multiple // Allow multiple files
//           />
//         </div>

//         <h6 className="text-blue-600 mb-4">Asset Upload History</h6>
//         <div className="border p-3 rounded bg-gray-100 mb-6 shadow-sm">
//           <p className="mb-1">1 - Building</p>
//           <small>Sep 21, 2024, 3:28:58 PM</small>
//         </div>

//         <h6 className="text-blue-600 mb-4">Billing Status</h6>
//         <div className="border p-3 rounded bg-gray-100 shadow-sm mb-auto">
//           <p className="mb-1">
//             Subscription Status: <span className="bg-yellow-400 px-2 py-1 rounded-full text-xs text-white">Trial</span>
//           </p>
//           <p className="mb-2">Expires: Sep 27, 2024</p>
//           <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
//             <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '46%' }}></div>
//           </div>
//           <small>Image Usage: 464 / 1000</small>
//         </div>

//         <div className="mt-auto text-gray-500 text-sm">
//           <p>Powered by Smart Inspection</p>
//         </div>
//       </form>

//       {/* Right Panel */}
//       <div className="w-3/4 bg-gray-50 p-6 flex flex-col justify-center items-center">
//         {isLoading ? (
//           <>
//             <InfinitySpin
//               strokeColor="blue"
//               strokeWidth="5"
//               animationDuration="0.75"
//               width="96"
//               visible={true}
//             />
//             <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
//               <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
//               <p className="text-gray-600 mt-2">{uploadProgress}%</p>
//             </div>
//           </>
//         ) : (
//           <div className="flex flex-col justify-center items-center w-full bg-white border rounded-lg p-6 shadow-lg">
//             <p className="text-gray-600 mb-4">Drag and drop your files here, or click to upload</p>
//             <input
//               type="file"
//               id="file-upload"
//               className="hidden"
//               onChange={handleFileChange}
//               multiple // Allow multiple files
//             />
//             <label
//               htmlFor="file-upload"
//               className="cursor-pointer text-blue-600 border border-blue-600 rounded-lg px-4 py-2 hover:bg-blue-50"
//             >
//               Browse Files
//             </label>
//           </div>
//         )}

//         {handleUpload && files.length > 0 && !isLoading && (
//           <div className="w-full bg-white border rounded-lg p-6 shadow-lg mt-6">
//             {files.map((file, index) => (
//               <div className="flex items-center mb-4" key={index}>
//                 <img
//                   src={URL.createObjectURL(file)}
//                   alt="Uploaded"
//                   className="w-24 h-24 rounded-lg mr-6"
//                 />
//                 <div className="flex-grow">
//                   <h6 className="text-blue-600 mb-2">{file.name}</h6>
//                   <p className="text-gray-500 mb-2">{(file.size / 1024).toFixed(2)} KB</p>
//                   {metaData[index] && (
//                     <div className="text-gray-500">
//                       <p>Latitude: {metaData[index].latitude}</p>
//                       <p>Longitude: {metaData[index].longitude}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//             <div className="flex space-x-2">
//               <button
//                 type="button"
//                 className="bg-green-500 text-white px-4 py-2 rounded-lg"
//                 onClick={handleUploadClick}
//               >
//                 Upload All
//               </button>
//               <button
//                 type="button"
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg"
//                 onClick={handleDelete}
//               >
//                 Delete All
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default Main_upload;












// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import exifParser from 'exif-parser';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { handleError, handleSuccess } from '../../util';
// import { ToastContainer } from 'react-toastify';
// import { InfinitySpin } from 'react-loader-spinner';

// function Main_upload() {
//   const [handleUpload, setHandleUpload] = useState(false);
//   const [files, setFiles] = useState([]);
//   const [metaData, setMetaData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState([]);
//   const [uploadStatus, setUploadStatus] = useState([]);

//   const location = useLocation();
//   const reportId = location.state?.id;

//   const handleFileChange = (event) => {
//     const selectedFiles = Array.from(event.target.files);
//     setFiles(selectedFiles);
//     setHandleUpload(true);
//     setUploadProgress(new Array(selectedFiles.length).fill(0)); // Reset progress for each file
//     setUploadStatus(new Array(selectedFiles.length).fill('pending')); // Set status to 'pending' for each file
//     selectedFiles.forEach((file) => {
//       extractMetadata(file);
//     });
//   };

//   const extractMetadata = (file) => {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       const arrayBuffer = e.target.result;
//       const parser = exifParser.create(arrayBuffer);
//       const exifData = parser.parse();

//       const { GPSLatitude, GPSLongitude } = exifData.tags || {};
//       setMetaData((prevMetaData) => [
//         ...prevMetaData,
//         {
//           latitude: GPSLatitude || 'Not available',
//           longitude: GPSLongitude || 'Not available',
//         },
//       ]);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const handleUploadClick = async () => {
//     if (!files.length) {
//       handleError('Please select files before uploading.');
//       return;
//     }

//     setIsLoading(true);
//     const promises = files.map((file, index) => uploadFile(file, index));

//     try {
//       await Promise.all(promises);
//       handleSuccess('All images uploaded successfully');
//     } catch (error) {
//       console.error('Error uploading files:', error);
//       handleError('Some files failed to upload');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const uploadFile = async (file, index) => {
//     const formDataExt = new FormData();
//     formDataExt.append('images', file);

//     if (metaData[index]) {
//       formDataExt.append(`latitude_${index}`, metaData[index].latitude);
//       formDataExt.append(`longitude_${index}`, metaData[index].longitude);
//     }

//     try {
//       const response = await axios.post('/api/main/addimage', formDataExt, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'x-report-id': reportId,
//           'x-company_id': localStorage.getItem('company_id'),
//           'x-auth-token': localStorage.getItem('token'),
//         },
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           setUploadProgress((prevProgress) => {
//             const newProgress = [...prevProgress];
//             newProgress[index] = percentCompleted;
//             return newProgress;
//           });
//         },
//       });

//       if (response.status === 200) {
//         setUploadStatus((prevStatus) => {
//           const newStatus = [...prevStatus];
//           newStatus[index] = 'success';
//           return newStatus;
//         });
//       } else {
//         throw new Error('Upload failed');
//       }
//     } catch (error) {
//       setUploadStatus((prevStatus) => {
//         const newStatus = [...prevStatus];
//         newStatus[index] = 'failed';
//         return newStatus;
//       });
//       throw error;
//     }
//   };

//   const handleDelete = () => {
//     setFiles([]);
//     setHandleUpload(false);
//     setMetaData([]);
//     setUploadProgress([]);
//     setUploadStatus([]);
//   };

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Left Sidebar */}
//       <form encType="multipart/form-data" className="w-1/4 h-full bg-white shadow-lg p-4 flex flex-col border-r border-gray-200 overflow-y-auto">
//         <h6 className="text-blue-600 mb-4">Upload Method</h6>
//         <div className="mb-6">
//           <input
//             type="file"
//             className="w-full border border-gray-300 px-4 py-2 text-gray-700 bg-white shadow-sm"
//             onChange={handleFileChange}
//             multiple // Allow multiple files
//           />
//         </div>

//         <h6 className="text-blue-600 mb-4">Asset Upload History</h6>
//         <div className="border p-3 rounded bg-gray-100 mb-6 shadow-sm">
//           <p className="mb-1">1 - Building</p>
//           <small>Sep 21, 2024, 3:28:58 PM</small>
//         </div>

//         <h6 className="text-blue-600 mb-4">Billing Status</h6>
//         <div className="border p-3 rounded bg-gray-100 shadow-sm mb-auto">
//           <p className="mb-1">
//             Subscription Status: <span className="bg-yellow-400 px-2 py-1 rounded-full text-xs text-white">Trial</span>
//           </p>
//           <p className="mb-2">Expires: Sep 27, 2024</p>
//           <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
//             <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '46%' }}></div>
//           </div>
//           <small>Image Usage: 464 / 1000</small>
//         </div>

//         <div className="mt-auto text-gray-500 text-sm">
//           <p>Powered by Future Land</p>
//         </div>
//       </form>

//       {/* Right Panel */}
//       <div className="w-3/4 bg-gray-50 p-6 flex flex-col justify-center items-center">
//         {isLoading ? (
//           <InfinitySpin
//             strokeColor="blue"
//             strokeWidth="5"
//             animationDuration="0.75"
//             width="96"
//             visible={true}
//           />
//         ) : (
//           <div className="flex flex-col justify-center items-center w-full bg-white border rounded-lg p-6 shadow-lg">
//             <p className="text-gray-600 mb-4">Drag and drop your files here, or click to upload</p>
//             <input
//               type="file"
//               id="file-upload"
//               className="hidden"
//               onChange={handleFileChange}
//               multiple // Allow multiple files
//             />
//             <label
//               htmlFor="file-upload"
//               className="cursor-pointer text-blue-600 border border-blue-600 rounded-lg px-4 py-2 hover:bg-blue-50"
//             >
//               Browse Files
//             </label>
//           </div>
//         )}

//         {handleUpload && files.length > 0 && !isLoading && (
//           <div className="w-full bg-white border rounded-lg p-6 shadow-lg mt-6">
//             {files.map((file, index) => (
//               <div className="mb-4 flex items-center" key={index}>
//                 <p className="text-blue-600 flex-1">{file.name}</p>
//                 <div className="w-1/2 bg-gray-200 rounded-full h-2.5 ml-4">
//                   <div
//                     className={`h-2.5 rounded-full ${uploadStatus[index] === 'success' ? 'bg-green-600' : uploadStatus[index] === 'failed' ? 'bg-red-600' : 'bg-blue-600'}`}
//                     style={{ width: `${uploadProgress[index]}%` }}
//                   ></div>
//                 </div>
//                 <p className="text-gray-500 ml-4">
//                   {uploadStatus[index] === 'pending' ? 'Pending...' : uploadStatus[index] === 'success' ? 'Uploaded' : 'Failed'}
//                 </p>
//               </div>
//             ))}
//             <div className="flex space-x-2 mt-4">
//               <button
//                 type="button"
//                 className="bg-green-500 text-white px-4 py-2 rounded-lg"
//                 onClick={handleUploadClick}
//                 disabled={isLoading}
//               >
//                 Upload All
//               </button>
//               <button
//                 type="button"
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg"
//                 onClick={handleDelete}
//                 disabled={isLoading}
//               >
//                 Delete All
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default Main_upload;


















import React, { useState, useRef } from 'react';
import exifParser from 'exif-parser'; // Import exif-parser
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { handleError, handleSuccess } from '../../util';
import { ToastContainer } from 'react-toastify';
import { InfinitySpin } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

function Main_upload() {
  const [files, setFiles] = useState([]);
  const [metaDataList, setMetaDataList] = useState([]); // Store metadata for each image
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const location = useLocation();
  const reportId = location.state?.id;
  const dropAreaRef = useRef(null);

  // Function to extract metadata (latitude and longitude)
  const extractMetadata = (file) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const arrayBuffer = e.target.result;
      const parser = exifParser.create(arrayBuffer);
      const exifData = parser.parse();

      const { GPSLatitude, GPSLongitude } = exifData.tags || {};
      const metadata = {
        latitude: GPSLatitude || 'Not available',
        longitude: GPSLongitude || 'Not available',
      };

      setMetaDataList((prev) => [...prev, metadata]); // Store metadata
    };
    reader.readAsArrayBuffer(file);
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    selectedFiles.forEach((file) => extractMetadata(file)); // Extract metadata for each file
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  // Handle file upload
  const handleUploadClick = async () => {
    setIsLoading(true);
    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append('images', file);
      const metadata = metaDataList[index] || {};
      formData.append(`latitude_${index}`, metadata.latitude);
      formData.append(`longitude_${index}`, metadata.longitude);
    });

    try {
      const response = await axios.post('/api/main/addimage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-report-id': reportId,
          'x-company_id': localStorage.getItem('company_id'),
          'x-auth-token': localStorage.getItem('token'),
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress({ overall: percentCompleted });
        },
      });

      if (response.status === 200) handleSuccess('Images uploaded successfully');
      else handleError('Error while uploading the files.');
    } catch (error) {
      handleError('Failed to upload images');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelUpload = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setMetaDataList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteAll = () => {
    setFiles([]);
    setMetaDataList([]);
    setUploadProgress({});
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dropAreaRef.current.classList.add('bg-blue-100');
  };

  const handleDragLeave = () => {
    dropAreaRef.current.classList.remove('bg-blue-100');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dropAreaRef.current.classList.remove('bg-blue-100');
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach((file) => extractMetadata(file)); // Extract metadata for each dropped file
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <form className="w-1/4 h-full bg-[#1e1e1e] shadow-lg p-4 flex flex-col border-r border-gray-200 overflow-y-auto">
        {/* <h6 className="text-blue-600 mb-4">Upload Method</h6> */}
        {/* <input
          type="file"
          multiple
          onChange={handleFileChange} 
          className="w-full border px-4 py-2 mb-6"
        /> */}

        <h6 className="text-white mb-4 text-left">Asset Upload History</h6>
        <div className="border p-3 rounded mb-6 bg-[#1e1e1e] shadow-sm text-left  ">
          <p className=' text-white' > 1 - Building</p>
          <small className='text-white'>Sep 21, 2024, 3:28:58 PM</small>
        </div>

        <h6 className="text-white mb-4 text-left">Billing Status</h6>
        <div className="border p-3 rounded  shadow-sm mb-3 text-left bg-[#1e1e1e]">
          <p className="mb-1 text-white">
            Subscription Status:
            <span className="bg-yellow-400 px-2 py-1 rounded-full text-xs text-white">Trial</span>
          </p>
          <p className="mb-2 text-white">Expires: Sep 27, 2024</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '46%' }}></div>
          </div>
          <small className='text-white'>Image Usage: 464 / 1000</small>
        </div>

        <div className="  p-4 bg-[#1e1e1e] rounded-lg shadow-md border border-gray-200">
              <p className="text-lg font-semibold text-white">Total Image Count:</p>
              <p className="text-xl font-bold text-white">{files.length}</p>
            </div>

        <div className="mt-auto text-sm text-gray-500">Powered by Smart Inspection</div>
      </form>

      <div className="w-3/4  p-6  bg-[#1e1e1e]">
        <div
          ref={dropAreaRef}
          className="w-full h-64 border-dashed border-2 border-gray-300 flex flex-col items-center justify-center mb-2"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <h3 className="text-white">Drag & Drop Files or Folders Here</h3>
          <p className='text-white'>Or click below to upload</p>
          <input
            type="file"
            className="hidden"
            id="file-upload"
            multiple
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Browse Files
          </label>
        </div>

        {files.length > 0 && (
          <>
          <div className="w-full flex justify-between mb-4">
              <button
                onClick={handleUploadClick}
                disabled={isLoading}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Click to Upload
              </button>
              <button
                onClick={handleDeleteAll}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete All
              </button>
            </div>
          
            

            <div className="w-[100%] bg-[#1e1e1e] grid grid-cols-2 border rounded p-3 shadow-lg">
              {files.map((file, index) => (
                <div key={index} className="flex justify-between items-center align-middle gap-10 border-b p-2">
                  <div className=''>
                  <FontAwesomeIcon icon={faImage}  className='text-white' />
                    <h6 className="text-blue-600 ">{file.name}</h6>
                    {/* <p className='text-white m-0'>{(file.size / 1024).toFixed(2)} KB</p> */}
                    {/* <p>Latitude: {metaDataList[index]?.latitude}</p>
                    <p>Longitude: {metaDataList[index]?.longitude}</p> */}
                  </div>
                  <button
                    onClick={() => handleCancelUpload(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Cancel
                  </button>
                </div>
              ))}
            </div>

            {isLoading && (
              <div className="mt-4">
                <InfinitySpin width="50" color="blue" />
                <p>{uploadProgress.overall || 0} % </p>
              </div>
            )}
          </>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}

export default Main_upload;


// import React, { useState, useRef, useEffect } from 'react';
// import exifParser from 'exif-parser';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faImage, faCheckCircle, faTimesCircle, faSpinner, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';

// function Main_upload() {
//   const [files, setFiles] = useState([]);
//   const [metaDataList, setMetaDataList] = useState([]);
//   const [uploadStatus, setUploadStatus] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isMinimized, setIsMinimized] = useState(false);
//   const [isLoading, setIsLoading] = useState([]);
//   const location = useLocation();
//   const reportId = location.state?.id;

//   const dropAreaRef = useRef(null);

//   const extractMetadata = (file) => {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       const arrayBuffer = e.target.result;
//       try {
//         const parser = exifParser.create(arrayBuffer);
//         const exifData = parser.parse();

//         // Retrieve GPS data
//         const { GPSLatitude, GPSLatitudeRef, GPSLongitude, GPSLongitudeRef } = exifData.tags || {};

//         let latitude = 'Not available';
//         let longitude = 'Not available';

//         if (GPSLatitude && GPSLongitude) {
//           // Convert GPS coordinates to decimal
//           const toDecimal = (value, ref) => {
//             const [degrees, minutes, seconds] = value;
//             const decimal = degrees + minutes / 60 + seconds / 3600;
//             return ref === 'S' || ref === 'W' ? -decimal : decimal;
//           };

//           latitude = toDecimal(GPSLatitude, GPSLatitudeRef);
//           longitude = toDecimal(GPSLongitude, GPSLongitudeRef);
//         }

//         const metadata = {
//           latitude,
//           longitude,
//         };

//         setMetaDataList((prev) => [...prev, metadata]);
//       } catch (error) {
//         console.error('Error parsing EXIF data:', error);
//         setMetaDataList((prev) => [
//           ...prev,
//           { latitude: 'Error parsing EXIF', longitude: 'Error parsing EXIF' },
//         ]);
//       }
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const handleFileChange = (event) => {
//     const selectedFiles = Array.from(event.target.files);
//     selectedFiles.forEach((file) => extractMetadata(file));
//     setFiles((prev) => [...prev, ...selectedFiles]);
//     setUploadStatus((prev) => [...prev, ...selectedFiles.map(() => null)]);
//     setIsLoading((prev) => [...prev, ...selectedFiles.map(() => true)]);
//     setIsModalOpen(true); // Automatically open modal when images are added
//   };

//   const uploadImages = async () => {
//     const newUploadStatus = [...uploadStatus];
//     const newIsLoading = [...isLoading];

//     await Promise.all(
//       files.map(async (file, index) => {
//         if (uploadStatus[index] === 'success' || uploadStatus[index] === 'failure') {
//           return; // Skip already uploaded files
//         }

//         const formData = new FormData();
//         formData.append('images', file);
//         const metadata = metaDataList[index] || {};
//         formData.append(`latitude_${index}`, metadata.latitude);
//         formData.append(`longitude_${index}`, metadata.longitude);

//         try {
//           await axios.post('/api/main/addimage', formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//               'x-report-id': reportId,
//               'x-company_id': localStorage.getItem('company_id'),
//               'x-auth-token': localStorage.getItem('token'),
//             },
//           });
//           newUploadStatus[index] = 'success';
//         } catch (error) {
//           newUploadStatus[index] = 'failure';
//         } finally {
//           newIsLoading[index] = false;
//         }
//       })
//     );

//     setUploadStatus([...newUploadStatus]);
//     setIsLoading([...newIsLoading]);
//   };

//   useEffect(() => {
//     if (files.length > 0) {
//       uploadImages(); // Automatically start uploading when files are added
//     }
//   }, [files]);

//   const handleCancelUpload = (index) => {
//     const newFiles = files.filter((_, i) => i !== index);
//     const newMetaData = metaDataList.filter((_, i) => i !== index);
//     const newUploadStatus = uploadStatus.filter((_, i) => i !== index);
//     const newIsLoading = isLoading.filter((_, i) => i !== index);

//     setFiles(newFiles);
//     setMetaDataList(newMetaData);
//     setUploadStatus(newUploadStatus);
//     setIsLoading(newIsLoading);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     dropAreaRef.current.classList.add('bg-blue-100');
//   };

//   const handleDragLeave = () => {
//     dropAreaRef.current.classList.remove('bg-blue-100');
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     dropAreaRef.current.classList.remove('bg-blue-100');
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     droppedFiles.forEach((file) => extractMetadata(file));
//     setFiles((prev) => [...prev, ...droppedFiles]);
//     setIsLoading((prev) => [...prev, ...droppedFiles.map(() => true)]);
//     setIsModalOpen(true); // Automatically open modal when files are dropped
//   };

//   const minimizeModal = () => {
//     setIsMinimized(!isMinimized);
//   };

//   const uploadedCount = uploadStatus.filter((status) => status === 'success').length;

//   return (
//     <div className="flex h-100vh">
//       {/* Sidebar */}
//       <div className="w-1/4 h-100vh bg-[#1e1e1e] p-4 flex flex-col">
//         <h6 className="text-white mb-4">Asset Upload History</h6>
//         <h6 className="text-white mb-4">Billing Status</h6>
//       </div>

//       {/* Main Content */}
//       <div className="w-3/4 p-6">
//         <div
//           ref={dropAreaRef}
//           className="border-dashed border-2 border-gray-300 w-full h-64 flex flex-col items-center justify-center"
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//         >
//           <h3 className="text-gray-700">Drag & Drop Files Here</h3>
//           <input type="file" id="file-upload" className="hidden" multiple onChange={handleFileChange} />
//           <label htmlFor="file-upload" className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer">
//             Browse Files
//           </label>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className={`fixed bottom-4 right-4 bg-white shadow-lg p-4 rounded-lg ${isMinimized ? 'h-12 w-64' : 'h-96 w-96'}`}>
//           <div className="flex justify-between items-center">
//             <h4>Upload Files</h4>
//             <button onClick={minimizeModal}>
//               <FontAwesomeIcon icon={faMinus} />
//             </button>
//           </div>
//           {!isMinimized && (
//             <div className="mt-4">
//               <p className="text-gray-700">{uploadedCount}/{files.length} images uploaded</p>
//               {files.map((file, index) => (
//                 <div key={index} className="flex justify-between items-center py-2">
//                   <div>
//                     <FontAwesomeIcon icon={faImage} />
//                     <span>{file.name}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     {isLoading[index] && <FontAwesomeIcon icon={faSpinner} spin />}
//                     {uploadStatus[index] === "success" && <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />}
//                     {uploadStatus[index] === "failure" && <FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />}
//                     <button onClick={() => handleCancelUpload(index)} className="text-red-500">
//                       <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Main_upload;
