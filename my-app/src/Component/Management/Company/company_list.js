// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function CompanyList() {
//   const [companyData, setCompanyData] = useState([]);
//   const [getCompanyError, setGetCompanyError] = useState(false);
//   const [noCompany, setNoCompany] = useState(false);

//   const [currentPage, setCurrentPage] = useState(1); // Current page state
//   const companiesPerPage = 5; // Number of companies per page

//   useEffect(() => {
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

//   // Pagination logic
//   const indexOfLastCompany = currentPage * companiesPerPage;
//   const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
//   const currentCompanies = companyData.slice(indexOfFirstCompany, indexOfLastCompany);

//   const totalPages = Math.ceil(companyData.length / companiesPerPage);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div>
//       <div style={{ maxHeight: '400px', overflowY: 'auto', scrollbarWidth: 'thin', marginTop: '10px' }}>
//         {/* Company List */}
//       </div>
//       <div>
//         <table
//           style={{
//             width: '100%',
//             borderCollapse: 'separate',
//             borderSpacing: '0 10px', // Add vertical spacing between rows
//           }}
//         >
//           <thead>
//             <tr style={{ backgroundColor: '#f5f5f5' }}>
//               <th
//                 style={{
//                   width: '50%', // Fixed width for alignment
//                   border: '1px solid #ccc',
//                   padding: '10px',
//                   backgroundColor: '#dbeafe',
//                   textAlign: 'left',
//                 }}
//               >
//                 Company Name
//               </th>
//               <th
//                 style={{
//                   width: '50%', // Fixed width for alignment
//                   border: '1px solid #ccc',
//                   padding: '10px',
//                   backgroundColor: '#dbeafe',
//                   textAlign: 'left',
//                 }}
//               >
//                 Created By
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentCompanies.map((company, index) => (
//               <tr
//                 key={company._id || index}
//                 style={{
//                   backgroundColor: '#f9fafb',
//                   border: '1px solid #ccc',
//                   borderRadius: '5px',
//                   overflow: 'hidden',
//                 }}
//               >
//                 <td
//                   style={{
//                     width: '50%', // Fixed width for alignment
//                     border: 'none',
//                     padding: '10px',
//                     textAlign: 'left',
//                   }}
//                 >
//                   {company.company_name}
//                 </td>
//                 <td
//                   style={{
//                     width: '50%', // Fixed width for alignment
//                     border: 'none',
//                     padding: '10px',
//                     textAlign: 'left',
//                   }}
//                 >
//                   {company.createdBy}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {/* Pagination Controls */}
//       <div style={{ marginTop: '20px', textAlign: 'center' }}>
//         {[...Array(totalPages).keys()].map((page) => (
//           <button
//             key={page + 1}
//             onClick={() => handlePageChange(page + 1)}
//             style={{
//               padding: '10px 15px',
//               margin: '0 5px',
//               backgroundColor: currentPage === page + 1 ? '#3b82f6' : '#e5e5e5',
//               color: currentPage === page + 1 ? 'white' : 'black',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//             }}
//           >
//             {page + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CompanyList;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function CompanyList({updatelist}) {
//   const [companyData, setCompanyData] = useState([]);
//   const [getCompanyError, setGetCompanyError] = useState(false);
//   const [noCompany, setNoCompany] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1); // Current page state
//   const companiesPerPage = 4; // Number of companies per page

//   console.log("update list is " ,updatelist)

//   useEffect(() => {
//     (async () => {
//       try {
//         const response = await axios.get('http://13.201.248.202:3001/api/management/companylist', {
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
        
//         setCompanyData(companyData.reverse());
//       } catch (error) {
//         console.error('Error fetching company data:', error);
//         setGetCompanyError(true);
//       }
//     })();
//   }, [updatelist]);

//   // Pagination logic
//   const indexOfLastCompany = currentPage * companiesPerPage;
//   const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
//   const currentCompanies = companyData.slice(indexOfFirstCompany, indexOfLastCompany);

//   const totalPages = Math.ceil(companyData.length / companiesPerPage);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const finddata = (data) => {
//     if (!data) return 'N/A'; // Handle null or undefined values
//     let value = String(data);
//     return value.slice(0, 10) ; // Extract the first 10 characters (YYYY-MM-DD format)
//   };

//   return (
//     <div style={{ padding: '10px', borderRadius: '8px', marginTop: '8px' }}>
//       <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#ffffff' }}>Company List</h2>

//       <div className="space-y-2">
//   {currentCompanies.length > 0 ? (
//     currentCompanies.map((company) => (
//       <div
//         key={company._id}
//         className="flex items-center justify-between border rounded-lg shadow-md px-2 py-0.5 text-left mt-2"
//         style={{
//           borderRadius: '8px',
//           boxShadow: '0px 4px 6px rgba(0, 0, 0, 1)',
//           marginTop: '10px',  // Reduce margin to make cards closer together
//           maxHeight: '300px', // Reduce max height of cards
//           overflowY: 'auto',
//         }}
//       >
//         {/* Company Info */}
//         <div className="flex-1 justify-between items-center align-middle grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-2 p-2 shadow-[0px_0px_5px_1px]"> {/* Reduced gap */}
//           {/* Company Name */}
//           <div>
//             <p className="text-white text-sm font-semibold">Company Name</p> 
//             <p className="text-blue-200 text-sm">{company.company_name}</p>  
//           </div>
//           {/* Created By */}
//           <div>
//             <p className="text-white text-sm font-semibold">Created By</p>  
//             <p className="text-blue-200 text-sm">{company.createdBy || 'N/A'}</p>  
//           </div>
//           <div>
//             <p className="text-white text-sm font-semibold">Expiry</p>  
//             <p className="text-blue-200 text-sm">{finddata(company.company_expiry)}</p>  
//           </div>
//           <div>
//             <p className="text-white text-sm font-semibold">Created At</p>  
//             <p className="text-blue-200 text-sm">{finddata(company.createdAt)}</p> 
//           </div>
//         </div>
//       </div>
//     ))
//   ) : (
//     <div className="text-center text-gray-500 italic py-6">No companies found</div>
//   )}
// </div>

//       {/* Pagination */}
//       <div style={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
//         {[...Array(totalPages).keys()].map((page) => (
//           <button
//             key={page + 1}
//             onClick={() => handlePageChange(page + 1)}
//             style={{
//               padding: '10px 15px',
//               margin: '0 5px',
//               backgroundColor: currentPage === page + 1 ? '#3b82f6' : '#e5e5e5',
//               color: currentPage === page + 1 ? 'white' : 'black',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//             }}
//           >
//             {page + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CompanyList;





import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CompanyList({ updatelist }) {
  const [companyData, setCompanyData] = useState([]);
  const [getCompanyError, setGetCompanyError] = useState(false);
  const [noCompany, setNoCompany] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 4;

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

        setCompanyData(companyData.reverse());
      } catch (error) {
        console.error('Error fetching company data:', error);
        setGetCompanyError(true);
      }
    })();
  }, [updatelist]);

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = companyData.slice(indexOfFirstCompany, indexOfLastCompany);

  const totalPages = Math.ceil(companyData.length / companiesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const finddata = (data) => {
    if (!data) return 'N/A';
    let value = String(data);
    return value.slice(0, 10);
  };

  return (
    <div className="mt-4">
      <h2 className="text-center mb-4 text-[40px] font-semibold text-white">Company List</h2>

      {currentCompanies.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-fixed w-full text-white border border-white">
            <thead>
              <tr>
                <th className="border text-[25px] border-white px-4 py-2 text-center w-1/4">Company Name</th>
                <th className="border text-[25px] border-white px-4 py-2 text-center w-1/4">Created By</th>
                <th className="border text-[25px] border-white px-4 py-2 text-center w-1/4">Expiry</th>
                <th className="border text-[25px] border-white px-4 py-2 text-center w-1/4">Created On</th>
              </tr>
            </thead>
            <tbody>
              {currentCompanies.map((company) => (
                <tr key={company._id}>
                  <td className="border border-white px-4 py-2">{company.company_name || 'N/A'}</td>
                  <td className="border border-white px-4 py-2">{company.createdBy || 'N/A'}</td>
                  <td className="border border-white px-4 py-2">{finddata(company.company_expiry)}</td>
                  <td className="border border-white px-4 py-2">{finddata(company.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 italic py-6">No companies found</div>
      )}

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => handlePageChange(page + 1)}
            className={`px-4 py-2 mx-1 ${
              currentPage === page + 1
                ? 'bg-white text-black'
                : 'bg-transparent border border-white text-white'
            } rounded`}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CompanyList;
