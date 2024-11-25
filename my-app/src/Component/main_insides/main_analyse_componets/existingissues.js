// import axios from "axios";
// import React, { useEffect, useState, useRef } from "react";
// import { handleError, handleSuccess } from "../../../util";
// import Edit_delete from "./edit_delete";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
// import { Tooltip } from 'react-tooltip'; // Updated import for Tooltip

// function Existingissue({ clicked, sendShapeDataGet }) {
//     const [data, setData] = useState([]);
//     const [openIndex, setOpenIndex] = useState(null);
//     const [editIndex, setEditIndex] = useState(null);
//     const [editedIssue, setEditedIssue] = useState({});
//     const [shapeDataGet, setShapeDataGet] = useState(null);
    
//     // Ref to track if the API call has been made
//     const apiCalledRef = useRef(false);

//     useEffect(() => {
//         // Only make the API call if it hasn't been made yet and `clicked` is true
     
//             (async () => {
//                 try {
//                     const response = await axios.get('/api/main/reportdetail', {
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'x-auth-token': localStorage.getItem('token'),
//                             'image-id': localStorage.getItem('image-id'),
//                         },
//                     });

//                     if (response.data) {
//                         handleSuccess('Report Fetched');
//                         setData(response.data.reportData.reportdetail || []);
//                         setShapeDataGet(response.data.shapeData);
//                         console.warn(response.data.shapeData);
//                         sendShapeDataGet(response.data.shapeData);

//                         // Mark the API call as completed
//                         apiCalledRef.current = true;
//                     } else {
//                         handleError('No response from the API');
//                     }
//                 } catch (error) {
//                     handleError(`Error: ${error.message}`);
//                 }
//             })();
        
//     }, [clicked]); // Only depend on `clicked`

//     const toggleAccordion = (index) => {
//         setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
//     };



//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setEditedIssue((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSaveClick = async (id) => {
//         try {
//             await axios.put(`/api/main/reportdetail/${id}`, editedIssue, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'x-auth-token': localStorage.getItem('token'),
//                 },
//             });
//             const updatedData = [...data];
//             updatedData[editIndex] = editedIssue;
//             setData(updatedData);
//             setEditIndex(null);
//             handleSuccess('Issue updated successfully');
//         } catch (error) {
//             handleError('Failed to update issue');
//         }
//     };

//     return (
//         <div>
//  <div className="mb-2 flex justify-start gap-3 align-middle">
//       <div
//         className="p-2  border text-white cursor-pointer rounded w-[70px]"
//         data-tooltip-id="tooltip" // Tooltip identifier
//         data-tooltip-content="Keyboard Shortcuts" // Tooltip text
//       >
//         <FontAwesomeIcon icon={faKeyboard} />
//       </div>

     

//       {/* Updated Tooltip component */}
//       <Tooltip id="tooltip" place="top" effect="solid" />
//     </div>


