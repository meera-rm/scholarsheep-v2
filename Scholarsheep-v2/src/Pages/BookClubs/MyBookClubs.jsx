import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAllClubs, joinClub } from '../../services/bookClubService';
import { toast } from 'react-toastify';

const MyBookClubs = () => {
  const { user } = useAuth();
  const [clubs, setClubs] = useState([]);
  const [inviteCode, setInviteCode] = useState('');

  useEffect(() => {
    getAllClubs().then(setClubs);
  }, []);

  const handleJoin = (e) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;
    const result = joinClub(inviteCode.trim().toUpperCase(), user?.username || 'student');
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(`Joined "${result.name}"!`);
      getAllClubs().then(setClubs);
      setInviteCode('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Book Clubs</h1>
            <p className="text-gray-500 text-sm">Read together, discuss together</p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/reading-partners"
              className="bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-600 transition shadow-md"
            >
              Reading Partners
            </Link>
            <Link
              to="/book-clubs/create"
              className="bg-teal-500 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-teal-600 transition shadow-md"
            >
              + Create Club
            </Link>
          </div>
        </div>

        {/* Join with invite code */}
        <form onSubmit={handleJoin} className="bg-white rounded-xl shadow-sm p-4 mb-6 flex gap-3">
          <input
            type="text"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            placeholder="Enter invite code..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 outline-none"
            maxLength={6}
          />
          <button type="submit" className="bg-indigo-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition">
            Join
          </button>
        </form>

        {/* Club List */}
        {clubs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {clubs.map((club) => (
              <Link key={club.id} to={`/book-clubs/${club.id}`}>
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5">
                  <div className="flex items-start gap-3">
                    {club.bookCoverUrl ? (
                      <img src={club.bookCoverUrl} alt="" className="w-12 h-16 object-cover rounded" />
                    ) : (
                      <div className="w-12 h-16 bg-teal-100 rounded flex items-center justify-center text-xl">📚</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">{club.name}</h3>
                      {club.bookTitle && <p className="text-xs text-teal-600">Reading: {club.bookTitle}</p>}
                      <p className="text-xs text-gray-400 mt-1">{club.members.length} member{club.members.length !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  {club.description && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{club.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-5xl mb-3">📖</p>
            <p className="text-lg font-medium">No book clubs yet</p>
            <p className="text-sm mt-1">Create one or join with an invite code!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookClubs;
