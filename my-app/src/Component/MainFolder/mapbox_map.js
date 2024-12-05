// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Import Axios or use Fetch API for making API calls
// import Map, { Marker, NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css'; // Ensure Mapbox CSS is loaded
// import { useNavigate } from 'react-router-dom';

// const MapboxMap = () => {  
//   const [viewState, setViewState] = useState({
//     latitude: 28.6139, // Default latitude (New Delhi)
//     longitude: 77.2090, // Default longitude (New Delhi)
//     zoom: 3, // Initial zoom level
//   });

//   const navigate = useNavigate();

//   const [inspections, setInspections] = useState([]); // State to hold the inspections data

//   // Fetch inspections data from the API when the component mounts
//   useEffect(() => {
//     const fetchInspections = async () => {
//       try {
//         const response = await axios.get('/api/main/listing', {
//           headers: {
//             'x-auth-token': localStorage.getItem('token')
//           }
//         });
//         setInspections(response.data); // Assuming the data contains latitude and longitude
//       } catch (error) {
//         console.error('Error fetching inspections:', error);
//       }
//     };

//     fetchInspections();
//   }, []); // Run this effect once when the component mounts

//   // Handle marker click (you can adjust this logic to open a modal or show details)
//   const handleMarkerClick = (id) => {
//     console.log('Clicked inspection:', id);
//     navigate('/detail/analyse', { state: { id } });
//   };

//   return (
//     <div style={{ height: '100%', width: '100%' }}> {/* Full width and height for the map */}
//       <Map
//         {...viewState}
//         mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoibmlraXRhY2hhdWhhbjEyMyIsImEiOiJjbGwwaWxrdzEwZW02M2pxcjN4eHo1bDR1In0.I4yZh8CAQOz2c63IsCBOpg'}
//         style={{ width: '100%', height: '100%' }}  // Ensure the map fills the container
//         mapStyle="mapbox://styles/mapbox/streets-v11" 
//         onMove={(evt) => setViewState(evt.viewState)}
//       >
//         {/* Loop through inspections and place a marker for the first valid latitude and longitude */}
//         {inspections.map((inspection) => {
//           // Use the inspection's latitude/longitude if available
//           const inspectionLat = inspection.latitude ? parseFloat(inspection.latitude.$numberDecimal) : null;
//           const inspectionLng = inspection.longitude ? parseFloat(inspection.longitude.$numberDecimal) : null;

//           // Check if the inspection has images with valid latitude and longitude
//           if (inspection.image && inspection.image.length > 0) {
//             const firstImage = inspection.image[0];
//             const imageLat = firstImage.latitude ? parseFloat(firstImage.latitude.$numberDecimal) : null;
//             const imageLng = firstImage.longitude ? parseFloat(firstImage.longitude.$numberDecimal) : null;

//             // Place a marker using the first valid coordinates from either the image or the inspection itself
//             if ((inspectionLat && inspectionLng) || (imageLat && imageLng)) {
//               return (
//                 <Marker
//                   key={inspection._id} // Use the inspection ID as the key
//                   latitude={imageLat || inspectionLat} // Use the first valid image coordinates or fallback to the inspection coordinates
//                   longitude={imageLng || inspectionLng}
//                 >
//                   <div onClick={() => handleMarkerClick(inspection._id)} className=' cursor-pointer ' >🔵</div> {/* Marker with click handler */}
//                 </Marker>
//               );
//             }
//           }
//           return null; // Return null if no valid coordinates found
//         })}

//         {/* Map Controls */}
//         <NavigationControl position="top-right" />
//         <FullscreenControl position="top-right" />
//         <GeolocateControl
//           position="top-right"
//           trackUserLocation={true}
//           showUserHeading={true}
//         />
//       </Map>
//     </div>
//   );
// };

// export default MapboxMap;








// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Map, { Marker, NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

// const MapboxMap = () => {
//   const [viewState, setViewState] = useState({
//     latitude: 28.6139, // Default latitude (New Delhi)
//     longitude: 77.2090, // Default longitude (New Delhi)
//     zoom: 2, // Initial zoom level
//   });

//   const [inspections, setInspections] = useState([]);
//   const [hoveredInspection, setHoveredInspection] = useState(null); // State to manage hovered inspection
//   const navigate = useNavigate();

//   // Fetch inspections data from the API
//   useEffect(() => {
//     const fetchInspections = async () => {
//       try {
//         const response = await axios.get('/api/main/listing', {
//           headers: {
//             'x-auth-token': localStorage.getItem('token')
//           }
//         });
//         setInspections(response.data);
//       } catch (error) {
//         console.error('Error fetching inspections:', error);
//       }
//     };

//     fetchInspections();
//   }, []);

//   // Handle marker click
//   const handleMarkerClick = (id) => {
//     console.log('Clicked inspection:', id);
//     navigate('/detail/analyse', { state: { id } });
//   };

//   // Helper to parse decimal values safely
//   const parseDecimal = (value) => {
//     return value ? parseFloat(value.$numberDecimal) : null;
//   };

//   return (
//     <div style={{ height: '100%', width: '100%' }}>
//       <Map
//         {...viewState}
//         mapboxAccessToken={
//           process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ||
//           'pk.eyJ1IjoibmlraXRhY2hhdWhhbjEyMyIsImEiOiJjbGwwaWxrdzEwZW02M2pxcjN4eHo1bDR1In0.I4yZh8CAQOz2c63IsCBOpg'
//         }
//         style={{ width: '100%', height: '100%' }}
//         mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
//         onMove={(evt) => setViewState(evt.viewState)}
//       >
//         {inspections.map((inspection) => {
//           const inspectionLat = parseDecimal(inspection.latitude);
//           const inspectionLng = parseDecimal(inspection.longitude);

