import React, { useEffect, useState } from 'react';

const StickerPopup = ({ award, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in
    requestAnimationFrame(() => setVisible(true));
    // Auto close after 4 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!award) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }}
      ></div>

      {/* Popup */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm mx-4 transition-all duration-500 ${
          visible ? 'scale-100 translate-y-0' : 'scale-75 translate-y-8'
        }`}
      >
        {/* Confetti dots */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-bounce"
              style={{
                backgroundColor: ['#14b8a6', '#f59e0b', '#ef4444', '#3b82f6', '#a855f7'][i % 5],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>

        <p className="text-5xl mb-3">{award.emoji}</p>
        <h2 className="text-xl font-bold text-gray-800">New Sticker Earned!</h2>
        <p className="text-2xl font-bold text-teal-600 mt-2">{award.name}</p>
        <p className="text-sm text-gray-500 mt-1 capitalize">{award.tier} tier</p>

        <button
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 300);
          }}
          className="mt-6 bg-teal-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-teal-600 transition"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
};

export default StickerPopup;
