





// import React, { useState, useRef } from 'react';
// import exifParser from 'exif-parser';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { handleError, handleSuccess } from '../../util';
// import { ToastContainer } from 'react-toastify';
// import { InfinitySpin } from 'react-loader-spinner';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faImage, faChevronDown, faChevronUp, faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import './analyse.css';
// import Detailuploadleft from './mainuploadComponent/detailuploadleft';

// function Main_upload() {
//   const [files, setFiles] = useState([]);
//   const [metaDataList, setMetaDataList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState({});
//   const [uploadedFiles, setUploadedFiles] = useState([]); // Stores uploaded files
//   const [showUploadTab, setShowUploadTab] = useState(true); // Minimize/Expand tab
//   const [tabMinimized, setTabMinimized] = useState(false); // Track minimized state
//   const location = useLocation();
//   const reportId = location.state?.id;
//   const dropAreaRef = useRef(null);

//   const extractMetadata = (file) => {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       const arrayBuffer = e.target.result;
//       const parser = exifParser.create(arrayBuffer);
//       const exifData = parser.parse();
//       const { GPSLatitude, GPSLongitude } = exifData.tags || {};
//       const metadata = {
//         latitude: GPSLatitude || 'Not available',
//         longitude: GPSLongitude || 'Not available',
//       };
//       setMetaDataList((prev) => [...prev, metadata]);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const handleFileChange = (event) => {
//     const selectedFiles = Array.from(event.target.files);
//     selectedFiles.forEach((file) => extractMetadata(file));
//     setFiles((prev) => [...prev, ...selectedFiles]);
//   };

//   const uploadToCloudinary = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'ml_default');

//     try {
//       const response = await axios.post(
//         'https://api.cloudinary.com/v1_1/dziyqo8zo/upload',
//         formData,
//         {
//           headers: { 'Content-Type': 'multipart/form-data' },
//           onUploadProgress: (progressEvent) => {
//             const percentCompleted = Math.round(
//               (progressEvent.loaded * 100) / progressEvent.total
//             );
//             setUploadProgress((prevProgress) => ({
//               ...prevProgress,
//               [file.name]: percentCompleted,
//             }));
//           },
//         }
//       );
//       return response.data.secure_url;
//     } catch (error) {
//       console.error('Error uploading to Cloudinary:', error);
//       return null;
//     }
//   };

//   const handleUploadClick = async () => {
//     setIsLoading(true);
//     const uploadedData = { images: [] };

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const uploadedUrl = await uploadToCloudinary(file);
//       const metadata = metaDataList[i] || {};

//       if (uploadedUrl) {
//         const fileData = {
//           url: uploadedUrl,
//           latitude: metadata.latitude,
//           longitude: metadata.longitude,
//         };
//         uploadedData.images.push(fileData);
//         setUploadedFiles((prev) => [...prev, fileData]); // Move to uploaded files
//       }
//     }

//     if (uploadedData.images.length > 0) {
//       try {
//         await axios.post('http://13.201.248.202:3001/api/main/addimage', uploadedData, {
//           headers: {
//             'x-report-id': reportId,
//             'x-company_id': localStorage.getItem('company_id'),
//             'x-auth-token': localStorage.getItem('token'),
//           },
//         });
//         handleSuccess('Images uploaded successfully');
//       } catch (error) {
//         console.error('Error sending data to API:', error);
//         handleError('Error while uploading the files.');
//       }
//     } else {
//       handleError('No valid images to upload.');
//     }

//     setFiles([]);
//     setMetaDataList([]);
//     setIsLoading(false);
//   };

//   const handleCancelUpload = (index) => {
//     setFiles((prev) => prev.filter((_, i) => i !== index));
//     setMetaDataList((prev) => prev.filter((_, i) => i !== index));
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
//   };

//   return (
//     <div className="flex h-screen overflow-hidden" id="analyseresponsive">
//       <Detailuploadleft filelength={files.length} />
//       <div className="w-3/4 p-6 bg-[#1e1e1e]">
//         <div
//           ref={dropAreaRef}
//           className="w-full h-64 border-dashed border-2 border-gray-300 flex flex-col items-center justify-center mb-2"
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//         >
//           <h3 className="text-white">Drag & Drop Files Here</h3>
//           <p className="text-white">Or click below to upload</p>
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

