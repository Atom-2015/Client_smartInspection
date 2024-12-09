// import React, { useState, useEffect } from 'react';
// import { Stage, Layer, Rect, Line } from 'react-konva';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faXmark } from '@fortawesome/free-solid-svg-icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteImage } from '../../../FeatureRedux/analyse_delete_image';
// import { handleError, handleSuccess } from '../../../util';

// function Cloudimage_footer({ data, onImageClick }) {
//     const imagesPerPage = 9;
//     const [currentPage, setCurrentPage] = useState(1);
//     const [selectedImageIndex, setSelectedImageIndex] = useState(null);
//     const [gotoPage, setGotoPage] = useState('');
//     const [imageDimensions, setImageDimensions] = useState({});
//     const [localData, setLocalData] = useState(data.image_on_cloudanary_uri || []);

//     const totalPages = Math.ceil(localData.length / imagesPerPage);

//     const dispatch = useDispatch();
//     const { isLoading, isError, errorMessage, isDeleted } = useSelector((state) => state.DeleteImage);

//     useEffect(() => {
//         if (isDeleted === true) {
//             handleSuccess("Image Deleted");
//         } else if (isDeleted === false) {
//             handleError("Image Not Deleted");
//         }
//     }, [isDeleted]);

//     const getCurrentPageImages = () => {
//         const startIndex = (currentPage - 1) * imagesPerPage;
//         const endIndex = startIndex + imagesPerPage;
//         return localData.slice(startIndex, endIndex);
//     };

//     const handleImageClick = (url, index) => {
//         setSelectedImageIndex(index);
//         onImageClick(url, index);
//     };

//     const handlePrevPage = () => {
//         if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//     };

//     const handleNextPage = () => {
//         if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//     };

//     const handleGotoPage = () => {
//         const pageNumber = parseInt(gotoPage, 10);
//         if (pageNumber >= 1 && pageNumber <= totalPages) {
//             setCurrentPage(pageNumber);
//         }
//         setGotoPage('');
//     };

//     const handleDeleteImage = async (index) => {
//         const imageId = data?.image?.[index]?._id;
//         if (!imageId) {
//             console.error('Image ID not found');
//             return;
//         }
    
//         const response = await dispatch(deleteImage({ index, imageId }));
    
//         if (response?.payload) {
//             // Update the local data to remove the deleted image
//             setLocalData((prev) => {
//                 const updatedData = prev.filter((_, i) => i !== index);
    
//                 if (updatedData.length > 0) {
//                     // Determine the next image to select
//                     const nextIndex = index === prev.length - 1 ? index - 1 : index;
//                     const nextImageUrl = updatedData[nextIndex];
    
//                     // Update the selected image and send the data to the parent
//                     setSelectedImageIndex(nextIndex);
//                     onImageClick(nextImageUrl, nextIndex);
//                 } else {
//                     // No images left, clear the selection
//                     setSelectedImageIndex(null);
//                     onImageClick(null, null); // Clear selection in the parent
//                 }
    
//                 return updatedData;
//             });
//         }
//     };
    

//     const handleImageLoad = (e, imageId) => {
//         setImageDimensions((prev) => ({
//             ...prev,
//             [imageId]: { width: e.target.clientWidth, height: e.target.clientHeight },
//         }));
//     };

//     return (
//         <div className="Insidecomponent w-[100%]">
//             {localData.length > 0 && (
//                 <div className="bottom-0 left-0 w-full py-2 px-2">
//                     <div className="grid gap-[130px] whitespace-nowrap pb-2 grid-cols-10">
//                         {getCurrentPageImages().map((url, index) => {
//                             const globalIndex = index + (currentPage - 1) * imagesPerPage;
//                             const isSelected = selectedImageIndex === globalIndex;
//                             const isCompleted = data?.image?.[globalIndex]?.isCompleted;
//                             const imageShapes = data?.image?.[globalIndex]?.shapes || { rectangles: [], polygons: [], fastInspaction: [] };
//                             const imageId = data?.image?.[globalIndex]?._id;

//                             const dimensions = imageDimensions[imageId] || { width: 152, height: 125 };
//                             const scaleX = dimensions.width / 800; // Assuming 800 is the original width of the shapes
//                             const scaleY = dimensions.height / 600; // Assuming 600 is the original height of the shapes

