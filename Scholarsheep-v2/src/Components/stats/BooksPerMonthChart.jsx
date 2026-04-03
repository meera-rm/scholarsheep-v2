import React from 'react';

const BooksPerMonthChart = ({ data }) => {
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Books Per Month</h3>
      <div className="flex items-end gap-2 h-40">
        {data.map((d, i) => (
          <div key={d.month} className="flex-1 flex flex-col items-center">
            <span className="text-xs text-gray-600 mb-1 font-medium">
              {d.count > 0 ? d.count : ''}
            </span>
            <div
              className="w-full bg-teal-400 rounded-t-md transition-all duration-500 hover:bg-teal-500"
              style={{
                height: `${d.count > 0 ? Math.max((d.count / maxCount) * 100, 8) : 2}%`,
                minHeight: d.count > 0 ? '8px' : '2px',
                backgroundColor: d.count > 0 ? undefined : '#e5e7eb',
              }}
            ></div>
            <span className="text-xs text-gray-400 mt-1">{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksPerMonthChart;
