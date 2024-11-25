import React, { useState } from 'react';
import InputModal from './Report_management_component.js/input_modal';
import Table_component from './Report_management_component.js/table_component';
import {ToastContainer} from  'react-toastify';


function Report_management() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalVisible(false); // Close the modal
  };

  return (
    <>
    <ToastContainer/>
      <button onClick={toggleModal} className="bg-blue-500 text-white py-2 px-4 mt-2 rounded hover:bg-teal-500">
        Add Component
      </button>
      <InputModal isVisible={isModalVisible} closeModal={closeModal} />
    
     <div>
          <Table_component/>
     </div>




    </>
  );
}

export default Report_management;










