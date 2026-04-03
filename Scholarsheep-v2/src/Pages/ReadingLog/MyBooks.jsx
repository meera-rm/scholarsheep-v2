import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ReadingLogList from '../../Components/readingLog/ReadingLogList';
import RecentActivity from '../../Components/readingLog/RecentActivity';
import { getAllBooks, getStats } from '../../services/readingLogService';

const MyBooks = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      const b = await getAllBooks();
      setBooks(b || []);
      const s = await getStats();
      setStats(s || null);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Reading Log</h1>
            <p className="text-gray-500 text-sm mt-0.5">
              {user?.username ? `${user.username}'s books` : 'Track your reading journey'}
            </p>
          </div>
          <Link
            to="/my-books/add"
            className="inline-flex items-center gap-2 bg-teal-500 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-teal-600 transition shadow-md"
          >
            <span className="text-lg">+</span>
            <span>Add Book</span>
          </Link>
        </div>

        {/* Quick Stats Bar */}
        {stats && (
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
              <span className="text-green-600 font-bold">{stats.totalBooks}</span>
              <span className="text-green-700 text-sm">finished</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
              <span className="text-blue-600 font-bold">{stats.currentlyReading}</span>
              <span className="text-blue-700 text-sm">reading</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full">
              <span className="text-purple-600 font-bold">{stats.wantToRead}</span>
              <span className="text-purple-700 text-sm">wishlist</span>
            </div>
            <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full">
              <span className="text-orange-600 font-bold">{stats.totalPages.toLocaleString()}</span>
              <span className="text-orange-700 text-sm">pages</span>
            </div>
            {stats.streak > 0 && (
              <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full">
                <span>🔥</span>
                <span className="text-red-600 font-bold">{stats.streak}</span>
                <span className="text-red-700 text-sm">day streak</span>
              </div>
            )}
          </div>
        )}

        {/* Recent Reading Activity — shows book name, cover, pages, time */}
        <RecentActivity />

        {/* Book List */}
        <ReadingLogList books={books} />
      </div>
    </div>
  );
};

export default MyBooks;
