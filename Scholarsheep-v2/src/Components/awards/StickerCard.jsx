import React, { useState } from 'react';

const tierGlow = {
  bronze: 'shadow-orange-200',
  silver: 'shadow-gray-300',
  gold: 'shadow-yellow-300',
  platinum: 'shadow-blue-300',
  diamond: 'shadow-purple-300',
};

const tierBorder = {
  bronze: 'border-orange-300',
  silver: 'border-gray-300',
  gold: 'border-yellow-400',
  platinum: 'border-blue-300',
  diamond: 'border-purple-400',
};

const StickerCard = ({ award }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className={`
          flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer
          ${award.earned
            ? `bg-white ${tierBorder[award.tier]} shadow-lg ${tierGlow[award.tier]} hover:scale-110`
            : 'bg-gray-50 border-gray-200 opacity-50'
          }
        `}
      >
        <span className={`text-3xl ${award.earned ? '' : 'grayscale filter'}`}>
          {award.earned ? award.emoji : '🔒'}
        </span>
        <p className={`text-xs font-medium mt-1 text-center leading-tight ${
          award.earned ? 'text-gray-700' : 'text-gray-400'
        }`}>
          {award.name}
        </p>
        {award.earned && award.earnedDate && (
          <p className="text-xs text-gray-400 mt-0.5">
            {new Date(award.earnedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </p>
        )}
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap shadow-xl">
          <p className="font-medium">{award.name}</p>
          <p className="text-gray-300 mt-0.5">
            {award.earned ? `Earned ${award.earnedDate}` : `Requires: ${award.value} ${award.criteria}`}
          </p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};

export default StickerCard;
