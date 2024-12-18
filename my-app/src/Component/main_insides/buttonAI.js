import React from 'react';
import { useLocation } from 'react-router-dom';

const ButtonAI = () => {
    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const showButton = queryParams.get('showButton') === 'true';

    return (
        <div>
            {/* {showButton && <button>Special Button</button>} */}
            <button  >AI Inspaction</button>
        </div>
    );
};

export default ButtonAI;
