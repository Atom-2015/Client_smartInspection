// import React, { useRef, useState, useEffect } from 'react';
// import { Stage, Layer, Image as KonvaImage, Rect, Line, Circle } from 'react-konva';
// import useImage from 'use-image';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSquare, faDrawPolygon, faUndo, faSquareXmark, faBolt } from '@fortawesome/free-solid-svg-icons';

// function MainAnalyseShape({ selectedImage, imageUrl, handleImageClosing, onShapeDataChange, shapeDataFromChild , fastInspactionfromchild , sendfastmodal , sendFastInspactionDataToParent}) {
//     const stageRef = useRef(null);
//     const [mode, setMode] = useState(null);
//     const [shapes, setShapes] = useState([]);
//     const [fastInspectionShapes, setFastInspectionShapes] = useState([]);
//     const [rectProps, setRectProps] = useState(null);
//     const [isDrawing, setIsDrawing] = useState(false);
//     const [polygonPoints, setPolygonPoints] = useState([]);
//     const [isPolygonComplete, setIsPolygonComplete] = useState(false);
//     const [image] = useImage(imageUrl, 'Anonymous');
//     const [scale, setScale] = useState(1);
//     const [shapeData, setShapeData] = useState({
//         shape: [],
//         shapename: ''
//     })

//     // const [newshape ,]

//     const showMessage = (message) => alert(message);



//     // This is use Effect with is collecting data of shapes to show in this component 
//     useEffect(() => {

//         if(fastInspactionfromchild ){
//             setFastInspectionShapes(fastInspactionfromchild);
//         }


//         if (shapeDataFromChild) {
//             const loadedShapes = [];

//             if (shapeDataFromChild.rectangles) {
//                 shapeDataFromChild.rectangles.forEach(rect => {
//                     loadedShapes.push({
//                         type: 'rectangle',
//                         x: rect.x,
//                         y: rect.y,
//                         width: rect.width,
//                         height: rect.height
//                     });
//                 });
//             }

//             if (shapeDataFromChild.polygons) {
//                 shapeDataFromChild.polygons.forEach(polygon => {
//                     loadedShapes.push({
//                         type: 'polygon',
//                         points: polygon.points.flatMap(point => [point.x, point.y])
//                     });
//                 });
//             }

//             setShapes(loadedShapes);
//         }
//     }, [shapeDataFromChild , fastInspactionfromchild ]);


//     // useEffect(() => {
//     //     // Update fast inspection shapes whenever `fastInspactionfromchild` changes
//     //     if (fastInspactionfromchild) {
//     //         setFastInspectionShapes(fastInspactionfromchild);
//     //     }
//     // }, [fastInspactionfromchild]);

//     useEffect(() => {
//         // Call the callback with the latest shapeData
//         if (onShapeDataChange) {
//             onShapeDataChange(shapeData);
//         }
//     }, [shapeData, onShapeDataChange]);

//     useEffect(() => {
//         // Reset image position and scale when a new image is selected and clear Fast Inspection shapes
//         if (selectedImage && stageRef.current) {
//             stageRef.current.position({ x: 0, y: 0 });
//             stageRef.current.scale({ x: 1, y: 1 });
//             setScale(1);
//             setFastInspectionShapes([]); // Clear Fast Inspection shapes on new image load
//             setShapes([])
//             setPolygonPoints([])
//         }
//     }, [selectedImage]);

//     const handleModeChange = (newMode) => {
//         // Check if a shape already exists; show message if trying to create another shape type
//         if (shapes.length > 0 && (newMode === 'rectangle' || newMode === 'polygon')) {
//             showMessage("Only one shape is allowed at a time. Reset to create a new shape.");            
//             return;
//         }
//         // if(fastInspectionShapes.length() != 0){
//         //     showMessage("Only one shape is allowed at a time. Reset to create a new shape.");            
//         //     return;
//         // }
//         if(newMode === 'fast-inspection'){
//             sendfastmodal(true);
//         }
//         // if(newMode === 'rectangle' || newMode === 'polygon'){
//         //     sendfastmodal(false);
//         // }
//         setMode(newMode);
//         setRectProps(null);
//         setPolygonPoints([]);
//         setIsPolygonComplete(false);
//     };

//     const handleStageMouseDown = (e) => {
//         const stage = stageRef.current;
//         const pos = stage.getPointerPosition();
//         const adjustedPos = {
//             x: (pos.x - stage.x()) / scale,
//             y: (pos.y - stage.y()) / scale,
//         };

