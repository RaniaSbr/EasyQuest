import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CoolButton = ({ color, icon, text }) => {
    return (
        <button 
            type="button" 
            className={`text-${color} hover:text-lightStartD border border-${color} hover:bg-${color} px-7 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm py-2 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800`}
        >
            <FontAwesomeIcon className="pr-2" icon={icon} />
            {text}
        </button>
    );
}

export default CoolButton;
