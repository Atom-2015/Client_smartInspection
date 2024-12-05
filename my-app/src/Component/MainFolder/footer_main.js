// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { handleSuccess, handleError } from '../../util';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Footer_main() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [inspaction_name, setInspaction_name] = useState('');
//   const [inspaction_type, setInspaction_type] = useState('');
//   const [display_coordinates_system, setDisplay_coordinates_system] = useState('');
//   const [inspaction_company_owner, setInspaction_company_owner] = useState('');
//   const [month, setMonth] = useState('');
//   const [year, setYear] = useState('');
//   const [img_count, setImg_count] = useState('');

//   const [formSubmitted, setFormSubmitted] = useState(false);

//   const openModal = () => {
//     setIsModalOpen(true);
//     document.body.classList.add('no-scroll'); // Prevent background scrolling
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     document.body.classList.remove('no-scroll'); // Re-enable scrolling when modal is closed
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setFormSubmitted(true);

//     const token = localStorage.getItem('token');
//     const companyId = localStorage.getItem('company_id');

//     try {
//       const response = await axios.post(
//         '/api/main/create',
//         {
//           inspaction_name,
//           inspaction_type,
//           display_coordinates_system,
//           inspaction_company_owner,
//           month,
//           year,
//           img_count,
//         },
//         {
//           headers: {
//             'x-auth-token': token,
//             'x-company_id': companyId,
//           },
//         }
//       );

//       if (response.status === 200) {
//         handleSuccess(response.data.message);
//         setFormSubmitted(false); // Reset form submission state after success
//         closeModal(); // Close the modal on success
//       } else {
//         handleError('Unexpected response status.');
//       }
//     } catch (error) {
//       console.error('Error in Axios Post:', error);
//       handleError('Error occurred while creating the report.');
//     }
//   };

//   useEffect(() => {
//     if (formSubmitted) {
//       setIsModalOpen(false);
//       setFormSubmitted(false); // Reset form submission state after close
//     }
//   }, [formSubmitted]);

//   return (
//     <div className='footer_main'>
//       <div className="p-1">
//      <div className='relative'>
//         <button onClick={openModal} className="btn btn-primary xl:absolute bottom-3 right-5 sm:static">
//           Create New
//         </button>
//         </div>
//         {isModalOpen && (
//           <div 
//             className="fixed inset-0 bg-black bg-opacity-50 d-flex justify-content-center align-items-center" 
//             style={{ zIndex: 1050 }} // Ensure the modal appears above all other elements
//           >
//             <div className="bg-white p-6 rounded-lg shadow-lg" style={{ width: '500px', maxWidth: '90%' }}>
//               <h1 className="text-xl font-semibold mb-4">Create Report</h1>
//               <form onSubmit={handleSubmit} className="form-group">
//                 <div className="mb-3">
//                   <label htmlFor="inspaction_name" className="form-label">Inspection Name</label>
//                   <input
//                     type='text'
//                     id="inspaction_name"
//                     className="form-control"
//                     placeholder='Inspection name'
//                     required
//                     value={inspaction_name}
//                     onChange={(e) => setInspaction_name(e.target.value)}
//                   />
//                 </div>
                
//                 <div className="mb-3">
//                   <label htmlFor="inspaction_type" className="form-label">Inspection Type</label>
//                   <select
//                     id="inspaction_type"
//                     className="form-select"
//                     value={inspaction_type}
//                     onChange={(e) => setInspaction_type(e.target.value)}
//                   >
//                     <option value="">Select an inspection type</option>
//                     <option value="Power Line">Power Line</option>
//                     <option value="Building">Building</option>
//                     <option value="Thermal">Thermal</option>
//                     <option value="Wind Turbine">Wind Turbine</option>
//                     <option value="Infrastructure">Infrastructure</option>
//                   </select>
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="display_coordinates_system" className="form-label">Coordinate System</label>
//                   <select
//                     id="display_coordinates_system"
//                     className="form-select"
//                     value={display_coordinates_system}
//                     onChange={(e) => setDisplay_coordinates_system(e.target.value)}
//                   >
//                     <option value="">Select coordinate system</option>
//                     <option value="WGS84 DD">WGS84 DD</option>
//                     <option value="UTM">UTM</option>
//                   </select>
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="inspaction_company_owner" className="form-label">Company Owner</label>
//                   <select
//                     id="inspaction_company_owner"
//                     className="form-select"
//                     value={inspaction_company_owner}
//                     onChange={(e) => setInspaction_company_owner(e.target.value)}
//                   >
//                     <option value="">Select company owner</option>
//                     <option value="Atom Aviation">Atom Aviation</option>
//                     <option value="Aditya">Aditya</option>
//                   </select>
//                 </div>

//                 <div className="d-flex justify-center gap-4">
//                   <button type="submit" className="btn btn-success">
//                     Create
//                   </button>
//                   <button onClick={closeModal} className="btn btn-danger">
//                     Close
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default Footer_main;




