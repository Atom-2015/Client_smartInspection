import React, { useState, useEffect } from 'react';
import Map, { Marker, NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Map styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Cookies from 'js-cookie';

const Tagimage_map = () => {
  const [viewState, setViewState] = useState({
    latitude: 28.6139, // Default latitude (New Delhi)
    longitude: 77.2090, // Default longitude (New Delhi)
    zoom: 2, // Initial zoom level
  });
  const [inspections, setInspections] = useState([]);
  const [locations, setLocations] = useState([]); // Initialize as an empty array

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
        const inspectionsData = response.data.data;

        // Extract and process locations
        const extractedLocations = inspectionsData.flatMap((inspection) =>
          inspection.image
            .filter((img) => img.latitude && img.longitude)
            .map((img) => ({
              id: img._id,
              latitude: parseFloat(img.latitude.$numberDecimal),
              longitude: parseFloat(img.longitude.$numberDecimal),
              mainImage: inspection.main_image, // Main image URL
            }))
        );

        setInspections(inspectionsData); // Save raw inspections if needed later
        setLocations(extractedLocations); // Save locations for rendering markers
      } catch (error) {
        console.error('Error fetching inspections:', error);
      }
    })();
  }, []);

  console.log('Locations:', locations);

  return (
    <div className="container-fluid mt-4">
      <div className="w-full flex justify-center">
        <div className="w-full">
          <div style={{ height: '580px', width: '100%', border: '1px solid #ddd' }}>
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
              {/* Display markers for each location */}
              {locations.map((location, index) => (
                <Marker
                  key={`marker-${location.id}-${index}`}
                  latitude={location.latitude}
                  longitude={location.longitude}
                >
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    bounce
                    style={{ color: '#cb1515', width: '18px', height: '18px' }}
                  />
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

export default Tagimage_map;
