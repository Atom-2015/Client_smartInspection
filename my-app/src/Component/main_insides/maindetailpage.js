// import React, { useEffect, useState } from 'react';
// import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import Cookies from 'js-cookie';
// import axios from 'axios';

// function Maindetailpage() {
//   const location = useLocation();
//   const reportId = location.state?.id; // Access the reportId from location.state
//   const navigate = useNavigate();
//   let cookie = Cookies.set('reportId' , reportId , {expires:7})
//   // console.log(`Thee cookei is data : ${cookie} ` )

//   // Function to handle navigation and pass state
//   const handleNavigation = (path) => {
//     navigate(path, { state: { id: reportId } });
//   };
//   // const handleNavigation2 = () => {
//   //   navigate(`detail/generateReport/${reportId}`);
//   // };

//   // useEffect
  
//  const [inspactionname , setinspactionname] = useState({});
//  useEffect(()=>{
//   (async()=>{
      
//     try {
//       const response = await axios.get('/api/main/getreportname', {
//         headers:{
//           'x-auth-token': localStorage.getItem('token'),
//           'x-report-id': Cookies.get('reportId')
//         }
//       })
//       if(!response){
//         console.log(`No data in response`)
//         return ;
//       }
//       setinspactionname(response.data.data);

//       console.log(`inspaction name is : ${response.data.data}`)
      
//     } catch (error) {
//       console.log(`Error in nev bar api call ${error}`)
//     }


//   })()



//  },[])

 






//   return (
//     <>



//       <div className="container-fluid border-bottom py-3 bg-white shadow-sm">
//         <div className="row align-items-center justify-content-between">
//           {/* Title Section */}
//           <div className="col-md-6">
//             <h5 className="mb-0 fw-bold text-dark">{inspactionname.inspaction_name}</h5>
//             <small className="text-muted"> {inspactionname.inspaction_company_owner}</small>
//           </div>

//           {/* Navigation Section */}
//           <div className="col-md-6">
//             <ul className="nav justify-content-end gap-2 border-primary-subtle">
//               <li className="nav-item">
//                 <NavLink
//                   to="/detail/details"
//                   state={{ id: reportId }}
//                   className="nav-link px-3 py-2 text-dark rounded shadow-sm border-primary-subtle transition border border-primary-subtle"
//                   activeClassName="active bg-primary text-white"
//                   // onClick={() => handleNavigation('details')}
//                   style={{ transition: 'all 0.3s ease' }}
//                   onMouseEnter={(e) => e.target.classList.add('bg-primary', 'text-white')}
//                   onMouseLeave={(e) => e.target.classList.remove('bg-primary', 'text-white')}
//                 >
//                   Details
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink
//                   to="/detail/analyse"
//                   state={{ id: reportId }}
//                   className="nav-link px-3 py-2 text-dark rounded shadow-sm border border-primary-subtle transition"
//                   activeClassName="active bg-primary text-white"
//                   style={{ transition: 'all 0.3s ease' }}
//                   onMouseEnter={(e) => e.target.classList.add('bg-primary', 'text-white')}
//                   onMouseLeave={(e) => e.target.classList.remove('bg-primary', 'text-white')}
//                 >
//                   Analyse
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <span
//                   onClick={() => handleNavigation('upload')}
//                   className="nav-link px-3 py-2 text-dark rounded shadow-sm border-primary-subtle transition cursor-pointer border border-primary-subtle"
//                   style={{ transition: 'all 0.3s ease' }}
//                   onMouseEnter={(e) => e.target.classList.add('bg-primary', 'text-white')}
//                   onMouseLeave={(e) => e.target.classList.remove('bg-primary', 'text-white')}
//                 >
//                   Upload
//                 </span>
//               </li>
//               <li className="nav-item">
//                 <NavLink
//                   to="/tag-images"
//                   className="nav-link px-3 py-2 text-dark rounded shadow-sm border-primary-subtle transition border border-primary-subtle"
//                   activeClassName="active bg-primary text-white"
//                   style={{ transition: 'all 0.3s ease' }}
//                   onMouseEnter={(e) => e.target.classList.add('bg-primary', 'text-white')}
//                   onMouseLeave={(e) => e.target.classList.remove('bg-primary', 'text-white')}
//                 >
//                   Tag Images
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink
//                   to={`/detail/generateReport/${reportId}`}
//                   state={{ id: reportId }} // Pass the reportId as state
//                 //  { navigate(`/detail/generateReport/12345`)}
                 
//                   className="nav-link px-3 py-2 text-dark rounded shadow-sm border-primary-subtle transition border border-primary-subtle"
//                   activeClassName="active bg-primary text-white"
//                   style={{ transition: 'all 0.3s ease' }}
//                   onMouseEnter={(e) => e.target.classList.add('bg-primary', 'text-white')}
//                   onMouseLeave={(e) => e.target.classList.remove('bg-primary', 'text-white')}
//                 >
//                   Generate Report
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Report ID Display */}
//         {/* <h1 className="mt-4 text-muted">
//     {reportId ? `Report ID: ${reportId}` : 'No report ID available'}
//   </h1> */}
//       </div>

//       <Outlet />
//     </>
//   );
// }

// export default Maindetailpage;













import React, { useEffect, useState, useRef } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import axios from 'axios';

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
        const response = await axios.get('/api/main/getreportname', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
            'x-report-id': Cookies.get('reportId')
          }
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

  // Function to update indicator position and width
  const updateIndicator = (element) => {
    if (element) {
      setIndicatorStyle({
        left: element.offsetLeft,
        width: element.offsetWidth,
      });
    }
  };

  const handleNavigation = (path, element) => {
    setActiveTab(path); // Update active tab for animation
    updateIndicator(element); // Update indicator position
    navigate(path, { state: { id: reportId } });
  };

  useEffect(() => {
    const activeElement = navRef.current?.querySelector('.active');
    if (activeElement) {
      updateIndicator(activeElement);
    }
  }, [activeTab]);

//   const capitalspelling = (inspactionname) => {
//     if (!inspactionname || typeof inspactionname !== 'string') {
//         return '';  
//     }
//     return inspactionname.charAt(0).toUpperCase() + inspactionname.slice(1);
// };


const capitalspelling = (str) => {
  if (!str) return '';
  let word = "";

  for (let i = 0; i < str.length; i++) {
      if (i === 0 || str.charAt(i - 1) === ' ') {
          word += str.charAt(i).toUpperCase();
      } else {
          word += str.charAt(i);
      }
  }
  return word;


  // return str
  //   .split(' ')
  //   .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  //   .join(' ');
};

  return (
    <>
      <div
        className="container-fluid border-bottom py-3 shadow-sm rounded"
        style={{
          background: 'linear-gradient(90deg, #007bff, #4a7cbf)',
          borderRadius: '8px',
        }}
      >
        <div className="row align-items-center justify-content-between">
          {/* Title Section */}
          <div className="col-md-6 text-white">
            <h5 className="mb-0 fw-bold text-left "> {capitalspelling(inspactionname.inspaction_name)}   </h5>
            <h6 className='text-left' >  {inspactionname.inspaction_company_owner}</h6>
          </div>

          {/* Navigation Section */}
          <div className="col-md-6">
            <ul className="nav justify-content-end gap-2" style={{ position: 'relative' }} ref={navRef}>
              {['/detail/details', '/detail/upload', '/detail/analyse', '/detail/tagimage', `/detail/generateReport/${reportId}` , {state:{from : '/detail'}}].map((path, index) => (
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
              ))}
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
            </ul>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default Maindetailpage;
