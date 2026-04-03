import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GiTeacher } from 'react-icons/gi';
import { FaChild, FaBook, FaComments, FaClipboardList } from 'react-icons/fa';
import { MdSubscriptions } from 'react-icons/md';
import TeacherActivityFeed from '../Components/notifications/TeacherActivityFeed';
import { getUnreadCount } from '../services/notificationService';
import { getAllClubs, getAllPartnerships } from '../services/bookClubService';
import { getLeaderboard } from '../services/leaderboardService';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const unread = getUnreadCount();
  const isAdmin = user?.role === 'admin';

  const [clubs, setClubs] = useState([]);
  const [partnerships, setPartnerships] = useState([]);
  const [topReaders, setTopReaders] = useState([]);

  useEffect(() => {
    getAllClubs().then(setClubs);
    getAllPartnerships().then(setPartnerships);
    getLeaderboard('alltime', 'books').then((d) => setTopReaders(d.slice(0, 5)));
  }, []);

  const activePartnerships = partnerships.filter((p) => p.status === 'active');
  const pendingPartnerships = partnerships.filter((p) => p.status === 'pending');

  const cards = [
    { title: 'Students', desc: isAdmin ? 'Manage all students' : 'View your students', icon: <FaChild size={32} />, link: '/students', color: 'bg-blue-500' },
    { title: 'Books', desc: 'Manage reading materials', icon: <FaBook size={32} />, link: '/books', color: 'bg-green-500' },
    { title: 'Comments', desc: 'View and add comments', icon: <FaComments size={32} />, link: '/comments', color: 'bg-purple-500' },
    { title: 'Notes', desc: 'Teaching notes', icon: <FaClipboardList size={32} />, link: '/notes', color: 'bg-orange-500' },
    ...(isAdmin ? [{ title: 'Teachers', desc: 'Manage all teachers', icon: <GiTeacher size={32} />, link: '/teachers', color: 'bg-teal-500' }] : []),
    { title: 'Subscriptions', desc: 'Manage subscriptions', icon: <MdSubscriptions size={32} />, link: '/subscriptions', color: 'bg-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{isAdmin ? 'Admin Dashboard' : 'Teacher Dashboard'}</h1>
            <p className="text-gray-500 mt-0.5">Welcome back, {user?.username || (isAdmin ? 'Admin' : 'Teacher')}!</p>
          </div>
          {unread > 0 && (
            <div className="bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-sm font-medium">
              {unread} new notification{unread > 1 ? 's' : ''}
            </div>
          )}
        </div>

        {/* Activity Feed */}
        <div className="mb-6">
          <TeacherActivityFeed />
        </div>

        {/* Community Overview — Book Clubs, Partnerships, Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

          {/* Book Clubs */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Book Clubs</h3>
              <Link to="/book-clubs" className="text-xs text-teal-600 hover:text-teal-700 font-medium">View All</Link>
            </div>
            {clubs.length > 0 ? (
              <div className="space-y-2">
                {clubs.slice(0, 4).map((club) => (
                  <Link key={club.id} to={`/book-clubs/${club.id}`}>
                    <div className="flex items-center gap-3 py-2 hover:bg-gray-50 rounded-lg px-2 transition">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-sm flex-shrink-0">📚</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{club.name}</p>
                        <p className="text-xs text-gray-400">{club.members.length} members{club.bookTitle ? ` · ${club.bookTitle}` : ''}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400">
                <p className="text-2xl mb-1">📚</p>
                <p className="text-xs">No book clubs yet</p>
              </div>
            )}
            <Link to="/book-clubs/create" className="block mt-3 text-center text-sm text-teal-600 bg-teal-50 py-2 rounded-lg hover:bg-teal-100 transition font-medium">
              + Create Club
            </Link>
          </div>

          {/* Reading Partners */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Reading Partners</h3>
              <Link to="/reading-partners" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">Manage</Link>
            </div>
            <div className="flex gap-4 mb-3">
              <div className="bg-green-50 rounded-lg px-3 py-2 flex-1 text-center">
                <p className="text-lg font-bold text-green-700">{activePartnerships.length}</p>
                <p className="text-xs text-green-600">Active</p>
              </div>
              <div className="bg-yellow-50 rounded-lg px-3 py-2 flex-1 text-center">
                <p className="text-lg font-bold text-yellow-700">{pendingPartnerships.length}</p>
                <p className="text-xs text-yellow-600">Pending</p>
              </div>
            </div>
            {activePartnerships.length > 0 ? (
              <div className="space-y-2">
                {activePartnerships.slice(0, 3).map((pair) => (
                  <div key={pair.id} className="flex items-center gap-2 py-1.5">
                    <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(pair.student1)}`} alt="" className="w-6 h-6 rounded-full" />
                    <span className="text-gray-400 text-xs">🤝</span>
                    <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(pair.student2)}`} alt="" className="w-6 h-6 rounded-full" />
                    <span className="text-xs text-gray-600 truncate flex-1">{pair.student1} & {pair.student2}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-400">
                <p className="text-2xl mb-1">🤝</p>
                <p className="text-xs">No partnerships yet</p>
              </div>
            )}
            <Link to="/reading-partners" className="block mt-3 text-center text-sm text-indigo-600 bg-indigo-50 py-2 rounded-lg hover:bg-indigo-100 transition font-medium">
              + Pair Students
            </Link>
          </div>

          {/* Top Readers Leaderboard */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Top Readers</h3>
              <Link to="/leaderboard" className="text-xs text-orange-600 hover:text-orange-700 font-medium">Full Board</Link>
            </div>
            {topReaders.length > 0 ? (
              <div className="space-y-2">
                {topReaders.map((student) => {
                  const medals = ['', '🥇', '🥈', '🥉'];
                  return (
                    <div key={student.rank} className="flex items-center gap-3 py-1.5">
                      <span className="w-6 text-center flex-shrink-0">
                        {student.rank <= 3 ? <span className="text-lg">{medals[student.rank]}</span> : <span className="text-xs text-gray-400">#{student.rank}</span>}
                      </span>
                      <img
                        src={student.avatar || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(student.name)}`}
                        alt="" className="w-7 h-7 rounded-full"
                      />
                      <span className="text-sm text-gray-700 flex-1 truncate">{student.name}</span>
                      <span className="text-sm font-bold text-teal-600">{student.books}</span>
                      <span className="text-xs text-gray-400">books</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400">
                <p className="text-2xl mb-1">🏅</p>
                <p className="text-xs">No reading data yet</p>
              </div>
            )}
            <Link to="/leaderboard" className="block mt-3 text-center text-sm text-orange-600 bg-orange-50 py-2 rounded-lg hover:bg-orange-100 transition font-medium">
              View Leaderboard
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <Link key={card.title} to={card.link}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-5 flex items-start gap-4">
                <div className={`${card.color} text-white p-3 rounded-lg`}>
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800">{card.title}</h3>
                  <p className="text-sm text-gray-500">{card.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