//                             return (
//                                 <div
//                                     key={globalIndex}
//                                     className={`flex-shrink-0 mr-2 cursor-pointer relative ${
//                                         isSelected
//                                             ? 'border-2 border-blue-500 rounded'
//                                             : isCompleted
//                                             ? 'border-2 border-green-500 rounded'
//                                             : ''
//                                     }`}
//                                     onClick={() => handleImageClick(url, globalIndex)}
//                                     style={{ position: 'relative', width: '152px', height: '125px' }}
//                                 >
//                                     <img
//                                         src={url}
//                                         alt={`Cloudinary Image ${globalIndex + 1}`}
//                                         className="w-full h-full object-cover rounded border border-gray-300"
//                                         onLoad={(e) => handleImageLoad(e, imageId)}
//                                     />

//                                     <button
//                                         onClick={(e) => {
//                                             e.stopPropagation(); // Prevents triggering the main image click
//                                             handleDeleteImage(globalIndex);
//                                         }}
//                                         className="absolute top-[-10px] right-[-10px] bg-white text-black rounded-full p-1 text-sm"
//                                         style={{
//                                             zIndex: 10,
//                                             width: '22px',
//                                             height: '22px',
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'center',
//                                         }}
//                                     >
//                                         <FontAwesomeIcon icon={faXmark} beatFade />
//                                     </button>

//                                     <Stage
//                                         width={dimensions.width}
//                                         height={dimensions.height}
//                                         style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
//                                     >
//                                         <Layer>
//                                             {imageShapes.rectangles.map((rect, i) => (
//                                                 <Rect
//                                                     key={i}
//                                                     x={rect.x * scaleX}
//                                                     y={rect.y * scaleY}
//                                                     width={rect.width * scaleX}
//                                                     height={rect.height * scaleY}
//                                                     stroke="white"
//                                                     fill="rgba(255,255,255,0.3)"
//                                                     strokeWidth={1}
//                                                 />
//                                             ))}
//                                             {imageShapes.polygons.map((polygon, i) => (
//                                                 <Line
//                                                     key={i}
//                                                     points={polygon.points.flatMap((point) => [
//                                                         point.x * scaleX,
//                                                         point.y * scaleY,
//                                                     ])}
//                                                     stroke="white"
//                                                     fill="rgba(255,255,255,0.3)"
//                                                     strokeWidth={1}
//                                                     closed
//                                                 />
//                                             ))}
//                                             {imageShapes.fastInspaction.map((shape, index) => (
//                                                 <Rect
//                                                     key={`fast-${index}`}
//                                                     x={shape.x * scaleX}
//                                                     y={shape.y * scaleY}
//                                                     width={shape.width * scaleX}
//                                                     height={shape.height * scaleY}
//                                                     stroke="yellow"
//                                                     fill="rgba(255, 255, 0, 0.3)"
//                                                     strokeWidth={1.3}
//                                                 />
//                                             ))}
//                                         </Layer>
//                                     </Stage>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                     <div className="flex justify-end items-center space-x-1 mt-1 gap-1">
//                         <button
//                             className={`px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 transition ${
//                                 currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
//                             }`}
//                             onClick={handlePrevPage}
//                             disabled={currentPage === 1}
//                         >
//                             &larr;
//                         </button>
//                         <span className="text-sm px-2 py-1 text-white">
//                             {currentPage} / {totalPages}
//                         </span>
//                         <button
//                             className={`px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 transition ${
//                                 currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
//                             }`}
//                             onClick={handleNextPage}
//                             disabled={currentPage === totalPages}
//                         >
//                             &rarr;
//                         </button>
//                         <input
//                             type="number"
//                             className="border rounded-md px-2 py-1 w-20 text-sm focus:outline-none focus:border-blue-400 transition"
//                             placeholder="Go to Page"
//                             value={gotoPage}
//                             onChange={(e) => setGotoPage(e.target.value)}
//                         />
//                         <button
//                             className="px-2 py-1 border rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
//                             onClick={handleGotoPage}
//                         >
//                             Go
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Cloudimage_footer;

















