import logo from './logo.svg';
import './App.css';
// import Sidebar2 from './Component/Sidebar/sidebar2'
import Sidebar from './Component/Sidebar/sidebar';
// import { Outlet } from 'react-router-dom'
// import jwt from 'jsonwebtoken'
import {useHistory, useNavigate} from 'react-router-dom'
import { useEffect } from 'react';









function App() {
  // const navigate = useNavigate();
  // useEffect(()=>{
  //   navigate('/main'); 
    
  // },[])
  return (
    <div className="App ">
     {/* <Sidebar2/>  */}
     <Sidebar/>
     {/* <Outlet/> */}
    </div>
  );  
}

export default App;
