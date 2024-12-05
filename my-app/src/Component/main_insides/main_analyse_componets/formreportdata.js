import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { handleError, handleSuccess } from "../../../util";
import FastInspactionform from './main_analyse_nested_cmponenet/fastInspactionform';

function Formreportdata({
    handleimageupdate,
    handleimagestore,
    updateimg,
    tostermessage,
    fastInspactionclicked2,
    sendfalse,
    fastInspactionDatatoSiblingchild

}) {
    const [componentOptions, setComponentOptions] = useState([]);
    const [issueTypeOptions, setIssueTypeOptions] = useState([]);
    const [inspactiontype, setInspactiontype] = useState();
    const [openfastInspactionmodal , setOpenfastInspactionmodal] = useState(false);

    useEffect(() => {
        if (tostermessage === 'Data Stored') {
            handleSuccess(tostermessage);
            return;
        }
        handleError(tostermessage);
    }, [tostermessage]);

    useEffect(()=>{
        fastInspactionclicked2&& setOpenfastInspactionmodal(true);
    },[fastInspactionclicked2])

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
                    const data = response.data.data[0]; // Assuming you want the first entry
                    setComponentOptions(data.inspaction.componentname);
                    setIssueTypeOptions(data.issuetype);
                }
            } catch (error) {
                console.error(`Error fetching data: ${error}`);
            }
        })();
    }, []);
    
    const crossClicked = ()=>{
        // alert("Ram ram ladar")
        setOpenfastInspactionmodal(false);
        sendfalse(false)
    }
    return (
        <div className="p-4 bg-gray-900 rounded-lg shadow-lg w-[300px] h-[600px] mx-auto flex flex-col justify-between">
            {/* <form onSubmit={handleimageupdate} className="space-y-1 flex-1 overflow-hidden">
                
                <div className="flex flex-col">
                    <label htmlFor="component" className="mb-1 font-semibold text-gray-100">Component  <span className=' text-red-600 text-[20px] ' > * </span> </label>
                    <select
                        id="component"
                        name="component"
                        value={updateimg.component || ""}
                        onChange={handleimagestore}
                        className="custom-scrollbar p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100 max-h-[150px] overflow-y-auto"
                    >
                        <option value="" disabled>Select Component</option>
                        {componentOptions.map((component) => (
                            <option key={component} value={component}>{component}</option>
                        ))}
                    </select>
                </div>

              
                <div className="flex flex-col">
                    <label htmlFor="issue_type" className="mb-1 font-semibold text-gray-100">Issue Type <span className=' text-red-600 text-[20px] ' > * </span> </label>
                    <select
                        id="issue_type"
                        name="issue_type"
                        value={updateimg.issue_type || ""}
                        onChange={handleimagestore}
                        className="custom-scrollbar p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100 max-h-[150px] overflow-y-auto"
                    >
                        <option value="" disabled>Select Issue Type</option>
                        {issueTypeOptions.map((issueType) => (
                            <option key={issueType} value={issueType}>{issueType}</option>
                        ))}
                    </select>
                </div>

                 
                <div className="flex flex-col">
                    <label htmlFor="severity" className="mb-1 font-semibold text-gray-100">Severity (0-10)</label>
                    <input
                        id="severity"
                        placeholder="Enter Severity"
                        type="number"
                        max={10}
                        min={0}
                        name="severity"
                        value={updateimg.severity || ""}
                        onChange={handleimagestore}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100"
                    />
                </div>

                 
                <div className="flex flex-col">
                    <label htmlFor="remedy_action" className="mb-1 font-semibold text-gray-100">Remedy Action</label>
                    <input
                        id="remedy_action"
                        placeholder="Enter Remedy Action"
                        type="text"
                        name="remedy_action"
                        value={updateimg.remedy_action || ""}
                        onChange={handleimagestore}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100"
                    />
                </div>

               
                <div className="flex flex-col">
                    <label htmlFor="repair_cost" className="mb-1 font-semibold text-gray-100">Repair Cost</label>
                    <input
                        id="repair_cost"
                        placeholder="Enter Repair Cost"
                        type="number"
                        name="repair_cost"
                        value={updateimg.repair_cost || ""}
                        onChange={handleimagestore}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100"
                    />
                </div>

         
                <div className="flex flex-col">
                    <label htmlFor="comment" className="mb-1 font-semibold text-gray-100">Comment</label>
                    <textarea
                        id="comment"
                        placeholder="Enter Comment"
                        name="comment"
                        value={updateimg.comment || ""}
                        onChange={handleimagestore}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100 resize-none h-20 custom-scrollbar"
                    />
                </div>

               
                <button
                    type="submit"
                    className="w-full mt-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-md hover:from-purple-600 hover:to-blue-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-700"
                >
                    Submit
                </button>
            </form> */}
            
            {openfastInspactionmodal?(
                <div>
                 <FastInspactionform componentOptions={componentOptions} issueTypeOptions={issueTypeOptions} fastInspactionDatatoSiblingchild={fastInspactionDatatoSiblingchild}/>
                  <button className=' text-white "w-full mt-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600  font-semibold rounded-md hover:from-purple-600 hover:to-blue-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-700 w-[100%] '  onClick={(e)=> crossClicked(e) } > Cancel </button>
                  </div>
                )                 
                 : <form onSubmit={handleimageupdate} className="space-y-1 flex-1 overflow-hidden"> 
                <div className="flex flex-col">
                    <label htmlFor="component" className="mb-1 font-semibold text-gray-100"> Component  <span className=' text-red-600 text-[20px] ' > * </span> </label>
                    <select
                        id="component"
                        name="component"
                        value={updateimg.component || ""}
                        onChange={handleimagestore}
                        className="custom-scrollbar p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100 max-h-[150px] overflow-y-auto"
                    >
                        <option value="" disabled>Select Component</option>
                        {componentOptions.map((component) => (
                            <option key={component} value={component}>{component}</option>
                        ))}
                    </select>
                </div> 
                <div className="flex flex-col">
                    <label htmlFor="issue_type" className="mb-1 font-semibold text-gray-100">Issue Type <span className=' text-red-600 text-[20px] ' > * </span> </label>
                    <select
                        id="issue_type"
                        name="issue_type"
                        value={updateimg.issue_type || ""}
                        onChange={handleimagestore}
                        className="custom-scrollbar p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100 max-h-[150px] overflow-y-auto"
                    >
                        <option value="" disabled>Select Issue Type</option>
                        {issueTypeOptions.map((issueType) => (
                            <option key={issueType} value={issueType}>{issueType}</option>
                        ))}
                    </select>
                </div> 
                <div className="flex flex-col">
                    <label htmlFor="severity" className="mb-1 font-semibold text-gray-100">Severity (0-10)</label>
                    <input
                        id="severity"
                        placeholder="Enter Severity"
                        type="number"
                        max={10}
                        min={0}
                        name="severity"
                        value={updateimg.severity || ""}
                        onChange={handleimagestore}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100"
                    />
                </div>
 
                <div className="flex flex-col">
                    <label htmlFor="remedy_action" className="mb-1 font-semibold text-gray-100">Remedy Action</label>
                    <input
                        id="remedy_action"
                        placeholder="Enter Remedy Action"
                        type="text"
                        name="remedy_action"
                        value={updateimg.remedy_action || ""}
                        onChange={handleimagestore}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100"
                    />
                </div>
 
                <div className="flex flex-col">
                    <label htmlFor="repair_cost" className="mb-1 font-semibold text-gray-100">Repair Cost</label>
                    <input
                        id="repair_cost"
                        placeholder="Enter Repair Cost"
                        type="number"
                        name="repair_cost"
                        value={updateimg.repair_cost || ""}
                        onChange={handleimagestore}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100"
                    />
                </div>
 
                <div className="flex flex-col">
                    <label htmlFor="comment" className="mb-1 font-semibold text-gray-100">Comment</label>
                    <textarea
                        id="comment"
                        placeholder="Enter Comment"
                        name="comment"
                        value={updateimg.comment || ""}
                        onChange={handleimagestore}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100 resize-none h-20 custom-scrollbar"
                    />
                </div>
 
                <button
                    type="submit"
                    className="w-full mt-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-md hover:from-purple-600 hover:to-blue-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-700"
                >
                    Submit
                </button>
            </form> }
        </div>
    );
}

