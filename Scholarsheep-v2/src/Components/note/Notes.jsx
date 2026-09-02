import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/axiosInstance';
import DOMPurify from 'dompurify';
import { isDemoMode } from '../../services/demoAuthService';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isDemoMode()) {
      setNotes([]);
      return;
    }
    api.get(`/api/notes`)
      .then((response) => setNotes(response.data.payload || []))
      .catch((e) => console.log('catch', e));
  }, []);

  const filtered = searchTerm
    ? notes.filter((n) =>
        (n.note_title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (n.textnotes || '').toLowerCase().includes(searchTerm.toLowerCase())
      )
    : notes;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  };

  const truncate = (text, len = 120) => {
    if (!text) return '';
    const clean = text.replace(/<[^>]*>/g, '');
    return clean.length > len ? clean.substring(0, len) + '...' : clean;
  };

  const colors = [
    'bg-yellow-50 border-yellow-200',
    'bg-blue-50 border-blue-200',
    'bg-green-50 border-green-200',
    'bg-pink-50 border-pink-200',
    'bg-purple-50 border-purple-200',
    'bg-orange-50 border-orange-200',
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Notes</h1>
            <p className="text-gray-500 text-sm mt-0.5">{notes.length} note{notes.length !== 1 ? 's' : ''}</p>
          </div>
          <Link
            to="/notes/new"
            className="inline-flex items-center gap-2 bg-teal-500 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-teal-600 transition shadow-md"
          >
            <span className="text-xl">+</span>
            <span>New Note</span>
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search notes..."
            className="w-full px-4 py-3 pl-10 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none shadow-sm"
          />
          <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Notes Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((note, i) => (
              <Link key={note.note_id} to={`/notes/${note.note_id}`}>
                <div className={`rounded-xl border-2 p-5 h-full hover:shadow-lg transition-all cursor-pointer ${colors[i % colors.length]}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800 text-sm leading-tight flex-1">
                      {note.note_title || 'Untitled'}
                    </h3>
                    <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                      {formatDate(note.created_at)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {truncate(note.textnotes)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-5xl mb-3">📝</p>
            <p className="text-lg font-medium">
              {searchTerm ? 'No notes match your search' : 'No notes yet'}
            </p>
            <p className="text-sm mt-1">
              {!searchTerm && 'Click "+ New Note" to get started'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
