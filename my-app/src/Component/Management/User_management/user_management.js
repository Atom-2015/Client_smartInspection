            // import React, { useEffect, useState } from 'react';
            // import { useDispatch } from 'react-redux';
            // import { createuser } from '../../../FeatureRedux/management_userCreation_slice';
            // import { ToastContainer, toast } from 'react-toastify';
            // import 'react-toastify/dist/ReactToastify.css';
            // import axios from 'axios';
            
            // function UserManagement() {
            //   const dispatch = useDispatch();
            //   const [name, setName] = useState("");
            //   const [email, setEmail] = useState("");
            //   const [password, setPassword] = useState("");
            //   const [companyName, setCompanyName] = useState("");
            //   const [userRole, setUserRole] = useState("");
            //   const [userExpiryDate, setUserExpiryDate] = useState("");
            
            //   const [companyData, setCompanyData] = useState([]);
            //   const [getCompanyError, setGetCompanyError] = useState(false);
            //   const [noCompany, setNoCompany] = useState(false);
            //   const [userData, setUserData] = useState([]);
            //   const [currentPage, setCurrentPage] = useState(1);
            //   const [usersPerPage] = useState(3);
            
            //   const handleReset = () => {
            //     setName("");
            //     setEmail("");
            //     setPassword("");
            //     setCompanyName("");
            //     setUserRole("");
            //     setUserExpiryDate("");
            //   };
            
            //   const handleSubmit = async (e) => {
            //     e.preventDefault();
            
            //     const userData = {
            //       name,
            //       email,
            //       password,
            //       companyName,
            //       userRole,
            //       userExpiryDate,
            //     };
            
            //     try {
            //       const resultAction = dispatch(createuser(userData));
            //       if (createuser.fulfilled.match(resultAction)) {
            //         toast.success("User created successfully!");
            //         handleReset();
            //       } else {
            //         toast.error("Failed to create user: " + resultAction.payload);
            //       }
            //     } catch (error) {
            //       toast.error("An unexpected error occurred: " + error.message);
            //     }
            //   };
            
            //   useEffect(() => {
            //     // Fetch company data
            //     (async () => {
            //       try {
            //         const response = await axios.get('/api/management/companylist', {
            //           headers: {
            //             'x-auth-token': localStorage.getItem('token'),
            //           },
            //         });
            
            //         const companyData = response.data.data;
            //         if (!Array.isArray(companyData)) {
            //           setGetCompanyError(true);
            //           return;
            //         }
            
            //         if (companyData.length === 0) {
            //           setNoCompany(true);
            //           return;
            //         }
            
            //         setCompanyData(companyData);
            //       } catch (error) {
            //         console.error('Error fetching company data:', error);
            //         setGetCompanyError(true);
            //       }
            //     })();
            //   }, []);
            
            //   useEffect(() => {
            //     // Fetch user data
            //     (async () => {
            //       try {
            //         const response = await axios.get('/api/userlist', {
            //           headers: {
            //             'x-auth-token': localStorage.getItem('token'),
            //           },
            //         });
            
            //         if (response && response.data.data) {
            //           setUserData(response.data.data);
            //         } else {
            //           console.log('No user data found');
            //         }
            //       } catch (error) {
            //         console.log("Error while fetching user list:", error);
            //       }
            //     })();
            //   }, []);
            
            //   // Pagination logic
            //   const indexOfLastUser = currentPage * usersPerPage;
            //   const indexOfFirstUser = indexOfLastUser - usersPerPage;
            //   const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);
            
            //   const totalPages = Math.ceil(userData.length / usersPerPage);
            
            //   const handleNextPage = () => {
            //     if (currentPage < totalPages) {
            //       setCurrentPage(currentPage + 1);
            //     }
            //   };
            
            //   const handlePrevPage = () => {
            //     if (currentPage > 1) {
            //       setCurrentPage(currentPage - 1);
            //     }
            //   };
            
            //   return (
            //     <div className="container mx-auto mt-10 p-6 bg-blue-400 min-h-screen overflow-y-scroll overflow-x-auto">
            //       {/* Form section */}
            //       <div className="form-section mb-8 bg-white p-6 rounded-md shadow-md">
            //         <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">User Management</h1>
            //         <form onSubmit={handleSubmit} className="space-y-6">
            //           {/* Two-column layout for form fields */}
            //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            //             <div>
            //               <label className="block text-sm font-medium text-gray-700">
            //                 Name:
            //                 <input
            //                   type="text"
            //                   name="name"
            //                   placeholder="Enter name"
            //                   value={name}
            //                   onChange={(e) => setName(e.target.value)}
            //                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            //                 />
            //               </label>
            //             </div>
            
            //             <div>
            //               <label className="block text-sm font-medium text-gray-700">
            //                 Email:
            //                 <input
            //                   type="email"
            //                   name="email"
            //                   placeholder="Enter email"
            //                   value={email}
            //                   onChange={(e) => setEmail(e.target.value)}
            //                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            //                 />
            //               </label>
            //             </div>
            
            //             <div>
            //               <label className="block text-sm font-medium text-gray-700">
            //                 Password:
            //                 <input
            //                   type="password"
            //                   name="password"
            //                   placeholder="Enter password"
            //                   value={password}
            //                   onChange={(e) => setPassword(e.target.value)}
            //                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            //                 />
            //               </label>
            //             </div>
            
            //             <div>
            //               <label className="block text-sm font-medium text-gray-700">
            //                 Company:
            //                 <select
            //                   name="company_name"
            //                   value={companyName}
            //                   onChange={(e) => setCompanyName(e.target.value)}
            //                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            //                 >
            //                   <option value="">Please Select</option>
            //                   {noCompany ? (
            //                     <option value="" disabled>No Company Available</option>
            //                   ) : (
            //                     companyData.map((company, index) => (
            //                       <option key={index} value={company?.company_name || ''}>
            //                         {company?.company_name || 'Unknown Company'}
            //                       </option>
            //                     ))
            //                   )}
            //                 </select>
            //                 {getCompanyError && (
            //                   <p className="text-red-500">Failed to load company list. Please try again later.</p>
            //                 )}
            //               </label>
            //             </div>
            
            //             <div>
            //               <label className="block text-sm font-medium text-gray-700">
            //                 User Role:
            //                 <select
            //                   name="user_role"
            //                   value={userRole}
            //                   onChange={(e) => setUserRole(e.target.value)}
            //                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            //                 >
            //                   <option value="">Please Select</option>
            //                   <option value="Super Admin">Super Admin</option>
            //                   <option value="Admin">Admin</option>
            //                   <option value="User">User</option>
            //                 </select>
            //               </label>
            //             </div>
            
            //             <div>
            //               <label className="block text-sm font-medium text-gray-700">
            //                 Expiry Date:
            //                 <input
            //                   type="date"
            //                   name="date"
            //                   value={userExpiryDate}
            //                   onChange={(e) => setUserExpiryDate(e.target.value)}
            //                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            //                 />
            //               </label>
            //             </div>
            //           </div>
            
            //           <div className="flex justify-between mt-4">
            //             <button
            //               type="button"
            //               onClick={handleReset}
            //               className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            //             >
            //               Reset
            //             </button>
            //             <button
            //               type="submit"
            //               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            //             >
            //               Submit
            //             </button>
            //           </div>
            //         </form>
            //       </div>
            
            //       {/* User List section */}
            //       <div className="user-list-section bg-white p-6 rounded-md shadow-md max-h-[60vh] overflow-y-scroll">
            //         <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">User List</h2>
            //         <table className="table-auto w-full border-collapse border border-gray-200">
            //           <thead>
            //             <tr className="bg-gray-100">
            //               <th className="border px-4 py-2">Name</th>
            //               <th className="border px-4 py-2">Email</th>
            //               <th className="border px-4 py-2">Password</th>
            //               <th className="border px-4 py-2">Company</th>
            //               <th className="border px-4 py-2">Role</th>
            //               <th className="border px-4 py-2">Created By</th>
            //             </tr>
            //           </thead>
            //           <tbody>
            //             {currentUsers.length > 0 ? (
            //               currentUsers.map((user) => (
            //                 <tr key={user._id}>
            //                   <td className="border px-4 py-2">{user.name}</td>
            //                   <td className="border px-4 py-2">{user.email}</td>
            //                   <td className="border px-4 py-2">{user.password}</td>
            //                   <td className="border px-4 py-2">{user.company_name || 'N/A'}</td>
            //                   <td className="border px-4 py-2">{user.user_role}</td>
            //                   <td className="border px-4 py-2">{user.user_created_by || 'N/A'}</td>
            //                 </tr>
            //               ))
            //             ) : (
            //               <tr>
            //                 <td colSpan="6" className="text-center py-2">No users found</td>
            //               </tr>
            //             )}
            //           </tbody>
            //         </table>
            
            //         {/* Pagination */}
            //         <div className="flex justify-center mt-4">
            //           <button
            //             className="px-4 py-2 mx-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            //             onClick={handlePrevPage}
            //             disabled={currentPage === 1}
            //           >
            //             Previous
            //           </button>
            //           <button
            //             className="px-4 py-2 mx-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            //             onClick={handleNextPage}
            //             disabled={currentPage === totalPages}
            //           >
            //             Next
            //           </button>
            //         </div>
            //       </div>
            
            //       <ToastContainer />
            //     </div>
            //   );
            // }
            
            // export default UserManagement;
            

























































