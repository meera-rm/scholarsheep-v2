import React, { useState, useMemo } from 'react';
import BookCard from './BookCard';

const TABS = [
  { key: 'all', label: 'All Books', icon: '📚' },
  { key: 'reading', label: 'Reading Now', icon: '📖' },
  { key: 'completed', label: 'Finished', icon: '✓' },
  { key: 'want_to_read', label: 'Wishlist', icon: '♡' },
];

const ReadingLogList = ({ books }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const filtered = useMemo(() => {
    let list = activeTab === 'all' ? books : books.filter((b) => b.status === activeTab);

    switch (sortBy) {
      case 'title':
        list = [...list].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'author':
        list = [...list].sort((a, b) => (a.author || '').localeCompare(b.author || ''));
        break;
      case 'rating':
        list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'recent':
      default:
        list = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return list;
  }, [books, activeTab, sortBy]);

  const counts = useMemo(() => ({
    all: books.length,
    reading: books.filter((b) => b.status === 'reading').length,
    completed: books.filter((b) => b.status === 'completed').length,
    want_to_read: books.filter((b) => b.status === 'want_to_read').length,
  }), [books]);

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-teal-500 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
              activeTab === tab.key ? 'bg-teal-400 text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              {counts[tab.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">
          {filtered.length} {filtered.length === 1 ? 'book' : 'books'}
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-teal-400 outline-none bg-white"
        >
          <option value="recent">Most Recent</option>
          <option value="title">Title A-Z</option>
          <option value="author">Author A-Z</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Book Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">📚</p>
          <p className="text-lg font-medium">No books here yet</p>
          <p className="text-sm mt-1">Search for a book and add it to your list!</p>
        </div>
      )}
    </div>
  );
};

export default ReadingLogList;
