import React, { useState } from 'react';

const STATUS_OPTIONS = [
  { value: 'want_to_read', label: 'Want to Read', icon: '♡' },
  { value: 'reading', label: 'Reading Now', icon: '📖' },
  { value: 'completed', label: 'Finished', icon: '✓' },
];

const BookSearchResults = ({ results, onAddBook }) => {
  const [addingId, setAddingId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('want_to_read');

  const handleAdd = (book) => {
    onAddBook({ ...book, status: selectedStatus });
    setAddingId(null);
  };

  const placeholderCover = 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="192" fill="%23e5e7eb"><rect width="128" height="192"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-size="14">No Cover</text></svg>'
  );

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((book, i) => (
        <div
          key={`${book.isbn || book.title}-${i}`}
          className="bg-white rounded-xl shadow-md p-4 flex gap-3 hover:shadow-lg transition-shadow"
        >
          <img
            src={book.coverUrl || placeholderCover}
            alt={book.title}
            className="w-20 h-28 object-cover rounded-lg flex-shrink-0"
            onError={(e) => { e.target.src = placeholderCover; }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 text-sm leading-tight truncate">
              {book.title}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{book.author}</p>
            {book.publishYear && (
              <p className="text-xs text-gray-400">{book.publishYear}</p>
            )}
            {book.pageCount && (
              <p className="text-xs text-gray-400">{book.pageCount} pages</p>
            )}

            {addingId === i ? (
              <div className="mt-2 space-y-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full text-xs border rounded-lg px-2 py-1 focus:ring-1 focus:ring-teal-400 outline-none"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.icon} {opt.label}
                    </option>
                  ))}
                </select>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleAdd(book)}
                    className="flex-1 bg-teal-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-teal-600 transition"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setAddingId(null)}
                    className="flex-1 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-lg hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setAddingId(i)}
                className="mt-2 w-full bg-teal-50 text-teal-600 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-teal-100 transition"
              >
                + Add to My Books
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookSearchResults;