//         if (mode === 'rectangle') {
//             setRectProps({ x: adjustedPos.x, y: adjustedPos.y, width: 0, height: 0 });
//             setIsDrawing(true);
//         } else if (mode === 'polygon' && !isPolygonComplete) {
//             setPolygonPoints((prevPoints) => [...prevPoints, adjustedPos.x, adjustedPos.y]);
//         } else if (mode === 'fast-inspection') {
//             setFastInspectionShapes((prevShapes) => [
//                 ...prevShapes,
//                 [{ x: adjustedPos.x, y: adjustedPos.y, width: 50, height: 50 }]
//             ]);
//         }
//     };

//     const handleMouseMove = () => {
//         if (isDrawing && rectProps) {
//             const stage = stageRef.current;
//             const pos = stage.getPointerPosition();
//             const adjustedPos = {
//                 x: (pos.x - stage.x()) / scale,
//                 y: (pos.y - stage.y()) / scale,
//             };
//             const newWidth = adjustedPos.x - rectProps.x;
//             const newHeight = adjustedPos.y - rectProps.y;
//             setRectProps({ ...rectProps, width: newWidth, height: newHeight });
//         }
//     };

//     const handleStageMouseUp = () => {
//         if (isDrawing && rectProps) {
//             setShapeData({
//                 shapename: 'rectangle',
//                 shape: rectProps
//             })
//             setShapes((prevShapes) => [...prevShapes, { type: 'rectangle', ...rectProps }]);
//             setIsDrawing(false);
//             setRectProps(null);
//             setMode(null); // Reset mode after drawing
//         }
//     };

//     const handlePolygonComplete = () => {
//         if (polygonPoints.length >= 6) {
//             setShapeData({
//                 shapename: 'polygon',
//                 shape: polygonPoints
//             })
//             setShapes((prevShapes) => [...prevShapes, { type: 'polygon', points: polygonPoints }]);
//             setIsPolygonComplete(true);
//             setPolygonPoints([]);
//             setMode(null); // Reset mode after drawing
//         }
//     };

//     const handleDoubleClick = () => {
//         if (mode === 'polygon' && polygonPoints.length >= 6) {
//             handlePolygonComplete();
//         }
//     };

//     const handlePointDrag = (shapeIndex, pointIndex, x, y) => {
//         setShapes((prevShapes) => {
//             const shapesCopy = [...prevShapes];
//             const pointsCopy = [...shapesCopy[shapeIndex].points];
//             pointsCopy[pointIndex * 2] = x;
//             pointsCopy[pointIndex * 2 + 1] = y;
//             shapesCopy[shapeIndex] = { ...shapesCopy[shapeIndex], points: pointsCopy };
//             return shapesCopy;
//         });
//     };

//     const handleReset = () => {
//         setShapes([]);
//         setFastInspectionShapes([]); // Clear Fast Inspection shapes
//         setPolygonPoints([]);
//         setIsPolygonComplete(false);
//         setRectProps(null);
//         setMode(null);
//     };
//     const [stockwidth , setStockwidth] = useState(1);
//     const handleWheel = (e) => {
//         e.evt.preventDefault();
//         const scaleBy = 1.05;
//         const oldScale = scale;
//         setStockwidth(1)
//         const pointer = stageRef.current.getPointerPosition();
//         const mousePointTo = {
//             x: (pointer.x - stageRef.current.x()) / oldScale,
//             y: (pointer.y - stageRef.current.y()) / oldScale,
//         };
//         const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
//         setScale(newScale);
//         stageRef.current.scale({ x: newScale, y: newScale });
//         const newPos = {
//             x: pointer.x - mousePointTo.x * newScale,
//             y: pointer.y - mousePointTo.y * newScale,
//         };
//         stageRef.current.position(newPos);
//     };

//     // This is sending data for uploading the shape
//     useEffect(() => {
//         if (fastInspectionShapes.length > 0) {
//             console.log("Sending updated fast inspection shapes to parent:", fastInspectionShapes);
//             sendFastInspactionDataToParent(fastInspectionShapes);
//         }
//     }, [fastInspectionShapes]);




