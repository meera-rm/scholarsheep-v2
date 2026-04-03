import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ParentEmailSettings from '../Components/notifications/ParentEmailSettings';
import { getStats, getAllBooks, getAllAwardsLocal as getAllAwards } from '../services/readingLogService';

const ParentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentBooks, setRecentBooks] = useState([]);

  useEffect(() => {
    const load = async () => {
      const s = await getStats();
      setStats(s || null);
      const books = await getAllBooks();
      const recent = (books || [])
        .filter((b) => b.status === 'completed')
        .sort((a, b) => new Date(b.endDate || b.createdAt) - new Date(a.endDate || a.createdAt))
        .slice(0, 5);
      setRecentBooks(recent);
    };
    load();
  }, []);

  const earnedAwards = getAllAwards().filter((a) => a.earned);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Parent Dashboard</h1>
          <p className="text-gray-500 mt-0.5">Welcome, {user?.username || 'Parent'}!</p>
        </div>

        {/* Quick Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{stats.totalBooks}</p>
              <p className="text-xs text-gray-500">Books Finished</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.currentlyReading}</p>
              <p className="text-xs text-gray-500">Currently Reading</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-orange-600">{stats.streak}</p>
              <p className="text-xs text-gray-500">Day Streak</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-teal-600">{earnedAwards.length}</p>
              <p className="text-xs text-gray-500">Stickers Earned</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Books */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Recently Finished Books</h3>
            {recentBooks.length > 0 ? (
              <div className="space-y-3">
                {recentBooks.map((book) => (
                  <div key={book.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    {book.coverUrl && (
                      <img src={book.coverUrl} alt={book.title} className="w-10 h-14 object-cover rounded" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{book.title}</p>
                      <p className="text-xs text-gray-400">{book.author}</p>
                    </div>
                    {book.rating && (
                      <span className="text-yellow-400 text-sm">{'★'.repeat(book.rating)}</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm text-center py-6">No books finished yet</p>
            )}
          </div>

          {/* Email Notification Settings */}
          <ParentEmailSettings />
        </div>

        {/* Recent Awards */}
        {earnedAwards.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <h3 className="font-semibold text-gray-800 mb-4">Recent Stickers</h3>
            <div className="flex flex-wrap gap-3">
              {earnedAwards.slice(0, 8).map((award) => (
                <div key={award.id} className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-3 py-2 rounded-full">
                  <span className="text-xl">{award.emoji}</span>
                  <span className="text-sm font-medium text-yellow-800">{award.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/my-books" className="text-sm bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
            View Reading Log
          </Link>
          <Link to="/my-stats" className="text-sm bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
            View Stats
          </Link>
          <Link to="/my-stickers" className="text-sm bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
            View All Stickers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
