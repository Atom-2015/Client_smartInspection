// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { handleError, handleSuccess } from "../../../util";

// function Edit_delete({ indexx, itemid, shapeData }) {
//     const [componentOptions, setComponentOptions] = useState([]);
//     const [issueTypeOptions, setIssueTypeOptions] = useState([]);
//     const [inspactiontype, setInspactiontype] = useState();
//     const [editmodal, setEditmodal] = useState(false);
//     const [formData, setFormData] = useState({
//         component: "",
//         issueType: "",
//         severity: "",
//         remedyAction: "",
//         repairCost: "",
//         comment: "", 
//     });

//     const handleDeleteShape = async () => {
//         try {
//             let shapeType, shapeObjectId;

//             if (shapeData.rectangles.length > 0) {
//                 shapeType = "rectangle";
//                 shapeObjectId = shapeData.rectangles[0]._id;
//             } else if (shapeData.polygons.length > 0) {
//                 shapeType = "polygon";
//                 shapeObjectId = shapeData.polygons[0]._id;
//             } else {
//                 handleError("No shapes available to delete");
//                 return;
//             }

//             const headers = {
//                 "x-auth-token": localStorage.getItem("token"),
//                 "x-issue-id": shapeData.imageProcessedid,
//                 "x-reportdetail-id": itemid,
//                 "x-shape-id": shapeData._id,
//                 "x-object-id": shapeObjectId,
//                 "x-update-shapename": shapeType,
//             };

//             const response = await axios.delete("/api/main/deleteshape", { headers });

//             if (response.status === 200) {
//                 handleSuccess(response.data.message);
//             } else {
//                 handleError(response.data.message);
//             }
//         } catch (error) {
//             console.error("Error deleting shape:", error);
//             handleError("Failed to delete shape");
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         handleSuccess("Data saved successfully");
//         setEditmodal(false);
//     };

//     useEffect(() => {
//         setInspactiontype(Cookies.get('inspactiontype'));
//         (async () => {
//             try {
//                 const response = await axios.get('/api/reportinside/componentdata', {
//                     headers: {
//                         'x-auth-token': localStorage.getItem('token'),
//                         'x-company-id': localStorage.getItem('company_id'),
//                         'x-inspaction-type': Cookies.get('inspactiontype')
//                     },
//                 });

//                 if (response.data.message === 'Data Found') {
//                     const data = response.data.data[0];
//                     setComponentOptions(data.inspaction.componentname);
//                     setIssueTypeOptions(data.issuetype);
//                 }
//             } catch (error) {
//                 console.error(`Error fetching data: ${error}`);
//             }
//         })();
//     }, []);

//     return (
//         <div>
//             <div className="flex space-x-2 mt-2 flex-row-reverse ">
//                 <button
//                     onClick={handleDeleteShape}
//                     className="bg-red-500 text-white px-3 py-1 rounded"
//                 >
//                     Delete
//                 </button>
//                 <button
//                     onClick={() => setEditmodal(true)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded"
//                 >
//                     Edit
//                 </button>
//             </div>

//             {editmodal && (
//                 <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex justify-center items-center z-50"  >
                   
//                     <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-lg">
//                         <span
//                             onClick={() => setEditmodal(false)}
//                             className="text-gray-500 hover:text-gray-800 cursor-pointer float-right"
//                         >
//                             X
//                         </span>
//                         <h2 className="text-lg font-bold mb-4">Edit Details</h2>
//                         <form onSubmit={handleSubmit}>
//                             <div className="mb-2">
//                                 <label className="block text-gray-700">Component</label>
                                 
//                                 <select
//                                     name="component" value={formData.component} onChange={handleInputChange} className="w-full px-3 py-2 border rounded" 
//                                 >
//                                   <option value="" > 
//                                              Select Component    
//                                   </option>
//                                   {componentOptions.map((component , idx)=>(
//                                     <option key={idx} value={component}>{component}</option>
//                                   ))}
//                                 </select>
//                             </div>
//                             <div className="mb-2">
//                                 <label className="block text-gray-700">Issue Type</label>
//                                 <select
//                                     name="issueType" value={formData.issueType} onChange={handleInputChange}className="w-full px-3 py-2 border rounded"
//                                 >
//                                     <option value="">Select issue type</option>
//                                     {issueTypeOptions.map((issue, idx) => (
//                                         <option key={idx} value={issue}>{issue}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="mb-2">
//                                 <label className="block text-gray-700">Severity (0-10)</label>
//                                 <input min={0} max={10} type="number" name="severity" value={formData.severity} onChange={handleInputChange}
//                                     className="w-full px-3 py-2 border rounded"
//                                     placeholder="Enter severity"
//                                 />
//                             </div>
//                             <div className="mb-2">
//                                 <label className="block text-gray-700">Remedy Action</label>
//                                 <input
//                                     type="text" name="remedyAction" value={formData.remedyAction} onChange={handleInputChange}
//                                     className="w-full px-3 py-2 border rounded"
//                                     placeholder="Enter remedy action"
//                                 />
//                             </div>
//                             <div className="mb-2">
//                                 <label className="block text-gray-700">Repair Cost</label>
//                                 <input
//                                     min={0} type="number" name="repairCost" value={formData.repairCost} onChange={handleInputChange}
//                                     className="w-full px-3 py-2 border rounded"
//                                     placeholder="Enter repair cost"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700">Comment</label>
//                                 <textarea
//                                     name="comment" value={formData.comment} onChange={handleInputChange} className="w-full px-3 py-2 border rounded"
//                                     placeholder="Enter comment"
//                                 />
//                             </div>
//                             <div className="flex justify-end">
//                                 <button
//                                     type="submit"
//                                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                                 >
//                                     Save
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Edit_delete;









