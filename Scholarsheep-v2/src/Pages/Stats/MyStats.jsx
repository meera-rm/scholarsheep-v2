import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import StatsOverview from '../../Components/stats/StatsOverview';
import BooksPerMonthChart from '../../Components/stats/BooksPerMonthChart';
import GenreDonutChart from '../../Components/stats/GenreDonutChart';
import ReadingCalendarHeatmap from '../../Components/stats/ReadingCalendarHeatmap';
import { getStats, getHeatmapData, getEarnedAwardCount } from '../../services/readingLogService';

const MyStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [heatmapData, setHeatmapData] = useState({});

  useEffect(() => {
    const load = async () => {
      const s = await getStats();
      setStats(s || null);
      const h = await getHeatmapData();
      setHeatmapData(h || {});
    };
    load();
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  const earnedCount = getEarnedAwardCount();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Reading Stats</h1>
            <p className="text-gray-500 text-sm mt-0.5">
              {user?.username ? `${user.username}'s progress` : 'Your reading journey in numbers'}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/my-books"
              className="text-sm bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              My Books
            </Link>
            <Link
              to="/my-stickers"
              className="text-sm bg-teal-50 text-teal-600 border border-teal-200 px-4 py-2 rounded-lg hover:bg-teal-100 transition flex items-center gap-1"
            >
              <span>🏆</span> {earnedCount} Stickers
            </Link>
          </div>
        </div>

        {/* Stat Cards */}
        <StatsOverview stats={stats} />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <BooksPerMonthChart data={stats.booksPerMonth} />
          <GenreDonutChart data={stats.genreBreakdown} />
        </div>

        {/* Heatmap */}
        <div className="mt-6">
          <ReadingCalendarHeatmap data={heatmapData} />
        </div>

        {/* Streak Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-gray-800 mb-3">Reading Streaks</h3>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-500">{stats.streak}</p>
                <p className="text-sm text-gray-500">Current Streak</p>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-teal-500">{stats.longestStreak}</p>
                <p className="text-sm text-gray-500">Longest Streak</p>
              </div>
            </div>
            {stats.streak > 0 && (
              <p className="mt-3 text-sm text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg inline-block">
                🔥 You're on a {stats.streak}-day streak! Keep it up!
              </p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-gray-800 mb-3">Year Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Books This Year</span>
                <span className="font-bold text-gray-800">{stats.booksThisYear}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Pages This Year</span>
                <span className="font-bold text-gray-800">{stats.totalPagesThisYear.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Total Hours Read</span>
                <span className="font-bold text-gray-800">{Math.round(stats.totalMinutes / 60)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Stickers Earned</span>
                <span className="font-bold text-teal-600">{earnedCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStats;
