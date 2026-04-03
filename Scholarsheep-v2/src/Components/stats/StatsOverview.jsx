import React from 'react';

const StatCard = ({ label, value, icon, color }) => (
  <div className={`bg-white rounded-xl shadow-md p-5 border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500 mt-0.5">{label}</p>
      </div>
      <span className="text-3xl">{icon}</span>
    </div>
  </div>
);

const StatsOverview = ({ stats }) => {
  const cards = [
    { label: 'Books Completed', value: stats.totalBooks, icon: '📚', color: 'border-green-500' },
    { label: 'Total Pages', value: stats.totalPages.toLocaleString(), icon: '📄', color: 'border-blue-500' },
    { label: 'Reading Streak', value: `${stats.streak} days`, icon: '🔥', color: 'border-orange-500' },
    { label: 'Avg Rating', value: stats.avgRating > 0 ? `★ ${stats.avgRating}` : '—', icon: '⭐', color: 'border-yellow-500' },
    { label: 'Currently Reading', value: stats.currentlyReading, icon: '📖', color: 'border-purple-500' },
    { label: 'Reading Time', value: `${Math.round(stats.totalMinutes / 60)}h`, icon: '⏱️', color: 'border-teal-500' },
    { label: 'This Month', value: stats.booksThisMonth, icon: '📅', color: 'border-pink-500' },
    { label: 'Favorite Genre', value: stats.favoriteGenre, icon: '🏷️', color: 'border-indigo-500' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
};

export default StatsOverview;
