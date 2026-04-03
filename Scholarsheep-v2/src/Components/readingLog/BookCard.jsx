import React from 'react';
import { Link } from 'react-router-dom';

const statusStyles = {
  reading: { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-600', label: 'Reading Now' },
  completed: { bg: 'bg-green-50 border-green-200', text: 'text-green-600', label: 'Finished' },
  want_to_read: { bg: 'bg-purple-50 border-purple-200', text: 'text-purple-600', label: 'Want to Read' },
  abandoned: { bg: 'bg-gray-50 border-gray-200', text: 'text-gray-500', label: 'Abandoned' },
};

const placeholderCover = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="192" fill="%23e5e7eb"><rect width="128" height="192"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-size="14">No Cover</text></svg>'
);

const BookCard = ({ book }) => {
  const style = statusStyles[book.status] || statusStyles.want_to_read;
  const progress = book.pageCount > 0
    ? Math.min(100, Math.round((book.currentPage / book.pageCount) * 100))
    : 0;

  return (
    <Link to={`/my-books/${book.id}`}>
      <div className={`rounded-xl border ${style.bg} p-4 hover:shadow-lg transition-all cursor-pointer h-full flex flex-col`}>
        <div className="flex gap-3">
          <img
            src={book.coverUrl || placeholderCover}
            alt={book.title}
            className="w-20 h-28 object-cover rounded-lg flex-shrink-0 shadow-sm"
            onError={(e) => { e.target.src = placeholderCover; }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2">
              {book.title}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{book.author}</p>

            <div className={`mt-2 inline-block px-2 py-0.5 rounded-full text-xs font-medium ${style.text} ${style.bg}`}>
              {style.label}
            </div>

            {book.rating && (
              <div className="mt-1 text-yellow-400 text-sm">
                {'★'.repeat(book.rating)}{'☆'.repeat(5 - book.rating)}
              </div>
            )}
          </div>
        </div>

        {/* Progress bar for books being read */}
        {book.status === 'reading' && book.pageCount > 0 && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>p.{book.currentPage || 0} of {book.pageCount}</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {book.status === 'completed' && (
          <div className="mt-3 text-xs text-green-600 flex items-center gap-1">
            <span>✓</span>
            <span>
              {book.endDate
                ? `Finished ${new Date(book.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                : 'Completed'}
            </span>
            {book.pageCount > 0 && <span>· {book.pageCount} pages</span>}
          </div>
        )}
      </div>
    </Link>
  );
};

export default BookCard;
