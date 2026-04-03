import React, { useState } from 'react';
import axios from 'axios';
import { useBookSearch } from '../../../hooks/useBookSearch';
import { addBook } from '../../../services/readingLogService';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';

const API = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL;

const READING_LEVELS = [
  'A','B','C','D','E','F','G','H','I','J','K','L','M',
  'N','O','P','Q','R','S','T','U','V','W','Y','Z','CR'
];

const GRADES = ['K','1','2','3','4','5','6','7','8'];

const placeholderCover = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="192" fill="%23e5e7eb"><rect width="128" height="192"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-size="14">No Cover</text></svg>'
);

const ApiBookSearch = () => {
  const [query, setQuery] = useState('');
  const { results, isSearching, error } = useBookSearch(query);
  const { isAuthenticated } = useAuth();

  // Track which book card is showing the "add to library" form
  const [addingIndex, setAddingIndex] = useState(null);
  const [addForm, setAddForm] = useState({ reading_level: '', grade: '' });
  const [saving, setSaving] = useState(false);

  // Add to personal reading log only (wishlist)
  const handleAddToLog = (book) => {
    if (!isAuthenticated) {
      toast.info('Login to add books to your reading log!');
      return;
    }
    addBook({ ...book, status: 'want_to_read' });
    toast.success(`"${book.title}" added to your wishlist!`);
  };

  // Add to the school books library (reading level + casual lists)
  const handleAddToLibrary = async (book) => {
    if (!addForm.reading_level) {
      toast.error('Please select a reading level');
      return;
    }
    setSaving(true);
    try {
      await axios.post(`${API}/api/books/new`, {
        book_title: book.title,
        book_author: book.author,
        isbn_number: book.isbn || '',
        publication: book.publishYear ? String(book.publishYear) : '',
        book_picture: book.coverUrl || '',
        grade: addForm.grade || '',
        reading_level: addForm.reading_level,
      });
      toast.success(`"${book.title}" added to the ${addForm.reading_level === 'CR' ? 'Casual Reading' : 'Reading Level ' + addForm.reading_level} list!`);
      setAddingIndex(null);
      setAddForm({ reading_level: '', grade: '' });
    } catch (err) {
      toast.error('Failed to add book to library');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Discover Books</h2>
        <p className="text-gray-500 text-sm mt-1">
          Search millions of books from the Open Library — add to your reading log or the school library
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author, or ISBN..."
            className="w-full px-5 py-3.5 pl-12 border-2 border-teal-200 rounded-2xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none text-lg bg-white shadow-sm"
          />
          <svg
            className="absolute left-4 top-4 h-5 w-5 text-teal-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {isSearching && (
            <div className="absolute right-4 top-4">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          )}
        </div>
      </div>

      {error && <p className="text-center text-red-500 text-sm mb-4">{error}</p>}

      {/* Results Grid */}
      {results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {results.map((book, i) => (
            <div
              key={`${book.isbn || book.title}-${i}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden"
            >
              <div className="relative group">
                <img
                  src={book.coverUrl || placeholderCover}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => { e.target.src = placeholderCover; }}
                />
                {/* Hover buttons */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button
                    onClick={() => handleAddToLog(book)}
                    className="flex-1 bg-teal-500 text-white text-xs py-1.5 rounded-md hover:bg-teal-600 transition"
                    title="Add to your personal reading log"
                  >
                    + My Books
                  </button>
                  <button
                    onClick={() => { setAddingIndex(addingIndex === i ? null : i); setAddForm({ reading_level: '', grade: '' }); }}
                    className="flex-1 bg-indigo-500 text-white text-xs py-1.5 rounded-md hover:bg-indigo-600 transition"
                    title="Add to school library (Reading Level / Casual)"
                  >
                    + Library
                  </button>
                </div>
              </div>

              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{book.author}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  {book.publishYear && (
                    <span className="text-xs text-gray-400">{book.publishYear}</span>
                  )}
                  {book.pageCount && (
                    <span className="text-xs text-gray-400">{book.pageCount}p</span>
                  )}
                </div>
              </div>

              {/* Add to Library Form (inline) */}
              {addingIndex === i && (
                <div className="p-3 border-t border-gray-100 bg-indigo-50">
                  <p className="text-xs font-medium text-indigo-700 mb-2">Add to School Library</p>
                  <div className="space-y-2">
                    <select
                      value={addForm.reading_level}
                      onChange={(e) => setAddForm({ ...addForm, reading_level: e.target.value })}
                      className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:ring-1 focus:ring-indigo-400 outline-none bg-white"
                    >
                      <option value="">-- Reading Level --</option>
                      <option value="CR">CR (Casual Reading)</option>
                      {READING_LEVELS.filter(l => l !== 'CR').map((level) => (
                        <option key={level} value={level}>Level {level}</option>
                      ))}
                    </select>
                    <select
                      value={addForm.grade}
                      onChange={(e) => setAddForm({ ...addForm, grade: e.target.value })}
                      className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:ring-1 focus:ring-indigo-400 outline-none bg-white"
                    >
                      <option value="">-- Grade (optional) --</option>
                      {GRADES.map((g) => (
                        <option key={g} value={g}>Grade {g}</option>
                      ))}
                    </select>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleAddToLibrary(book)}
                        disabled={saving}
                        className="flex-1 bg-indigo-500 text-white text-xs py-1.5 rounded-md hover:bg-indigo-600 transition disabled:opacity-50"
                      >
                        {saving ? 'Saving...' : 'Add to Library'}
                      </button>
                      <button
                        onClick={() => setAddingIndex(null)}
                        className="px-2 bg-gray-100 text-gray-600 text-xs py-1.5 rounded-md hover:bg-gray-200 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty state prompts */}
      {!query && (
        <div className="text-center py-8">
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['Harry Potter', 'Diary of a Wimpy Kid', 'Dog Man', 'Percy Jackson', 'Magic Tree House', 'Captain Underpants'].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="bg-teal-50 text-teal-700 text-sm px-4 py-2 rounded-full hover:bg-teal-100 transition"
              >
                {term}
              </button>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-3">Click a suggestion or type your own search</p>
        </div>
      )}

      {query.length >= 2 && !isSearching && results.length === 0 && !error && (
        <p className="text-center text-gray-400 py-8">No books found for "{query}". Try a different search.</p>
      )}
    </div>
  );
};

export default ApiBookSearch;
