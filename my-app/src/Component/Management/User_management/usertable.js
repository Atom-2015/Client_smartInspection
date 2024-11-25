import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {DeleteUser} from "../../../FeatureRedux/analyse_Delete_user";
import { useDispatch , useSelector } from 'react-redux';
import {handleError , handleSuccess} from '../../../util'


function Usertable() {

 
  
    const [companyData, setCompanyData] = useState([]);
    const [getCompanyError, setGetCompanyError] = useState(false);
    const [noCompany, setNoCompany] = useState(false);
    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(3);
    const { isError = false, data = null, errorMessage = null } = useSelector(
      (state) => state.DeleteUser || {}
    );

    useEffect(() => {
      if (data && !isError) {
        handleSuccess("User Deleted Successfully");
        // Remove the deleted user from the local state
        setUserData((prevData) => prevData.filter((user) => user._id !== data._id));
      }
  
      if (isError && errorMessage) {
        handleError(errorMessage || "Failed to delete user");
      }
    }, [isError, data, errorMessage]);
    
      useEffect(() => {
        (async () => {
          try {
            const response = await axios.get('/api/userlist', {
              headers: {
                'x-auth-token': localStorage.getItem('token'),
              },
            });
    
            if (response && response.data.data) {
              setUserData(response.data.data);
            } else {
              console.log('No user data found');
            }
          } catch (error) {
            console.log("Error while fetching user list:", error);
          }
        })();
      }, []);
    
      const indexOfLastUser = currentPage * usersPerPage;
      const indexOfFirstUser = indexOfLastUser - usersPerPage;
      const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);
    
      const totalPages = Math.ceil(userData.length / usersPerPage);
    
      const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };
    
      const handlePrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };

      const dispatch = useDispatch()

      const HandleDelete = (event)=>{
        // event.preventDefault();
        dispatch(DeleteUser(event._id));
      }



  return (
     
       <div style={{   padding: '10px', borderRadius: '8px',  marginTop: '8px', maxHeight: '400px',   }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#ffffff' }}>User List</h2>
        {/* <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ border: '1px solid #ccc', padding: '10px' , backgroundColor: '#dbeafe' }}>Name</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' , backgroundColor: '#dbeafe' }}>Email</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' , backgroundColor: '#dbeafe' }}>Password</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' , backgroundColor: '#dbeafe' }}>Company</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' , backgroundColor: '#dbeafe' }}>Role</th>
              <th style={{ border: '1px solid #ccc', padding: '10px'  , backgroundColor: '#dbeafe'}}>Created By</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user._id}>
                  <td style={{ border: '1px solid #ccc', padding: '10px' , color:'white' }}>{user.name}</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px', color:'white' }}>{user.email}</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px',color:'white' }}>{user.password}</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px',color:'white' }}>{user.company_name || 'N/A'}</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px',color:'white' }}>{user.user_role}</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px',color:'white' }}>{user.user_created_by || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No users found</td>
              </tr>
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 1)
            )}
          </tbody>
        </table> */}

 
<div className="space-y-2">
{currentUsers.length > 0 ? (
      currentUsers.map((user) => (
        <div
          key={user._id}
          className="flex items-center justify-between border  rounded-lg shadow-md  px-4 py-2 text-left mt-2 "
          style={{    borderRadius: '8px', boxShadow: '0px 4px 6px  rgba(0, 0, 0, 1)' , marginTop: '20px', maxHeight: '400px', overflowY: 'auto' }}
        >
           
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center">
              <span className="text-gray-200 text-xl font-bold">
                {user.name[0].toUpperCase()}
              </span>
            </div>
          </div>

          
          <div className="flex-1 ml-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-7 gap-x-4  ">
             
            <div className=' m-0 ' >
              <p className="text-white text-sm font-semibold">Name</p>
              <p className="text-blue-200 text-sm">{user.name}</p>
            </div>
             
            <div>
              <p className="text-white text-sm font-semibold">Email</p>
              <p className="text-blue-200 text-sm">{user.email}</p>
            </div>
           
            <div>
              <p className="text-white text-sm font-semibold">Password</p>
              <p className="text-blue-200 text-sm">{user.password}</p>
            </div>
             
            <div>
              <p className="text-white text-sm font-semibold">Company Name</p>
              <p className="text-blue-200 text-sm">
                {user.company_name || 'N/A'}
              </p>
            </div>
             
            <div>
              <p className="text-white text-sm font-semibold">User Role</p>
              <p className="text-blue-200 text-sm">{user.user_role}</p>
            </div>
             
            <div>
              <p className="text-white text-sm font-semibold">Created By</p>
              <p className="text-blue-200 text-sm">
                {user.user_created_by || 'N/A'}
              </p>
            </div>

            <div>
              <p className="text-white text-sm font-semibold">Action</p>
              <button type="button" onClick={() => HandleDelete(user)} style={{ padding: '2px 7px', color:'white', backgroundColor: '#E34234', borderRadius: '5px', border: 'none' }}>Delete</button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center text-gray-500 italic py-6">No users found</div>
    )}
</div>


        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            style={{
              padding: '7px 14px',
              marginRight: '10px',
              backgroundColor: 'white',
              borderRadius: '5px',
              border: 'none',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              color:'Black'
            }}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            style={{
                padding: '7px 14px',
              marginLeft: '10px',
              backgroundColor: '#f0f0f0',
              borderRadius: '5px',
              border: 'none',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              backgroundColor: 'white'
            }}
          >
            Next
          </button>
        </div>
    </div>
  )
}

export default Usertable
