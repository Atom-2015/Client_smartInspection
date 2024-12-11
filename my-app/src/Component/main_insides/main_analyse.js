import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Stage, Layer, Image as KonvaImage, Rect, Line, } from 'react-konva';
import useImage from 'use-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDrawPolygon, faSquare } from '@fortawesome/free-solid-svg-icons';
import Map_main_analyse from './map_main_analyse';
import Existingissue from './main_analyse_componets/existingissues';
import Cloudimage_footer from './main_analyse_componets/cloudimage_footer';
import Formreportdata from './main_analyse_componets/formreportdata';
import { ToastContainer } from "react-toastify";
import { faHandPaper } from '@fortawesome/free-solid-svg-icons'; // Add missing import
import Cookies from 'js-cookie';
// import { ToastContainer } from "react-toastify";
// import { handleError, handleSuccess } from "../../util";
    


function Main_analyse() {
    const location = useLocation();
    const reportId = location.state?.id;
    const [data, setData] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null); // for Konva image
    const [place, setPlace] = useState({ latitude: null, longitude: null });
    const [polygonPoints, setPolygonPoints] = useState([]); // Points of the polygon
    const [isDrawing, setIsDrawing] = useState(false); // Track if drawing is active
    const [polygonMode, setPolygonMode] = useState(false); // Track polygon mode
    const [rectangleMode, setRectangleMode] = useState(false); // Track rectangle mode
    const [rectProps, setRectProps] = useState(null); // Track rectangle properties
    const [updateimg, setUpdateimg] = useState({}); // Track form data
    const stageRef = useRef(null); // Ref for the Konva Stage
    const [indexx, setIndexx] = useState(0);
    const [imageid, setImageid] = useState(0);
    const [inspections, setInspections] = useState([]);

    // Load image for Konva with cross-origin support
    const [image] = useImage(imageUrl, 'Anonymous'); // Set crossOrigin to 'Anonymous'
    const [dragMode, setDragMode] = useState(false); // Define dragMode state

 
    const [inspactiontype , setInspactiontype] = useState();

    // setInspactiontype(Cookies.get('inspactiontype'))
    // console.log(inspactiontype);







