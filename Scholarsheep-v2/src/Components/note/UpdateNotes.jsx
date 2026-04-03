import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const API = process.env.REACT_APP_API_URL;

const UpdateNotes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/api/notes/${id}`)
      .then((res) => {
        const note = res.data.payload;
        setTitle(note.note_title || '');
        setContent(note.textnotes || '');
      })
      .catch(() => navigate('/notes'));
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error('Note content cannot be empty');
      return;
    }
    setSaving(true);
    try {
      await axios.put(`${API}/api/notes/${id}`, {
        note_title: title,
        textnotes: content.replace(/<[^>]*>/g, ''),
      });
      toast.success('Note updated!');
      navigate(`/notes/${id}`);
    } catch (error) {
      toast.error('Failed to update note');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to={`/notes/${id}`} className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to Note
          </Link>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="bg-teal-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-600 transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title..."
              className="w-full px-6 py-4 text-xl font-semibold text-gray-800 border-b border-gray-100 focus:outline-none placeholder-gray-300"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Edit your note..."
              rows={16}
              className="w-full px-6 py-4 text-gray-700 leading-relaxed focus:outline-none placeholder-gray-300 resize-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateNotes;