//         <div className="max-w-xl mx-auto border p-3 rounded-lg shadow-md overflow-y-scroll bg-[#1e1e1e]">
//             <h2 className="text-[20px] font-semibold text-center text-white mb-4">Existing Issues</h2>
//             {data.length > 0 ? (
//                 <div className="max-h-[467px] space-y-4">
//                     {data.map((item, index) => (
//                         <div
//                             key={item._id}
//                             className={`bg-white p-2 rounded-lg shadow hover:shadow-lg transition-all duration-200 ${
//                                 openIndex === index ? 'border border-blue-800 z-30' : ''
//                             }`}
//                         >
//                             <div
//                                 className="flex justify-between items-center align-middle cursor-pointer text-lg font-bold text-blue-400"
//                                 onClick={() => toggleAccordion(index)}
//                             >
//                                 <h3 className="text-[18px]">{item.Issuetype}</h3>
//                                 <span className="text-xl">{openIndex === index ? '-' : '+'}</span>
//                             </div>
//                             {openIndex === index && (
//                                 <div className="mt-4 text-gray-700">
//                                     {editIndex === index ? (
//                                         <div className="space-y-2">
//                                             <input
//                                                 type="text"
//                                                 name="component"
//                                                 value={editedIssue.component}
//                                                 onChange={handleInputChange}
//                                                 placeholder="Component"
//                                                 className="w-full border p-2 rounded"
//                                             />
//                                             <input
//                                                 type="text"
//                                                 name="severity"
//                                                 value={editedIssue.severity}
//                                                 onChange={handleInputChange}
//                                                 placeholder="Severity"
//                                                 className="w-full border p-2 rounded"
//                                             />
//                                             <input
//                                                 type="text"
//                                                 name="remedy_action"
//                                                 value={editedIssue.remedy_action}
//                                                 onChange={handleInputChange}
//                                                 placeholder="Remedy Action"
//                                                 className="w-full border p-2 rounded"
//                                             />
//                                             <input
//                                                 type="text"
//                                                 name="repair_cost"
//                                                 value={editedIssue.repair_cost}
//                                                 onChange={handleInputChange}
//                                                 placeholder="Repair Cost"
//                                                 className="w-full border p-2 rounded"
//                                             />
//                                             <textarea
//                                                 name="comment"
//                                                 value={editedIssue.comment}
//                                                 onChange={handleInputChange}
//                                                 placeholder="Comment"
//                                                 className="w-full border p-2 rounded"
//                                             />
//                                             <button
//                                                 onClick={() => handleSaveClick(item._id)}
//                                                 className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
//                                             >
//                                                 Save
//                                             </button>
//                                         </div>
//                                     ) : (
//                                         <table className="table-auto w-full text-left border-collapse border border-gray-300 ">
//                                             <tbody>
//                                                 <tr>
//                                                     <th className="border border-gray-300 px-4 py-2 text-[15px] ">Component</th>
//                                                     <td className="border border-gray-300 px-4 py-2 text-[14px]">{item.component}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th className="border border-gray-300 px-4 py-2 text-[15px] ">Issue type</th>
//                                                     <td className="border border-gray-300 px-4 py-2 text-[14px]">{item.Issuetype}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th className="border border-gray-300 px-4 py-2 text-[15px] ">Severity</th>
//                                                     <td className="border border-gray-300 px-4 py-2 text-[14px]">{item.severity}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th className="border border-gray-300 px-4 py-2 text-[15px] ">Remedy Action</th>
//                                                     <td className="border border-gray-300 px-4 py-2 text-[14px]">{item.remedy_action}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th className="border border-gray-300 px-4 py-2 text-[15px] ">Repair Cost</th>
//                                                     <td className="border border-gray-300 px-4 py-2 text-[14px]">{item.repair_cost}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th className="border border-gray-300 px-4 py-2 text-[15px] ">Comment</th>
//                                                     <td className="border border-gray-300 px-4 py-2 text-[14px]">{item.comment}</td>
//                                                 </tr>
//                                             </tbody>
//                                         </table>
//                                     )}
//                                     {/* <p>{item._id}</p> */}
                                     
//                                     <Edit_delete
//                                         indexx={index}
//                                         itemid={item._id}
//                                         shapeData={shapeDataGet}  // Shape data from the API
//                                         onShapeUpdate={(updatedShape) => {
//                                             const newShapeData = { ...shapeDataGet };
//                                             if (updatedShape.shapeType === "rectangle") {
//                                                 newShapeData.rectangles = newShapeData.rectangles.map(rect =>
//                                                     rect._id === updatedShape._id ? updatedShape : rect
//                                                 );
//                                             } else if (updatedShape.shapeType === "polygon") {
//                                                 newShapeData.polygons = newShapeData.polygons.map(poly =>
//                                                     poly._id === updatedShape._id ? updatedShape : poly
//                                                 );
//                                             }
//                                             setShapeDataGet(newShapeData);  
//                                         }}
//                                     />
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p className="text-center text-gray-600 text-lg mt-4">
//                     No issues found for the selected image.
//                 </p>
//             )}
//         </div>
//         </div>
//     );
// }

// export default Existingissue;









import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { handleError, handleSuccess } from "../../../util";
import Edit_delete from "./edit_delete";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard, faArrowDown, faArrowUp, faArrowLeft, faArrowRight, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';

