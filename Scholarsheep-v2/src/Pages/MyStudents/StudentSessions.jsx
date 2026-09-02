import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStudentSessions, getSessionComments, addSessionComment } from '../../services/classService';

const SessionRow = ({ session }) => {
  const [comments, setComments] = useState([]);
  const [draft, setDraft] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) getSessionComments(session.id).then(setComments);
  }, [open, session.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    const comment = await addSessionComment(session.id, draft.trim());
    setComments((prev) => [...prev, comment]);
    setDraft('');
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-gray-800">{session.session_date}</p>
          <p className="text-sm text-gray-500">
            {session.pages_read} pages · {session.minutes_spent} min
          </p>
          {session.notes && <p className="text-sm text-gray-600 mt-1">"{session.notes}"</p>}
        </div>
        <button
          className="text-sm text-teal-600 font-medium"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Hide comments' : 'Comments'}
        </button>
      </div>

      {open && (
        <div className="mt-3 border-t pt-3">
          {comments.map((c) => (
            <p key={c.id} className="text-sm text-gray-700 mb-1">
              <span className="font-medium">{c.teacher_name}:</span> {c.comment}
            </p>
          ))}
          <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
            <input
              className="border rounded px-2 py-1 text-sm flex-1"
              placeholder="Add a comment..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <button type="submit" className="bg-teal-500 text-white text-sm px-3 py-1 rounded">
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const StudentSessions = () => {
  const { studentId } = useParams();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getStudentSessions(studentId)
      .then(setSessions)
      .catch(() => setError('Could not load this student\'s sessions.'))
      .finally(() => setLoading(false));
  }, [studentId]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <Link to="/my-students" className="text-sm text-teal-600">← Back to My Students</Link>
        <h1 className="text-2xl font-bold text-gray-800 my-4">Reading Sessions</h1>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && sessions.length === 0 && (
          <p className="text-gray-500">No reading sessions logged yet.</p>
        )}

        <div className="grid gap-3">
          {sessions.map((s) => (
            <SessionRow key={s.id} session={s} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentSessions;
