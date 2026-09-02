import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookSearchBar from '../../Components/readingLog/BookSearchBar';
import { addBook, checkAwards } from '../../services/readingLogService';
import StickerPopup from '../../Components/awards/StickerPopup';
import { toast } from 'react-toastify';

const AddBook = () => {
  const navigate = useNavigate();
  const [newAward, setNewAward] = useState(null);
  const [showManual, setShowManual] = useState(false);
  const [manualBook, setManualBook] = useState({
    title: '',
    author: '',
    pageCount: '',
    genre: '',
    status: 'want_to_read',
  });

  const handleAddBook = async (book) => {
    const entry = await addBook(book);
    toast.success(`"${entry.title}" added to your books!`);

    // Check for new awards
    const awards = await checkAwards();
    if (awards.length > 0) {
      setNewAward(awards[0]);
    }
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (!manualBook.title.trim()) return;
    const entry = await addBook({
      ...manualBook,
      pageCount: parseInt(manualBook.pageCount) || 0,
    });
    toast.success(`"${entry.title}" added to your books!`);
    setManualBook({ title: '', author: '', pageCount: '', genre: '', status: 'want_to_read' });
    const awards = await checkAwards();
    if (awards.length > 0) setNewAward(awards[0]);
  };

  const handleManualChange = (e) => {
    setManualBook({ ...manualBook, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Add a Book</h1>
            <p className="text-gray-500 text-sm mt-0.5">
              Search the Open Library or add manually
            </p>
          </div>
          <button
            onClick={() => navigate('/my-books')}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <BookSearchBar onAddBook={handleAddBook} />

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-gray-200"></div>
          <button
            onClick={() => setShowManual(!showManual)}
            className="px-4 text-sm text-gray-400 hover:text-gray-600 transition"
          >
            {showManual ? 'Hide manual entry' : "Can't find it? Add manually"}
          </button>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Manual Entry Form */}
        {showManual && (
          <form onSubmit={handleManualSubmit} className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Add Book Manually</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={manualBook.title}
                  onChange={handleManualChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 outline-none"
                  placeholder="Book title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Author</label>
                <input
                  type="text"
                  name="author"
                  value={manualBook.author}
                  onChange={handleManualChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 outline-none"
                  placeholder="Author name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Pages</label>
                <input
                  type="number"
                  name="pageCount"
                  value={manualBook.pageCount}
                  onChange={handleManualChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 outline-none"
                  placeholder="Number of pages"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Genre</label>
                <select
                  name="genre"
                  value={manualBook.genre}
                  onChange={handleManualChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 outline-none bg-white"
                >
                  <option value="">Select genre</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Biography">Biography</option>
                  <option value="History">History</option>
                  <option value="Science">Science</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Comics">Comics</option>
                  <option value="Poetry">Poetry</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
              <div className="flex gap-3">
                {[
                  { value: 'want_to_read', label: 'Want to Read' },
                  { value: 'reading', label: 'Reading Now' },
                  { value: 'completed', label: 'Finished' },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value={opt.value}
                      checked={manualBook.status === opt.value}
                      onChange={handleManualChange}
                      className="text-teal-500 focus:ring-teal-400"
                    />
                    <span className="text-sm text-gray-600">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 bg-teal-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-600 transition"
            >
              Add Book
            </button>
          </form>
        )}
      </div>

      {/* Award Popup */}
      {newAward && (
        <StickerPopup award={newAward} onClose={() => setNewAward(null)} />
      )}
    </div>
  );
};

export default AddBook;
