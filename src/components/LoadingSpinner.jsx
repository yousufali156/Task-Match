import React from 'react';

const LoadingSpinner = ({ size = "md", color = "blue", className = "" }) => {
  return (
    <div className={`flex justify-center items-center h-40 ${className}`}>
      <span className={`loading loading-spinner loading-${size} text-${color}-500`}></span>
    </div>
  );
};

export default LoadingSpinner;
