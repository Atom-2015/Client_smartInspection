import React, { useEffect, useState, useRef } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import ButtonAI from './buttonAI';

function Maindetailpage() {
  const location = useLocation();
  const reportId = location.state?.id;
  const navigate = useNavigate();
  Cookies.set('reportId', reportId, { expires: 7 });

  const [inspactionname, setinspactionname] = useState({});
  const [activeTab, setActiveTab] = useState('/detail/details');
  const [indicatorStyle, setIndicatorStyle] = useState({});

  const navRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://13.201.248.202:3001/api/main/getreportname', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
            'x-report-id': Cookies.get('reportId'),
          },
        });
        if (response) {
          setinspactionname(response.data.data);
        } else {
          console.log('No data in response');
        }
      } catch (error) {
        console.log(`Error in navbar API call: ${error}`);
      }
    })();
  }, []);

  const updateIndicator = (element) => {
    if (element) {
      setIndicatorStyle({
        left: element.offsetLeft,
        width: element.offsetWidth,
      });
    }
  };

  const handleNavigation = (path, element) => {
    setActiveTab(path);
    updateIndicator(element);
    navigate(path, { state: { id: reportId } });
  };

  useEffect(() => {
    const activeElement = navRef.current?.querySelector('.active');
    if (activeElement) {
      updateIndicator(activeElement);
    }
  }, [activeTab]);

  const capitalspelling = (str) => {
    if (!str) return '';
    let word = '';

    for (let i = 0; i < str.length; i++) {
      if (i === 0 || str.charAt(i - 1) === ' ') {
        word += str.charAt(i).toUpperCase();
      } else {
        word += str.charAt(i);
      }
    }
    return word;
  };

  return (
    <>
      <div
        className="container-fluid border-bottom py-3 shadow-sm rounded"
        style={{
          background: 'linear-gradient(90deg, #007bff, #4a7cbf)',
          borderRadius: '8px',
        }}
        id="analyseresponsive"
      >
        <div className="row align-items-center justify-content-between">
          {/* Title Section */}
          <div className="col-md-6 text-white">
            <h5 className="mb-0 fw-bold text-left">
              {capitalspelling(inspactionname.inspaction_name)}
            </h5>
            <h6 className="text-left">{inspactionname.inspaction_company_owner}</h6>
          </div>

          {/* Navigation Section */}
          <div className="col-md-6">
            <ul className="nav justify-content-end gap-2" style={{ position: 'relative' }} ref={navRef}>
              {['/detail/details', '/detail/upload', '/detail/analyse', '/detail/tagimage', `/detail/generateReport/${reportId}`].map(
                (path, index) => (
                  <li className="nav-item" key={index}>
                    <NavLink
                      to={path}
                      state={{ id: reportId }}
                      className="nav-link text-white"
                      style={{
                        padding: '10px 15px',
                        fontWeight: '500',
                        position: 'relative',
                        textDecoration: 'none',
                        color: path === activeTab ? '#fff' : '#ccc',
                        transition: 'color 0.3s ease',
                      }}
                      onClick={(e) => handleNavigation(path, e.currentTarget)}
                    >
                      {['Details', 'Upload', 'Analyse', 'Tag Images', 'Generate Report'][index]}
                    </NavLink>
                  </li>
                )
              )}
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  height: '3px',
                  backgroundColor: '#ffffff',
                  transition: 'left 0.3s ease, width 0.3s ease',
                  ...indicatorStyle,
                }}

                
              ></div>
              {location.pathname === '/detail/analyse' && (
        <div className="text-center my-2 text-white "  >
          <ButtonAI />
        </div>
      )}

            </ul>
          </div>
        </div>
      </div>

      {/* Show ButtonAI only for /detail/analyse */}
      
      <Outlet />
    </>
  );
}

export default Maindetailpage;













// import React, { useEffect, useState, useRef } from 'react';
// import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import ButtonAI from './buttonAI'


// function Maindetailpage() {
//   const location = useLocation();
//   const reportId = location.state?.id;
//   const navigate = useNavigate();
//   Cookies.set('reportId', reportId, { expires: 7 });

//   const [inspactionname, setinspactionname] = useState({});
//   const [activeTab, setActiveTab] = useState('/detail/details');
//   const [indicatorStyle, setIndicatorStyle] = useState({});

