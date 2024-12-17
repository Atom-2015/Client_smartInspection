// Main workin code in below one 


// import React, { useState, useRef } from 'react';
// import exifParser from 'exif-parser'; // Import exif-parser
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { handleError, handleSuccess } from '../../util';
// import { ToastContainer } from 'react-toastify';
// import { InfinitySpin } from 'react-loader-spinner';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faImage } from '@fortawesome/free-solid-svg-icons';
// import './analyse.css'

// function Main_upload() {
//   const [files, setFiles] = useState([]);
//   const [metaDataList, setMetaDataList] = useState([]); // Store metadata for each image
//   const [isLoading, setIsLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState({});
//   const location = useLocation();
//   const reportId = location.state?.id;
//   const dropAreaRef = useRef(null);

//   // Function to extract metadata (latitude and longitude)
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

//       setMetaDataList((prev) => [...prev, metadata]); // Store metadata
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   // Handle file selection
//   const handleFileChange = (event) => {
//     const selectedFiles = Array.from(event.target.files);
//     selectedFiles.forEach((file) => extractMetadata(file)); // Extract metadata for each file
//     setFiles((prev) => [...prev, ...selectedFiles]);
//   };

//   // Handle file upload
//   const handleUploadClick = async () => {
//     setIsLoading(true);
//     const formData = new FormData();

//     files.forEach((file, index) => {
//       formData.append('images', file);
//       const metadata = metaDataList[index] || {};
//       formData.append(`latitude_${index}`, metadata.latitude);
//       formData.append(`longitude_${index}`, metadata.longitude);
//     });

//     console.log(`form data to upload ${formData}`)

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

//   const handleCancelUpload = (index) => {
//     setFiles((prev) => prev.filter((_, i) => i !== index));
//     setMetaDataList((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleDeleteAll = () => {
//     setFiles([]);
//     setMetaDataList([]);
//     setUploadProgress({});
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
//     droppedFiles.forEach((file) => extractMetadata(file)); // Extract metadata for each dropped file
//     setFiles((prev) => [...prev, ...droppedFiles]);
//   };

//   return (
//     <div className="flex h-screen overflow-hidden" id='analyseresponsive'>
//       <form className="w-1/4 h-full bg-[#1e1e1e] shadow-lg p-4 flex flex-col border-r border-gray-200 overflow-y-auto">
//         {/* <h6 className="text-blue-600 mb-4">Upload Method</h6> */}
//         {/* <input
//           type="file"
//           multiple
//           onChange={handleFileChange} 
//           className="w-full border px-4 py-2 mb-6"
//         /> */}

//         <h6 className="text-white mb-4 text-left">Asset Upload History</h6>
//         <div className="border p-3 rounded mb-6 bg-[#1e1e1e] shadow-sm text-left  ">
//           <p className=' text-white' > 1 - Building</p>
//           <small className='text-white'>Sep 21, 2024, 3:28:58 PM</small>
//         </div>

//         <h6 className="text-white mb-4 text-left">Billing Status</h6>
//         <div className="border p-3 rounded  shadow-sm mb-3 text-left bg-[#1e1e1e]">
//           <p className="mb-1 text-white">
//             Subscription Status:
//             <span className="bg-yellow-400 px-2 py-1 rounded-full text-xs text-white">Trial</span>
//           </p>
//           <p className="mb-2 text-white">Expires: Sep 27, 2024</p>
//           <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
//             <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '46%' }}></div>
//           </div>
//           <small className='text-white'>Image Usage: 464 / 1000</small>
//         </div>

//         <div className="  p-4 bg-[#1e1e1e] rounded-lg shadow-md border border-gray-200">
//               <p className="text-lg font-semibold text-white">Total Image Count:</p>
//               <p className="text-xl font-bold text-white">{files.length}</p>
//             </div>

//         <div className="mt-auto text-sm text-gray-500">Powered by Smart Inspection</div>
//       </form>

//       <div className="w-3/4  p-6  bg-[#1e1e1e]">
//         <div
//           ref={dropAreaRef}
//           className="w-full h-64 border-dashed border-2 border-gray-300 flex flex-col items-center justify-center mb-2"
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//         >
//           <h3 className="text-white">Drag & Drop Files or Folders Here</h3>
//           <p className='text-white'>Or click below to upload</p>
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