const handleDragEnd = (e) => {
    const newPos = e.target.position(); // Get new position after drag
    setImagePos(newPos); // Update image position state
};



    // State to track the image position after dragging
    const [imagePos, setImagePos] = useState({ x: 0, y: 0 });

    // Reset drawing states
    const resetDrawingStates = () => {
        setPolygonPoints([]);  // Reset polygon points
        setRectProps(null);  // Reset rectangle props
        setIsDrawing(false);  // Stop drawing
    };

    // Fetch image data on component mount
    useEffect(() => {
        
        (async () => {
            try {
                const response = await axios.get('http://13.201.248.202:3001/api/main/cloudimage', {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('token'),
                        'x-report-id': reportId,
                    },
                });
                setData(response.data.data[0]);
                setInspections(response.data.data);

            } catch (error) {
                console.log("Error in axios:", error);
            }
        })();
    }, [reportId]);
    



    const handleImageClick = (url, index) => {
        setSelectedImage(url);
        setImageUrl(url); // Set the image URL for Konva to render
        setIndexx(index);

        // Correctly set imageid from the selected image and store it
        const newImageId = data.image[index]._id;
        setImageid(newImageId); // Update state with the new image ID
        localStorage.setItem('image-id', newImageId); // Store the image ID in localStorage

        const clickedImage = data.image[index];
        if (clickedImage) {
            const latitude = clickedImage.latitude?.$numberDecimal || clickedImage.latitude;
            const longitude = clickedImage.longitude?.$numberDecimal || clickedImage.longitude;
            setPlace({ latitude, longitude });
        }

        // Reset polygon points and rectangle when a new image is selected
        resetDrawingStates();
    };
   
    
    function base64ToBlob(base64Data) {
        const [header, base64String] = base64Data.split(','); 
        const mimeType = header.match(/:(.*?);/)[1]; // Extract MIME type
    
        // Decode base64 to binary string
        const binaryString = atob(base64String);
        const length = binaryString.length;
        const byteArray = new Uint8Array(length);
    
        // Map binary string to byte array
        for (let i = 0; i < length; i++) {
            byteArray[i] = binaryString.charCodeAt(i);
        }
    
        // Create Blob with the correct MIME type
        return new Blob([byteArray], { type: mimeType });
    }
    

    

    const handleImageClosing = () => {
        setSelectedImage(null);
        setPlace({ latitude: null, longitude: null });
        resetDrawingStates();
        setPolygonMode(false); // Exit polygon mode
        setRectangleMode(false); // Exit rectangle mode
    };

    

    // Activate polygon drawing when the button is clicked
    const activatePolygonMode = () => {
        resetDrawingStates();
        setPolygonMode(true); // Enable polygon mode
        setRectangleMode(false); // Disable rectangle mode
        setDragMode(false); // Ensure drag is off
    };

        // Generate image with the applied shapes (polygon or rectangle)
    const generateImageWithShapes = () => {
        const stage = stageRef.current; // Access the Stage instance via the ref
        return stage.toDataURL({ mimeType: "image/png" }); // Get the updated image as a base64 PNG data URL


    };

    // Activate rectangle drawing when the button is clicked
    const activateRectangleMode = () => {
        resetDrawingStates();
        setRectangleMode(true);
        setPolygonMode(false); // Disable polygon mode
    };

    // Handle clicks to place points in the polygon
    const handleMouseClick = (e) => {
        if (polygonMode) {
            const stage = e.target.getStage();
            const point = stage.getPointerPosition();
            setPolygonPoints((prevPoints) => [...prevPoints, point.x, point.y]);
        }
    };

    // Start drawing the rectangle
    const handleRectStart = (e) => {
        
        if (rectangleMode && !rectProps) { // Ensure only one rectangle is drawn
            const stage = e.target.getStage();
            const { x, y } = stage.getPointerPosition();
            setRectProps({ x, y, width: 0, height: 0 });
            setIsDrawing(true);
            console.log(`This is rectangle start position ${stage.getPointerPosition().x}`)
            // console.log(`This is rectangle start position ${stage.getPointerPosition}`)

        }
       
    };

    const handleRectDraw = (e) => {
        if (rectangleMode && isDrawing) {
            const stage = e.target.getStage();
            const { x, y } = stage.getPointerPosition();
            const newWidth = x - rectProps.x;
            const newHeight = y - rectProps.y;
            setRectProps({ ...rectProps, width: newWidth, height: newHeight });
        }
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    const handleDoubleClick = () => {
        if (polygonPoints.length >= 3) {
            const closedPolygon = [...polygonPoints, polygonPoints[0]]; 
            setPolygonPoints(closedPolygon);
            setIsDrawing(false); // Stop drawing
            setPolygonMode(false); // Exit polygon mode
        }
    };

    // Toggle dragging mode
    const toggleDragMode = () => {
       
        setDragMode(!dragMode);
        setRectangleMode(false); // Disable rectangle mode when dragging
        setPolygonMode(false); // Disable polygon mode when dragging
        resetDrawingStates();
    };

   

    const handleWheel = (e) => {
        e.evt.preventDefault(); // Prevent the defausetDragModelt browser behavior

        const scaleBy = 1.05; // Set the zoom factor
        const stage = stageRef.current; // Get the current stage from the ref
        const oldScale = stage.scaleX(); // Get the current scale
        const pointer = stage.getPointerPosition(); // Get the pointer position on the stage

        const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
        stage.scale({ x: newScale, y: newScale });
        const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        };

        const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        };

        stage.position(newPos); 
        stage.batchDraw();
    };
   

    // Handle form input data
    const handleimagestore = (e) => {
        setUpdateimg({ ...updateimg, [e.target.name]: e.target.value });
    }
    const getInspectionCoordinates = () => {
        return inspections.flatMap(inspection =>
          inspection.image
            .filter(img => img.latitude && img.longitude) // Filter out null coordinates
            .map(img => ({
              id: img._id,
              latitude: parseFloat(img.latitude.$numberDecimal),
              longitude: parseFloat(img.longitude.$numberDecimal),
              mainImage: inspection.main_image, // Pass the main image URL
            }))
        );
      };

    const [toster , setToster] = useState();

    async function handleimageupdate(e) {
        e.preventDefault();

        try {
            const formData = new FormData();
            for (const key in updateimg) {
                formData.append(key, updateimg[key]);
            }
            let imageToSend;

            if (polygonPoints.length > 0 || rectProps) {

                // const base64Image = generateImageWithShapes(); // This returns a base64 data URL
                // console.log(`base 64 image : ${base64Image}`);
                
                // const binaryImage = await base64ToBlob(base64Image); // Convert to Blob
                // console.log(`binary image : ${binaryImage}`);
                // formData.append('image', binaryImage, 'image.jpeg'); // Append as binary
            } else {
                formData.append('image', selectedImage); // If no shapes were drawn, just append the original image
            }

            // formData.append('oldcloudinary_uri', selectedImage);
            // formData.append('latitude', place.latitude);
            // formData.append('longitude', place.longitude);
            formData.append('index', indexx);
            formData.append('reportid', reportId);
            formData.append('imageprocessed_id', imageid);
            // Send the form data to the backend
            const response = await axios.post('http://13.201.248.202:3001/api/main/updateimage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': localStorage.getItem('token'),
                    'companyid': localStorage.getItem('company_id')
                },
            });
            console.log(`ther Response is ${response}`)
            setToster('Data Stored')
        } catch (error) {
            setToster('Error While Stored')
            console.error('Error while updating image:', error);
        }

       
    }

 

    return (
        <div className="container-fluid  flex mt-1 flex-col h-[100vh]">
            
            {/* {<h1> reportid :  {reportId}</h1>} */}
            <div className=' border-gray-200 border-[2px] max-h-[100%] rounded '>
                <div className="container-fluid p-0 flex flex-grow space-y-4 mb-4 w-[100%] gap-3">
                    <div className={`relative flex flex-col  align-center ${selectedImage ? 'w-[60%]' : 'hidden'}`}>
                        {selectedImage && (
                              
                            
                              
                            <Stage
                                ref={stageRef} // Attach the ref here
                                width={800} // Adjust the width based on your requirements
                                height={600} // Adjust the height based on your requirements
                                onClick={handleMouseClick}
                                onMouseDown={handleRectStart}
                                onMouseMove={handleRectDraw}
                                onMouseUp={handleMouseUp}
                                onWheel={handleWheel} // Attach the zoom function here
                            >
                                <Layer
                                imageSmoothingEnabled={false}
                                >
                                    {/* Render the selected image only if it's fully loaded */}
                                    {image && (
                                        <KonvaImage 
                                    
                                            image={image} 
                                            width={800} 
                                            height={600}
                                            draggable={dragMode} // Toggle dragging based on drag mode
                                            onDragEnd={handleDragEnd} // Capture the new position after drag ends
                                            
                                        />

                                    )}
                                    {/* Rectangle */}
                                    {rectangleMode && rectProps && rectProps.width !== 0 && rectProps.height !== 0 && (
                                        <Rect
                                            {...rectProps}
                                            fill="rgba(0, 0, 255, 0.3)"
                                            stroke="blue"
                                            strokeWidth={2}
                                            draggable={false} // Make rectangle static after drawing
                                        />
                                    )}
                                    {/* Polygon */}
                                    {polygonMode && polygonPoints.length >= 2 && (
                                        <Line
                                            points={polygonPoints}
                                            fill="rgba(255, 255, 255, 0.3)"
                                            stroke="black"
                                            strokeWidth={3}
                                            
                                            closed={polygonPoints.length >= 3} // Close when 3 or more points
                                        />
                                    )}
                                </Layer>
                            </Stage>


   

                           
                        )}

                        {selectedImage && (
                            <div className="p-2 absolute top-2 left-[-5px] flex flex-column gap-3 z-20">
                                <button className="btn btn-primary rounded-full" onClick={activatePolygonMode} title="Draw Polygon">
                                    <FontAwesomeIcon icon={faDrawPolygon} />
                                </button>
                                <button className="btn btn-primary rounded-full" onClick={activateRectangleMode} title="Draw Rectangle">
                                    <FontAwesomeIcon icon={faSquare} />
                                </button>
                                <button className="btn btn-primary rounded-full" onClick={toggleDragMode} title={dragMode ? "Stop Dragging" : "Start Dragging"}>
                                    <FontAwesomeIcon icon={faHandPaper} />
                                </button>
                            </div>
                        )}



                        {selectedImage && (
                            <p className="cursor-pointer text-white font-bold bg-slate-500 p-1 rounded-[50%] px-2 absolute top-[5px] right-[10px]" onClick={handleImageClosing}>
                                ✕
                            </p>
                        )}
                    </div>

                    <div className={`border p-2 rounded-lg shadow-md  ${selectedImage ? 'w-[25%]' : 'hidden'}`}>
                        <div>
                            
                            <Formreportdata
                                 handleimageupdate={handleimageupdate}
                                 handleimagestore={handleimagestore}
                                 updateimg={updateimg}
                                 tostermessage={toster}
                            />
                        </div>
                    </div>

                    <div className={`${selectedImage ? 'w-[30%]' : 'w-full'}`}>
                        <div className={`${selectedImage ? 'w-full' : 'hidden'}`}>
                        <Existingissue clicked={imageid}    />
                        </div>
                        <div className='h-[100%]'>
                            <div className={`${selectedImage ? 'hidden' : 'w-full'}`}>
                                <Map_main_analyse  locations={getInspectionCoordinates()}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>





            <div className='  flex justify-center' >
                 <Cloudimage_footer data={data} onImageClick={handleImageClick} />
            </div>


            <ToastContainer />
{/* <ToastContainer/> */}
        </div>
    );
}

