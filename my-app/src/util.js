import { toast } from 'react-toastify';

// Function to show success message
export const handleSuccess = (msg) => {
    toast.success(msg, {
        
        position: "top-right",
        autoClose: 1000,  
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      
    });
}

// Function to show error message
export const handleError = (msg) => {
    toast.error(msg, {
        position: "top-right",
        autoClose: 1000,  
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}