//         {uploadedFiles.length > 0 && (
//           <div className="w-full bg-gray-800 p-4 rounded mb-4">
//             <h4 className="text-white mb-2">Uploaded Files</h4>
//             {uploadedFiles.map((file, index) => (
//               <div key={index} className="flex items-center justify-between">
//                 <span className="text-white">{file.url}</span>
//                 <span className="text-white">{file.latitude}, {file.longitude}</span>
//               </div>
//             ))}
//           </div>
//         )}

//         {files.length > 0 && (
//           <>
//             {tabMinimized && (
//               <button
//                 className="fixed bottom-4 right-4 bg-green-500 text-white px-3 py-2 rounded-lg shadow-lg z-50"
//                 onClick={() => {
//                   setTabMinimized(false);
//                   setShowUploadTab(true);
//                 }}
//               >
//                 <FontAwesomeIcon icon={faChevronRight} /> Upload
//               </button>
//             )}
//             {!tabMinimized && showUploadTab && (
//               <div
//                 className={`fixed bottom-0 right-0 w-72 bg-gray-900 text-white p-4 shadow-lg rounded-t-lg`}
//               >
//                 <div className="flex justify-between items-center mb-2">
//                   <h4>Uploading Files</h4>
//                   <button
//                     onClick={() => setTabMinimized(true)}
//                     className="text-white"
//                   >
//                     <FontAwesomeIcon icon={faChevronDown} />
//                   </button>
//                 </div>
//                 {files.map((file, index) => (
//                   <div key={index} className="mb-2">
//                     <div className="flex justify-between items-center">
//                       <span>{file.name}</span>
//                       <button
//                         onClick={() => handleCancelUpload(index)}
//                         className="text-red-500"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                     <div className="w-full bg-gray-700 h-2 rounded mt-1">
//                       <div
//                         className="bg-green-500 h-2 rounded"
//                         style={{ width: `${uploadProgress[file.name] || 0}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 ))}
//                 <button
//                   onClick={handleUploadClick}
//                   className="bg-green-500 w-full text-center p-2 mt-4 rounded"
//                   disabled={isLoading}
//                 >
//                   Upload All
//                 </button>
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































// import React, { useState, useRef } from 'react';
// import exifParser from 'exif-parser';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { handleError, handleSuccess } from '../../util';
// import { ToastContainer } from 'react-toastify';
// import { InfinitySpin } from 'react-loader-spinner';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import './analyse.css';
// import Detailuploadleft from './mainuploadComponent/detailuploadleft';
// import Showuploadeddata from './mainuploadComponent/showuploadeddata';

// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { faTimes   } from '@fortawesome/free-solid-svg-icons'; // Add faTimes here


// function Main_upload() {
//   const [files, setFiles] = useState([]);
//   const [metaDataList, setMetaDataList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState({});
//   const [uploadedFiles, setUploadedFiles] = useState([]); // Stores uploaded files
//   const [tabMinimized, setTabMinimized] = useState(false); // Track minimized state
//   const [hoverIndex, setHoverIndex] = useState(null);

//   // const [uploadedfile , setUploadedFiles]
//   const location = useLocation();
//   const reportId = location.state?.id;
//   const dropAreaRef = useRef(null);

//   const extractMetadata = (file) => {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       const arrayBuffer = e.target.result;
//       const parser = exifParser.create(arrayBuffer);
//       const exifData = parser.parse();
//       const { GPSLatitude, GPSLongitude } = exifData.tags || {};
//       const metadata = {
//         latitude: GPSLatitude || 'Not available',
//         longitude: GPSLongitude || 'Not available',
//       };
//       setMetaDataList((prev) => [...prev, metadata]);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const handleFileChange = (event) => {
//     const selectedFiles = Array.from(event.target.files);
//     selectedFiles.forEach((file) => extractMetadata(file));
//     setFiles((prev) => [...prev, ...selectedFiles]);
//   };

