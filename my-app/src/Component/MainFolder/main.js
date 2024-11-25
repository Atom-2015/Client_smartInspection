// import React, { useEffect, useState } from 'react';
// import Footer_main from './footer_main';
// import Table from './table';
// import './style.css';
// import axios from 'axios';
// import Mapbox_map from './mapbox_map';

// function Main() {
//   const [data, setData] = useState([]); 
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState(null); 
//   const [location, setLocation] = useState({
//     latitude: null,
//     longitude: null,
//   });
//   const [searchcompany, setSearchcompany] = useState('');
//   const [searchedResponse, setSearchedResponse] = useState(null);

//   // Fetch initial data on component mount
//   useEffect(() => {
//     (async () => {
//       setLoading(true); 

//       try {
//         const response = await axios.get('/api/main/listing', {
//           headers: {
//             'x-auth-token': localStorage.getItem('token'),
//           },
//         });

//         if (response.data.length === 0) {
//           setError('No data available'); 
//         } else {
//           const transformedData = response.data.map(report => {
//             const hasLocation = report.latitude && report.longitude;
//             return {
//               ...report,
//               location: hasLocation ? 'Y' : 'N',
//               latitude: hasLocation ? report.latitude : null,
//               longitude: hasLocation ? report.longitude : null
//             };
//           });

//           setData(transformedData);         
//         }
//       } catch (error) {
//         setError('Failed to fetch data');
//       } finally {
//         setLoading(false); 
//       }
//     })();
//   }, []);

//   // Function to update location state
//   const handleLocationChange = (latitude, longitude) => {
//     setLocation({ latitude, longitude });
//   };

//   // Search function for fetching filtered data based on the company name
//   async function searchCompanyData() {
//     try {
//       const response = await axios.post(
//         '/api/main/searchCompany', 
//         { companyname: searchcompany }, 
//         {
//           headers: {
//             'x-auth-token': localStorage.getItem('token'),
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response) {
//         setSearchedResponse(response.data);
//         setSearchcompany('');
//       }
//     } catch (error) {
//       console.log(`Error in response in axios: ${error}`);
//     }
//   }

//   return (
//     <>
//       <div className='border p-4 ml-20 rounded-2xl mb-3'>
//         <h2 className="text-[40px] font-bold">Inspection</h2>
//         <div>
//         <input type='text' placeholder='Search by Inspaction Name' />
//         <button  > 🍩</button>
//         <input 
//           type='text' 
//           placeholder='Search by Company' 
//           className='ml-1' 
//           value={searchcompany} 
//           onChange={(e) => setSearchcompany(e.target.value)} 
//         />
//         <button onClick={searchCompanyData}>🍔  </button>
//         </div>
//       </div>

//       <div className='border p-4 ml-20 rounded-2xl'>
//         <div style={{ width: '100%', height: '400px' }}>
//           <Mapbox_map latitude={location.latitude} longitude={location.longitude} />
//         </div>
//         <Footer_main />
//         {/* Pass handleLocationChange to the Table component */}
//         <Table 
//           data={searchedResponse?.data || data}  // Show searched data if available, else show normal data
//           loading={loading} 
//           error={error} 
//           handleLocation={handleLocationChange}  
//         />
//       </div>
//     </>
//   );
// }

// export default Main;
















import React, { useEffect, useState } from 'react';
import Footer_main from './footer_main';
import Table from './table';
import './style.css';
import axios from 'axios';
import Mapbox_map from './mapbox_map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

function Main() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [activetabb, setActivetabb] = useState('all');  
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [searchcompany, setSearchcompany] = useState('');
  const [searchedResponse, setSearchedResponse] = useState(null);

  // Fetch initial data on component mount
  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const response = await axios.get('/api/main/listing', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        });

        if (response.data.length === 0) {
          setError('No data available');
        } else {
          const transformedData = response.data.map(report => {
            const hasLocation = report.latitude && report.longitude;
            return {
              ...report,
              location: hasLocation ? <FontAwesomeIcon icon={faLocationDot} /> : 'N',
              latitude: hasLocation ? report.latitude : null,
              longitude: hasLocation ? report.longitude : null
            };
          });

          setData(transformedData);
        }
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Function to update location state
  const handleLocationChange = (latitude, longitude) => {
    setLocation({ latitude, longitude });
  };

  // Search function for fetching filtered data based on the company name
  async function searchCompanyData() {
    try {
      const response = await axios.post(
        '/api/main/searchCompany',
        { companyname: searchcompany },
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
        }
      );

      if (response) {
        setSearchedResponse(response.data);
        setSearchcompany('');
      }
    } catch (error) {
      console.log(`Error in response in axios: ${error}`);
    }
  }


  const [inspaction, setInsapaction] = useState(null);

  async function searchInspactionData() {
    try {
      const response = await axios.get('/api/main/searchinspaction', {
        params: {
          param1: inspaction
        },

        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),

        }
      })

      if (response) {
        setSearchedResponse(response.data);
        setSearchcompany('');
      }

    } catch (error) {
      console.log(`Error in response in axios: ${error}`);
    }
  }








  return (
    <>


      <div className=''>



        {/* Adjust the height for the map without affecting the form */}
        <div style={{ width: '100%', height: '550px', minHeight: '550px' }}> 
          <Mapbox_map latitude={location.latitude} longitude={location.longitude} />
        </div>



        <div className=" p-2 rounded-2xl mt-1 m-auto  w-[100%] shadow-md">
          <div className="flex items-center justify-start space-x-2 ">
          <div className="flex justify-start  border-b-1 pb-2">

        
<button
  className={`px-4 py-2 ${activetabb === 'all' ? 'border-b-4 border-blue-500 text-blue-500' : ' text-white'}`}
  onClick={() => setActivetabb('all')}
>
  All Inspections
</button>
<button
  className={`ml-4 px-4 py-2 ${activetabb === 'pending' ? 'border-b-4 border-blue-500 text-blue-500' : ' text-white'}`}
  onClick={() => setActivetabb('pending')}
>
  Pending Inspections
</button>
</div>
            <input
              type="text"
              placeholder="Search by Inspection or Company "
              value={inspaction}
              onChange={(e) => setInsapaction(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-[18%]"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  searchInspactionData(); // Call your function here
                }
              }}
            />


            <button
              onClick={searchInspactionData}
              className="p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg focus:outline-none px-3"
            >
              
              Search
            </button>

          </div>
        </div>



        <Footer_main />
        <Table
          data={searchedResponse?.data || data}  // Show searched data if available, else show normal data
          loading={loading}
          error={error}
          handleLocation={handleLocationChange}
          activetabb ={activetabb}
        />
      </div>
    </>
  );
}

export default Main;
