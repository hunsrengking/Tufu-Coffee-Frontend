import React, { useEffect } from 'react';

/**
 * A premium Alert Message component with rich aesthetics.
 * @param {string} type - success, error, warning, info
 * @param {string} message - The message to display
 * @param {boolean} isOpen - Whether the alert is visible
 * @param {function} onClose - Function to call when the alert is closed
 * @param {number} duration - Auto-close duration in ms (default 5000)
 */
const AlertMessage = ({ type = 'success', message, isOpen, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (isOpen && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const config = {
    success: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-800',
      icon: 'fa-circle-check',
      iconColor: 'text-emerald-500'
    },
    error: {
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      text: 'text-rose-800',
      icon: 'fa-circle-xmark',
      iconColor: 'text-rose-500'
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      icon: 'fa-triangle-exclamation',
      iconColor: 'text-amber-500'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'fa-circle-info',
      iconColor: 'text-blue-500'
    }
  };

  const { bg, border, text, icon, iconColor } = config[type] || config.success;

  return (
    <div className="fixed top-6 right-6 z-[9999] animate-in fade-in slide-in-from-right-8 duration-300">
      <div className={`${bg} ${border} ${text} border flex items-center gap-4 px-5 py-4 rounded-2xl shadow-xl shadow-slate-200/50 min-w-[320px] max-w-md ring-1 ring-black/5`}>
        <div className={`${iconColor} bg-white h-10 w-10 rounded-xl flex items-center justify-center shadow-sm`}>
          <i className={`fa-solid ${icon} text-lg`}></i>
        </div>
        <div className="flex-1">
          <h2 className="text-xs font-medium opacity-80 leading-relaxed">{message}</h2>
        </div>
        <button 
          onClick={onClose}
          className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-black/5 transition-colors text-slate-400 hover:text-slate-600"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};

export default AlertMessage;