//   const uploadToCloudinary = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'ml_default');

//     try {
//       const response = await axios.post(
//         'https://api.cloudinary.com/v1_1/dziyqo8zo/upload',
//         formData,
//         {
//           headers: { 'Content-Type': 'multipart/form-data' },
//           onUploadProgress: (progressEvent) => {
//             const percentCompleted = Math.round(
//               (progressEvent.loaded * 100) / progressEvent.total
//             );

//             // Update progress
//             setUploadProgress((prevProgress) => ({
//               ...prevProgress,
//               [file.name]: percentCompleted,
//             }));

//             // Remove file if upload is complete
//             if (percentCompleted === 100) {
//               setFiles((prev) =>
//                 prev.filter((item) => item.name !== file.name)
//               );
//             }
//           },
//         }
//       );
//       return response.data.secure_url;
//     } catch (error) {
//       console.error('Error uploading to Cloudinary:', error);
//       return null;
//     }
//   };

//   const handleUploadClick = async () => {
//     setIsLoading(true);
//     const uploadedData = { images: [] };
//     const remainingFiles = [...files]; // Make a copy of files
  
//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const uploadedUrl = await uploadToCloudinary(file);
//       const metadata = metaDataList[i] || {};
  
//       if (uploadedUrl) {
//         const fileData = {
//           url: uploadedUrl,
//           latitude: metadata.latitude,
//           longitude: metadata.longitude,
//         };
//         uploadedData.images.push(fileData);
//         setUploadedFiles((prev) => [...prev, fileData]); // Add to uploaded files
  
//         // Remove the file from the list
//         remainingFiles.splice(remainingFiles.indexOf(file), 1);
//         setFiles(remainingFiles);
//       }
//     }
  
//     if (uploadedData.images.length > 0) {
//       try {
//         await axios.post('http://13.201.248.202:3001/api/main/addimage', uploadedData, {
//           headers: {
//             'x-report-id': reportId,
//             'x-company_id': localStorage.getItem('company_id'),
//             'x-auth-token': localStorage.getItem('token'),
//           },
//         });
//         handleSuccess('Images uploaded successfully');
//       } catch (error) {
//         console.error('Error sending data to API:', error);
//         handleError('Error while uploading the files.');
//       }
//     } else {
//       handleError('No valid images to upload.');
//     }
  
//     setMetaDataList([]); // Clear metadata
//     setIsLoading(false);
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
//   };


//   const handleCancelFile = (index) => {
//     setFiles((prevFiles) =>
//       prevFiles.map((file, i) =>
//         i === index ? { ...file, isCancelled: true } : file
//       )
//     );
//   };

//   return (
//     <div className="flex h-screen overflow-hidden" id="analyseresponsive">
//       <Detailuploadleft filelength={files.length} />
//       <div className="w-3/4 p-6 bg-[#1e1e1e]">
//         <div
//           ref={dropAreaRef}
//           className="w-full h-64 border-dashed border-2 border-red-300 flex flex-col items-center justify-center mb-2"
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//         >
//           <h3 className="text-white">Drag & Drop Files Here</h3>
//           <p className="text-white">Or click below to upload</p>
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


//         {uploadedFiles.length > 0 && (
//     <Showuploadeddata uploadedFiles={uploadedFiles} />
// )}





