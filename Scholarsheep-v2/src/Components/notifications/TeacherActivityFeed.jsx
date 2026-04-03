import React, { useState, useEffect } from 'react';
import { getTodaysReaders, getYesterdaysReaders } from '../../services/notificationService';
import { getAllBooks, getAllSessions } from '../../services/readingLogService';

const TeacherActivityFeed = () => {
  const [todayData, setTodayData] = useState(null);
  const [yesterdayData, setYesterdayData] = useState(null);
  const [activeTab, setActiveTab] = useState('today');
  const [bookMap, setBookMap] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const [today, yesterday, books] = await Promise.all([
        getTodaysReaders(),
        getYesterdaysReaders(),
        getAllBooks(),
      ]);
      setTodayData(today);
      setYesterdayData(yesterday);
      const map = {};
      (Array.isArray(books) ? books : []).forEach((b) => { map[b.id] = b; });
      setBookMap(map);
    };
    loadData();
  }, []);

  const data = activeTab === 'today' ? todayData : yesterdayData;
  const dateLabel = activeTab === 'today' ? 'Today' : 'Yesterday';

  const formatDate = (dateStr) => {
    return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Student Reading Activity</h3>
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition ${
              activeTab === 'today' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setActiveTab('yesterday')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition ${
              activeTab === 'yesterday' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500'
            }`}
          >
            Yesterday
          </button>
        </div>
      </div>

      {data && (
        <p className="text-xs text-gray-400 mb-3">{formatDate(data.date)}</p>
      )}

      {/* Summary */}
      {data && data.totalSessions > 0 ? (
        <>
          <div className="flex gap-4 mb-4">
            <div className="bg-green-50 rounded-lg px-4 py-2 flex-1 text-center">
              <p className="text-lg font-bold text-green-700">{data.readers.length}</p>
              <p className="text-xs text-green-600">readers</p>
            </div>
            <div className="bg-blue-50 rounded-lg px-4 py-2 flex-1 text-center">
              <p className="text-lg font-bold text-blue-700">{data.totalPages}</p>
              <p className="text-xs text-blue-600">pages</p>
            </div>
            <div className="bg-purple-50 rounded-lg px-4 py-2 flex-1 text-center">
              <p className="text-lg font-bold text-purple-700">{data.totalMinutes}</p>
              <p className="text-xs text-purple-600">minutes</p>
            </div>
          </div>

          {/* Reader list */}
          <div className="space-y-2">
            {data.readers.map((reader, i) => {
              const book = bookMap[reader.bookId];
              return (
                <div key={reader.bookId || i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-sm">
                    📖
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {book ? book.title : `Book session`}
                    </p>
                    <p className="text-xs text-gray-400">
                      {reader.totalPages} pages · {reader.totalMinutes} min · {reader.sessions} session{reader.sessions > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <p className="text-3xl mb-2">{activeTab === 'today' ? '📚' : '😴'}</p>
          <p className="text-sm">
            {activeTab === 'today'
              ? 'No reading sessions logged today yet'
              : 'No reading sessions were logged yesterday'}
          </p>
        </div>
      )}
    </div>
  );
};

export default TeacherActivityFeed;
