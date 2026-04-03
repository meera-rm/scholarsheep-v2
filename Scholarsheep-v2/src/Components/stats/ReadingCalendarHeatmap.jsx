import React, { useMemo } from 'react';

const ReadingCalendarHeatmap = ({ data }) => {
  const { weeks, months } = useMemo(() => {
    const today = new Date();
    const weeks = [];
    let currentWeek = [];
    const months = [];
    let lastMonth = -1;

    // Go back 364 days (52 weeks)
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayOfWeek = date.getDay();

      // Track month labels
      const month = date.getMonth();
      if (month !== lastMonth) {
        months.push({
          label: date.toLocaleString('default', { month: 'short' }),
          weekIndex: weeks.length,
        });
        lastMonth = month;
      }

      const dayData = data[dateStr] || null;
      const pages = dayData?.pages || 0;

      let level = 0;
      if (pages >= 50) level = 4;
      else if (pages >= 30) level = 3;
      else if (pages >= 10) level = 2;
      else if (pages > 0) level = 1;

      currentWeek.push({
        date: dateStr,
        dayOfWeek,
        pages,
        minutes: dayData?.minutes || 0,
        level,
      });

      if (dayOfWeek === 6 || i === 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    return { weeks, months };
  }, [data]);

  const levelColors = [
    'bg-gray-100',    // 0 - no activity
    'bg-green-200',   // 1 - light
    'bg-green-400',   // 2 - medium
    'bg-green-500',   // 3 - high
    'bg-green-700',   // 4 - very high
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Reading Activity</h3>

      {/* Month labels */}
      <div className="flex mb-1 ml-8">
        {months.map((m, i) => (
          <span
            key={i}
            className="text-xs text-gray-400"
            style={{
              position: 'relative',
              left: `${(m.weekIndex / weeks.length) * 100}%`,
              transform: 'translateX(-50%)',
            }}
          >
            {m.label}
          </span>
        ))}
      </div>

      <div className="flex gap-0.5 overflow-x-auto">
        {/* Day labels */}
        <div className="flex flex-col gap-0.5 mr-1 flex-shrink-0">
          {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((day, i) => (
            <span key={i} className="text-xs text-gray-400 h-3 leading-3">
              {day}
            </span>
          ))}
        </div>

        {/* Weeks */}
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-0.5">
            {/* Pad first week if it doesn't start on Sunday */}
            {wi === 0 &&
              Array.from({ length: week[0]?.dayOfWeek || 0 }).map((_, i) => (
                <div key={`pad-${i}`} className="w-3 h-3"></div>
              ))}
            {week.map((day) => (
              <div
                key={day.date}
                className={`w-3 h-3 rounded-sm ${levelColors[day.level]} cursor-pointer transition-transform hover:scale-150`}
                title={`${day.date}: ${day.pages} pages, ${day.minutes} min`}
              ></div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3 justify-end">
        <span className="text-xs text-gray-400">Less</span>
        {levelColors.map((color, i) => (
          <div key={i} className={`w-3 h-3 rounded-sm ${color}`}></div>
        ))}
        <span className="text-xs text-gray-400">More</span>
      </div>
    </div>
  );
};

export default ReadingCalendarHeatmap;