// {files.length > 0 && (
//   <div className="fixed bottom-0 right-0 w-72 bg-gray-900 text-white p-4 shadow-lg rounded-t-lg">
//     <div className="flex justify-between items-center mb-2">
//       <h4>Uploading Files</h4>
//       <button onClick={() => setTabMinimized(true)} className="text-white">
//         <FontAwesomeIcon icon={faChevronDown} />
//       </button>
//     </div>
//     {files.map((file, index) => (
//       <div
//         key={index}
//         className={`relative mb-2 ${file.isCancelled ? 'opacity-50' : ''}`}
//       >
//         <div
//           className="flex justify-between items-center"
//           onMouseEnter={() => setHoverIndex(index)}
//           onMouseLeave={() => setHoverIndex(null)}
//         >
//           <span>{file.name}</span>
//           {hoverIndex === index && (
//             <button
//               onClick={() => handleCancelFile(index)}
//               className="absolute top-0 right-0 text-red-500 hover:text-red-700"
//             >
//               <FontAwesomeIcon icon={faTimes} />
//             </button>
//           )}
//         </div>
//         <div className="w-full bg-gray-700 h-2 rounded mt-1">
//           <div
//             className="bg-green-500 h-2 rounded"
//             style={{ width: `${uploadProgress[file.name] || 0}%` }}
//           ></div>
//         </div>
//       </div>
//     ))}
//     <button
//       onClick={handleUploadClick}
//       className="bg-green-500 w-full text-center p-2 mt-4 rounded"
//       disabled={isLoading}
//     >
//       Upload All
//     </button>
//   </div>
// )}

//         <ToastContainer />
//       </div>
//     </div>
//   );
// }

// export default Main_upload;






import React, { useState, useRef } from 'react';
import exifParser from 'exif-parser';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { handleError, handleSuccess } from '../../util';
import { ToastContainer } from 'react-toastify';
import { InfinitySpin } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import './analyse.css';
import Detailuploadleft from './mainuploadComponent/detailuploadleft';
import Showuploadeddata from './mainuploadComponent/showuploadeddata';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