export default Main_analyse;


// // // // // //  THE ABOVE CODE IS IMPORTANT ONE // 




























// import React, { useEffect, useState, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { Stage, Layer, Image as KonvaImage, Rect, Line, } from 'react-konva';
// import useImage from 'use-image';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faDrawPolygon, faSquare } from '@fortawesome/free-solid-svg-icons';
// import Map_main_analyse from './map_main_analyse';
// import Existingissue from './main_analyse_componets/existingissues';
// import Cloudimage_footer from './main_analyse_componets/cloudimage_footer';
// import Formreportdata from './main_analyse_componets/formreportdata';
// import { ToastContainer } from "react-toastify";
// import { faHandPaper } from '@fortawesome/free-solid-svg-icons'; // Add missing import
// import Cookies from 'js-cookie';
// // import { ToastContainer } from "react-toastify";
// // import { handleError, handleSuccess } from "../../util";
    


// function Main_analyse() {
//     const location = useLocation();
//     const reportId = location.state?.id;
//     const [data, setData] = useState(null);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [imageUrl, setImageUrl] = useState(null); // for Konva image
//     const [place, setPlace] = useState({ latitude: null, longitude: null });
//     const [polygonPoints, setPolygonPoints] = useState([]); // Points of the polygon
//     const [isDrawing, setIsDrawing] = useState(false); // Track if drawing is active
//     const [polygonMode, setPolygonMode] = useState(false); // Track polygon mode
//     const [rectangleMode, setRectangleMode] = useState(false); // Track rectangle mode
//     const [rectProps, setRectProps] = useState(null); // Track rectangle properties
//     const [updateimg, setUpdateimg] = useState({}); // Track form data
//     const stageRef = useRef(null); // Ref for the Konva Stage
//     const [indexx, setIndexx] = useState(0);
//     const [imageid, setImageid] = useState(0);
//     const [inspections, setInspections] = useState([]);