//     return (
//         <div className={`relative flex flex-col align-center ${selectedImage ? 'w-[60%]' : 'hidden'}`}>
//             <div className="flex justify-center mb-2 absolute flex-column z-40 gap-2 top-[15px] w-[8%]">
//                 <button
//                     onClick={() => handleModeChange('rectangle')}
//                     className="mx-2 p-2 border text-white rounded"
//                     title="Create Rectangle"
//                 >
//                     <FontAwesomeIcon icon={faSquare} />
//                 </button>

//                 {/* <button onClick={()=>fast()} > fastInspaction </button> */}

//                 <button
//                     onClick={() => handleModeChange('polygon')}
//                     className="mx-2 p-2 border text-white rounded"
//                     title="Create Polygon, Double Tap to Close the Polygon"
//                 >
//                     <FontAwesomeIcon icon={faDrawPolygon} />
//                 </button>

//                 <button
//                     onClick={handleReset}
//                     className="mx-2 p-2 border text-white rounded"
//                     title="Reset"
//                 >
//                     <FontAwesomeIcon icon={faUndo} />
//                 </button>

//                 <button
//                     onClick={() => handleModeChange('fast-inspection')}
//                     className="mx-2 p-2 border text-white rounded"
//                     title="Fast Inspection"
//                 >
//                     <FontAwesomeIcon icon={faBolt} />
//                 </button>
//             </div>

//             {selectedImage && (
//                 <div style={{
//                     width: '800px',
//                     height: '600px',
//                     borderRadius: '10px',
//                     overflow: 'hidden',
//                 }}>
//                     <Stage
//                         ref={stageRef}
//                         width={800}
//                         height={600}
//                         scaleX={scale}
//                         scaleY={scale}
//                         draggable={!mode}
//                         onWheel={handleWheel}
//                         onMouseDown={handleStageMouseDown}
//                         onMouseMove={handleMouseMove}
//                         onMouseUp={handleStageMouseUp}
//                         onDblClick={handleDoubleClick}
//                     >
//                         <Layer imageSmoothingEnabled={false}>
//                             {image && (
//                                 <KonvaImage
//                                     image={image}
//                                     width={800}
//                                     height={600}
//                                     draggable={false}
//                                 />
//                             )}
//                             {shapes.map((shape, index) => (
//                                 shape.type === 'rectangle' ? (
//                                     <Rect

//                                         key={index}
//                                         x={shape.x}
//                                         y={shape.y}
//                                         width={shape.width}
//                                         height={shape.height}
//                                         stroke="white"
//                                         fill="rgba(255,255,255,0.3)"
//                                         // strokeWidth={stockwidth}
//                                         strokeWidth={1 / scale}
//                                     />
//                                 ) : (
//                                     <React.Fragment key={index}>
//                                         <Line
//                                             points={shape.points}
//                                             stroke="white"
//                                             fill="rgba(255,255,255,0.3)"
//                                             // strokeWidth={1.5}
//                                             strokeWidth={1 / scale}
//                                             closed
//                                         />
//                                         {shape.points.map((point, pointIndex) =>
//                                             pointIndex % 2 === 0 ? (
//                                                 <Circle
//                                                     key={pointIndex}
//                                                     x={shape.points[pointIndex]}
//                                                     y={shape.points[pointIndex + 1]}
//                                                     radius={0.5}
//                                                     fill="white"
//                                                     draggable
//                                                     onDragMove={(e) =>
//                                                         handlePointDrag(index, pointIndex / 2, e.target.x(), e.target.y())
//                                                     }
//                                                 />
//                                             ) : null
//                                         )}
//                                     </React.Fragment>
//                                 )
//                             ))}
//                             {fastInspectionShapes.flat().map((shape, index) => (
//                                 <Rect
//                                     key={`fast-${index}`}
//                                     x={shape.x}
//                                     y={shape.y}
//                                     width={shape.width}
//                                     height={shape.height}
//                                     stroke="yellow"
//                                     fill="rgba(255, 255, 0, 0.3)"
//                                     strokeWidth={1.3}
//                                 />
//                             ))}
//                             {isDrawing && rectProps && (
//                                 <Rect
//                                     x={rectProps.x}
//                                     y={rectProps.y}
//                                     width={rectProps.width}
//                                     height={rectProps.height}
//                                     stroke="white"
//                                     fill="rgba(255,255,255,0.3)"
//                                     strokeWidth={1.3}
//                                 />
//                             )}
//                             {polygonPoints.length > 0 && !isPolygonComplete && (
//                                 <Line
//                                     points={polygonPoints}
//                                     stroke="white"
//                                     fill="rgba(255,255,255,0.3)"
//                                     strokeWidth={1.5}
//                                     closed={false}
//                                 />
//                             )}
//                         </Layer>
//                     </Stage>
//                 </div>
//             )}

