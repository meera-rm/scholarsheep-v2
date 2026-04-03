import React, { useState, useEffect, Suspense, useTransition } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBook, FaGamepad, FaClipboardList } from 'react-icons/fa';
import { RxCountdownTimer } from 'react-icons/rx';
import { getStats, getAllBooks, getAllAwardsLocal as getAllAwards } from '../services/readingLogService';
import BookRecommendations from '../Components/books/BookRecommendations';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentBooks, setRecentBooks] = useState([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // React 19: wrap data fetching in startTransition for non-blocking updates
    startTransition(async () => {
      const [fetchedStats, books] = await Promise.all([getStats(), getAllBooks()]);
      setStats(fetchedStats);
      setRecentBooks((Array.isArray(books) ? books : []).filter((b) => b.status === 'reading').slice(0, 3));
    });
  }, []);

  const earnedCount = getAllAwards().filter((a) => a.earned).length;
  const totalAwards = getAllAwards().length;

  const quickCards = [
    { title: 'My Reading Log', desc: 'Track your books', icon: '📚', link: '/my-books', color: 'bg-green-500' },
    { title: 'My Stats', desc: 'Reading progress & charts', icon: '📊', link: '/my-stats', color: 'bg-blue-500' },
    { title: 'My Stickers', desc: `${earnedCount}/${totalAwards} earned`, icon: '🏆', link: '/my-stickers', color: 'bg-yellow-500' },
    { title: 'Add a Book', desc: 'Search & add new books', icon: '➕', link: '/my-books/add', color: 'bg-teal-500' },
    { title: 'Leaderboard', desc: 'See top readers', icon: '🏅', link: '/leaderboard', color: 'bg-orange-500' },
    { title: 'Book Clubs', desc: 'Read with friends', icon: '👥', link: '/book-clubs', color: 'bg-indigo-500' },
  ];

  const toolCards = [
    { title: 'Browse Books', desc: 'Explore the library', icon: <FaBook size={28} />, link: '/books', color: 'bg-emerald-500' },
    { title: 'Games', desc: 'Fun learning games', icon: <FaGamepad size={28} />, link: '/games', color: 'bg-purple-500' },
    { title: 'Notes', desc: 'My reading notes', icon: <FaClipboardList size={28} />, link: '/notes', color: 'bg-orange-500' },
    { title: 'Timer', desc: 'Pomodoro reading timer', icon: <RxCountdownTimer size={28} />, link: '/timer', color: 'bg-indigo-500' },
    { title: 'Dictionary', desc: 'Look up words', icon: <FaBook size={28} />, link: '/dictionary', color: 'bg-cyan-600' },
    { title: 'Flash Cards', desc: 'Study vocabulary', icon: <FaClipboardList size={28} />, link: '/flashcard', color: 'bg-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, {user?.username || 'Student'}!
          </h1>
          <p className="text-gray-500 mt-0.5">Keep up the great reading!</p>
        </div>

        {/* Quick Stats Bar — shows skeleton while loading */}
        {isPending ? (
          <div className="flex gap-3 mb-6 animate-pulse">
            {[1,2,3,4].map((i) => <div key={i} className="bg-gray-200 rounded-xl h-16 w-36"></div>)}
          </div>
        ) : stats && (
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="bg-white rounded-xl shadow-sm px-5 py-3 flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <div>
                <p className="text-xl font-bold text-gray-800">{stats.totalBooks}</p>
                <p className="text-xs text-gray-500">books finished</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm px-5 py-3 flex items-center gap-3">
              <span className="text-2xl">📄</span>
              <div>
                <p className="text-xl font-bold text-gray-800">{stats.totalPages?.toLocaleString()}</p>
                <p className="text-xs text-gray-500">pages read</p>
              </div>
            </div>
            {stats.streak > 0 && (
              <div className="bg-orange-50 rounded-xl shadow-sm px-5 py-3 flex items-center gap-3">
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="text-xl font-bold text-orange-600">{stats.streak}</p>
                  <p className="text-xs text-orange-500">day streak</p>
                </div>
              </div>
            )}
            <div className="bg-white rounded-xl shadow-sm px-5 py-3 flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              <div>
                <p className="text-xl font-bold text-teal-600">{earnedCount}</p>
                <p className="text-xs text-gray-500">stickers</p>
              </div>
            </div>
          </div>
        )}

        {/* Currently Reading */}
        {recentBooks.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Currently Reading</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {recentBooks.map((book) => {
                const progress = book.pageCount > 0
                  ? Math.round(((book.currentPage || book.current_page || 0) / book.pageCount) * 100)
                  : 0;
                return (
                  <Link key={book.id} to={`/my-books/${book.id}`}>
                    <div className="bg-white rounded-xl shadow-sm p-4 flex gap-3 hover:shadow-md transition">
                      {(book.coverUrl || book.cover_url) && (
                        <img src={book.coverUrl || book.cover_url} alt={book.title} className="w-12 h-16 object-cover rounded" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{book.title}</p>
                        <p className="text-xs text-gray-400">{book.author}</p>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{progress}%</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Book Recommendations */}
        <BookRecommendations title="Recommended for You" />

        {/* Reading Log Quick Access */}
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Reading Log</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickCards.map((card) => (
            <Link key={card.title} to={card.link}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-5 text-center h-full">
                <span className="text-3xl">{card.icon}</span>
                <h3 className="text-sm font-semibold text-gray-800 mt-2">{card.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{card.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Tools */}
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Learning Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {toolCards.map((card) => (
            <Link key={card.title} to={card.link}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-5 flex items-start gap-3">
                <div className={`${card.color} text-white p-2.5 rounded-lg`}>
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">{card.title}</h3>
                  <p className="text-xs text-gray-500">{card.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
