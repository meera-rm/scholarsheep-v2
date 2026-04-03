import React, { useState } from 'react';
import { useBookSearch } from '../../hooks/useBookSearch';
import BookSearchResults from './BookSearchResults';

const BookSearchBar = ({ onAddBook }) => {
  const [query, setQuery] = useState('');
  const { results, isSearching, error } = useBookSearch(query);

  return (
    <div className="w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author, or ISBN..."
          className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none text-lg"
        />
        <svg
          className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {isSearching && (
          <div className="absolute right-3 top-3.5">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-red-500 text-sm">{error}</p>
      )}

      {results.length > 0 && (
        <BookSearchResults results={results} onAddBook={onAddBook} />
      )}

      {query.length >= 2 && !isSearching && results.length === 0 && !error && (
        <p className="mt-4 text-gray-400 text-center">No books found. Try a different search term.</p>
      )}
    </div>
  );
};

export default BookSearchBar;