//         {files.length > 0 && (
//           <>
//           <div className="w-full flex justify-between mb-4">
//               <button
//                 onClick={handleUploadClick}
//                 disabled={isLoading}
//                 className="bg-green-500 text-white px-4 py-2 rounded"
//               >
//                 Click to Upload
//               </button>
//               <button
//                 onClick={handleDeleteAll}
//                 className="bg-red-500 text-white px-4 py-2 rounded"
//               >
//                 Delete All
//               </button>
//             </div>
          
            

//             <div className="w-[100%] bg-[#1e1e1e] grid grid-cols-2 border rounded p-3 shadow-lg">
//               {files.map((file, index) => (
//                 <div key={index} className="flex justify-between items-center align-middle gap-10 border-b p-2">
//                   <div className=''>
//                   <FontAwesomeIcon icon={faImage}  className='text-white' />
//                     <h6 className="text-blue-600 ">{file.name}</h6>
//                     {/* <p className='text-white m-0'>{(file.size / 1024).toFixed(2)} KB</p> */}
//                     {/* <p>Latitude: {metaDataList[index]?.latitude}</p>
//                     <p>Longitude: {metaDataList[index]?.longitude}</p> */}
//                   </div>
//                   <button
//                     onClick={() => handleCancelUpload(index)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {isLoading && (
//               <div className="mt-4">
//                 <InfinitySpin width="50" color="blue" />
//                 <p>{uploadProgress.overall || 0} % </p>
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
// import { faImage } from '@fortawesome/free-solid-svg-icons';
// import './analyse.css';
// import Detailuploadleft from './mainuploadComponent/detailuploadleft';

// function Main_upload() {
//   const [files, setFiles] = useState([]);
//   const [metaDataList, setMetaDataList] = useState([]); 
//   const [isLoading, setIsLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState({});
//   const [uploadfiledata, setUploadfiledata] = useState([]);
//   const location = useLocation();
//   const reportId = location.state?.id;
//   const dropAreaRef = useRef(null);

//   // Function to extract metadata (latitude and longitude)
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

//   // Handle file selection
//   const handleFileChange = (event) => {
//     const selectedFiles = Array.from(event.target.files);
//     selectedFiles.forEach((file) => extractMetadata(file));
//     setFiles((prev) => [...prev, ...selectedFiles]);
//   };

//   // Function to upload image to Cloudinary
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
//             const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//             setUploadProgress({ [file.name]: percentCompleted });
//           },
//         }
//       );
//       return response.data.secure_url;
//     } catch (error) {
//       console.error('Error uploading to Cloudinary:', error);
//       return null;
//     }
//   };

//   const [images , setImages] =useState();
 
//   const handleUploadClick = async () => {
//     setIsLoading(true);
//     const uploadedData = { images: [] };  // Add 'images' wrapper as required by the backend

//     // Upload all images to Cloudinary and collect URLs + metadata
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
//         uploadedData.images.push(fileData);  // Push into the 'images' array
//       }
//     }

//     setImages(uploadedData.images);

//     // Send all collected data to the backend in one API call
//     if (uploadedData.images.length > 0) {
//       try {
//         const response = await axios.post('/api/main/addimage', uploadedData, {
//           headers: {
//             'x-report-id': reportId,
//             'x-company_id': localStorage.getItem('company_id'),
//             'x-auth-token': localStorage.getItem('token'),
//           },
//         });
//         console.log('Data successfully sent to the API:', response.data);
//         handleSuccess('Images uploaded successfully');
//       } catch (error) {
//         console.error('Error sending data to API:', error);
//         handleError('Error while uploading the files.');
//       }
//     } else {
//       handleError('No valid images to upload.');
//     }

//     setIsLoading(false);
// };


//   const handleCancelUpload = (index) => {
//     setFiles((prev) => prev.filter((_, i) => i !== index));
//     setMetaDataList((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleDeleteAll = () => {
//     setFiles([]);
//     setMetaDataList([]);
//     setUploadProgress({});
//     setUploadfiledata([]);
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
//     <div className="flex h-screen overflow-hidden" id='analyseresponsive'>
//       <Detailuploadleft filelength={files.length} />
       

//       <div className="w-3/4 p-6 bg-[#1e1e1e]">
//         <div
//           ref={dropAreaRef}
//           className="w-full h-64 border-dashed border-2 border-gray-300 flex flex-col items-center justify-center mb-2"
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//         >
//           <h3 className="text-white">Drag & Drop Files or Folders Here</h3>
//           <p className='text-white'>Or click below to upload</p>
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

