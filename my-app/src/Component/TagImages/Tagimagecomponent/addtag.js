// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { handleError, handleSuccess } from '../../../util';
// import AddGroupmodal from './addGroupmodal';
// import Addtagmodal from './addtagmodal';

// function Addtag({imageid}) {
//     const [data, setData] = useState();
//     const [tagData, setTagData] = useState([]); // Store selected tags
    
//     const [imageidArray , setImageidArray] = useState();
//     const [refreshTags, setRefreshTags] = useState(false);

//     console.log(imageid);
    
//     // Fetch tags from the backend
//     // useEffect(() => {
//     //     (async () => {
//     //         try {
//     //             const response = await axios.get('/api/tagimage/getalltags', {
//     //                 headers: {
//     //                     'x-auth-token': localStorage.getItem('token'),
//     //                     'x-report-id': Cookies.get('reportId'),
//     //                 },
//     //             });
//     //             setData(response.data.data[0]);
//     //         } catch (error) {
//     //             console.log(error);
//     //             handleError('Error fetching tags');
//     //         }
//     //     })();
//     // }, []);
//     useEffect(() => {
//         (async () => {
//             try {
//                 const response = await axios.get('http://13.201.248.202:3001/api/tagimage/getalltags', {
//                     headers: {
//                         'x-auth-token': localStorage.getItem('token'),
//                         'x-report-id': Cookies.get('reportId'),
//                     },
//                 });
//                 setData(response.data.data[0]);
//             } catch (error) {
//                 console.log(error);
//                 handleError('Error fetching tags');
//             }
//         })();
//     }, [refreshTags]); // Depend on refreshTags
    
//     // Handle adding/removing tags on selection
//     function handlestoretags(tag) {
//         console.log(tagData)
//         setTagData(prevTagData => {
//             if (!prevTagData.includes(tag)) {
//                 return [...prevTagData, tag]; // Add tag
//             } else {
//                 return prevTagData.filter(item => item !== tag); // Remove tag
//             }
//         });
        
//     }

//     async function assigntags() {
//         // alert("clicked");
//         // await setImageidArray(imageid);
//         console.log("Image IDs:", imageidArray);
//         console.log("Tags:", tagData);
//         try {
//             const response = await axios.post('http://13.201.248.202:3001/api/tagimage/addtagwithimage', { imageid: imageid, tags: tagData }, {
//                 headers: {
//                     'x-auth-token': localStorage.getItem('token'),
//                     'x-report-id': Cookies.get('reportId'),
//                 }
//             });
    
//             if (response.status === 200) {
//                 handleSuccess("Tags Added");
//                 setRefreshTags(prev => !prev);
//             }
//         } catch (error) {
//             console.log(error);
//             handleError("Tags Can't be stored");
//         }
//     }

//     return (
//         <div className=" rounded  w-[30%] p-2 space-y-4">
//             <div>
//                 <p className="text-white text-[14px]">
//                     Select your tags below and either single select, polygon select, or position select which images you would like to assign them to. Once you have made your selection, click assign.
//                 </p>
//                 <AddGroupmodal />
//             </div>

//             <div className="border border-red-300 h-[300px]  overflow-auto rounded-lg p-2">
//                 {data ? (
//                     data.maintag.map((item, index) => (
//                         <div key={index} className=" p-1 rounded-lg ">
//                             <div className="mb-2">
//                                 <Addtagmodal itemId={item._id} imagetag={data._id} />
//                             </div>
//                             <p className="font-semibold text-white">Group: {item.taggroup}</p>
//                             <div className="flex flex-wrap gap-2 mt-2">
//                                 {item.tags && item.tags.length > 0 ? (
//                                     item.tags.map((tag, tagIndex) => (
//                                         <div
//                                             key={tagIndex}
//                                             onClick={() => handlestoretags(tag)} // Toggle tag selection
//                                             className={`px-3 py-1 text-center  rounded cursor-pointer ${
//                                                 tagData.includes(tag)
//                                                     ? 'border-2 border-blue-500 ' // Selected
//                                                     : 'border border-gray-300 ' // Not selected
//                                             }`}
//                                         >
//                                             <p className=" text-black">{tag}</p>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p className="text-white">No Tags Created Yet</p>
//                                 )}
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className='text-white'>No data</p>
//                 )}
//             </div>

