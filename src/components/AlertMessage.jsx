import React, { useEffect, useState } from 'react';

const KEYFRAMES = `
@keyframes toast-in {
  0%   { opacity: 0; transform: translateX(calc(100% + 1rem)) scale(0.92); }
  60%  { transform: translateX(-6px) scale(1.01); }
  100% { opacity: 1; transform: translateX(0) scale(1); }
}
@keyframes toast-out {
  0%   { opacity: 1; transform: translateX(0) scale(1); }
  100% { opacity: 0; transform: translateX(calc(100% + 1rem)) scale(0.92); }
}
@keyframes progress-drain {
  from { width: 100%; }
  to   { width: 0%; }
}
`;

let styleInjected = false;
const injectStyles = () => {
  if (styleInjected) return;
  const el = document.createElement('style');
  el.textContent = KEYFRAMES;
  document.head.appendChild(el);
  styleInjected = true;
};

/**
 * Premium dark toast notification — slide-in/out animation, responsive, auto-dismiss.
 * @param {string}   type     - 'success' | 'error' | 'warning' | 'info'
 * @param {string}   message  - The message to display
 * @param {boolean}  isOpen   - Whether the alert is visible
 * @param {function} onClose  - Callback when dismissed
 * @param {number}   duration - Auto-close delay in ms (default 4500)
 */
const AlertMessage = ({ type = 'success', message, isOpen, onClose, duration = 4500 }) => {
  const [leaving, setLeaving] = useState(false);
  const [key, setKey] = useState(0); // remount trick to restart animation

  useEffect(() => { injectStyles(); }, []);

  // Restart animation each time it opens
  useEffect(() => {
    if (isOpen) {
      setLeaving(false);
      setKey(k => k + 1);
    }
  }, [isOpen]);

  // Auto-dismiss
  useEffect(() => {
    if (!isOpen || !duration) return;
    const t = setTimeout(() => {
      setLeaving(true);
      setTimeout(onClose, 350);
    }, duration);
    return () => clearTimeout(t);
  }, [isOpen, duration, onClose, key]);

  const handleClose = () => {
    setLeaving(true);
    setTimeout(onClose, 350);
  };

  if (!isOpen && !leaving) return null;

  const config = {
    success: { icon: 'fa-circle-check',        iconFg: 'text-emerald-400', prog: '#34d399', label: 'Success' },
    error:   { icon: 'fa-circle-xmark',         iconFg: 'text-rose-400',    prog: '#fb7185', label: 'Error'   },
    warning: { icon: 'fa-triangle-exclamation', iconFg: 'text-amber-400',   prog: '#fbbf24', label: 'Warning' },
    info:    { icon: 'fa-circle-info',          iconFg: 'text-blue-400',    prog: '#60a5fa', label: 'Info'    },
  };

  const c = config[type] || config.success;

  return (
    <div
      key={key}
      style={{
        position: 'fixed',
        top: '1.25rem',
        right: '1rem',
        zIndex: 9999,
        width: 'min(calc(100vw - 2rem), 380px)',
        animation: leaving
          ? 'toast-out 0.35s cubic-bezier(0.4, 0, 1, 1) forwards'
          : 'toast-in 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      }}
    >
      {/* Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.07)',
          overflow: 'hidden',
        }}
      >
        {/* Main row */}
        <div className="flex items-center gap-3 px-4 py-3.5">
          {/* Icon bubble */}
          <div className="flex-shrink-0 h-8 w-8 rounded-xl flex items-center justify-center bg-white/5">
            <i className={`fa-solid ${c.icon} ${c.iconFg} text-base`}></i>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-[12px] text-slate-400 mt-0.5 leading-snug break-words">{message}</p>
          </div>

          {/* Divider */}
          <div className="w-px h-7 bg-white/10 flex-shrink-0 mx-0.5"></div>

          {/* Close */}
          <button
            onClick={handleClose}
            aria-label="Dismiss"
            className="flex-shrink-0 h-8 w-8 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Progress bar — drains over `duration` ms */}
        {duration > 0 && (
          <div style={{ height: '2px', background: 'rgba(255,255,255,0.06)' }}>
            <div
              key={key}
              style={{
                height: '100%',
                borderRadius: '9999px',
                background: c.prog,
                animation: `progress-drain ${duration}ms linear forwards`,
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertMessage;
