import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllSessions, getAllBooks } from '../../services/readingLogService';

const RecentActivity = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const load = async () => {
      const allSessions = await getAllSessions() || [];
      const allBooks = await getAllBooks() || [];
      const bookMap = {};
      allBooks.forEach((b) => { bookMap[b.id] = b; });

      const withBooks = allSessions
        .map((s) => ({
          ...s,
          bookTitle: s.bookTitle || bookMap[s.bookId]?.title || 'Unknown Book',
          bookAuthor: s.bookAuthor || bookMap[s.bookId]?.author || '',
          bookCoverUrl: s.bookCoverUrl || bookMap[s.bookId]?.coverUrl || '',
        }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10);

      setSessions(withBooks);
    };
    load();
  }, []);

  if (sessions.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-6">
      <h3 className="font-semibold text-gray-800 mb-3">Recent Reading Activity</h3>
      <div className="space-y-1">
        {sessions.map((s) => (
          <Link
            key={s.id}
            to={`/my-books/${s.bookId}`}
            className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-gray-50 transition"
          >
            {s.bookCoverUrl ? (
              <img src={s.bookCoverUrl} alt={s.bookTitle} className="w-10 h-14 object-cover rounded flex-shrink-0" />
            ) : (
              <div className="w-10 h-14 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 text-lg">📖</div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{s.bookTitle}</p>
              <p className="text-xs text-gray-400">
                {s.bookAuthor && `${s.bookAuthor} · `}
                {new Date(s.sessionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
              {s.notes && <p className="text-xs text-gray-400 mt-0.5 truncate italic">"{s.notes}"</p>}
            </div>
            <div className="text-right flex-shrink-0">
              {s.pagesRead > 0 && <p className="text-sm font-medium text-blue-600">{s.pagesRead} pages</p>}
              {s.minutesSpent > 0 && <p className="text-xs text-gray-400">{s.minutesSpent} min</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
