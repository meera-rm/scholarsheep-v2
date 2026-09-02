import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { isDemoMode } from '../../services/demoAuthService';

const NewNotes = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error('Note content cannot be empty');
      return;
    }
    if (isDemoMode()) {
      toast.info('This feature is not available in demo mode.');
      return;
    }
    setSaving(true);
    try {
      await api.post(`/api/notes/new`, {
        note_title: title || 'Untitled',
        textnotes: content,
        users_id: user?.id || 1,
      });
      toast.success('Note saved!');
      navigate('/notes');
    } catch (error) {
      toast.error('Failed to save note');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/notes" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
            ← Back to Notes
          </Link>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="bg-teal-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-600 transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Note'}
          </button>
        </div>

        {/* Note Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            {/* Title */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title..."
              className="w-full px-6 py-4 text-xl font-semibold text-gray-800 border-b border-gray-100 focus:outline-none placeholder-gray-300"
            />
            {/* Content */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your note..."
              rows={16}
              className="w-full px-6 py-4 text-gray-700 leading-relaxed focus:outline-none placeholder-gray-300 resize-none"
            />
          </div>

          {/* Tips */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Reading thoughts</span>
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Book summaries</span>
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Vocabulary words</span>
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Study notes</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewNotes;
