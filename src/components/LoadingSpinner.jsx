import React from 'react';

/**
 * A high-end Loading Spinner component.
 * @param {boolean} fullPage - If true, renders as a full-page overlay.
 * @param {string} size - small, medium, large (default: medium)
 * @param {string} text - Optional loading text to display.
 */
const LoadingSpinner = ({ fullPage = false, size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'h-6 w-6 border-2',
    medium: 'h-10 w-10 border-[3px]',
    large: 'h-16 w-16 border-4'
  };

  const spinnerContent = (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        {/* Outer Ring */}
        <div className={`${sizeClasses[size]} rounded-full border-slate-100`}></div>
        {/* Animated Spin Ring */}
        <div className={`${sizeClasses[size]} rounded-full border-t-[#003399] border-l-transparent border-r-transparent border-b-transparent absolute top-0 left-0 animate-spin`}></div>
        {/* Inner Static Glow */}
        <div className="absolute inset-0 rounded-full bg-[#003399]/5 blur-md animate-pulse"></div>
      </div>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-transparent animate-in fade-in duration-500">
        {spinnerContent}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      {spinnerContent}
    </div>
  );
};

export default LoadingSpinner;
