import React, { useState } from 'react';
import { isDemoMode, isDemoAccount, toggleDemoMode } from '../../services/demoAuthService';

const DataModeToggle = () => {
  const [isDemo, setIsDemo] = useState(isDemoMode());
  const isOnDemoAccount = isDemoAccount();

  const handleToggle = () => {
    if (isOnDemoAccount) return; // Demo accounts can't switch to live
    const newMode = toggleDemoMode();
    setIsDemo(newMode);
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleToggle}
        disabled={isOnDemoAccount}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          isOnDemoAccount ? 'bg-gray-300 cursor-not-allowed' :
          isDemo ? 'bg-yellow-400' : 'bg-teal-500'
        }`}
        aria-label={`Switch to ${isDemo ? 'API' : 'Demo'} mode`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${
            isDemo ? 'translate-x-1' : 'translate-x-6'
          }`}
        />
      </button>
      <span className="text-xs text-gray-400">
        {isOnDemoAccount
          ? '🔒 Demo account (read-only, no API access)'
          : isDemo
            ? '📦 Demo (localStorage)'
            : '🔌 Live (API)'
        }
      </span>
    </div>
  );
};

export default DataModeToggle;
