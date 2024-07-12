import React from 'react';

const TextInput = ({ type = "text", placeholder, value, onChange, className = "", ...props }) => {
    const baseClass = "w-full py-2 px-4 mb-2 border rounded-md bg-gray-800 text-black-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-300 ease-in-out";
    const combinedClass = `${baseClass} ${className}`;

    return (
        <input 
            type={type} 
            placeholder={placeholder} 
            value={value} 
            onChange={onChange} 
            className={combinedClass}
            {...props} 
        />
    );
};

export default TextInput;