//     // Load image for Konva with cross-origin support
//     const [image] = useImage(imageUrl, 'Anonymous'); // Set crossOrigin to 'Anonymous'
//     const [dragMode, setDragMode] = useState(false); // Define dragMode state

 
//     const [inspactiontype , setInspactiontype] = useState();

//     // setInspactiontype(Cookies.get('inspactiontype'))
//     // console.log(inspactiontype);







// // const handleDragEnd = (e) => {
// //     const newPos = e.target.position(); // Get new position after drag
// //     setImagePos(newPos); // Update image position state
// // };



//     // State to track the image position after dragging
//     const [imagePos, setImagePos] = useState({ x: 0, y: 0 });

//     // Reset drawing states
//     const resetDrawingStates = () => {
//         setPolygonPoints([]);  // Reset polygon points
//         setRectProps(null);  // Reset rectangle props
//         setIsDrawing(false);  // Stop drawing
//     };

//     // Fetch image data on component mount
//     useEffect(() => {
        
//         (async () => {
//             try {
//                 const response = await axios.get('/api/main/cloudimage', {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'x-auth-token': localStorage.getItem('token'),
//                         'x-report-id': reportId,
//                     },
//                 });
//                 setData(response.data.data[0]);
//                 setInspections(response.data.data);

//             } catch (error) {
//                 console.log("Error in axios:", error);
//             }
//         })();
//     }, [reportId]);
    



