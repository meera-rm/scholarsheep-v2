import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getBookById, updateBook, removeBook, logSession,
  getSessionsForBook, checkAwards,
} from '../../services/readingLogService';
import ReadingSessionForm from '../../Components/readingLog/ReadingSessionForm';
import BookRating from '../../Components/readingLog/BookRating';
import StickerPopup from '../../Components/awards/StickerPopup';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import {
  notifyTeacherOfReading, notifyTeacherOfBookComplete, notifyTeacherOfAward,
  sendParentEmail,
} from '../../services/notificationService';

const placeholderCover = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" fill="%23e5e7eb"><rect width="200" height="300"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-size="18">No Cover</text></svg>'
);

const BookProgress = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [review, setReview] = useState('');
  const [newAward, setNewAward] = useState(null);

  useEffect(() => {
    const load = async () => {
      const b = await getBookById(id);
      if (!b) {
        navigate('/my-books');
        return;
      }
      setBook(b);
      setReview(b.review || '');
      const s = await getSessionsForBook(id);
      setSessions(s || []);
    };
    load();
  }, [id, navigate]);

  if (!book) return null;

  const progress = book.pageCount > 0
    ? Math.min(100, Math.round((book.currentPage / book.pageCount) * 100))
    : 0;

  const handleStatusChange = (status) => {
    const updated = updateBook(book.id, { status });
    setBook(updated);
    toast.success(`Status changed to "${status.replace('_', ' ')}"`);

    // Notify teacher when book is completed
    if (status === 'completed') {
      notifyTeacherOfBookComplete({
        studentName: user?.username || 'Student',
        bookTitle: book.title,
        rating: updated.rating,
      });
    }

    const awards = checkAwards();
    if (awards.length > 0) {
      setNewAward(awards[0]);
      notifyTeacherOfAward({
        studentName: user?.username || 'Student',
        awardName: awards[0].name,
        awardEmoji: awards[0].emoji,
      });
    }
  };

  const handlePageUpdate = (e) => {
    const page = Math.max(0, Math.min(parseInt(e.target.value) || 0, book.pageCount || 99999));
    const updated = updateBook(book.id, { currentPage: page });
    setBook(updated);
  };

  const handleRating = (rating) => {
    const updated = updateBook(book.id, { rating });
    setBook(updated);
    const awards = checkAwards();
    if (awards.length > 0) setNewAward(awards[0]);
  };

  const handleReviewSave = () => {
    const updated = updateBook(book.id, { review });
    setBook(updated);
    toast.success('Review saved!');
    const awards = checkAwards();
    if (awards.length > 0) setNewAward(awards[0]);
  };

  const handleLogSession = async (sessionData) => {
    logSession(sessionData);
    const updatedBook = await getBookById(id);
    setBook(updatedBook);
    const updatedSessions = await getSessionsForBook(id);
    setSessions(updatedSessions || []);
    setShowSessionForm(false);
    toast.success('Reading session logged!');

    // Notify teacher (in-app)
    notifyTeacherOfReading({
      studentName: user?.username || 'Student',
      bookTitle: book.title,
      pagesRead: sessionData.pagesRead,
      minutesSpent: sessionData.minutesSpent,
    });

    // Send parent email notification
    const emailResult = await sendParentEmail({
      childName: user?.username || 'Your child',
      bookTitle: book.title,
      pagesRead: sessionData.pagesRead,
      minutesSpent: sessionData.minutesSpent,
      notes: sessionData.notes,
    });
    if (emailResult.sent) {
      toast.info(emailResult.preview
        ? 'Parent email preview saved'
        : 'Parent notified by email!'
      );
    }

    // Check for new awards
    const awards = checkAwards();
    if (awards.length > 0) {
      setNewAward(awards[0]);
      // Notify teacher about award too
      notifyTeacherOfAward({
        studentName: user?.username || 'Student',
        awardName: awards[0].name,
        awardEmoji: awards[0].emoji,
      });
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Remove "${book.title}" from your reading log?`)) {
      removeBook(book.id);
      toast.info('Book removed');
      navigate('/my-books');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate('/my-books')}
          className="text-sm text-gray-500 hover:text-gray-700 mb-4 flex items-center gap-1"
        >
          ← Back to My Books
        </button>

        {/* Book Header */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row gap-6">
          <img
            src={book.coverUrl || placeholderCover}
            alt={book.title}
            className="w-32 h-48 object-cover rounded-lg shadow-md flex-shrink-0 mx-auto sm:mx-0"
            onError={(e) => { e.target.src = placeholderCover; }}
          />
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-800">{book.title}</h1>
            <p className="text-gray-500 mt-0.5">{book.author}</p>
            {book.genre && <p className="text-xs text-teal-600 bg-teal-50 inline-block px-2 py-0.5 rounded-full mt-2">{book.genre}</p>}
            {book.pageCount > 0 && <p className="text-sm text-gray-400 mt-1">{book.pageCount} pages</p>}

            {/* Status Selector */}
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                { value: 'want_to_read', label: 'Want to Read', color: 'bg-purple-100 text-purple-700 border-purple-300' },
                { value: 'reading', label: 'Reading Now', color: 'bg-blue-100 text-blue-700 border-blue-300' },
                { value: 'completed', label: 'Finished', color: 'bg-green-100 text-green-700 border-green-300' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleStatusChange(opt.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
                    book.status === opt.value
                      ? opt.color
                      : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Rating */}
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-1">Your Rating</p>
              <BookRating rating={book.rating || 0} onRate={handleRating} />
            </div>
          </div>
        </div>

        {/* Progress Section (for reading status) */}
        {book.status === 'reading' && (
          <div className="bg-white rounded-xl shadow-md p-6 mt-4">
            <h3 className="font-semibold text-gray-800 mb-3">Reading Progress</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Page {book.currentPage || 0} of {book.pageCount || '?'}</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <input
                  type="number"
                  value={book.currentPage || 0}
                  onChange={handlePageUpdate}
                  min="0"
                  max={book.pageCount || 99999}
                  className="w-20 px-2 py-1 border border-gray-200 rounded-lg text-sm text-center focus:ring-1 focus:ring-blue-400 outline-none"
                />
              </div>
            </div>

            {/* Log Session Button */}
            <div className="mt-4">
              {!showSessionForm ? (
                <button
                  onClick={() => setShowSessionForm(true)}
                  className="w-full bg-blue-50 text-blue-600 font-medium py-2 rounded-lg hover:bg-blue-100 transition"
                >
                  + Log Reading Session
                </button>
              ) : (
                <ReadingSessionForm
                  book={book}
                  onSubmit={handleLogSession}
                  onCancel={() => setShowSessionForm(false)}
                />
              )}
            </div>
          </div>
        )}

        {/* Review Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-4">
          <h3 className="font-semibold text-gray-800 mb-3">My Review</h3>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
            placeholder="Write your thoughts about this book..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 outline-none resize-none"
          />
          <button
            onClick={handleReviewSave}
            className="mt-2 bg-teal-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-teal-600 transition"
          >
            Save Review
          </button>
        </div>

        {/* Reading Sessions History */}
        {sessions.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6 mt-4">
            <h3 className="font-semibold text-gray-800 mb-3">Reading Sessions</h3>
            <div className="space-y-2">
              {sessions.sort((a, b) => b.sessionDate.localeCompare(a.sessionDate)).map((s) => (
                <div key={s.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm text-gray-700">
                      {new Date(s.sessionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    {s.notes && <p className="text-xs text-gray-400 mt-0.5">{s.notes}</p>}
                  </div>
                  <div className="text-right text-sm">
                    {s.pagesRead > 0 && <p className="text-blue-600">{s.pagesRead} pages</p>}
                    {s.minutesSpent > 0 && <p className="text-gray-400">{s.minutesSpent} min</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Delete */}
        <div className="mt-6 text-center">
          <button
            onClick={handleDelete}
            className="text-sm text-red-400 hover:text-red-600 transition"
          >
            Remove from my books
          </button>
        </div>
      </div>

      {newAward && (
        <StickerPopup award={newAward} onClose={() => setNewAward(null)} />
      )}
    </div>
  );
};

export default BookProgress;
