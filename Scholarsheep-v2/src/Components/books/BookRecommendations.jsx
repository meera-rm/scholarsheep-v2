import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPersonalRecommendations } from '../../services/recommendationService';
import { addBook } from '../../services/readingLogService';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const BookRecommendations = ({ title = 'Recommended for You' }) => {
  const [recommendations, setRecommendations] = useState([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const load = async () => {
      const data = await getPersonalRecommendations();
      setRecommendations(data || []);
    };
    load();
  }, []);

  const handleAdd = (book) => {
    if (!isAuthenticated) {
      toast.info('Login to add books!');
      return;
    }
    addBook({ ...book, status: 'want_to_read' });
    toast.success(`"${book.title}" added to your wishlist!`);
    setRecommendations((prev) => prev.filter((b) => b.isbn !== book.isbn));
  };

  if (recommendations.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">{title}</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {recommendations.map((book, i) => (
          <div
            key={book.isbn || i}
            className="flex-shrink-0 w-36 bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden group"
          >
            <div className="relative">
              <img
                src={book.coverUrl}
                alt={`Cover of ${book.title}`}
                className="w-full h-48 object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <button
                onClick={() => handleAdd(book)}
                className="absolute bottom-2 right-2 bg-teal-500 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition shadow"
              >
                + Add
              </button>
            </div>
            <div className="p-2">
              <p className="text-xs font-semibold text-gray-800 leading-tight line-clamp-2">{book.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookRecommendations;