import React, { useState, useEffect } from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteImage } from '../../../FeatureRedux/analyse_delete_image';
import { handleError, handleSuccess } from '../../../util';

function Cloudimage_footer({ data, onImageClick }) {
    const imagesPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [gotoPage, setGotoPage] = useState('');
    const [imageDimensions, setImageDimensions] = useState({});
    const [localData, setLocalData] = useState(data.image_on_cloudanary_uri || []);

    const totalPages = Math.ceil(localData.length / imagesPerPage);

    const dispatch = useDispatch();
    const { isLoading, isError, errorMessage, isDeleted } = useSelector((state) => state.DeleteImage);

    useEffect(() => {
        if (isDeleted === true) {
            handleSuccess('Image Deleted');
        } else if (isDeleted === false) {
            handleError('Image Not Deleted');
        }
    }, [isDeleted]);

    const getCurrentPageImages = () => {
        const startIndex = (currentPage - 1) * imagesPerPage;
        const endIndex = startIndex + imagesPerPage;
        return localData.slice(startIndex, endIndex);
    };

    const handleImageClick = (url, index) => {
        setSelectedImageIndex(index);
        onImageClick(url, index);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handleGotoPage = () => {
        const pageNumber = parseInt(gotoPage, 10);
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
        setGotoPage('');
    };

    const handleDeleteImage = async (index) => {
        const imageId = data?.image?.[index]?._id;
        if (!imageId) {
            console.error('Image ID not found');
            return;
        }

        const response = await dispatch(deleteImage({ index, imageId }));

        if (response?.payload) {
            setLocalData((prev) => {
                const updatedData = prev.filter((_, i) => i !== index);

                if (updatedData.length > 0) {
                    const nextIndex = index === prev.length - 1 ? index - 1 : index;
                    const nextImageUrl = updatedData[nextIndex];
                    setSelectedImageIndex(nextIndex);
                    onImageClick(nextImageUrl, nextIndex);
                } else {
                    setSelectedImageIndex(null);
                    onImageClick(null, null);
                }

                return updatedData;
            });
        }
    };

    const handleImageLoad = (e, imageId) => {
        setImageDimensions((prev) => ({
            ...prev,
            [imageId]: { width: e.target.clientWidth, height: e.target.clientHeight },
        }));
    };

    // Add event listener for Ctrl + Shift + →
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ( e.shiftKey && e.key === 'ArrowRight') {
                const nextIndex = (selectedImageIndex ?? -3) + 3;
                if (nextIndex < localData.length) {
                    const url = localData[nextIndex];
                    setSelectedImageIndex(nextIndex);
                    onImageClick(url, nextIndex);
                    if(nextIndex%9 == 0){
                        handleNextPage();
                    }
                } else {
                    console.log('No more images to navigate to.');
                }
            }else if(e.shiftKey && e.key === 'ArrowLeft'){
                const nextIndex = (selectedImageIndex ?? +3) -3;
                if(nextIndex > 0){
                    const url = localData[nextIndex];
                    setSelectedImageIndex(nextIndex);
                    onImageClick(url , nextIndex)
                }else{
                     console.log('No more image to navigate to.');    
                }
            }else if(e.key === 'ArrowRight'){
                const nextIndex = (selectedImageIndex ?? -1)+1;
                if(nextIndex <= localData.length){
                    const url = localData[nextIndex];
                    setSelectedImageIndex(nextIndex);
                    onImageClick(url, nextIndex);
                    if(nextIndex%9 == 0){
                        handleNextPage();
                    }
                }else {
                    console.log('No more images to navigate to.');
                }
            }else if(e.key === 'ArrowLeft'){
                const nextIndex = (selectedImageIndex ?? +1)-1;
                if(nextIndex >= 0){
                    const url = localData[nextIndex];
                    setSelectedImageIndex(nextIndex);
                    onImageClick(url, nextIndex);
                    if(nextIndex%8 === 0){
                        handlePrevPage();
                    }
                }else {
                    console.log('No more images to navigate to.');
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex, localData, onImageClick]);

    return (
        <div className="Insidecomponent w-[100%]">
            {localData.length > 0 && (
                <div className="bottom-0 left-0 w-full py-2 px-2">
                    <div className="grid gap-[130px] whitespace-nowrap pb-2 grid-cols-10">
                        {getCurrentPageImages().map((url, index) => {
                            const globalIndex = index + (currentPage - 1) * imagesPerPage;
                            const isSelected = selectedImageIndex === globalIndex;
                            const isCompleted = data?.image?.[globalIndex]?.isCompleted;
                            const imageShapes = data?.image?.[globalIndex]?.shapes || { rectangles: [], polygons: [], fastInspaction: [] };
                            const imageId = data?.image?.[globalIndex]?._id;

                            const dimensions = imageDimensions[imageId] || { width: 152, height: 125 };
                            const scaleX = dimensions.width / 800; // Assuming 800 is the original width of the shapes
                            const scaleY = dimensions.height / 600; // Assuming 600 is the original height of the shapes

                            return (
                                <div
                                    key={globalIndex}
                                    className={`flex-shrink-0 mr-2 cursor-pointer relative ${
                                        isSelected
                                            ? 'border-3 border-blue-500 rounded'
                                            : isCompleted
                                            ? 'border-3 border-green-500 rounded'
                                            : ''
                                    }`}
                                    onClick={() => handleImageClick(url, globalIndex)}
                                    style={{ position: 'relative', width: '152px', height: '125px' }}
                                >
                                    <img
                                        src={url}
                                        alt={`Cloudinary Image ${globalIndex + 1}`}
                                        className="w-full h-full object-cover rounded border border-gray-300"
                                        onLoad={(e) => handleImageLoad(e, imageId)}
                                    />

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteImage(globalIndex);
                                        }}
                                        className="absolute top-[-10px] right-[-10px] bg-white text-black rounded-full p-1 text-sm"
                                        style={{
                                            zIndex: 10,
                                            width: '22px',
                                            height: '22px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faXmark} beatFade />
                                    </button>

                                    <Stage
                                        width={dimensions.width}
                                        height={dimensions.height}
                                        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
                                    >
                                        <Layer>
                                            {imageShapes.rectangles.map((rect, i) => (
                                                <Rect
                                                    key={i}
                                                    x={rect.x * scaleX}
                                                    y={rect.y * scaleY}
                                                    width={rect.width * scaleX}
                                                    height={rect.height * scaleY}
                                                    stroke="white"
                                                    fill="rgba(255,255,255,0.3)"
                                                    strokeWidth={1}
                                                />
                                            ))}
                                            {imageShapes.polygons.map((polygon, i) => (
                                                <Line
                                                    key={i}
                                                    points={polygon.points.flatMap((point) => [
                                                        point.x * scaleX,
                                                        point.y * scaleY,
                                                    ])}
                                                    stroke="white"
                                                    fill="rgba(255,255,255,0.3)"
                                                    strokeWidth={1}
                                                    closed
                                                />
                                            ))}
                                            {imageShapes.fastInspaction.map((shape, index) => (
                                                <Rect
                                                    key={`fast-${index}`}
                                                    x={shape.x * scaleX}
                                                    y={shape.y * scaleY}
                                                    width={shape.width * scaleX}
                                                    height={shape.height * scaleY}
                                                    stroke="yellow"
                                                    fill="rgba(255, 255, 0, 0.3)"
                                                    strokeWidth={1.3}
                                                />
                                            ))}
                                        </Layer>
                                    </Stage>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-end items-center space-x-1 mt-1 gap-1">
                        <button
                            className={`px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 transition ${
                                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            &larr;
                        </button>
                        <span className="text-sm px-2 py-1 text-white">
                            {currentPage} / {totalPages}
                        </span>
                        <button
                            className={`px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 transition ${
                                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            &rarr;
                        </button>
                        <input
                            type="number"
                            className="border rounded-md px-2 py-1 w-20 text-sm focus:outline-none focus:border-blue-400 transition"
                            placeholder="Go to Page"
                            value={gotoPage}
                            onChange={(e) => setGotoPage(e.target.value)}
                        />
                        <button
                            className="px-2 py-1 border rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                            onClick={handleGotoPage}
                        >
                            Go
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cloudimage_footer;
