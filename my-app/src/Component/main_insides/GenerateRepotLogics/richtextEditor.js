

import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import  {handleSuccess, handleError } from '../../../util';
import axios from 'axios'
import Cookies from 'js-cookie'

function RichtextEditor() {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = {
    // readonly: false, // enables editing
    height: 400,
    // toolbarSticky: false,
    buttons: 'bold,italic,underline,|,ul,ol,|,left,center,right,|,link,image',
    placeholder: 'Start typing here...'
  };

  const handleSubmit = async () => {
    console.log('Submitted Content:', content);
    try {
      const response = axios.post('/api/main/storeExesummry' , {
        summrydata:content
      } , {
        headers:{
          'x-auth-token': localStorage.getItem('token'),
          'x-reportid':Cookies.get('reportId'),
          
        }
      })
      if(response.status === 200){
         handleSuccess("Summary Added");
      }
    } catch (error) {
      handleError("Error White storing Sumrmry");
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2 className='text-white'>EXECUTIVE SUMMARY</h2>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1} // tabIndex of the editor
        onBlur={(newContent) => setContent(newContent)} // handle blur event
        // onChange={(newContent) => {setContent(newContent)}}
      />
      <button onClick={handleSubmit} style={{ marginTop: '10px' }} className='font-bold bg-teal-500 px-3 py-2 rounded text-white text-[25px]'>
        Submit
      </button>
      {/* <div>
        {content}
      </div> */}
    </div>
  );
}

export default RichtextEditor