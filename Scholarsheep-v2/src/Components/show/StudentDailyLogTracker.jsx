import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

const StudentDailyLogTracker = ({ students }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [logData, setLogData] = useState({});
  const [loading, setLoading] = useState(false);

  // Get last 7 dates
  const getLast7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().split('T')[0]);
    }
    return days;
  };

  const dates = getLast7Days();

  useEffect(() => {
    if (!students || students.length === 0) return;
    setLoading(true);

    // Fetch logs for each student for the last 7 days
    const fetchLogs = async () => {
      const result = {};

      for (const student of students) {
        try {
          const res = await axios.get(`${API}/api/students/${student.student_id}/logs`);
          const logs = res.data.payload || [];

          // Group by date
          const byDate = {};
          logs.forEach((log) => {
            const date = log.date_read ? log.date_read.split('T')[0] : null;
            if (date) {
              if (!byDate[date]) byDate[date] = [];
              byDate[date].push(log);
            }
          });

          result[student.student_id] = {
            name: student.student_name,
            avatar: student.student_avatar || student.student_image || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(student.student_name)}`,
            logsByDate: byDate,
          };
        } catch {
          result[student.student_id] = {
            name: student.student_name,
            avatar: student.student_avatar || student.student_image || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(student.student_name)}`,
            logsByDate: {},
          };
        }
      }
      setLogData(result);
      setLoading(false);
    };

    fetchLogs();
  }, [students]);

  // Count how many students logged on each date
  const getDailyCount = (date) => {
    let count = 0;
    Object.values(logData).forEach((s) => {
      if (s.logsByDate[date] && s.logsByDate[date].length > 0) count++;
    });
    return count;
  };

  const formatDay = (dateStr) => {
    const d = new Date(dateStr + 'T12:00:00');
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (dateStr === today) return 'Today';
    if (dateStr === yesterday) return 'Yesterday';
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  if (students.length === 0) return null;

  return (
    <div className='bg-white rounded-xl shadow-md p-6 mb-6'>
      <h3 className='font-bold text-lg text-teal-700 mb-4'>Daily Reading Log Tracker</h3>

      {loading ? (
        <p className='text-gray-400 text-sm'>Loading student logs...</p>
      ) : (
        <>
          {/* Summary cards for last 7 days */}
          <div className='grid grid-cols-7 gap-2 mb-6'>
            {dates.map((date) => {
              const count = getDailyCount(date);
              const total = students.length;
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              const isSelected = date === selectedDate;

              return (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`text-center p-2 rounded-lg transition ${
                    isSelected
                      ? 'bg-teal-500 text-white shadow-md'
                      : count > 0
                      ? 'bg-green-50 hover:bg-green-100'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <p className='text-xs font-medium'>
                    {formatDay(date)}
                  </p>
                  <p className={`text-xl font-bold mt-1 ${
                    isSelected ? 'text-white' : count > 0 ? 'text-green-600' : 'text-gray-300'
                  }`}>
                    {count}/{total}
                  </p>
                  <p className={`text-xs ${isSelected ? 'text-teal-100' : 'text-gray-400'}`}>
                    {pct}%
                  </p>
                </button>
              );
            })}
          </div>

          {/* Student list for selected date */}
          <h4 className='font-semibold text-gray-700 mb-3 text-sm'>
            {formatDay(selectedDate)} — Who logged reading?
          </h4>
          <div className='space-y-2'>
            {Object.entries(logData).map(([studentId, data]) => {
              const logs = data.logsByDate[selectedDate] || [];
              const hasLogged = logs.length > 0;
              const totalPages = logs.reduce((sum, l) => sum + (l.pages_read || 0), 0);
              const totalMinutes = logs.reduce((sum, l) => sum + (l.reading_minutes || 0), 0);

              return (
                <div
                  key={studentId}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    hasLogged ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'
                  }`}
                >
                  <img
                    src={data.avatar}
                    alt={data.name}
                    className='w-8 h-8 rounded-full object-cover'
                  />
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-gray-800 truncate'>{data.name}</p>
                    {hasLogged ? (
                      <p className='text-xs text-green-600'>
                        {logs.length} log{logs.length > 1 ? 's' : ''}
                        {totalPages > 0 && ` · ${totalPages} pages`}
                        {totalMinutes > 0 && ` · ${totalMinutes} min`}
                      </p>
                    ) : (
                      <p className='text-xs text-red-400'>No reading logged</p>
                    )}
                  </div>
                  <span className='text-lg'>
                    {hasLogged ? '✅' : '❌'}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentDailyLogTracker;