function Main_upload() {
  const [files, setFiles] = useState([]); // Holds the selected files
  const [metaDataList, setMetaDataList] = useState([]); // Holds metadata for files
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({}); // Tracks progress for each file
  const [uploadedFiles, setUploadedFiles] = useState([]); // Stores uploaded files
  const [tabMinimized, setTabMinimized] = useState(false); // To minimize the upload tab
  const [hoverIndex, setHoverIndex] = useState(null); // For hover effect
  const [uploadingFiles, setUploadingFiles] = useState([]); // Files currently uploading
  const [uploadControllers, setUploadControllers] = useState({}); // Tracks the AbortControllers for uploads
  const location = useLocation();
  const reportId = location.state?.id;
  const dropAreaRef = useRef(null);

  // Handle metadata extraction for EXIF data from images
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
      setMetaDataList((prev) => [...prev, metadata]);
    };
    reader.readAsArrayBuffer(file);
  };

  const navigate = useNavigate();

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    selectedFiles.forEach((file) => extractMetadata(file));
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  // Function to upload files to Cloudinary
  const uploadToCloudinary = async (file, controller) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dziyqo8zo/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            setUploadProgress((prevProgress) => ({
              ...prevProgress,
              [file.name]: percentCompleted,
            }));

            if (percentCompleted === 100) {
              // Remove the canceled file from the state once the upload completes
              setFiles((prev) => prev.filter((item) => item.name !== file.name));
              setUploadingFiles((prev) => prev.filter((item) => item.name !== file.name));
            }
          },
          signal: controller.signal, // Pass the abort signal to the request
        }
      );
      return response.data.secure_url;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Upload canceled:', file.name);
      } else {
        console.error('Error uploading to Cloudinary:', error);
      }
      return null;
    }
  };
   
  // Handle file upload process
  const handleUploadClick = async () => {
    setIsLoading(true);
    const uploadedData = { images: [] };
    const remainingFiles = files.filter((file) => !file.isCancelled); // Filter out canceled files

    for (let i = 0; i < remainingFiles.length; i++) {
      const file = remainingFiles[i];
      const controller = new AbortController(); // Create a new AbortController for each file
      setUploadControllers((prev) => ({ ...prev, [file.name]: controller })); // Store the controller

      const uploadedUrl = await uploadToCloudinary(file, controller);
      const metadata = metaDataList[i] || {};

      if (uploadedUrl) {
        const fileData = {
          url: uploadedUrl,
          latitude: metadata.latitude,
          longitude: metadata.longitude,
        };
        uploadedData.images.push(fileData);
        setUploadedFiles((prev) => [...prev, fileData]);
      }
    }

    if (uploadedData.images.length > 0) {
      try {
        await axios.post('http://13.201.248.202:3001/api/main/addimage', uploadedData, {
          headers: {
            'x-report-id': reportId,
            'x-company_id': localStorage.getItem('company_id'),
            'x-auth-token': localStorage.getItem('token'),
          },
        });
        handleSuccess('Images uploaded successfully');
         
      } catch (error) {
        console.error('Error sending data to API:', error);
        handleError('Error while uploading the files.');
      }
    } else {
      handleError('No valid images to upload.');
    }

    setMetaDataList([]);
    setIsLoading(false);
  };

  // Handle canceling a file upload
  const handleCancelFile = (index) => {
    const canceledFile = files[index];
    const controller = uploadControllers[canceledFile.name];

    // Cancel the ongoing upload by aborting the request
    if (controller) {
      controller.abort();
      console.log('Canceled upload for:', canceledFile.name);
    }

    // Mark the file as canceled
    canceledFile.isCancelled = true;

    // Remove the canceled file from both the display and the uploading list
    setFiles((prevFiles) => prevFiles.filter((file, i) => i !== index));
    setUploadingFiles((prev) => prev.filter((file) => file.name !== canceledFile.name));
  };

  // Cancel all uploads
  const handleCancelAllUploads = () => {
    Object.values(uploadControllers).forEach((controller) => controller.abort());
    console.log('All uploads canceled');
    setFiles([]);
    setUploadingFiles([]);
    setUploadProgress({});
  };

  // Handle drag-over event
  const handleDragOver = (e) => {
    e.preventDefault();
    dropAreaRef.current.classList.add('bg-blue-100');
  };

  // Handle drag-leave event
  const handleDragLeave = () => {
    dropAreaRef.current.classList.remove('bg-blue-100');
  };

  // Handle file drop event
  const handleDrop = (e) => {
    e.preventDefault();
    dropAreaRef.current.classList.remove('bg-blue-100');
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach((file) => extractMetadata(file));
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  return (
    <div className="flex h-screen overflow-hidden" id="analyseresponsive">
      <Detailuploadleft filelength={files.length} /> {/* Pass updated file length to child component */}
      <div className="w-3/4 p-6 bg-[#1e1e1e]">
        <div
          ref={dropAreaRef}
          className="w-full h-64 border-dashed border-2 border-red-300 flex flex-col items-center justify-center mb-2"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <h3 className="text-white">Drag & Drop Files Here</h3>
          <p className="text-white">Or click below to upload</p>
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

        {uploadedFiles.length > 0 && (
          <Showuploadeddata uploadedFiles={uploadedFiles} />
        )}

        {files.length > 0 && (
          <div className="fixed bottom-0 right-0 w-72 bg-gray-900 text-white p-4 shadow-lg rounded-t-lg">
            <div className="flex justify-between items-center mb-2">
              <h4>Uploading Files</h4>
              <button onClick={() => setTabMinimized(true)} className="text-white">
                <FontAwesomeIcon icon={faChevronDown} />
              </button>
            </div>
            {files.map((file, index) => (
              <div
                key={index}
                className={`relative mb-2 ${file.isCancelled ? 'opacity-50' : ''}`}
              >
                <div
                  className="flex justify-between items-center"
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <span>{file.name}</span>
                  {hoverIndex === index && !file.isCancelled && (
                    <button
                      onClick={() => handleCancelFile(index)}
                      className="absolute top-0 right-0 text-red-500 hover:text-red-700"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  )}
                </div>
                {file.isCancelled ? (
                  <p className="text-red-500">Canceled</p>
                ) : (
                  <div className="w-full bg-gray-200 h-1 rounded">
                    <div
                      className="bg-blue-600 h-full"
                      style={{ width: `${uploadProgress[file.name] || 0}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={handleCancelAllUploads}
              className="mt-4 w-full bg-red-600 text-white p-2 rounded"
            >
              Cancel All Uploads
            </button>
            <button
              onClick={handleUploadClick}
              className="mt-4 w-full bg-green-600 text-white p-2 rounded"
            >
              {isLoading ? (
                <InfinitySpin color="#fff" width="50" />
              ) : (
                'Upload Files'
              )}
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Main_upload;

