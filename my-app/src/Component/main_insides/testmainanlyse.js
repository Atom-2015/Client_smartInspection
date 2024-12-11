import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDrawPolygon, faSquare, faBolt } from '@fortawesome/free-solid-svg-icons';
import Map_main_analyse from './map_main_analyse';
import Existingissue from './main_analyse_componets/existingissues';
import Cloudimage_footer from './main_analyse_componets/cloudimage_footer';
import Formreportdata from './main_analyse_componets/formreportdata';
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import MainAnalyseShape from './main_analyse_componets/main_analyse_shape';
import { handleError } from '../../util';
import './analyse.css'


function Testmainanlyse() {
    const location = useLocation();
    const reportId = location.state?.id;
    const [data, setData] = useState(null);
    const [cloudimage, setCloudimage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageid, setImageid] = useState(0);
    const [updateimg, setUpdateimg] = useState({});
    const [toster, setToster] = useState();
    const [indexx, setIndexx] = useState(0);
    const [shapeData, setShapeData] = useState({ shape: [], shapename: '' });
    const [inspections, setInspections] = useState([]);
    const [shapeDataFromChild, setShapeDataFromChild] = useState(null); // New state to store shape data from Existingissue
    const [fastInspactionclicked2, setFastInspactionclicked2] = useState(false);




    const handleShapeDataChange = (data) => {
        if (data && data.shapename && data.shape) {
            setShapeData(data);
            console.log("Received shape data in TestMainAnalyse:", data);
        } else {
            // console.log("Shape data is incomplete or empty:", data);
        }
    };
    const handleShapeDataFromChild = (data) => {
        setShapeDataFromChild(data);
        console.log("Received shape data from Existingissue in Testmainanlyse:", data);
    };

    const [fastInspactionfromchild, setFastInspactionfromchild] = useState(null);




    const handlefastInspactionfromchild = (data) => {
        setFastInspactionfromchild(data);
    }

    const [updateissuestate, setUpdateissuestate] = useState(false);
    const [updateshape , setUpdateshape] = useState(false);
    const updatefooterimageforshape = (val)=>{
        setUpdateshape(val)
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://13.201.248.202:3001/api/main/cloudimage', {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('token'),
                        'x-report-id': Cookies.get('reportId'),
                    },
                });
                setData(response.data.data[0]);
                setCloudimage(response.data.data)
                setInspections(response.data.data);
                // console.log("Hooda",cloudimage);
            } catch (error) {
                console.log("Error in axios:", error);
            }
        })();
    }, [updateissuestate , updateshape]);


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



    const handleimagestore = (e) => {
        setUpdateimg({ ...updateimg, [e.target.name]: e.target.value });
    }
    const [clickedforfastinspactioncall, setClickedforfastinspactioncall] = useState("false");

    const handleImageClick = (url, index) => {
        setSelectedImage(url);
        setImageUrl(url);
        setIndexx(index);
        const newImageId = data.image[index]._id;
        setImageid(newImageId);
        localStorage.setItem('image-id', newImageId);
        setFastInspactionfromchild([]);
        setClickedforfastinspactioncall(true);
    };

    const handleImageClosing = () => {
        setSelectedImage(null);
    };



    async function handleimageupdate(e) {
        e.preventDefault();
        if (shapeData.shape.length === 0) {
            handleError("Please Create Shape Before Submiting");
            return;
        }
        try {
            const formData = new FormData();

            for (const key in updateimg) {
                formData.append(key, updateimg[key]);
            }

            formData.append('oldcloudinary_uri', selectedImage);
            formData.append('index', indexx);
            formData.append('reportid', reportId);
            formData.append('imageprocessed_id', imageid);
            if (shapeData && shapeData.shapename && shapeData.shape) {
                formData.append('shapename', shapeData.shapename);
                formData.append('shape', JSON.stringify(shapeData.shape));
            } else {
                console.warn("Shape data is missing, skipping shape fields.");
            }

            const response = await axios.post('http://13.201.248.202:3001/api/main/updateimage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': localStorage.getItem('token'),
                    'companyid': localStorage.getItem('company_id'),
                    'imageprocessed_id': imageid, // Ensure correct header name and value
                    'x-report-id': Cookies.get('reportId')
                },
            });

            // console.log(`The response is: ${response}`);
            setUpdateissuestate(true);
            setToster('Data Stored');
        } catch (error) {
            setToster('Error While Storing');
            console.error('Error while updating image:', error);
        }
    }

    function fastInspactionclicked() {
        // setFastInspactionclicked2(true)
        fastInspactionclicked2 ? setFastInspactionclicked2(false) : setFastInspactionclicked2(true);
    }
    const fastInspactionSetFalse = () => {
        setFastInspactionclicked2(false);
    }

    const [fastInspactionDatatoSiblingchild, setFastInspactionDatatoSiblingchild] = useState([]);


    const functionTosendF_inpactionDataToChild = (data) => {
        setFastInspactionDatatoSiblingchild(data);
    }
    const updatetofalse = () => {
        setUpdateissuestate(false);
    }

    return (
        <div className="container-fluid flex mt-2 gap-3 flex-col  h-[100vh] " id='analyseresponsive'>
            <div className='shadow-2xl shadow-blue-500/20 max-h-[100%] rounded '>
                <div className="container-fluid p-0 flex flex-grow  mb-4 w-[100%] gap-3 rounded ">
                    {selectedImage && (
                        <MainAnalyseShape
                            selectedImage={selectedImage}
                            imageUrl={imageUrl}
                            handleImageClosing={handleImageClosing}
                            data={data}
                            imageid={imageid}
                            shapeDataFromChild={shapeDataFromChild}
                            onShapeDataChange={handleShapeDataChange}
                            fastInspactionfromchild={fastInspactionfromchild}
                            sendfastmodal={fastInspactionclicked}
                            sendFastInspactionDataToParent={functionTosendF_inpactionDataToChild}
                            setClickedforfastinspactioncall={setClickedforfastinspactioncall}

                        />
                    )}
                    {/* {selectedImage && (
                            <p className="cursor-pointer text-white font-bold bg-slate-500 p-1 rounded-[50%] px-2 absolute top-[5px] right-[10px]" onClick={handleImageClosing}>
                                ✕
                            </p>
                        )} */}
                    <div className={`  rounded-lg shadow-md max-h-[600px] ${selectedImage ? 'w-[25%]' : 'hidden'}`}>
                        <div>
                            <Formreportdata
                                handleimageupdate={handleimageupdate}
                                handleimagestore={handleimagestore}
                                updateimg={updateimg}
                                tostermessage={toster}
                                fastInspactionclicked2={fastInspactionclicked2}
                                sendfalse={fastInspactionSetFalse}
                                fastInspactionDatatoSiblingchild={fastInspactionDatatoSiblingchild}
                            />
                        </div>
                    </div>

                    <div className={`${selectedImage ? 'w-[30%]' : 'w-full'}`}>
                        <div className={`${selectedImage ? 'w-full' : 'hidden'}`}>
                            <Existingissue clicked={imageid} sendShapeDataGet={handleShapeDataFromChild} sendfastinspaction={handlefastInspactionfromchild}
                                updateissuestate={updateissuestate} updateissuestatebyfalse={updatetofalse} />

                        </div>
                        <div className='h-[100%]'>
                            <div className={`${selectedImage ? 'hidden' : 'w-full'}`}>
                                <Map_main_analyse locations={getInspectionCoordinates()} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-center'>
                {data ? (
                    <Cloudimage_footer data={data} onImageClick={handleImageClick} cloudimage={cloudimage} updatefooter={updatefooterimageforshape} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>

            <ToastContainer />
        </div>
    );
}

export default Testmainanlyse;
