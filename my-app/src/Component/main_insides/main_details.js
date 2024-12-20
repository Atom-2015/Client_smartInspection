import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Invoice from './main_detail_inside/invoice';
import External from './main_detail_inside/external';
import Inspaction_type_group from './main_detail_inside/inspaction_type_group';
import Inspaction_data from './main_detail_inside/inspaction_data';
import { ToastContainer } from 'react-toastify';
import './analyse.css'

function Main_details() {
    
    const location = useLocation();
    const reportId = location.state?.id;

   
   

    return (
        <div className="container-fluid mx-auto p-4 flex detailresponsive">
            {/* Left Side */}
            <div className="w-[40%] ">
                <Inspaction_data  reportId={reportId} />

                <Inspaction_type_group/>
            </div>

            {/* Right Side */}
            <div className="w-[60%]  ml-5">
                 <Invoice/>

                <External/>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default Main_details;