//     const handleImageClick = (url, index) => {
//         setSelectedImage(url);
//         setImageUrl(url); // Set the image URL for Konva to render
//         setIndexx(index);

//         // Correctly set imageid from the selected image and store it
//         const newImageId = data.image[index]._id;
//         setImageid(newImageId); // Update state with the new image ID
//         localStorage.setItem('image-id', newImageId); // Store the image ID in localStorage

//         const clickedImage = data.image[index];
//         if (clickedImage) {
//             const latitude = clickedImage.latitude?.$numberDecimal || clickedImage.latitude;
//             const longitude = clickedImage.longitude?.$numberDecimal || clickedImage.longitude;
//             setPlace({ latitude, longitude });
//         }

//         // Reset polygon points and rectangle when a new image is selected
//         resetDrawingStates();
//     };
   
    
//     function base64ToBlob(base64Data) {
//         const [header, base64String] = base64Data.split(','); 
//         const mimeType = header.match(/:(.*?);/)[1]; // Extract MIME type
    
//         // Decode base64 to binary string
//         const binaryString = atob(base64String);
//         const length = binaryString.length;
//         const byteArray = new Uint8Array(length);
    
//         // Map binary string to byte array
//         for (let i = 0; i < length; i++) {
//             byteArray[i] = binaryString.charCodeAt(i);
//         }
    
//         // Create Blob with the correct MIME type
//         return new Blob([byteArray], { type: mimeType });
//     }
    

    

//     const handleImageClosing = () => {
//         setSelectedImage(null);
//         setPlace({ latitude: null, longitude: null });
//         resetDrawingStates();
//         setPolygonMode(false); // Exit polygon mode
//         setRectangleMode(false); // Exit rectangle mode
//     };

    

//     // Activate polygon drawing when the button is clicked
//     const activatePolygonMode = () => {
//         resetDrawingStates();
//         setPolygonMode(true); // Enable polygon mode
//         setRectangleMode(false); // Disable rectangle mode
//         setDragMode(false); // Ensure drag is off
//     };

//         // Generate image with the applied shapes (polygon or rectangle)
//     const generateImageWithShapes = () => {
//         const stage = stageRef.current; // Access the Stage instance via the ref
//         return stage.toDataURL({ mimeType: "image/png" }); // Get the updated image as a base64 PNG data URL
//     };

//     // Activate rectangle drawing when the button is clicked
//     const activateRectangleMode = () => {
//         resetDrawingStates();
//         setRectangleMode(true);
//         setPolygonMode(false); // Disable polygon mode
//     };

//     // Handle clicks to place points in the polygon
//     const handleMouseClick = (e) => {
//         if (polygonMode) {
//             const stage = e.target.getStage();
//             const point = stage.getPointerPosition();
//             setPolygonPoints((prevPoints) => [...prevPoints, point.x, point.y]);
//         }
//     };

//     // Start drawing the rectangle
//     const handleRectStart = (e) => {
        
//         if (rectangleMode && !rectProps) { // Ensure only one rectangle is drawn
//             const stage = e.target.getStage();
//             const { x, y } = stage.getPointerPosition();
//             setRectProps({ x, y, width: 0, height: 0 });
//             setIsDrawing(true);
//             console.log(`This is rectangle start position ${stage.getPointerPosition().x}`)
//             // console.log(`This is rectangle start position ${stage.getPointerPosition}`)

//         }
       
//     };

//     const handleRectDraw = (e) => {
//         if (rectangleMode && isDrawing) {
//             const stage = e.target.getStage();
//             const { x, y } = stage.getPointerPosition();
//             const newWidth = x - rectProps.x;
//             const newHeight = y - rectProps.y;
//             setRectProps({ ...rectProps, width: newWidth, height: newHeight });
//         }
//     };

//     const handleMouseUp = () => {
//         setIsDrawing(false);
//     };