import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { handleSuccess, handleError } from '../../util';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function FooterMain() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inspectionName, setInspectionName] = useState('');
  const [inspectionType, setInspectionType] = useState('');
  const [coordinateSystem, setCoordinateSystem] = useState('');
  const [companyOwner, setCompanyOwner] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [components, setComponents] = useState([]); // State to hold component data
  const [data, setData] = useState([]); // State to hold inspection data


  const navigate = useNavigate();

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://13.201.248.202:3001/api/reportinside/getalldata', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
            'x-company-id': localStorage.getItem('company_id'),
          },
        });

        if (response.data.message === 'Data Extracted') {
          const extractedData = response.data.data.map((item) => ({
            inspectionName: item.inspaction.inspactionname,
            componentNames: item.inspaction.componentname,
            issueTypes: item.issuetype,
          }));
          setData(extractedData); // Set extracted data
          setComponents(response.data.data); // Store original data if needed
        }
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
        handleError('Unable to fetch data');
      }
    };

    fetchData();
  }, []);

  // Modal control functions
  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add('no-scroll'); // Prevent background scrolling
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('no-scroll'); // Re-enable scrolling
  };

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    try {
      const response = await axios.post(
        'http://13.201.248.202:3001/api/main/create',
        {
          inspaction_name: inspectionName,
          inspaction_type:inspectionType,
          display_coordinates_system : coordinateSystem,
          inspaction_company_owner :companyOwner,
        },
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
            'x-company-id': localStorage.getItem('company_id'),
          },
        }
      );

      if (response.status === 200) {
        handleSuccess(response.data.message);
        Cookies.set('inspactiontype', inspectionType)
        navigate('/detail/upload', { state: { id: response.data.data } });
        // navigate('/detial/upload' , { state: { id: response.data.data } })
        closeModal();
      } else {
        handleError('Unexpected response status.');
      }
    } catch (error) {
      console.error('Error in Axios Post:', error);
      handleError('Error occurred while creating the report.');
    } finally {
      setFormSubmitted(false);
    }
  };

  return (
    <div className='footer_main'>
      <div className="p-1">
        <div className='relative'>
          <button onClick={openModal} className="btn btn-primary xl:absolute bottom-5 right-5 sm:static">
            Create New
          </button>

          <button className="btn  btn-success xl:absolute bottom-5 right-[150px] sm:static">
           Add Demo
          </button>
        </div>
        {isModalOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 d-flex justify-content-center align-items-center" 
            style={{ zIndex: 1050 }} // Ensure modal appears above other elements
          >
            <div className="bg-white p-6 rounded-lg shadow-lg" style={{ width: '500px', maxWidth: '90%' }}>
              <h1 className="text-xl font-semibold mb-4">Create Report</h1>
              <form onSubmit={handleSubmit} className="form-group">
                {/* Inspection Name Input */}
                <div className="mb-3">
                  <label htmlFor="inspectionName" className="form-label">Inspection Name</label>
                  <input
                    type='text'
                    id="inspectionName"
                    className="form-control"
                    placeholder='Inspection name'
                    required
                    value={inspectionName}
                    onChange={(e) => setInspectionName(e.target.value)}
                  />
                </div>
                
                {/* Inspection Type Selection */}
                <div className="mb-3">
                  <label htmlFor="inspectionType" className="form-label">Inspection Type</label>
                  <select
                    id="inspectionType"
                    className="form-select"
                    value={inspectionType}
                    onChange={(e) => setInspectionType(e.target.value)}
                  >
                    <option value="">Select an inspection type</option>
                    {data.map((item, index) => ( 
                      <option key={index} value={item.inspectionName}> 
                        {item.inspectionName}  
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Coordinate System Selection */}
                {/* <div className="mb-3">
                  <label htmlFor="coordinateSystem" className="form-label">Coordinate System</label>
                  <select
                    id="coordinateSystem"
                    className="form-select"
                    value={coordinateSystem}
                    onChange={(e) => setCoordinateSystem(e.target.value)}
                  >
                    <option value="">Select coordinate system</option>
                    <option value="WGS84 DD">WGS84 DD</option>
                    <option value="UTM">UTM</option>
                  </select>
                </div> */}

                {/* Company Owner Selection */}
                <div className="mb-3">
                  <label htmlFor="companyOwner" className="form-label">Company Owner</label>
                  <select
                    id="companyOwner"
                    className="form-select"
                    value={companyOwner}
                    onChange={(e) => setCompanyOwner(e.target.value)}
                  >
                    <option value="">Select company owner</option>
                    <option value="Atom Aviation">Atom Aviation</option>
                    <option value="Aditya">Aditya</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="d-flex justify-center gap-4">
                  <button type="submit" className="btn btn-success">
                    Create
                  </button>
                  <button type="button" onClick={closeModal} className="btn btn-danger">
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default FooterMain;
