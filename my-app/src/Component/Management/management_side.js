// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBuilding,faUser } from '@fortawesome/free-solid-svg-icons';


// function ManagementSide() {
//     return (
//         <div className="w-32 bg-gray-100 p-4 h-screen border-r border-gray-200">
//             <div className="mb-4">
//                 <NavLink
//                     to='/management/userManagement'
//                     className={({ isActive }) =>
//                         `block py-2 px-4 rounded-lg ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-300"}`
//                     }
//                 >
//                   <FontAwesomeIcon icon={faUser} />

                  
//                 </NavLink>
//             </div>
//             <div className="mb-4">
//                 <NavLink
//                     to='/management/companyManagement'
//                     className={({ isActive }) =>
//                         `block py-2 px-4 rounded-lg ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-300"}`
//                     }
//                 >
//                 <FontAwesomeIcon icon={faBuilding} />
                    
//                 </NavLink>
//             </div>
//         </div>
//     );
// }

// export default ManagementSide;














import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook , faBuilding ,faUser} from '@fortawesome/free-solid-svg-icons';

function ManagementSide() {
    return (
        <div className="w-32 bg-[#1e1e1e] p-2 h-screen border-r border-gray-200">
            {/* User Management */}
            <div className="mb-4 relative group">
                <NavLink
                    to="/management/userManagement"
                    className={({ isActive }) =>
                        `block py-2 px-4 rounded-lg transition-all duration-300 no-underline ${
                            isActive
                                ? "bg-[#203354] text-white shadow-md"
                                : "text-gray-400 hover:bg-gray-300 hover:text-black"
                        }`
                    }
                >


<div className='flex align-middle justify-center  gap-2 items-center '>
<h6 className="font-semibold text-[16px] text-center m-0 ">User</h6>
<FontAwesomeIcon icon={faUser} />
                    </div>


                  
                </NavLink>
               
            </div>

            {/* Company Management */}
            <div className="mb-4 relative group">
                <NavLink
                    to="/management/companyManagement"
                    className={({ isActive }) =>
                        `block py-2 px-4 rounded-lg transition-all duration-300 no-underline ${
                            isActive
                                ? "bg-[#203354] text-white shadow-md"
                                : "text-gray-400 hover:bg-gray-300 hover:text-black"
                        }`
                    }
                >

<div className='flex align-middle justify-center  gap-2 items-center '>
<h6 className="font-semibold text-[16px] text-center m-0">Company</h6>
<FontAwesomeIcon icon={faBuilding} />
                    </div>
                    
                </NavLink>
               
            </div>

            {/* Report Management */}
            <div className="mb-4 relative group">
                <NavLink
                    to="/management/reportManagement"
                    className={({ isActive }) =>
                        `block py-2 px-4 rounded-lg transition-all duration-300 no-underline ${
                            isActive
                                ? "bg-[#203354] text-white shadow-md"
                                : "text-gray-400 hover:bg-gray-300 hover:text-black"
                        }`
                    }
                >

                    <div className='flex align-middle justify-center gap-2 items-center '>
                    <h6 className="font-semibold text-[16px] text-center m-0">Report</h6>
                    <FontAwesomeIcon icon={faBook} />
                    </div>
                   
                  
                </NavLink>
              
            </div>
        </div>
    );
}

export default ManagementSide;