//         {files.length > 0 && (
//           <>
//             <div className="w-full flex justify-between mb-4">
//               <button
//                 onClick={handleUploadClick}
//                 disabled={isLoading}
//                 className="bg-green-500 text-white px-4 py-2 rounded"
//               >
//                 Click to Upload
//               </button>
//               <button
//                 onClick={handleDeleteAll}
//                 className="bg-red-500 text-white px-4 py-2 rounded"
//               >
//                 Delete All
//               </button>
//             </div>

//             <div className="w-[100%] bg-[#1e1e1e] grid grid-cols-2 border rounded p-3 shadow-lg">
//               {files.map((file, index) => (
//                 <div key={index} className="flex justify-between items-center align-middle gap-10 border-b p-2">
//                   <div className=''>
//                     <FontAwesomeIcon icon={faImage} className='text-white' />
//                     <h6 className="text-blue-600 ">{file.name}</h6>
//                   </div>
//                   <button
//                     onClick={() => handleCancelUpload(index)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {isLoading && (
//           <div className="w-full flex justify-center">
//             <InfinitySpin color="green" width="100" />
//           </div>
//         )}
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
import { faImage } from '@fortawesome/free-solid-svg-icons';
import './analyse.css';
import Detailuploadleft from './mainuploadComponent/detailuploadleft';

function Main_upload() {
  const [files, setFiles] = useState([]);
  const [metaDataList, setMetaDataList] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({}); // Holds progress for each file
  const [uploadfiledata, setUploadfiledata] = useState([]);
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
      setMetaDataList((prev) => [...prev, metadata]); 
    };
    reader.readAsArrayBuffer(file);
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    selectedFiles.forEach((file) => extractMetadata(file));
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  // Function to upload image to Cloudinary
  const uploadToCloudinary = async (file) => {
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
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress((prevProgress) => ({
              ...prevProgress,
              [file.name]: percentCompleted, // Update the progress for the current file
            }));
          },
        }
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      return null;
    }
  };

  const [images , setImages] =useState();
 
  const handleUploadClick = async () => {
    setIsLoading(true);
    const uploadedData = { images: [] };  // Add 'images' wrapper as required by the backend

    // Upload all images to Cloudinary and collect URLs + metadata
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uploadedUrl = await uploadToCloudinary(file);
      const metadata = metaDataList[i] || {};

      if (uploadedUrl) {
        const fileData = {
          url: uploadedUrl,
          latitude: metadata.latitude,
          longitude: metadata.longitude,
        };
        uploadedData.images.push(fileData);  // Push into the 'images' array
      }
    }

    setImages(uploadedData.images);

    // Send all collected data to the backend in one API call
    if (uploadedData.images.length > 0) {
      try {
        const response = await axios.post('/api/main/addimage', uploadedData, {
          headers: {
            'x-report-id': reportId,
            'x-company_id': localStorage.getItem('company_id'),
            'x-auth-token': localStorage.getItem('token'),
          },
        });
        console.log('Data successfully sent to the API:', response.data);
        handleSuccess('Images uploaded successfully');
      } catch (error) {
        console.error('Error sending data to API:', error);
        handleError('Error while uploading the files.');
      }
    } else {
      handleError('No valid images to upload.');
    }

    setIsLoading(false);
  };

  const handleCancelUpload = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setMetaDataList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteAll = () => {
    setFiles([]);
    setMetaDataList([]);
    setUploadProgress({});
    setUploadfiledata([]);
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
    droppedFiles.forEach((file) => extractMetadata(file));
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  return (
    <div className="flex h-screen overflow-hidden" id='analyseresponsive'>
      <Detailuploadleft filelength={files.length} />
      <div className="w-3/4 p-6 bg-[#1e1e1e]">
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
                  <div>
                    <FontAwesomeIcon icon={faImage} className='text-white' />
                    <h6 className="text-blue-600 ">{file.name}</h6>
                  </div>
                  <button
                    onClick={() => handleCancelUpload(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Cancel
                  </button>
                  {/* Progress Bar */}
                  <div className="w-full mt-2">
                    <div className="relative w-full h-2 bg-gray-300 rounded">
                      <div
                        className="absolute top-0 left-0 h-full bg-green-500"
                        style={{ width: `${uploadProgress[file.name] || 0}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-white">
                      {uploadProgress[file.name]}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {isLoading && (
          <div className="w-full flex justify-center">
            <InfinitySpin color="green" width="100" />
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Main_upload;