export default Formreportdata;



// Formreportdata.js
// // Formreportdata.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer } from 'react-toastify';

// function Formreportdata({
//     handleimageupdate,
//     handleimagestore,
//     updateimg,
//     handleSuccess,
//     handleError,
//     reportId
// }) {
//     const [data, setData] = useState(null); // Store the fetched image data

//     // Fetch image data inside this component
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

//                 if (response.data) {
//                     handleSuccess('Image data fetched successfully!');
//                     setData(response.data.data[0]);
//                 } else {
//                     handleError('No image data found!');
//                 }
//             } catch (error) {
//                 handleError(`Error fetching image data: ${error.message}`);
//             }
//         })();
//     }, [reportId, handleSuccess, handleError]);

//     return (
//         <div>
//             <ToastContainer /> {/* ToastContainer inside this component */}
//             <form onSubmit={handleimageupdate} className="space-y-2 h-[auto]">
//                 <div className="flex flex-col">
//                     <label htmlFor="component" className="mb-1 font-semibold">Component</label>
//                     <input
//                         id="component"
//                         placeholder="Enter Component"
//                         type="text"
//                         name="component"
//                         value={updateimg.component || ""}
//                         onChange={handleimagestore}
//                         className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>

//                 <div className="flex flex-col">
//                     <label htmlFor="issue_type" className="mb-1 font-semibold">Issue Type</label>
//                     <input
//                         id="issue_type"
//                         placeholder="Enter Issue Type"
//                         type="text"
//                         name="issue_type"
//                         value={updateimg.issue_type || ""}
//                         onChange={handleimagestore}
//                         className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     className="w-[199px] mt-2 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
//                 >
//                     Submit
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default Formreportdata;
