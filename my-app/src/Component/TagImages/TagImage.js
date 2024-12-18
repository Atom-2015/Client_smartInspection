import React, { useState , useEffect } from 'react'
import Addtag from './Tagimagecomponent/addtag'
import Footer_image from './Tagimagecomponent/footer_image'
import { ToastContainer } from 'react-toastify'
import Tagimage_map from './Tagimagecomponent/tagimages_map';
import './tag.css'
 

function TagImage() {
const [childimageid , setChildimageid] = useState();


  function HandlechileImageData (imageid){
    // console.log(imageid)
    setChildimageid(imageid)
  }


  return (
    <div className='mt-2 flex justify-between items-center tagimagesrespo'>
      {/* <h1>Tag Images</h1> */}
      <Addtag imageid={childimageid}/>
      <Tagimage_map  />
       <Footer_image imageidtoparent={HandlechileImageData}   />
       <ToastContainer/>
    </div>
  )
}

export default TagImage
