import React from 'react';
import { Link } from 'react-router-dom';

const colors = [
  'bg-yellow-50 border-yellow-200',
  'bg-blue-50 border-blue-200',
  'bg-green-50 border-green-200',
  'bg-pink-50 border-pink-200',
  'bg-purple-50 border-purple-200',
  'bg-orange-50 border-orange-200',
];

const ListNotes = ({ note }) => {
  if (!note || note.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-2">📝</p>
        <p>No notes yet</p>
      </div>
    );
  }

  const truncate = (text, len = 100) => {
    if (!text) return '';
    const clean = text.replace(/<[^>]*>/g, '');
    return clean.length > len ? clean.substring(0, len) + '...' : clean;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {note.map((ele, i) => (
        <Link key={ele.note_id} to={`/notes/${ele.note_id}`}>
          <div className={`rounded-xl border-2 p-4 h-full hover:shadow-lg transition-all ${colors[i % colors.length]}`}>
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-800 text-sm">{ele.note_title || 'Untitled'}</h3>
              <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                {ele.created_at ? ele.created_at.split('T')[0] : ''}
              </span>
            </div>
            <p className="text-sm text-gray-600">{truncate(ele.textnotes)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListNotes;