import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { handleError, handleSuccess } from "../../../util";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function Edit_delete({ indexx, itemid, shapeData , setUpdatePrvissue }) {
    const [componentOptions, setComponentOptions] = useState([]);
    const [issueTypeOptions, setIssueTypeOptions] = useState([]);
    const [inspactiontype, setInspactiontype] = useState();
    const [editmodal, setEditmodal] = useState(false);
    const [formData, setFormData] = useState({
        component: "",
        issueType: "",
        severity: "",
        remedyAction: "",
        repairCost: "",
        comment: "", 
    });
    // const [updatePrvissue , setUpdatePrvissue] = useState(false);

    const [dataindex, setDataindex] = useState(null);
    useEffect(() => {
        setDataindex(indexx);
    }, []);

    const handleDeleteShape = async () => {
        try {
            let shapeType, shapeObjectId;

            if (shapeData.rectangles.length > 0) {
                shapeType = "rectangle";
                shapeObjectId = shapeData.rectangles[0]._id;
            } else if (shapeData.polygons.length > 0) {
                shapeType = "polygon";
                shapeObjectId = shapeData.polygons[0]._id;
            } else {
                handleError("No shapes available to delete");
                return;
            }

            const headers = {
                "x-auth-token": localStorage.getItem("token"),
                "x-issue-id": shapeData.imageProcessedid,
                "x-reportdetail-id": itemid,
                "x-shape-id": shapeData._id,
                "x-object-id": shapeObjectId,
                "x-update-shapename": shapeType,
            };
          console.log(headers,"Header Data");
            const response = await axios.delete("http://13.201.248.202:3001/api/main/deleteshape", { headers });

            if (response.status === 200) {
                handleSuccess(response.data.message);
                setUpdatePrvissue(true);
            } else {
                handleError(response.data.message);
            }
        } catch (error) {
            console.error("Error deleting shape:", error);
            handleError("Failed to delete shape");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDataindex(indexx);
        try {
            const response = await axios.put(
                "http://13.201.248.202:3001/api/main/updateissue",
                {
                    Component: formData.component,
                    Issue_Type: formData.issueType,
                    Severity: formData.severity,
                    Remedy_Action: formData.remedyAction,
                    Repair_Cost: formData.repairCost,
                    Comment: formData.comment,
                },
                {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                        'x-imagep-id': shapeData.imageProcessedid,
                        'x-reportdetail-index': dataindex,
                    },
                }
            );

            if (response.status === 200) {
                handleSuccess("Data saved successfully");
                setEditmodal(false);
            } else {
                handleError("Failed to update data");
            }
        } catch (error) {
            handleError("Error updating data");
            console.error("Error updating issue:", error);
        }
    };

    useEffect(() => {
        setInspactiontype(Cookies.get('inspactiontype'));
        (async () => {
            try {
                const response = await axios.get('http://13.201.248.202:3001/api/reportinside/componentdata', {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                        'x-company-id': localStorage.getItem('company_id'),
                        'x-inspaction-type': Cookies.get('inspactiontype')
                    },
                });

                if (response.data.message === 'Data Found') {
                    const data = response.data.data[0];
                    setComponentOptions(data.inspaction.componentname);
                    setIssueTypeOptions(data.issuetype);
                    setUpdatePrvissue(false)
                }
            } catch (error) {
                console.error(`Error fetching data: ${error}`);
            }
        })();
    }, [editmodal]);

    return (
        <div>
            <div className="flex space-x-2 mt-2 flex-row-reverse gap-3">
                <button
                    onClick={handleDeleteShape}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                    Delete
                </button>
                <button
                    onClick={() => setEditmodal(true)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                    Edit
                </button>
            </div>

            {editmodal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg w-full max-w-md relative">
                        <button
                            onClick={() => setEditmodal(false)}
                            className="absolute top-4 right-4 text-white hover:text-gray-900"
                        >
                            <FontAwesomeIcon icon={faXmark} size="lg" />
                        </button>
                        <h2 className="text-xl font-bold text-white mb-6 text-center">Edit Details</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-white font-semibold mb-1">Component</label>
                                <select
                                    name="component"
                                    value={formData.component}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Component</option>
                                    {componentOptions.map((component, idx) => (
                                        <option key={idx} value={component}>{component}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-white font-semibold mb-1">Issue Type</label>
                                <select
                                    name="issueType"
                                    value={formData.issueType}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Issue Type</option>
                                    {issueTypeOptions.map((issue, idx) => (
                                        <option key={idx} value={issue}>{issue}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-white font-semibold mb-1">Severity (0-10)</label>
                                <input
                                    min={0}
                                    max={10}
                                    type="number"
                                    name="severity"
                                    value={formData.severity}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter severity"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white font-semibold mb-1">Remedy Action</label>
                                <input
                                    type="text"
                                    name="remedyAction"
                                    value={formData.remedyAction}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter remedy action"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white font-semibold mb-1">Repair Cost</label>
                                <input
                                    min={0}
                                    type="number"
                                    name="repairCost"
                                    value={formData.repairCost}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter repair cost"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-white font-semibold mb-1">Comment</label>
                                <textarea
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter comment"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Edit_delete;
