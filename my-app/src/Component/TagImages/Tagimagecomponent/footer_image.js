// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { handleError } from '../../../util';
// import Cookies from 'js-cookie';

// function FooterImage({imageidtoparent}) {
//     const [data, setData] = useState([]);
//     const imagesPerPage = 5;
//     const [currentPage, setCurrentPage] = useState(1);

//     const totalPages = Math.ceil(data.length / imagesPerPage);

//     const getCurrentPageImages = () => {
//         const startIndex = (currentPage - 1) * imagesPerPage;
//         const endIndex = startIndex + imagesPerPage;
//         return data.slice(startIndex, endIndex);
//     };

//     const handlePrevPage = () => {
//         if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//     };

//     const handleNextPage = () => {
//         if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//     };

//     useEffect(() => {
//         (async () => {
//             try {
//                 const response = await axios.get('/api/main/detailimagdata', {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'x-auth-token': localStorage.getItem('token'),
//                         'x-report-id': Cookies.get('reportId'),
//                     },
//                 });
//                 setData(response.data.data || []);
//             } catch (error) {
//                 console.error('Error in axios:', error);
//                 handleError('Failed to fetch images.');
//             }
//         })();
//     }, []);

//     const [imageid , setImageid] = useState([]);
//     function handleImageCheckSelected(selectedImageid){
//         // console.log(imageid);
//         imageidtoparent(imageid);
//         setImageid(previousData =>{
//            if(!previousData.includes(selectedImageid)){
//             return [...previousData , selectedImageid]
//            }else{
//             return previousData.filter(item => item!= selectedImageid)
//            }
//         })
//     }

//     return (
//         <div className="p-4">
//             <h1 className="text-lg font-bold mb-4">All Images</h1>
//             {data.length > 0 ? (
//                 <table className="w-full border-collapse border border-gray-300">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="border px-4 py-2">Select</th>
//                             <th className="border px-4 py-2">Thumbnail</th>
//                             <th className="border px-4 py-2">Name</th>
//                             <th className="border px-4 py-2">Date Taken</th>
//                             <th className="border px-4 py-2">Date Uploaded</th>
//                             <th className="border px-4 py-2">Severities</th>
//                             <th className="border px-4 py-2">Tags</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {getCurrentPageImages().map((value, index) => (
//                             <tr key={index} className="even:bg-gray-50">
//                                 <td className="border px-4 py-2">
//                                     <input type="checkbox"  onClick={()=>handleImageCheckSelected(value._id)}  />
//                                 </td>
//                                 <td>{value._id}</td>
//                                 <td className="border px-4 py-2">
//                                     <img
//                                         src={value.imageLink}
//                                         alt={`Image ${index + 1}`}
//                                         className="w-20 h-20 object-cover"
//                                     />
//                                 </td>
//                                 <td className="border px-4 py-2">
//                                     {value.name ? value.name : '-'}
//                                 </td>
//                                 <td className="border px-4 py-2">
//                                     {value.dateTaken ? value.dateTaken : '-'}
//                                 </td>
//                                 <td className="border px-4 py-2">
//                                     {value.updatedAt
//                                         ? new Date(value.updatedAt).toLocaleDateString()
//                                         : '-'}
//                                 </td>
//                                 <td className="border px-4 py-2">
//                                     {value.reportdetail && value.reportdetail.length > 0
//                                         ? value.reportdetail[0].severity || '-'
//                                         : '-'}
//                                 </td>
//                                 <td className="border px-4 py-2">
//                                     {value.tags && value.tags.length > 0
//                                         ? value.tags.join(', ')
//                                         : '-'}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : (
//                 <p>No data available</p>
//             )}
//             <div className="flex justify-between mt-4">
//                 <button
//                     className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
//                     onClick={handlePrevPage}
//                     disabled={currentPage === 1}
//                 >
//                     Prev
//                 </button>
//                 <span>
//                     Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                     className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
//                     onClick={handleNextPage}
//                     disabled={currentPage === totalPages}
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default FooterImage;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { handleError } from '../../../util';
import Cookies from 'js-cookie';

function FooterImage({ imageidtoparent }) {
    const [data, setData] = useState([]);
    const imagesPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [imageidArray, setImageidArray] = useState([]);

    const totalPages = Math.ceil(data.length / imagesPerPage);

    const getCurrentPageImages = () => {
        const startIndex = (currentPage - 1) * imagesPerPage;
        const endIndex = startIndex + imagesPerPage;
        return data.slice(startIndex, endIndex);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://13.201.248.202:3001/api/main/detailimagdata', {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('token'),
                        'x-report-id': Cookies.get('reportId'),
                    },
                });
                setData(response.data.data || []);
            } catch (error) {
                console.error('Error in axios:', error);
                handleError('Failed to fetch images.');
            }
        })();
    }, []);

    function handleImageCheckSelected(selectedImageId) {
        setImageidArray((prev) => {
            const newImageIds = prev.includes(selectedImageId)
                ? prev.filter(id => id !== selectedImageId) // Remove if already included
                : [...prev, selectedImageId]; // Add if not included

            // Pass the updated image IDs to the parent
            imageidtoparent(newImageIds);
            return newImageIds;
        });
    }

    return (
        <div className="p-4 w-full">
            <h1 className="text-[25px] font-semibold mb-4 text-white">Assigned Tags</h1>
            {data.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300 ">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Select</th>
                            <th className="border px-4 py-2">Thumbnail</th>
                            {/* <th className="border px-4 py-2">Name</th>   */}
                            {/* <th className="border px-4 py-2">Date Taken</th> */}
                            {/* <th className="border px-4 py-2">Severities</th> */}
                            <th className="border px-4 py-2">Date Uploaded</th>
                            
                            <th className="border px-4 py-2">Tags</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getCurrentPageImages().map((value, index) => (
                            <tr key={index} className="even:bg-gray-50">
                                <td className="border px-4 py-2 text-white bg-[#1e1e1e]">
                                    <input type="checkbox" onClick={() => handleImageCheckSelected(value._id)} />
                                </td>
                                <td className="border px-4 py-2 bg-[#1e1e1e] ">  <img
                                        src={value.imageLink}
                                        alt={`Image ${index + 1}`}
                                        className="w-20 h-20 object-cover "
                                    /></td>
                                {/* <td className="border px-4 py-2 text-white bg-[#1e1e1e]">
                                     <p>Name</p>
                                </td> */}
                                {/* <td className="border px-4 py-2 text-white bg-[#1e1e1e]">
                                    {value.name ? value.name : '-'}
                                </td> */}
                                {/* <td className="border px-4 py-2 text-white bg-[#1e1e1e]">
                                {value.reportdetail && value.reportdetail.length > 0 ? value.reportdetail[0].severity || '-' : '-'}
                                     {value.dateTaken ? value.dateTaken : '-'} 
                                </td> */}
                                <td className="border px-4 py-2 text-white bg-[#1e1e1e]">
                                    {value.updatedAt ? new Date(value.updatedAt).toLocaleDateString() : '-'}
                                </td>
                                <td className="border px-4 py-2 text-white bg-[#1e1e1e]">
                                {value.tags && value.tags.length > 0 ? value.tags.join(', ') : '-'}
                                </td>
                                {/* <td className="border px-4 py-2">
                                    {value.tags && value.tags.length > 0 ? value.tags.join(', ') : '-'}
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No data available</p>
            )}
            <div className="flex justify-between mt-4">
                <button
                    className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default FooterImage;
