import React from 'react';
import StickerCard from './StickerCard';

const CATEGORIES = [
  { key: 'volume', label: 'Reading Volume', icon: '📚' },
  { key: 'streak', label: 'Streaks', icon: '🔥' },
  { key: 'genre', label: 'Genre Explorer', icon: '⭐' },
  { key: 'pages', label: 'Page Count', icon: '📄' },
  { key: 'special', label: 'Special', icon: '✨' },
];

const StickerCase = ({ awards }) => {
  const earnedCount = awards.filter((a) => a.earned).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Sticker Collection</h2>
          <p className="text-gray-500 text-sm mt-1">
            {earnedCount} of {awards.length} stickers earned
          </p>
        </div>
        <div className="bg-teal-50 px-4 py-2 rounded-full">
          <span className="text-teal-700 font-bold text-lg">{earnedCount}</span>
          <span className="text-teal-500 text-sm">/{awards.length}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
        <div
          className="bg-gradient-to-r from-teal-400 to-teal-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${(earnedCount / awards.length) * 100}%` }}
        ></div>
      </div>

      {CATEGORIES.map((cat) => {
        const catAwards = awards.filter((a) => a.category === cat.key);
        if (catAwards.length === 0) return null;

        return (
          <div key={cat.key} className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {catAwards.map((award) => (
                <StickerCard key={award.id} award={award} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StickerCase;