//     const handleDoubleClick = () => {
//         if (polygonPoints.length >= 3) {
//             const closedPolygon = [...polygonPoints, polygonPoints[0]]; 
//             setPolygonPoints(closedPolygon);
//             setIsDrawing(false); // Stop drawing
//             setPolygonMode(false); // Exit polygon mode
//         }
//     };

//     // Toggle dragging mode
//     const toggleDragMode = () => {
       
//         setDragMode(!dragMode);
//         setRectangleMode(false); // Disable rectangle mode when dragging
//         setPolygonMode(false); // Disable polygon mode when dragging
//         resetDrawingStates();
//     };

   

//     const MIN_SCALE = 0.5; // Minimum zoom level
//     const MAX_SCALE = 2; // Maximum zoom level
    
//     const handleDragEnd = (e) => {
//         const stage = stageRef.current;
//         const newPos = e.target.position();
//         const { width, height } = stage.size();
//         const imageWidth = e.target.width() * stage.scaleX();
//         const imageHeight = e.target.height() * stage.scaleY();
    
//         // Calculate boundaries based on the image and stage size
//         const minX = Math.min(0, width - imageWidth);
//         const minY = Math.min(0, height - imageHeight);
//         const maxX = Math.max(0, width - imageWidth);
//         const maxY = Math.max(0, height - imageHeight);
    
//         // Clamp position within bounds
//         const clampedX = Math.max(minX, Math.min(maxX, newPos.x));
//         const clampedY = Math.max(minY, Math.min(maxY, newPos.y));
    
//         e.target.position({ x: clampedX, y: clampedY });
//         setImagePos({ x: clampedX, y: clampedY });
//     };
    
//     const handleWheel = (e) => {
//         e.evt.preventDefault();
//         const stage = stageRef.current;
//         const scaleBy = 1.05;
//         const oldScale = stage.scaleX();
//         const pointer = stage.getPointerPosition();
    
//         // Adjust scale with clamped limits
//         const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy));
//         stage.scale({ x: newScale, y: newScale });
    
//         const mousePointTo = {
//             x: (pointer.x - stage.x()) / oldScale,
//             y: (pointer.y - stage.y()) / oldScale,
//         };
    
//         // Adjust position to keep zoom centered on pointer position
//         const newPos = {
//             x: pointer.x - mousePointTo.x * newScale,
//             y: pointer.y - mousePointTo.y * newScale,
//         };
    
//         stage.position(newPos);
//         stage.batchDraw();
//     };

//     // Handle form input data
//     const handleimagestore = (e) => {
//         setUpdateimg({ ...updateimg, [e.target.name]: e.target.value });
//     }
//     const getInspectionCoordinates = () => {
//         return inspections.flatMap(inspection =>
//           inspection.image
//             .filter(img => img.latitude && img.longitude) // Filter out null coordinates
//             .map(img => ({
//               id: img._id,
//               latitude: parseFloat(img.latitude.$numberDecimal),
//               longitude: parseFloat(img.longitude.$numberDecimal),
//               mainImage: inspection.main_image, // Pass the main image URL
//             }))
//         );
//       };

//     const [toster , setToster] = useState();

//     async function handleimageupdate(e) {
//         e.preventDefault();
    
//         try {
//             const formData = new FormData();
//             formData.append('latitude', place.latitude);
//             formData.append('longitude', place.longitude);
//             formData.append('index', indexx);
//             formData.append('reportid', reportId);
//             formData.append('imageprocessed_id', imageid);
//             // Send the form data to the backend without the image
//             const response = await axios.post('/api/main/updateimage', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'x-auth-token': localStorage.getItem('token'),
//                     'companyid': localStorage.getItem('company_id')
//                 },
//             });
//             console.log(`The response is ${response}`);
//             setToster('Data Stored');
//         } catch (error) {
//             setToster('Error While Storing');
//             console.error('Error while updating image:', error);
//         }
//     }
    
 

//     return (
//         <div className="container-fluid  flex gap-3 flex-col mt-3 h-[100vh]">
            
//             {/* {<h1> reportid :  {reportId}</h1>} */}
//             <div className=' border-gray-200 border-[2px] max-h-[100%] rounded '>
//                 <div className="container-fluid p-0 flex flex-grow space-y-4 mb-4 w-[100%] gap-3">
//                     <div className={`relative flex flex-col  align-center ${selectedImage ? 'w-[60%]' : 'hidden'}`}>
//                         {selectedImage && (
                              
                            
                              
