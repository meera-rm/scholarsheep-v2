import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/axiosInstance';
import ReactHtmlParser from 'html-react-parser';
import DOMPurify from 'dompurify';

const ShowNotes = () => {
  const [note, setNote] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    api.get(`/api/notes/${id}`)
      .then((response) => setNote(response.data.payload))
      .catch(() => navigate('/not-found'));
  }, [id, navigate]);

  const handleDelete = () => {
    if (!window.confirm('Delete this note?')) return;
    api
      .delete(`/api/notes/${id}`)
      .then(() => navigate('/notes'))
      .catch((e) => console.error(e));
  };

  if (!note) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/notes" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to Notes
          </Link>
          <div className="flex gap-2">
            <Link
              to={`/notes/${id}/edit`}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-600 transition"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Note Card */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-800">
              {note.note_title || 'Untitled'}
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {formatDate(note.created_at)}
            </p>
          </div>
          <div className="px-6 py-6 prose prose-sm max-w-none text-gray-700 leading-relaxed min-h-[200px]">
            {note.textnotes
              ? ReactHtmlParser(DOMPurify.sanitize(note.textnotes))
              : <p className="text-gray-400 italic">No content</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowNotes;
