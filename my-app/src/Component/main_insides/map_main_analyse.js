import React, { useState } from 'react';
import Map, { Marker, NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // This is needed for the map to be styled
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import  {useHistory}  from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Map_main_analyse = ({ locations }) => {
  const [viewState, setViewState] = useState({
    latitude: 28.6139, // Default latitude (New Delhi)
    longitude: 77.2090, // Default longitude (New Delhi)
     zoom: 2, // Initial zoom level
  });
  // const history = useHistory();

  // // Handle marker click
  // const handleMarkerClick = (mainImage) => {
  //   // Navigate to inspection detail page (update with your actual route)
  //   history.push(`/inspection/${mainImage}`);
  // };

  console.log("locations are .........",locations)

  return (
    <div className="container-fluid mt-4">
      <div className="w-full flex justify-center">
        <div className="w-full ">
          <div style={{ height: '580px', width: '100%', border: '1px solid #ddd' }}>
            <Map
              {...viewState}
              mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoibmlraXRhY2hhdWhhbjEyMyIsImEiOiJjbGwwaWxrdzEwZW02M2pxcjN4eHo1bDR1In0.I4yZh8CAQOz2c63IsCBOpg'}
              style={{ width: '100%', height: '100%' }}
              mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
              onMove={(evt) => setViewState(evt.viewState)}
            >
              {/* Display markers for each inspection */}
              {locations.map((location, index) => (
              <Marker
                key={`marker-${location.id}-${index}`}
                latitude={parseFloat(location.latitude)}
                longitude={parseFloat(location.longitude)}
              >
                {/* <div style={{ cursor: 'pointer' }} onClick={() => console.log(location.mainImage)}>🔵</div> */}

                <FontAwesomeIcon icon={faLocationDot} bounce style={{ color: "#cb1515" , width: "18px" , height:"18px" }} />
              </Marker>
            ))}

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
        </div>
      </div>
    </div>
  );
};

export default Map_main_analyse;




























































// export default Map_main_analyse;


//   import React, { useState, useEffect } from 'react';
//   import Map, { Marker, NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl';
//   import 'mapbox-gl/dist/mapbox-gl.css'; // This is needed for the map to be styled
//   import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

//   const Map_main_analyse = ({ latitude, longitude }) => {  
//     const [viewState, setViewState] = useState({
//       latitude: 28.6139, // Default latitude (New Delhi)
//       longitude: 77.2090, // Default longitude (New Delhi)
//       zoom: 12, // Initial zoom level
//     });

//     // Update viewState when latitude/longitude props change
//     useEffect(() => {
//       if (latitude && longitude) {
//         console.log('Updating view with new location:', latitude, longitude); // Log to verify data
//         setViewState({
//           latitude: parseFloat(latitude),
//           longitude: parseFloat(longitude),
//           zoom: 10    ,
//         });
//       }
//     }, [latitude, longitude]);

//     return (
//       <div className="container-fluid mt-4">
//       <div className="w-full flex justify-center">
//   <div className="w-full">
//     <div style={{ height: '500px', width: '100%', border: '1px solid #ddd',  }}>
//       <Map
//         {...viewState}
//         mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoibmlraXRhY2hhdWhhbjEyMyIsImEiOiJjbGwwaWxrdzEwZW02M2pxcjN4eHo1bDR1In0.I4yZh8CAQOz2c63IsCBOpg'}
//         style={{ width: '100%', height: '100%' }}
//         mapStyle="mapbox://styles/mapbox/streets-v11"
//         onMove={(evt) => setViewState(evt.viewState)}
//       >
//         {latitude && longitude && (
//           <Marker latitude={parseFloat(latitude)} longitude={parseFloat(longitude)}>
//             <div>🔵</div>
//           </Marker>
//         )}

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
//   </div>
// </div>

//       </div>
//     );
//   };

//   export default Map_main_analyse;