//                             <Stage
//                                 ref={stageRef} // Attach the ref here
//                                 width={800} // Adjust the width based on your requirements
//                                 height={600} // Adjust the height based on your requirements
//                                 onClick={handleMouseClick}
//                                 onMouseDown={handleRectStart}
//                                 onMouseMove={handleRectDraw}
//                                 onMouseUp={handleMouseUp}
//                                 onWheel={handleWheel} // Attach the zoom function here
//                             >
//                                 <Layer
//                                 imageSmoothingEnabled={false}
//                                 >
//                                     {/* Render the selected image only if it's fully loaded */}
//                                     {image && (
//                                         <KonvaImage 
                                    
//                                             image={image} 
//                                             width={800} 
//                                             height={600}
//                                             draggable={dragMode} // Toggle dragging based on drag mode
//                                             onDragEnd={handleDragEnd} // Capture the new position after drag ends
                                            
//                                         />

//                                     )}
//                                     {/* Rectangle */}
//                                     {rectangleMode && rectProps && rectProps.width !== 0 && rectProps.height !== 0 && (
//                                         <Rect
//                                             {...rectProps}
//                                             fill="rgba(0, 0, 255, 0.3)"
//                                             stroke="blue"
//                                             strokeWidth={2}
//                                             draggable={false} // Make rectangle static after drawing
//                                         />
//                                     )}
//                                     {/* Polygon */}
//                                     {polygonMode && polygonPoints.length >= 2 && (
//                                         <Line
//                                             points={polygonPoints}
//                                             fill="rgba(255, 255, 255, 0.3)"
//                                             stroke="black"
//                                             strokeWidth={3}
                                            
//                                             closed={polygonPoints.length >= 3} // Close when 3 or more points
//                                         />
//                                     )}
//                                 </Layer>
//                             </Stage>


   

                           
//                         )}

//                         {selectedImage && (
//                             <div className="p-2 absolute top-2 left-[-5px] flex flex-column gap-3 z-20">
//                                 <button className="btn btn-primary rounded-full" onClick={activatePolygonMode} title="Draw Polygon">
//                                     <FontAwesomeIcon icon={faDrawPolygon} />
//                                 </button>
//                                 <button className="btn btn-primary rounded-full" onClick={activateRectangleMode} title="Draw Rectangle">
//                                     <FontAwesomeIcon icon={faSquare} />
//                                 </button>
//                                 <button className="btn btn-primary rounded-full" onClick={toggleDragMode} title={dragMode ? "Stop Dragging" : "Start Dragging"}>
//                                     <FontAwesomeIcon icon={faHandPaper} />
//                                 </button>
//                             </div>
//                         )}



//                         {selectedImage && (
//                             <p className="cursor-pointer text-white font-bold bg-slate-500 p-1 rounded-[50%] px-2 absolute top-[5px] right-[10px]" onClick={handleImageClosing}>
//                                 ✕
//                             </p>
//                         )}
//                     </div>

//                     <div className={`border p-2 rounded-lg shadow-md  ${selectedImage ? 'w-[25%]' : 'hidden'}`}>
//                         <div>
                            
//                             <Formreportdata
//                                  handleimageupdate={handleimageupdate}
//                                  handleimagestore={handleimagestore}
//                                  updateimg={updateimg}
//                                  tostermessage={toster}
//                             />
//                         </div>
//                     </div>

//                     <div className={`${selectedImage ? 'w-[30%]' : 'w-full'}`}>
//                         <div className={`${selectedImage ? 'w-full' : 'hidden'}`}>
//                         <Existingissue clicked={imageid}    />
//                         </div>
//                         <div className='h-[100%]'>
//                             <div className={`${selectedImage ? 'hidden' : 'w-full'}`}>
//                                 <Map_main_analyse  locations={getInspectionCoordinates()}/>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>





//             <div className='  flex justify-center' >
//                  <Cloudimage_footer data={data} onImageClick={handleImageClick} />
//             </div>


//             <ToastContainer />
// {/* <ToastContainer/> */}
//         </div>
//     );
// }

// export default Main_analyse;