//             <div className="flex justify-between pl-1">
//                 <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
//                     More
//                 </button>
//                 <div className="flex space-x-2">
//                     <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
//                         Remove
//                     </button>
//                     <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition" onClick={()=>assigntags()}>
//                         Assign
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Addtag;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { handleError, handleSuccess } from '../../../util';
import AddGroupmodal from './addGroupmodal';
import Addtagmodal from './addtagmodal';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteUser } from '../../../FeatureRedux/analyse_unassign_tags';  

function Addtag({ imageid }) {
    const [data, setData] = useState();
    const [tagData, setTagData] = useState([]); // Store selected tags
    const [imageidArray, setImageidArray] = useState();
    const [refreshTags, setRefreshTags] = useState(false);
    
    const dispatch = useDispatch();

    // Accessing Redux state correctly
    const { isLoading, isError, errorMessage } = useSelector(state => state.unassign);
    
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://13.201.248.202:3001/api/tagimage/getalltags', {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                        'x-report-id': Cookies.get('reportId'),
                    },
                });
                setData(response.data.data[0]);
            } catch (error) {
                console.log(error);
                handleError('Error fetching tags');
            }
        })();
    }, [refreshTags]); // Depend on refreshTags
    
    // Handle adding/removing tags on selection
    function handlestoretags(tag) {
        setTagData(prevTagData => {
            if (!prevTagData.includes(tag)) {
                return [...prevTagData, tag]; // Add tag
            } else {
                return prevTagData.filter(item => item !== tag); // Remove tag
            }
        });
    }

    async function assigntags() {
        try {
            const response = await axios.post('http://13.201.248.202:3001/api/tagimage/addtagwithimage', { imageid: imageid, tags: tagData }, {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                    'x-report-id': Cookies.get('reportId'),
                }
            });

            if (response.status === 200) {
                handleSuccess("Tags Added");
                setRefreshTags(prev => !prev);
            }
        } catch (error) {
            console.log(error);
            handleError("Tags Can't be stored");
        }
    }

    const unassigntags = () => {
        if (tagData.length === 0) {
            handleError("No tags selected to remove");
            return;
        }

        // Dispatching the DeleteUser action
        const removetags = { images: imageid, tags: tagData };
        dispatch(DeleteUser(removetags))
            .unwrap()
            .then(() => {
                handleSuccess("Tags Removed Successfully");
                setRefreshTags(prev => !prev); // Refresh after removing tags
            })
            .catch((err) => {
                handleError(err || "Failed to remove tags");
            });
    }

    return (
        <div className="rounded w-[30%] p-2 space-y-4">
            <div>
                <p className="text-white text-[14px]">
                    Select your tags below and either single select, polygon select, or position select which images you would like to assign them to. Once you have made your selection, click assign.
                </p>
                <AddGroupmodal />
            </div>

            <div className="border border-red-300 h-[300px] overflow-auto rounded-lg p-2">
                {data ? (
                    data.maintag.map((item, index) => (
                        <div key={index} className="p-1 rounded-lg">
                            <div className="mb-2">
                                <Addtagmodal itemId={item._id} imagetag={data._id} />
                            </div>
                            <p className="font-semibold text-white">Group: {item.taggroup}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {item.tags && item.tags.length > 0 ? (
                                    item.tags.map((tag, tagIndex) => (
                                        <div
                                            key={tagIndex}
                                            onClick={() => handlestoretags(tag)} // Toggle tag selection
                                            className={`px-3 py-1 text-center rounded cursor-pointer ${
                                                tagData.includes(tag)
                                                    ? 'border-2 border-blue-500' // Selected
                                                    : 'border border-gray-300' // Not selected
                                            }`}
                                        >
                                            <p className="text-black">{tag}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-white">No Tags Created Yet</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='text-white'>No data</p>
                )}
            </div>

            <div className="flex justify-between gap-2 pl-1">
                <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
                    More
                </button>
                <div className="flex space-x-2">
                    <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition" onClick={unassigntags}>
                        Remove
                    </button>
                    <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition" onClick={assigntags}>
                        Assign
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Addtag;