//   const navRef = useRef(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         const response = await axios.get('http://13.201.248.202:3001/api/main/getreportname', {
//           headers: {
//             'x-auth-token': localStorage.getItem('token'),
//             'x-report-id': Cookies.get('reportId')
//           }
//         });
//         if (response) {
//           setinspactionname(response.data.data);
//         } else {
//           console.log('No data in response');
//         }
//       } catch (error) {
//         console.log(`Error in navbar API call: ${error}`);
//       }
//     })();
//   }, []);

//   // Function to update indicator position and width
//   const updateIndicator = (element) => {
//     if (element) {
//       setIndicatorStyle({
//         left: element.offsetLeft,
//         width: element.offsetWidth,
//       });
//     }
//   };

//   const handleNavigation = (path, element) => {
//     setActiveTab(path); // Update active tab for animation
//     updateIndicator(element); // Update indicator position
//     navigate(path, { state: { id: reportId } });
//   };

//   useEffect(() => {
//     const activeElement = navRef.current?.querySelector('.active');
//     if (activeElement) {
//       updateIndicator(activeElement);
//     }
//   }, [activeTab]);

// //   const capitalspelling = (inspactionname) => {
// //     if (!inspactionname || typeof inspactionname !== 'string') {
// //         return '';  
// //     }
// //     return inspactionname.charAt(0).toUpperCase() + inspactionname.slice(1);
// // };


// const capitalspelling = (str) => {
//   if (!str) return '';
//   let word = "";

//   for (let i = 0; i < str.length; i++) {
//       if (i === 0 || str.charAt(i - 1) === ' ') {
//           word += str.charAt(i).toUpperCase();
//       } else {
//           word += str.charAt(i);
//       }
//   }
//   return word;


//   // return str
//   //   .split(' ')
//   //   .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//   //   .join(' ');
// };

//   return (
//     <>
//       <div
//         className="container-fluid border-bottom py-3 shadow-sm rounded"
//         style={{
//           background: 'linear-gradient(90deg, #007bff, #4a7cbf)',
//           borderRadius: '8px',
//         }} id='analyseresponsive'
//       >
//         <div className="row align-items-center justify-content-between">
//           {/* Title Section */}
//           <div className="col-md-6 text-white">
//             <h5 className="mb-0 fw-bold text-left "> {capitalspelling(inspactionname.inspaction_name)}   </h5>
//             <h6 className='text-left' >  {inspactionname.inspaction_company_owner}</h6>
//           </div>

//           {/* Navigation Section */}
//           <div className="col-md-6">
//             <ul className="nav justify-content-end gap-2" style={{ position: 'relative' }} ref={navRef}>
//             <li className="nav-item" >
//               {/* <button className=' text-white ' >AI Inspaction</button> */}
//               <ButtonAI/>
//              </li>
//               {['/detail/details', '/detail/upload', '/detail/analyse', '/detail/tagimage', `/detail/generateReport/${reportId}` , {state:{from : '/detail'}}].map((path, index) => (
//                 <li className="nav-item" key={index}>
//                   <NavLink
//                     to={path}
//                     state={{ id: reportId }}
//                     className="nav-link text-white"
//                     style={{
//                       padding: '10px 15px',
//                       fontWeight: '500',
//                       position: 'relative',
//                       textDecoration: 'none',
//                       color: path === activeTab ? '#fff' : '#ccc',
//                       transition: 'color 0.3s ease',
//                     }}
//                     onClick={(e) => handleNavigation(path, e.currentTarget)}
//                   >
//                     {['Details', 'Upload', 'Analyse', 'Tag Images', 'Generate Report'][index]}
//                   </NavLink>
                  
//                 </li>
                
//               ))}
//               <div
//                 style={{
//                   position: 'absolute',
//                   bottom: '0',
//                   height: '3px',
//                   backgroundColor: '#ffffff',
//                   transition: 'left 0.3s ease, width 0.3s ease',
//                   ...indicatorStyle,
//                 }}
//               ></div>
              
//             </ul>
//           </div>
//         </div>
//       </div>

//       <Outlet />
//     </>
//   );
// }

// export default Maindetailpage;
