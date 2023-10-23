import React from 'react';

const Loader = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin text-white"></div>
        </div>
    );
};

export default Loader;
