// import React, { useState } from 'react';
// import axios from 'axios';

// function CompanyManagement() {
//   const [companyName, setCompanyName] = useState('');
//   const [expiry, setExpiry] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         '/api/management/createcompany',
//         {
//           company_name: companyName,
//           company_expiry: expiry,
//         },
//         {
//           headers: {
//             'x-auth-token': localStorage.getItem('token'),
//           }
//         }
//       );

//       if (response && response.status === 200) {
//         console.log('Company created successfully:', response.data);
//       } else {
//         console.log('Some error from backend:', response);
//       }
//     } catch (error) {
//       console.log('*********** Error while calling the API ********', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Company Management</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Company Name</label>
//           <input
//             type="text"
//             className="form-control"
//             value={companyName}
//             onChange={(e) => setCompanyName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Expiry Date</label>
//           <input
//             type="date"
//             className="form-control"
//             value={expiry}
//             onChange={(e) => setExpiry(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Create Company
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CompanyManagement;






import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Company_list from './company_list';

function CompanyManagement() {
  const [companyName, setCompanyName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [updatelist , setUpdatelist] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://13.201.248.202:3001/api/management/createcompany',
        {
          company_name: companyName,
          company_expiry: expiry,
        },
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          }
        }
      );

      if (response && response.status === 200) {
        console.log('Company created successfully:', response.data);
        setUpdatelist(true);
        setCompanyName("");
        setExpiry("");


      } else {
        console.log('Some error from backend:', response);
      }
    } catch (error) {
      console.log('*********** Error while calling the API ********', error);
    }
  };

  

  return (
    <div
      className="container mt-2"
      style={{
        maxWidth: '90%',
        backgroundColor: '#1e1e1e',
        padding: '10px',
        borderRadius: '10px',
       
     
        boxShadow: '1px 1px 1px 1px #91e0ff'
        
      }}
    >
      <h1 className="text-center mb-4" style={{ color: '#ffffff', fontWeight: '700' }}>
        Company Management
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label style={{ color: '#ffffff', fontSize: '16px', fontWeight: '600' }}>Company Name</label>
          <input
            type="text"
            className="form-control"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            style={{
              border: '1px solid #007bff',
              borderRadius: '6px',
              padding: '10px',
              fontSize: '15px',
            }}
          />
        </div>
        <div className="form-group mb-4">
          <label style={{ color: '#ffffff', fontSize: '16px', fontWeight: '600' }}>Expiry Date</label>
          <input
            type="date"
            className="form-control"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
            style={{
              border: '1px solid #007bff',
              borderRadius: '6px',
              padding: '10px',
              fontSize: '15px',
            }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block"
          style={{
            backgroundColor: '#007bff',
            border: 'none',
            padding: '8px',
            fontSize: '16px',
            fontWeight: '500',
            borderRadius: '6px',
          }}
        >
          Create Company
        </button>
      </form>
      <Company_list updatelist ={updatelist} />
    </div>
  );
}

export default CompanyManagement;