function Existingissue({ clicked, sendShapeDataGet , sendfastinspaction ,updateissuestate  , updateissuestatebyfalse}) {
    const [data, setData] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const [editedIssue, setEditedIssue] = useState({});
    const [shapeDataGet, setShapeDataGet] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [fastinspaction , setFastinspaction] = useState(null);
    const [updatePrvissue, setUpdatePrvissue] = useState(false);

    const dropdownRef = useRef(null);
    const apiCalledRef = useRef(false);

    // Define keyboard shortcuts and actions with icons
    const keyboardShortcuts = [
        { key: 'Shift + ArrowDown', action: 'Next Issue', icon: faArrowDown },
        { key: 'Shift + ArrowUp', action: 'Previous Issue', icon: faArrowUp },
        { key: 'ArrowRight', action: 'Next Image', icon: faArrowRight },
        { key: 'ArrowLeft', action: 'Previous Image', icon: faArrowLeft },
        { key: 's', action: 'Save/Edit', icon: faSave },
        { key: 'Escape', action: 'Close Edit/Save', icon: faTimes },
        { key: 'Shift + ArrowRight', action: 'Third Image Forward', icon: faArrowRight },
        { key: 'Shift + ArrowLeft', action: 'Third Image Backward', icon: faArrowLeft },
    ];

    const handleKeyDown = useCallback((event) => {
        if (event.shiftKey && event.key === 'ArrowDown') {

            setOpenIndex((prevIndex) => (prevIndex === null ? 0 : Math.min(prevIndex + 1, data.length - 1)));

        } else if (event.shiftKey && event.key === 'ArrowUp') {

            setOpenIndex((prevIndex) => (prevIndex === null ? 0 : Math.max(prevIndex - 1, 0)));
        } else if (event.key === 'ArrowRight') {

        } else if (event.key === 'ArrowLeft') {

        } else if (event.key === 's') {

            if (editIndex !== null) handleSaveClick(data[editIndex]._id);

        } else if (event.key === 'Escape') {

            setOpenIndex(null);
        }
    }, [data, editIndex]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const response = await axios.get('/api/main/reportdetail', {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'x-auth-token': localStorage.getItem('token'),
    //                     'image-id': localStorage.getItem('image-id'),
    //                 },
    //             });
    //             if (response.data) {
    //                 handleSuccess('Report Fetched');
    //                 setData(response.data.reportData.reportdetail || []);
    //                 setShapeDataGet(response.data.shapeData);
    //                 setFastinspaction(response.data.fastInspaction);
    //                 sendfastinspaction(fastinspaction.shape);
    //                 sendShapeDataGet(response.data.shapeData);
    //                 apiCalledRef.current = true;
    //                 // console.warn(`fastinspactionfastinspactionfastinspaction${fastinspaction.shape}`);
    //                 // alert(response.fastInspaction.shape?'yes':'NO')
    //             } else {
    //                 handleError('No response from the API');
    //             }
    //         } catch (error) {
    //             handleError(`Error: ${error.message}`);
    //         }
    //     })();
    // }, [clicked]);


    useEffect(() => {
        // Fetch data when `clicked` (i.e., `imageid`) changes
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/main/reportdetail', {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('token'),
                        'image-id': localStorage.getItem('image-id'),
                    },
                });
    
                if (response.data) {
                    // // handleSuccess('Report Fetched');
                    // setData(response.data.reportData.reportdetail || []); 
                    // sendShapeDataGet(response.data.shapeData); 
                    // setShapeDataGet(response.data.shapeData);
                    // const fastInspactionData = response.data.fastInspaction;
                    // setFastinspaction(fastInspactionData);
                    // sendfastinspaction(fastInspactionData?.shape || []);



                    // handleSuccess('Report Fetched');
                    setData(response.data.reportData.reportdetail || []);
                    setShapeDataGet(response.data.shapeData);
                    setFastinspaction(response.data.fastInspaction);
                    sendfastinspaction(fastinspaction.shape);
                    sendShapeDataGet(response.data.shapeData);
                    apiCalledRef.current = true;
                    setUpdatePrvissue(false);
                     
                } else {
                    handleError('No response from the API');
                }
                updateissuestatebyfalse(false)
            } catch (error) {
                handleError(`Error: ${error.message}`);
            }
        };
    
        fetchData();
    }, [clicked , updateissuestate ,updatePrvissue]);  
    const toggleAccordion = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedIssue((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveClick = async (id) => {
        try {
            await axios.put(`/api/main/reportdetail/${id}`, editedIssue, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                },
            });
            const updatedData = [...data];
            updatedData[editIndex] = editedIssue;
            setData(updatedData);
            setEditIndex(null);
            handleSuccess('Issue updated successfully');
        } catch (error) {
            handleError('Failed to update issue');
        }
    };

    
    const functionsetUpdatePrvissue = ()=>{
        setUpdatePrvissue(true);
    }

    return (
        <div>
            <div className="mb-2 flex justify-start gap-3 align-middle relative">
                <div
                    className="p-2 border text-white cursor-pointer rounded w-[70px]"
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Keyboard Shortcuts"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <FontAwesomeIcon icon={faKeyboard} />
                </div>
                <Tooltip id="tooltip" place="top" effect="solid" />

                {isDropdownOpen && (
                    <div ref={dropdownRef} className="absolute top-12 left-0 bg-white shadow-lg rounded-lg p-4 w-[350px] z-10 animate-slide-down">
                        <h3 className="text-md font-semibold mb-3 flex items-center justify-evenly">
                            <FontAwesomeIcon icon={faKeyboard} className="mr-2 " />
                            <div className="shadow-[0px_0px_5px_1px_teal] rounded p-2 text-[20px]">Keyboard Shortcuts</div>
                        </h3>
                        <ul className="space-y-2 p-0">
                            {keyboardShortcuts.map((shortcut, index) => (
                                <li key={index} className="flex justify-between text-sm items-center">
                                    <FontAwesomeIcon icon={shortcut.icon} className="mr-2 text-gray-600" />
                                    <span className="font-bold">{shortcut.key}</span>
                                    <span>{shortcut.action}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="max-w-xl mx-auto border p-3 rounded-lg shadow-md overflow-y-scroll bg-[#1e1e1e]">
                <h2 className="text-[20px] font-semibold text-center text-white mb-4">Existing Issues</h2>
                {data.length > 0 ? (
                    <div className="max-h-[467px] space-y-4">
                        {data.map((item, index) => (
                            <div
                                key={item._id}
                                className={`bg-white p-2 rounded-lg shadow hover:shadow-lg transition-all duration-200 ${
                                    openIndex === index ? 'border border-blue-800 z-30' : ''
                                }`}
                            >
                                <div
                                    className="flex justify-between items-center align-middle cursor-pointer text-lg font-bold text-blue-400"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <h3 className="text-[18px]">{item.Issuetype}</h3>
                                    <span className="text-xl">{openIndex === index ? '-' : '+'}</span>
                                </div>
                                {openIndex === index && (
                                    <div className="mt-4 text-gray-700">
                                        {editIndex === index ? (
                                            <div className="space-y-2">
                                                <input
                                                    type="text"
                                                    name="component"
                                                    value={editedIssue.component}
                                                    onChange={handleInputChange}
                                                    placeholder="Component"
                                                    className="w-full border p-2 rounded"
                                                />
                                                <input
                                                    type="text"
                                                    name="severity"
                                                    value={editedIssue.severity}
                                                    onChange={handleInputChange}
                                                    placeholder="Severity"
                                                    className="w-full border p-2 rounded"
                                                />
                                                <input
                                                    type="text"
                                                    name="remedy_action"
                                                    value={editedIssue.remedy_action}
                                                    onChange={handleInputChange}
                                                    placeholder="Remedy Action"
                                                    className="w-full border p-2 rounded"
                                                />
                                                <input
                                                    type="text"
                                                    name="repair_cost"
                                                    value={editedIssue.repair_cost}
                                                    onChange={handleInputChange}
                                                    placeholder="Repair Cost"
                                                    className="w-full border p-2 rounded"
                                                />
                                                <textarea
                                                    name="comment"
                                                    value={editedIssue.comment}
                                                    onChange={handleInputChange}
                                                    placeholder="Comment"
                                                    className="w-full border p-2 rounded"
                                                />
                                                <button
                                                    onClick={() => handleSaveClick(item._id)}
                                                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        ) : (
                                            <table className="table-auto w-full text-left border-collapse border border-gray-300">
                                                <tbody>
                                                    <tr>
                                                        <th className="border border-gray-300 px-4 py-2 text-[15px]">Component</th>
                                                        <td className="border border-gray-300 px-4 py-2 text-[14px]">{item.component}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="border border-gray-300 px-4 py-2 text-[15px]">Issue Type</th>
                                                        <td className="border border-gray-300 px-4 py-2 text-[14px]">{item.Issuetype}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="border border-gray-300 px-4 py-2 text-[15px]">Severity</th>
                                                        <td className="border border-gray-300 px-4 py-2 text-[14px]">{item.severity}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="border border-gray-300 px-4 py-2 text-[15px]">Remedy Action</th>
                                                        <td className="border border-gray-300 px-4 py-2 text-[14px]">{item.remedy_action}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="border border-gray-300 px-4 py-2 text-[15px]">Repair Cost</th>
                                                        <td className="border border-gray-300 px-4 py-2 text-[14px]">{item.repair_cost}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="border border-gray-300 px-4 py-2 text-[15px]">Comment</th>
                                                        <td className="border border-gray-300 px-4 py-2 text-[14px]">{item.comment}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        )}
                                        <Edit_delete
                                        setUpdatePrvissue={functionsetUpdatePrvissue}
                                            indexx={index}
                                            itemid={item._id}
                                            shapeData={shapeDataGet}
                                            onShapeUpdate={(updatedShape) => {
                                                const newShapeData = { ...shapeDataGet };
                                                if (updatedShape.shapeType === "rectangle") {
                                                    newShapeData.rectangles = newShapeData.rectangles.map(rect =>
                                                        rect._id === updatedShape._id ? updatedShape : rect
                                                    );
                                                } else if (updatedShape.shapeType === "polygon") {
                                                    newShapeData.polygons = newShapeData.polygons.map(poly =>
                                                        poly._id === updatedShape._id ? updatedShape : poly
                                                    );
                                                }
                                                setShapeDataGet(newShapeData);  
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 text-lg mt-4">
                        No issues found for the selected image.
                    </p>
                )}
            </div>
        </div>
    );
}

export default Existingissue;





