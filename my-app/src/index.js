import React, { useState, useEffect } from 'react'; 
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Route, useNavigate , useLocation} from 'react-router-dom';
import Billing from './Component/Billing/billing';
import Main from './Component/MainFolder/main';
import Helpcenter from './Component/HelpCenter';
import Management from './Component/Management';
import Dashboard from './Component/Dashboard';
import Sign_up from './Component/AuthFolder/sign_up';
import Sign_in from './Component/AuthFolder/sign_in';
import App from './App';
import { Provider } from "react-redux";
import { store } from './StoreRDK/store';
import UserManagement from './Component/Management/User_management/user_management';
import CompanyManagement from './Component/Management/Company/company_management';
import 'bootstrap/dist/css/bootstrap.min.css';
import Maindetailpage from './Component/main_insides/maindetailpage'
import 'bootstrap/dist/css/bootstrap.min.css';
import ManagementSide from './Component/Management/management_side';
import { Outlet } from 'react-router-dom';  // Ensure Outlet is imported
import Main_upload from './Component/main_insides/main_upload';
import Main_analyse from './Component/main_insides/main_analyse'
import Main_details from './Component/main_insides/main_details';
import GenerateReport from './Component/main_insides/GenerateRepotLogics/generateReport';
import Report_management from './Component/Management/Report_management.js/report_management';
import TagImage from './Component/TagImages/TagImage';
import Testmainanlyse from './Component/main_insides/testmainanlyse';
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
</style>

const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        setLoading(true);
        setIsAuthenticated(true);
        setLoading(false);
      } else {
        setLoading(false);
        setIsAuthenticated(false);
        navigate('/signin'); // Navigate to signin page
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;  
  }

  return isAuthenticated ? element : null;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute element={<App />} />,
    children: [
      { path: '/detail', element: <Maindetailpage /> ,
        children: [
          { path:'upload' , element:<Main_upload/> },
          {
            path:'analyse' , element:<Testmainanlyse/>
          },
          // { path:'analyse' , element:<Main_analyse/> },
          { path: 'tagimage', element: <TagImage/> },
          { path:'details' , element:<Main_details/> },
          {path:'generateReport/:reportId' , element:<GenerateReport/> }
        ]
       },
      { path: 'billing', element: <Billing /> },
      { path: 'dashboard', element: <Dashboard /> },
      {
        path: 'management',
        element: <Management />,
        children: [
          { path: 'userManagement', element: <UserManagement /> },
          { path: 'companyManagement', element: <CompanyManagement /> },
          { path: 'reportManagement' ,element: <Report_management/> }
        ],
      },
      { path: 'helpcenter', element: <Helpcenter /> },
      { path: 'main',
        element: <Main />
        // ,
        // children:[
        //  { path: 'detail', element: <Maindetailpage/> },
        // ]
      },
      
      
    ],
  },
  
  { path: '/signin', element: <Sign_in /> },
  { path: '/signup', element: <Sign_up /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
