// import React, { useEffect, useState } from 'react'
// import axios from 'axios'





// function Helpcenter() {
//   const [data, setdata] = useState({});

//   useEffect(() => {
//     // console.log("user effect called");
//     axios.get('/api/home').then((res)=>{
//        console.log(res.data)
//        setdata(res.data);
//     }).catch((error)=>{
//        console.log(error);
//     })
//   }, [])

//   return (
//     <div>
//       <h1>Helpcenter</h1>
//       {/* <p>This is message  {JSON.stringify(data).data} data </p> */}
//       <p>My name is : {data.name}</p>
//       <p>My last name is : {data.title}</p>
       
//     </div>
//   )
// }

// export default Helpcenter


import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Helpcenter() {
  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className='text-[60px] text-white'>Contact Us</h1>
        <p className='text-white'>Reach out to us and let us know how we can assist you.</p>
      </div>

      {/* Cards Section */}
      <div className="row justify-content-center">
        {/* Sales Card */}
        <div className="col-md-4 mb-4  ">
          <div className="card shadow-sm">
            <div className="card-body text-center bg-[#1e1e1e] border">
              <img
                src="https://via.placeholder.com/50"
                alt="Sales"
                className="mb-3"
              />
              <h5 className="card-title text-white text-[30px]">Sales</h5>
              <p className="card-text text-white">
              Let’s discuss how we can collaborate for success.
              </p>
              <a href="#" className="btn btn-link">
                Contact sales
              </a>
            </div>
          </div>
        </div>

        {/* Help & Support Card */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center bg-[#1e1e1e] border">
              <img
                src="https://via.placeholder.com/50"
                alt="Support"
                className="mb-3"
              />
              <h5 className="card-title text-white text-[30px]">Help & Support</h5>
              <p className="card-text text-white">
              We’re available to assist with any inquiries or coding needs
              </p>
              <a href="#" className="btn btn-link">
                Get support
              </a>
            </div>
          </div>
        </div>

        {/* Media & Press Card */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center bg-[#1e1e1e] border">
              <img
                src="https://via.placeholder.com/50"
                alt="Media & Press"
                className="mb-3"
              />
              <h5 className="card-title text-white text-[30px]">Media & Press</h5>
              <p className="card-text text-white">
              Stay updated with our latest news, company insights, and media resources.
              </p>
              <a href="#" className="btn btn-link">
                Visit newsroom
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="row text-center mt-5">
        <div className="col-md-6">
          <p className='text-white'><strong>Join us on IRC</strong></p>
          <p className='text-white'>If you have technical questions, chat live with developers in #stripe on freenode.</p>
        </div>
        <div className="col-md-6">
          <p className='text-white'><strong>General communication</strong></p>
          <p className='text-white'>For general queries, including partnership opportunities, please email <a href="mailto:info@stripe.com">info@stripe.com</a>.</p>
        </div>
      </div>
    </div>
  );
}

export default Helpcenter;
