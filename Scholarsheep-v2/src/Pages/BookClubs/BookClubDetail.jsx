import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getClubById, getClubPosts, addPost, leaveClub } from '../../services/bookClubService';
import { toast } from 'react-toastify';

const BookClubDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [club, setClub] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const c = getClubById(id);
    if (!c) { navigate('/book-clubs'); return; }
    setClub(c);
    setPosts(getClubPosts(id));
  }, [id, navigate]);

  const handlePost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    addPost({ clubId: id, username: user?.username || 'student', content: newPost.trim() });
    setPosts(getClubPosts(id));
    setNewPost('');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(club.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLeave = () => {
    if (!window.confirm('Leave this book club?')) return;
    leaveClub(id, user?.username);
    toast.info('Left the club');
    navigate('/book-clubs');
  };

  if (!club) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        <Link to="/book-clubs" className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">
          ← All Book Clubs
        </Link>

        {/* Club Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-start gap-4">
            {club.bookCoverUrl ? (
              <img src={club.bookCoverUrl} alt="" className="w-20 h-28 object-cover rounded-lg shadow" />
            ) : (
              <div className="w-20 h-28 bg-teal-100 rounded-lg flex items-center justify-center text-3xl">📚</div>
            )}
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-800">{club.name}</h1>
              {club.bookTitle && <p className="text-teal-600 text-sm font-medium">Reading: {club.bookTitle}</p>}
              {club.description && <p className="text-gray-500 text-sm mt-1">{club.description}</p>}
              <p className="text-xs text-gray-400 mt-2">{club.members.length} members · Created by {club.createdBy}</p>
            </div>
          </div>

          {/* Invite Code */}
          <div className="mt-4 flex items-center gap-3 bg-indigo-50 rounded-lg p-3">
            <div className="flex-1">
              <p className="text-xs text-indigo-600 font-medium">Invite Code — share with friends!</p>
              <p className="text-2xl font-mono font-bold text-indigo-700 tracking-widest">{club.inviteCode}</p>
            </div>
            <button
              onClick={handleCopyCode}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-600 transition"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Members */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Members</h3>
          <div className="flex flex-wrap gap-3">
            {club.members.map((m) => (
              <div key={m.username} className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                <img
                  src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(m.username)}`}
                  alt={m.username}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm text-gray-700">{m.username}</span>
                {m.role === 'leader' && <span className="text-xs text-teal-500">Leader</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Discussion */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Discussion</h3>

          <form onSubmit={handlePost} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your thoughts..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 outline-none"
            />
            <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition">
              Post
            </button>
          </form>

          {posts.length > 0 ? (
            <div className="space-y-3">
              {posts.map((post) => (
                <div key={post.id} className="flex gap-3 py-2">
                  <img
                    src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(post.username)}`}
                    alt={post.username}
                    className="w-8 h-8 rounded-full flex-shrink-0 mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold text-gray-800">{post.username}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5">{post.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 text-sm py-6">No posts yet. Start the conversation!</p>
          )}
        </div>

        {/* Leave */}
        <div className="text-center">
          <button onClick={handleLeave} className="text-sm text-red-400 hover:text-red-600 transition">
            Leave this club
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookClubDetail;
