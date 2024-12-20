import { toast } from 'react-toastify';

// Function to show success message
export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: "top-right",
        autoClose: 5000,  
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
            top: '80px', // Add margin to the top to adjust the position
            height: '30px !important',
        },
    });
}

// Function to show error message
export const handleError = (msg) => {
    toast.error(msg, {
        position: "top-right",
        autoClose: 5000,  
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
            top: '80px', // Add margin to the top to adjust the position
        },
    });
}