import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createuser } from '../../../FeatureRedux/management_userCreation_slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Usertable from './usertable';

function UserManagement() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userExpiryDate, setUserExpiryDate] = useState("");
  const [companyData, setCompanyData] = useState([]);
  const [getCompanyError, setGetCompanyError] = useState(false);

  // const [companyData, setCompanyData] = useState([]);
  
  const [noCompany, setNoCompany] = useState(false);
  
  

  const handleReset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setCompanyName("");
    setUserRole("");
    setUserExpiryDate("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
      companyName,
      userRole,
      userExpiryDate,
    };

    try {
      const resultAction = dispatch(createuser(userData));
      if (createuser.fulfilled.match(resultAction)) {
        toast.success("User created successfully!");
        handleReset();
      } else {
        toast.error("Failed to create user: " + resultAction.payload);
      }
    } catch (error) {
      toast.error("An unexpected error occurred: " + error.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://13.201.248.202:3001/api/management/companylist', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        });

        const companyData = response.data.data;
        if (!Array.isArray(companyData)) {
          setGetCompanyError(true);
          return;
        }

        if (companyData.length === 0) {
          setNoCompany(true);
          return;
        }

        setCompanyData(companyData);
      } catch (error) {
        console.error('Error fetching company data:', error);
        setGetCompanyError(true);
      }
    })();
  }, []);


        

  return (
    <div>
    <div style={{ maxWidth: '100%', padding: '20px', margin: 'auto', backgroundColor: '#1e1e1e' , boxShadow: '0px 0px 10px 5px white' , borderRadius: '10px' }}>
      {/* Form section */}
      <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#ffffff' }}>User Management</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px'  }}>
          <div style={{ flex: '1 1 45%' }}>
            <label className='text-white'>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              required
            />
          </div>
          <div style={{ flex: '1 1 45%' }}>
            <label className='text-white'>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              required
            />
          </div>
          <div style={{ flex: '1 1 45%' }}>
            <label className='text-white'>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              required
            />
          </div>
          <div style={{ flex: '1 1 45%' }}>
            <label className='text-white'>Company:</label>
            <select
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              required
            >
              <option value="">Please Select</option>
              {noCompany ? (
                <option value="" disabled>No Company Available</option>
              ) : (
                companyData.map((company, index) => (
                  <option key={index} value={company?.company_name || ''}>
                    {company?.company_name || 'Unknown Company'}
                  </option>
                ))
              )}
            </select>
          </div>
          <div style={{ flex: '1 1 45%' }}>
            <label className='text-white'>User Role:</label>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              required
            >
              <option value="">Please Select</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
          <div style={{ flex: '1 1 45%' }}>
            <label className='text-white'>Expiry Date:</label>
            <input
              type="date"
              value={userExpiryDate}
              onChange={(e) => setUserExpiryDate(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              required
            />
          </div>
          <div style={{ flex: '1 1 100%', display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button type="button" onClick={handleReset} style={{ padding: '10px 20px', color:'white', backgroundColor: '#E34234', borderRadius: '5px', border: 'none' }}>Reset</button>
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', borderRadius: '5px', border: 'none' }}>Submit</button>
          </div>
        </form>
      </div>
      </div>
      

      
    {/* User Table */}
      <div>
        <Usertable/>
      </div>

      <ToastContainer />
    
    </div>
  );
}

export default UserManagement;