//           const firstImage = inspection.image?.[0] || {};
//           const imageLat = parseDecimal(firstImage.latitude);
//           const imageLng = parseDecimal(firstImage.longitude);

//           const latitude = imageLat || inspectionLat;
//           const longitude = imageLng || inspectionLng;

//           // Render marker only if valid coordinates are found
//           if (latitude !== null && longitude !== null) {
//             return (
//               <Marker key={inspection._id} latitude={latitude} longitude={longitude}>
//                 <div
//                   onClick={() => handleMarkerClick(inspection._id)}
//                   onMouseOver={() => setHoveredInspection(inspection.inspaction_name)}
//                   onMouseOut={() => setHoveredInspection(null)}
//                   style={{ cursor: 'pointer' }}
//                 >
//                   <FontAwesomeIcon icon={faLocationDot} beat style={{ color: "#cb1515" , width: "18px" , height:"18px" }} />
//                   {/* Display tooltip if this inspection is hovered */}
//                   {hoveredInspection === inspection.inspaction_name && (
//                     <div style={{
//                       position: 'absolute',
//                       backgroundColor: '#2f588e',
//                       padding: '5px',
//                       borderRadius: '4px',
//                       top: '-30px',
//                       left: '20px',
//                       boxShadow: '0px 0px 5px 2px rgba(0,0,0,0.2)',
//                       fontSize: '13px',
//                       color: 'white',
//                       width: '80px',
//                       fontFamily: 'sans-serif'

//                     }}>
//                       {inspection.inspaction_name}
//                     </div>
//                   )}
//                 </div>
//               </Marker>
//             );
//           }
//           return null; // Skip rendering if no valid coordinates
//         })}

//         {/* Map Controls */}
//         <NavigationControl position="top-right" />
//         <FullscreenControl position="top-right" />
//         <GeolocateControl
//           position="top-right"
//           trackUserLocation={true}
//           showUserHeading={true}
//         />
//       </Map>
//     </div>
//   );
// };

// export default MapboxMap;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map, { Marker, NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const MapboxMap = () => {
  const [viewState, setViewState] = useState({
    latitude: 28.6139, // Default latitude (New Delhi)
    longitude: 77.2090, // Default longitude (New Delhi)
    zoom: 2, // Initial zoom level
  });

  const [inspections, setInspections] = useState([]);
  const [hoveredInspection, setHoveredInspection] = useState(null); // State to manage hovered inspection
  const navigate = useNavigate();

  // Helper to parse decimal values safely
  const parseDecimal = (value) => {
    try {
      return value ? parseFloat(value.$numberDecimal) : null;
    } catch (err) {
      console.error('Error parsing decimal:', value, err);
      return null;
    }
  };

  // Fetch inspections data from the API
  useEffect(() => {
    const fetchInspections = async () => {
      try {
        const response = await axios.get('/api/main/listing', {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        const data = response.data || []; // Fallback to empty array if no data
        setInspections(Array.isArray(data) ? data : []); // Ensure inspections is always an array
      } catch (error) {
        console.error('Error fetching inspections:', error);
        setInspections([]); // Reset to empty array on error
      }
    };

    fetchInspections();
  }, []);

  // Handle marker click
  const handleMarkerClick = (id) => {
    console.log('Clicked inspection:', id);
    navigate('/detail/analyse', { state: { id } });
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Map
        {...viewState}
        mapboxAccessToken={
          process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ||
          'pk.eyJ1IjoibmlraXRhY2hhdWhhbjEyMyIsImEiOiJjbGwwaWxrdzEwZW02M2pxcjN4eHo1bDR1In0.I4yZh8CAQOz2c63IsCBOpg'
        }
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
        onMove={(evt) => setViewState(evt.viewState)}
      >
        {Array.isArray(inspections) &&
          inspections.map((inspection) => {
            const inspectionLat = parseDecimal(inspection.latitude);
            const inspectionLng = parseDecimal(inspection.longitude);

            const firstImage = inspection.image?.[0] || {};
            const imageLat = parseDecimal(firstImage.latitude);
            const imageLng = parseDecimal(firstImage.longitude);

            const latitude = imageLat || inspectionLat;
            const longitude = imageLng || inspectionLng;

            // Render marker only if valid coordinates are found
            if (latitude !== null && longitude !== null) {
              return (
                <Marker key={inspection._id} latitude={latitude} longitude={longitude}>
                  <div
                    onClick={() => handleMarkerClick(inspection._id)}
                    onMouseOver={() => setHoveredInspection(inspection.inspaction_name)}
                    onMouseOut={() => setHoveredInspection(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      beat
                      style={{ color: '#cb1515', width: '18px', height: '18px' }}
                    />
                    {/* Display tooltip if this inspection is hovered */}
                    {hoveredInspection === inspection.inspaction_name && (
                      <div
                        style={{
                          position: 'absolute',
                          backgroundColor: '#2f588e',
                          padding: '5px',
                          borderRadius: '4px',
                          top: '-30px',
                          left: '20px',
                          boxShadow: '0px 0px 5px 2px rgba(0,0,0,0.2)',
                          fontSize: '13px',
                          color: 'white',
                          width: '80px',
                          fontFamily: 'sans-serif'
                        }}
                      >
                        {inspection.inspaction_name}
                      </div>
                    )}
                  </div>
                </Marker>
              );
            }
            return null; // Skip rendering if no valid coordinates
          })}

        {/* Map Controls */}
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />
        <GeolocateControl
          position="top-right"
          trackUserLocation={true}
          showUserHeading={true}
        />
      </Map>
    </div>
  );
};

export default MapboxMap;
