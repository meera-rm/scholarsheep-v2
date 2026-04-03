import React, { useState } from 'react';

const ReadingSessionForm = ({ book, onSubmit, onCancel }) => {
  const [session, setSession] = useState({
    pagesRead: '',
    minutesSpent: '',
    notes: '',
    sessionDate: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSession((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!session.pagesRead && !session.minutesSpent) return;
    onSubmit({
      bookId: book.id,
      pagesRead: parseInt(session.pagesRead) || 0,
      minutesSpent: parseInt(session.minutesSpent) || 0,
      notes: session.notes,
      sessionDate: session.sessionDate,
    });
    setSession({ pagesRead: '', minutesSpent: '', notes: '', sessionDate: new Date().toISOString().split('T')[0] });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-blue-50 rounded-xl p-4 border border-blue-100">
      <h3 className="font-semibold text-blue-800 mb-3">Log Reading Session</h3>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Pages Read</label>
          <input
            type="number"
            name="pagesRead"
            value={session.pagesRead}
            onChange={handleChange}
            min="0"
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-400 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Minutes Spent</label>
          <input
            type="number"
            name="minutesSpent"
            value={session.minutesSpent}
            onChange={handleChange}
            min="0"
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-400 outline-none"
          />
        </div>
      </div>
      <div className="mt-3">
        <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
        <input
          type="date"
          name="sessionDate"
          value={session.sessionDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-400 outline-none"
        />
      </div>
      <div className="mt-3">
        <label className="block text-xs font-medium text-gray-600 mb-1">Notes (optional)</label>
        <textarea
          name="notes"
          value={session.notes}
          onChange={handleChange}
          rows={2}
          placeholder="What did you learn or enjoy today?"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-400 outline-none resize-none"
        />
      </div>
      <div className="flex gap-2 mt-3">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Log Session
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 bg-gray-100 text-gray-600 text-sm py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ReadingSessionForm;
