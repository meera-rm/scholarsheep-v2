import React, { useState, useEffect, useTransition } from 'react';
import { getLeaderboard } from '../../services/leaderboardService';

const PERIODS = [
  { key: 'weekly', label: 'This Week' },
  { key: 'monthly', label: 'This Month' },
  { key: 'alltime', label: 'All Time' },
];

const SORT_OPTIONS = [
  { key: 'books', label: 'Books Read' },
  { key: 'pages', label: 'Pages Read' },
  { key: 'streak', label: 'Streak' },
];

const medals = ['', '🥇', '🥈', '🥉'];

const ClassLeaderboard = () => {
  const [period, setPeriod] = useState('alltime');
  const [sortBy, setSortBy] = useState('books');
  const [data, setData] = useState([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const result = await getLeaderboard(period, sortBy);
      setData(result);
    });
  }, [period, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Reading Leaderboard</h1>
        <p className="text-gray-500 text-sm mb-6">See who's reading the most!</p>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex bg-white rounded-xl shadow-sm p-1">
            {PERIODS.map((p) => (
              <button key={p.key} onClick={() => setPeriod(p.key)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${period === p.key ? 'bg-teal-500 text-white' : 'text-gray-500 hover:text-gray-700'}`}>
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex bg-white rounded-xl shadow-sm p-1">
            {SORT_OPTIONS.map((s) => (
              <button key={s.key} onClick={() => setSortBy(s.key)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${sortBy === s.key ? 'bg-indigo-500 text-white' : 'text-gray-500 hover:text-gray-700'}`}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ opacity: isPending ? 0.5 : 1, transition: 'opacity 0.2s' }}>
          {data.length > 0 ? (
            <div className="space-y-3">
              {data.map((student) => {
                const isMe = student.name === 'You';
                const isTop3 = student.rank <= 3;
                return (
                  <div key={student.rank}
                    className={`flex items-center gap-4 p-4 rounded-xl transition ${isMe ? 'bg-teal-50 border-2 border-teal-300 shadow-md' : isTop3 ? 'bg-white shadow-md' : 'bg-white shadow-sm'}`}>
                    <div className="w-10 text-center flex-shrink-0">
                      {isTop3 ? <span className="text-2xl">{medals[student.rank]}</span> : <span className="text-lg font-bold text-gray-400">#{student.rank}</span>}
                    </div>
                    <img src={student.avatar || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(student.name)}`}
                      alt={student.name} className="w-12 h-12 rounded-full object-cover border-2 border-gray-100" />
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold truncate ${isMe ? 'text-teal-700' : 'text-gray-800'}`}>{student.name} {isMe && '(You)'}</p>
                    </div>
                    <div className="flex gap-4 text-sm flex-shrink-0">
                      <div className={`text-center ${sortBy === 'books' ? 'font-bold text-teal-600' : 'text-gray-500'}`}>
                        <p className="text-lg font-bold">{student.books}</p><p className="text-xs">books</p>
                      </div>
                      <div className={`text-center ${sortBy === 'pages' ? 'font-bold text-blue-600' : 'text-gray-500'}`}>
                        <p className="text-lg font-bold">{student.pages}</p><p className="text-xs">pages</p>
                      </div>
                      <div className={`text-center ${sortBy === 'streak' ? 'font-bold text-orange-600' : 'text-gray-500'}`}>
                        <p className="text-lg font-bold">{student.streak}</p><p className="text-xs">streak</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : isPending ? (
            <div className="space-y-3 animate-pulse">
              {[1,2,3,4,5].map((i) => <div key={i} className="bg-gray-200 rounded-xl h-20"></div>)}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-12">No reading data yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassLeaderboard;