//             {selectedImage && (
//                 <p className="cursor-pointer text-black
//                  text-[25px] font-bold z-40 p-1 px-2 absolute top-[5px] right-[10px]" onClick={handleImageClosing}>
//                     <FontAwesomeIcon icon={faSquareXmark} />
//                 </p>
//             )}
//         </div>
//     );
// }

// export default MainAnalyseShape;








import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Rect, Line, Circle } from 'react-konva';
import useImage from 'use-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { faSquare, faDrawPolygon, faUndo, faSquareXmark, faBolt } from '@fortawesome/free-solid-svg-icons';

import './inneranalyse.css'

function MainAnalyseShape({ selectedImage, openrectanglesetfalse, imageUrl, handleImageClosing, openRectangleModal, setfalseclicked, onShapeDataChange, shapeDataFromChild, fastInspactionfromchild, sendfastmodal, sendFastInspactionDataToParent }) {
    const stageRef = useRef(null);
    const [mode, setMode] = useState(null);
    const [shapes, setShapes] = useState([]);
    const [fastInspectionShapes, setFastInspectionShapes] = useState([]);
    const [rectProps, setRectProps] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [polygonPoints, setPolygonPoints] = useState([]);
    const [isPolygonComplete, setIsPolygonComplete] = useState(false);
    const [image] = useImage(imageUrl, 'Anonymous');
    const [scale, setScale] = useState(1);
    const [shapeData, setShapeData] = useState({
        shape: [],
        shapename: ''
    })

    // const [newshape ,]

    const showMessage = (message) => alert(message);


    // This is use Effect with is collecting data of shapes to show in this component 
    useEffect(() => {

        if (fastInspactionfromchild) {
            setFastInspectionShapes(fastInspactionfromchild);
        }

        if (shapeDataFromChild) {
            const loadedShapes = [];

            if (shapeDataFromChild.rectangles) {
                shapeDataFromChild.rectangles.forEach(rect => {
                    loadedShapes.push({
                        type: 'rectangle',
                        x: rect.x,
                        y: rect.y,
                        width: rect.width,
                        height: rect.height
                    });
                });
            }

            if (shapeDataFromChild.polygons) {
                shapeDataFromChild.polygons.forEach(polygon => {
                    loadedShapes.push({
                        type: 'polygon',
                        points: polygon.points.flatMap(point => [point.x, point.y])
                    });
                });
            }

            setShapes(loadedShapes);
        }
    }, [shapeDataFromChild, fastInspactionfromchild]);




    useEffect(() => {
        // Call the callback with the latest shapeData
        if (onShapeDataChange) {
            onShapeDataChange(shapeData);
        }
    }, [shapeData, onShapeDataChange]);

    useEffect(() => {
        // Reset image position and scale when a new image is selected and clear Fast Inspection shapes
        if (selectedImage && stageRef.current) {
            stageRef.current.position({ x: 0, y: 0 });
            stageRef.current.scale({ x: 1, y: 1 });
            setScale(1);
            setFastInspectionShapes([]); // Clear Fast Inspection shapes on new image load
            setShapes([])
            setPolygonPoints([])
        }
    }, [selectedImage]);

    const handleModeChange = (newMode) => {
        // Check if a shape already exists; show a message if trying to create another shape type
        // if (shapes.length > 0 && (newMode === 'rectangle' || newMode === 'polygon')) {
        //     showMessage("Only one shape is allowed at a time. Reset to create a new shape.");
        //     return;
        // }

        if (newMode === 'fast-inspection') {
            if (mode !== 'fast-inspection') {
                // Reset fast inspection shapes when starting a new fast inspection session
                setFastInspectionShapes([]);
                openrectanglesetfalse(false);
            }
            sendfastmodal(true); // Trigger the modal or necessary action
        } else if (newMode != 'fast-inspection') {
            openRectangleModal(false);
        }

        setMode(newMode);
        setRectProps(null);
        setPolygonPoints([]);
        setIsPolygonComplete(false);
    };

    const handleStageMouseDown = (e) => {
        const stage = stageRef.current;
        const pos = stage.getPointerPosition();
        const adjustedPos = {
            x: (pos.x - stage.x()) / scale,
            y: (pos.y - stage.y()) / scale,
        };

        if (mode === 'rectangle') {
            setRectProps({ x: adjustedPos.x, y: adjustedPos.y, width: 0, height: 0 });
            setIsDrawing(true);
        } else if (mode === 'polygon' && !isPolygonComplete) {
            setPolygonPoints((prevPoints) => [...prevPoints, adjustedPos.x, adjustedPos.y]);
        } else if (mode === 'fast-inspection') {
            setFastInspectionShapes((prevShapes) => [
                ...prevShapes,
                { x: adjustedPos.x, y: adjustedPos.y, width: 6, height: 6 },
            ]);
        }
    };

    const handleMouseMove = () => {
        if (isDrawing && rectProps) {
            const stage = stageRef.current;
            const pos = stage.getPointerPosition();
            const adjustedPos = {
                x: (pos.x - stage.x()) / scale,
                y: (pos.y - stage.y()) / scale,
            };
            const newWidth = adjustedPos.x - rectProps.x;
            const newHeight = adjustedPos.y - rectProps.y;
            setRectProps({ ...rectProps, width: newWidth, height: newHeight });
        }
    };

    const handleStageMouseUp = () => {
        if (isDrawing && rectProps) {
            setShapeData({
                shapename: 'rectangle',
                shape: rectProps
            })
            setShapes((prevShapes) => [...prevShapes, { type: 'rectangle', ...rectProps }]);
            setIsDrawing(false);
            setRectProps(null);
            setMode(null); // Reset mode after drawing
        }
    };

    const handlePolygonComplete = () => {
        if (polygonPoints.length >= 6) {
            setShapeData({
                shapename: 'polygon',
                shape: polygonPoints
            })
            setShapes((prevShapes) => [...prevShapes, { type: 'polygon', points: polygonPoints }]);
            setIsPolygonComplete(true);
            setPolygonPoints([]);
            setMode(null); // Reset mode after drawing
        }
    };

    const handleDoubleClick = () => {
        if (mode === 'polygon' && polygonPoints.length >= 6) {
            handlePolygonComplete();
        }
    };

    const handlePointDrag = (shapeIndex, pointIndex, x, y) => {
        setShapes((prevShapes) => {
            const shapesCopy = [...prevShapes];
            const pointsCopy = [...shapesCopy[shapeIndex].points];
            pointsCopy[pointIndex * 2] = x;
            pointsCopy[pointIndex * 2 + 1] = y;
            shapesCopy[shapeIndex] = { ...shapesCopy[shapeIndex], points: pointsCopy };
            return shapesCopy;
        });
    };

    const handleReset = () => {
        setShapes([]);
        setFastInspectionShapes([]); // Clear Fast Inspection shapes
        setPolygonPoints([]);
        setIsPolygonComplete(false);
        setRectProps(null);
        setMode(null);
    };
    const [stockwidth, setStockwidth] = useState(1);
    const handleWheel = (e) => {
        e.evt.preventDefault();
        const scaleBy = 1.05;
        const oldScale = scale;
        setStockwidth(1)
        const pointer = stageRef.current.getPointerPosition();
        const mousePointTo = {
            x: (pointer.x - stageRef.current.x()) / oldScale,
            y: (pointer.y - stageRef.current.y()) / oldScale,
        };
        const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
        setScale(newScale);
        stageRef.current.scale({ x: newScale, y: newScale });
        const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        };
        stageRef.current.position(newPos);
    };

    // This is sending data for uploading the shape
    useEffect(() => {
        if (fastInspectionShapes.length > 0) {
            // console.log("Sending updated fast inspection shapes to parent:", fastInspectionShapes);
            sendFastInspactionDataToParent(fastInspectionShapes);
        }
    }, [fastInspectionShapes]);




    return (
        <div className={`relative flex flex-col align-center ${selectedImage ? 'w-[51%]' : 'hidden'}`} id='innershaperesponsive'>
            <div className="flex justify-center mb-2 absolute flex-column z-40 gap-2 top-[15px] w-[8%]">
                <button
                    onClick={() => handleModeChange('rectangle')}
                    className="mx-2 p-2 border text-white rounded"
                    title="Create Rectangle"
                >
                    <FontAwesomeIcon icon={faSquare} />
                </button>

                {/* <button onClick={()=>fast()} > fastInspaction </button> */}

                <button
                    onClick={() => handleModeChange('polygon')}
                    className="mx-2 p-2 border text-white rounded"
                    title="Create Polygon, Double Tap to Close the Polygon"
                >
                    <FontAwesomeIcon icon={faDrawPolygon} />
                </button>

                <button
                    onClick={handleReset}
                    className="mx-2 p-2 border text-white rounded"
                    title="Reset"
                >
                    <FontAwesomeIcon icon={faUndo} />
                </button>

                <button
                    onClick={() => handleModeChange('fast-inspection')}
                    className="mx-2 p-2 border text-white rounded"
                    title="Fast Inspection"
                >
                    <FontAwesomeIcon icon={faBolt} />
                </button>
            </div>

            {selectedImage && (
                <div style={{
                    width: '700px',
                    height: '600px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                }}>
                    <Stage
                        ref={stageRef}
                        width={800}
                        height={600}
                        scaleX={scale}
                        scaleY={scale}
                        draggable={!mode}
                        onWheel={handleWheel}
                        onMouseDown={handleStageMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleStageMouseUp}
                        onDblClick={handleDoubleClick}
                    >
                        <Layer imageSmoothingEnabled={false}>
                            {image && (
                                <KonvaImage
                                    image={image}
                                    width={800}
                                    height={600}
                                    draggable={false}
                                />
                            )}
                            {shapes.map((shape, index) => (
                                shape.type === 'rectangle' ? (
                                    <Rect

                                        // key={index}
                                        // x={shape.x}
                                        // y={shape.y}
                                        // width={shape.width}
                                        // height={shape.height}
                                        // stroke="white"
                                        // fill="rgba(255,255,255,0.3)"
                                        // // strokeWidth={stockwidth}
                                        // strokeWidth={1 / scale}
                                        key={index}
                                        x={shape.x}
                                        y={shape.y}
                                        width={shape.width}
                                        height={shape.height}
                                        stroke="white"
                                        fill="rgba(255,255,255,0.3)"
                                        strokeWidth={1 / scale}
                                    />
                                ) : (
                                    <React.Fragment key={index}>
                                        <Line
                                            points={shape.points}
                                            stroke="white"
                                            fill="rgba(255,255,255,0.3)"
                                            // strokeWidth={1.5}
                                            strokeWidth={1 / scale}
                                            closed
                                        />
                                        {shape.points.map((point, pointIndex) =>
                                            pointIndex % 2 === 0 ? (
                                                <Circle
                                                    key={pointIndex}
                                                    x={shape.points[pointIndex]}
                                                    y={shape.points[pointIndex + 1]}
                                                    radius={0.5}
                                                    fill="white"
                                                    draggable
                                                    onDragMove={(e) =>
                                                        handlePointDrag(index, pointIndex / 2, e.target.x(), e.target.y())
                                                    }
                                                />
                                            ) : null
                                        )}
                                    </React.Fragment>
                                )
                            ))}
                            {fastInspectionShapes.flat().map((shape, index) => (
                                <Rect
                                    key={`fast-${index}`}
                                    x={shape.x}
                                    y={shape.y}
                                    width={shape.width}
                                    height={shape.height}
                                    stroke="yellow"
                                    fill="rgba(255, 255, 0, 0.3)"
                                    strokeWidth={0.5}
                                />
                            ))}
                            {isDrawing && rectProps && (
                                <Rect
                                    x={rectProps.x}
                                    y={rectProps.y}
                                    width={rectProps.width}
                                    height={rectProps.height}
                                    stroke="white"
                                    fill="rgba(255,255,255,0.3)"
                                    strokeWidth={1.3}
                                />
                            )}
                            {polygonPoints.length > 0 && !isPolygonComplete && (
                                <Line
                                    points={polygonPoints}
                                    stroke="white"
                                    fill="rgba(255,255,255,0.3)"
                                    strokeWidth={1.5}
                                    closed={false}
                                />
                            )}
                        </Layer>
                    </Stage>
                </div>
            )}

            {selectedImage && (
                <p className="cursor-pointer text-black
                    text-[25px] font-bold z-40 p-1 px-2 absolute top-[5px] right-[10px]" onClick={handleImageClosing}>
                    <FontAwesomeIcon icon={faSquareXmark} />
                </p>
            )}
        </div>
    );
}

export default MainAnalyseShape;
