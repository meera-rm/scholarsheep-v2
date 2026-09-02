import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  createPartnership, getMyPartners, getAllPartnerships, removePartnership,
  getPartnerChat, sendMessage, acceptPartnerInvite,
} from '../../services/bookClubService';
import { toast } from 'react-toastify';

const DISCUSSION_PROMPTS = [
  { category: 'Characters', prompts: [
    'Who is your favorite character and why?',
    'If you could be any character, who would you be?',
    'How did the main character change from the beginning to the end?',
    'Which character would you want as a friend?',
  ]},
  { category: 'Story', prompts: [
    'What was the most surprising part of the book?',
    'Can you retell the story in 3 sentences?',
    'What would you change about the ending?',
    'What do you think happens after the book ends?',
  ]},
  { category: 'Feelings', prompts: [
    'Which part made you laugh or smile?',
    'Was there a part that made you feel sad or worried?',
    'How did the book make you feel when you finished it?',
    'Did this book remind you of anything in your life?',
  ]},
  { category: 'Thinking', prompts: [
    'What lesson did you learn from this book?',
    'Would you recommend this book to a friend? Why?',
    'What new word did you learn from reading this?',
    'What questions do you still have about the story?',
  ]},
];

const ReadingPartners = () => {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher' || user?.role === 'admin';
  const [partners, setPartners] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Teacher form
  const [pairForm, setPairForm] = useState({ student1: '', student2: '', bookTitle: '' });

  // Student invite
  const [inviteCode, setInviteCode] = useState('');
  const [myBookTitle, setMyBookTitle] = useState('');

  useEffect(() => {
    if (isTeacher) {
      getAllPartnerships().then(setPartners);
    } else {
      getMyPartners(user?.username || '').then(setPartners);
    }
  }, [user, isTeacher]);

  const handleCreatePair = async (e) => {
    e.preventDefault();
    if (!pairForm.student1.trim() || !pairForm.student2.trim()) {
      toast.error('Enter both student names');
      return;
    }
    await createPartnership({
      student1: pairForm.student1.trim(),
      student2: pairForm.student2.trim(),
      bookTitle: pairForm.bookTitle.trim(),
      assignedBy: user?.username,
    });
    toast.success(`Paired ${pairForm.student1} with ${pairForm.student2}!`);
    setPairForm({ student1: '', student2: '', bookTitle: '' });
    refreshPartners();
  };

  const handleInvitePartner = async () => {
    const pair = await createPartnership({
      student1: user?.username || 'student',
      bookTitle: myBookTitle,
      assignedBy: 'student',
    });
    toast.success(`Invite code: ${pair.inviteCode} — share it with your friend!`);
    setMyBookTitle('');
    refreshPartners();
  };

  const handleAcceptInvite = async (e) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;
    const result = await acceptPartnerInvite(inviteCode.trim().toUpperCase(), user?.username || 'student');
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(`You're now reading partners with ${result.student1}!`);
      setInviteCode('');
      refreshPartners();
    }
  };

  const refreshPartners = async () => {
    if (isTeacher) {
      getAllPartnerships().then(setPartners);
    } else {
      getMyPartners(user?.username || '').then(setPartners);
    }
  };

  const handleRemovePair = async (id) => {
    if (!window.confirm('Remove this reading partnership?')) return;
    await removePartnership(id);
    refreshPartners();
    if (activeChat === id) setActiveChat(null);
    toast.info('Partnership removed');
  };

  const openChat = async (partnershipId) => {
    setActiveChat(partnershipId);
    const msgs = await getPartnerChat(partnershipId);
    setChatMessages(msgs);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;
    await sendMessage({
      partnershipId: activeChat,
      username: user?.username || 'student',
      message: newMessage.trim(),
    });
    const msgs = await getPartnerChat(activeChat);
    setChatMessages(msgs);
    setNewMessage('');
  };

  const getPartnerName = (pair) => {
    if (pair.student1 === user?.username) return pair.student2;
    return pair.student1;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Reading Partners</h1>
            <p className="text-gray-500 text-sm">
              {isTeacher ? 'Pair students to read together' : 'Chat with your reading buddy'}
            </p>
          </div>
          <Link to="/book-clubs" className="text-sm text-gray-500 hover:text-gray-700">
            ← Book Clubs
          </Link>
        </div>

        {/* Teacher: Create partnerships */}
        {isTeacher && (
          <form onSubmit={handleCreatePair} className="bg-white rounded-xl shadow-md p-5 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Pair Students</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                value={pairForm.student1}
                onChange={(e) => setPairForm({ ...pairForm, student1: e.target.value })}
                placeholder="Student 1 name"
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 outline-none"
              />
              <input
                value={pairForm.student2}
                onChange={(e) => setPairForm({ ...pairForm, student2: e.target.value })}
                placeholder="Student 2 name"
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 outline-none"
              />
              <input
                value={pairForm.bookTitle}
                onChange={(e) => setPairForm({ ...pairForm, bookTitle: e.target.value })}
                placeholder="Book to read (optional)"
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 outline-none"
              />
            </div>
            <button type="submit" className="mt-3 bg-teal-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition">
              Create Partnership
            </button>
          </form>
        )}

        {/* Student: Invite a partner or join */}
        {!isTeacher && (
          <div className="bg-white rounded-xl shadow-md p-5 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Invite a friend */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Invite a Reading Partner</h3>
                <p className="text-xs text-gray-400 mb-3">Create an invite code and share it with your friend</p>
                <input
                  value={myBookTitle}
                  onChange={(e) => setMyBookTitle(e.target.value)}
                  placeholder="Book to read together (optional)"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 outline-none mb-2"
                />
                <button
                  onClick={handleInvitePartner}
                  className="w-full bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition"
                >
                  Get Invite Code
                </button>
              </div>

              {/* Join with code */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Join a Partner</h3>
                <p className="text-xs text-gray-400 mb-3">Got an invite code from a friend? Enter it here</p>
                <form onSubmit={handleAcceptInvite}>
                  <input
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    placeholder="Enter invite code..."
                    maxLength={6}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 outline-none mb-2 uppercase"
                  />
                  <button type="submit" className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition">
                    Join Partner
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Show pending invites with codes */}
        {partners.filter((p) => p.status === 'pending' && p.student1 === user?.username).length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-yellow-800 text-sm mb-2">Your Invite Codes — Share with a friend!</h3>
            <p className="text-xs text-yellow-600 mb-3">Codes expire after 7 days. Your friend enters the code on their Reading Partners page.</p>
            {partners.filter((p) => p.status === 'pending' && p.student1 === user?.username).map((p) => {
              const daysLeft = p.expiresAt ? Math.max(0, Math.ceil((new Date(p.expiresAt) - new Date()) / 86400000)) : '?';
              return (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-yellow-100 last:border-0">
                <div>
                  <span className="text-sm text-yellow-700">
                    {p.bookTitle ? `Reading "${p.bookTitle}"` : 'Open invitation'}
                  </span>
                  <span className="text-xs text-yellow-500 ml-2">({daysLeft} days left)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-yellow-800 bg-yellow-100 px-3 py-1.5 rounded-lg text-lg tracking-widest border border-yellow-300">
                    {p.inviteCode}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(p.inviteCode);
                      toast.success('Invite code copied!');
                    }}
                    className="text-xs text-yellow-600 hover:text-yellow-800"
                  >
                    Copy
                  </button>
                </div>
              </div>
            );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Partner List */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">
              {isTeacher ? 'All Partnerships' : 'My Reading Partners'}
            </h3>
            {partners.length > 0 ? (
              <div className="space-y-3">
                {partners.map((pair) => (
                  <div
                    key={pair.id}
                    className={`bg-white rounded-xl shadow-sm p-4 cursor-pointer transition hover:shadow-md ${
                      activeChat === pair.id ? 'ring-2 ring-teal-400' : ''
                    }`}
                    onClick={() => openChat(pair.id)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(pair.student1)}`}
                        alt={pair.student1}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="text-gray-400 text-lg">🤝</span>
                      <img
                        src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(pair.student2)}`}
                        alt={pair.student2}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800">
                          {pair.student1} & {pair.student2}
                        </p>
                        {pair.bookTitle && (
                          <p className="text-xs text-teal-600">Reading: {pair.bookTitle}</p>
                        )}
                      </div>
                      {isTeacher && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleRemovePair(pair.id); }}
                          className="text-xs text-red-400 hover:text-red-600"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-400 bg-white rounded-xl shadow-sm">
                <p className="text-3xl mb-2">🤝</p>
                <p className="text-sm">
                  {isTeacher ? 'No partnerships created yet' : 'No reading partners assigned yet'}
                </p>
              </div>
            )}
          </div>

          {/* Chat */}
          <div>
            {activeChat ? (
              <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col" style={{ height: '450px' }}>
                {/* Chat Header */}
                {(() => {
                  const pair = partners.find((p) => p.id === activeChat);
                  return pair ? (
                    <div className="px-4 py-3 border-b border-gray-100 bg-teal-50">
                      <p className="font-semibold text-teal-800 text-sm">
                        {pair.student1} & {pair.student2}
                      </p>
                      {pair.bookTitle && <p className="text-xs text-teal-600">Discussing: {pair.bookTitle}</p>}
                    </div>
                  ) : null;
                })()}

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.length === 0 ? (
                    <div className="text-center text-gray-400 text-sm py-10">
                      <p className="text-2xl mb-2">💬</p>
                      <p>No messages yet. Start chatting about the book!</p>
                    </div>
                  ) : (
                    chatMessages.map((msg) => {
                      const isMe = msg.username === user?.username;
                      return (
                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[75%] px-3 py-2 rounded-xl text-sm ${
                            isMe
                              ? 'bg-teal-500 text-white rounded-br-sm'
                              : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                          }`}>
                            {!isMe && <p className="text-xs font-semibold text-teal-600 mb-0.5">{msg.username}</p>}
                            <p>{msg.message}</p>
                            <p className={`text-xs mt-1 ${isMe ? 'text-teal-100' : 'text-gray-400'}`}>
                              {new Date(msg.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Input */}
                <form onSubmit={handleSend} className="p-3 border-t border-gray-100 flex gap-2">
                  <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 outline-none"
                  />
                  <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition">
                    Send
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-400 text-sm" style={{ height: '450px' }}>
                <div className="text-center">
                  <p className="text-3xl mb-2">💬</p>
                  <p>Select a partnership to start chatting</p>
                </div>
              </div>
            )}

            {/* Discussion Prompts */}
            {activeChat && (
              <div className="bg-white rounded-xl shadow-sm p-5 mt-4">
                <h3 className="font-semibold text-gray-800 mb-3">Discussion Starters</h3>
                <p className="text-xs text-gray-400 mb-3">Tap a question to send it to your partner</p>
                <div className="space-y-3">
                  {DISCUSSION_PROMPTS.map((cat) => (
                    <div key={cat.category}>
                      <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-1.5">{cat.category}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.prompts.map((prompt) => (
                          <button
                            key={prompt}
                            onClick={() => {
                              sendMessage({
                                partnershipId: activeChat,
                                username: user?.username || 'student',
                                message: prompt,
                              }).then(() => getPartnerChat(activeChat).then(setChatMessages));
                            }}
                            className="text-xs bg-gray-50 text-gray-600 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 transition"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingPartners;
