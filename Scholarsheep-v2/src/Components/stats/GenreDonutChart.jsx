import React from 'react';

const COLORS = [
  '#14b8a6', '#3b82f6', '#a855f7', '#f59e0b', '#ef4444',
  '#ec4899', '#6366f1', '#84cc16', '#f97316', '#06b6d4',
];

const GenreDonutChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Genre Breakdown</h3>
        <p className="text-gray-400 text-center py-8">No data yet</p>
      </div>
    );
  }

  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumulative = 0;

  // Build conic-gradient segments
  const segments = data.map((d, i) => {
    const start = (cumulative / total) * 100;
    cumulative += d.value;
    const end = (cumulative / total) * 100;
    return `${COLORS[i % COLORS.length]} ${start}% ${end}%`;
  });

  const gradient = `conic-gradient(${segments.join(', ')})`;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Genre Breakdown</h3>
      <div className="flex items-center gap-6">
        {/* Donut */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <div
            className="w-32 h-32 rounded-full"
            style={{ background: gradient }}
          ></div>
          <div className="absolute inset-0 m-auto w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-gray-700">{total}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-1.5 flex-1">
          {data.slice(0, 6).map((d, i) => (
            <div key={d.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              ></div>
              <span className="text-xs text-gray-600 truncate">{d.name}</span>
              <span className="text-xs text-gray-400 ml-auto">{d.value}</span>
            </div>
          ))}
          {data.length > 6 && (
            <p className="text-xs text-gray-400">+{data.length - 6} more</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenreDonutChart;
