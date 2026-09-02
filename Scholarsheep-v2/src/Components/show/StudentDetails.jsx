import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/axiosInstance';
import { isDemoMode } from '../../services/demoAuthService';

const StudentDetails = () => {
  const [student, setStudent] = useState({});
  const [logData, setLogData] = useState([]);
  const [comments, setComments] = useState({});
  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    if (isDemoMode()) {
      setStudent({});
      setLogData([]);
      return;
    }

    api
      .get(`/api/students/${id}`)
      .then((response) => setStudent(response.data.payload))
      .catch(() => navigate('/not-found'));

    api
      .get(`/api/students/${id}/logs`)
      .then((response) => setLogData(response.data.payload || []))
      .catch(() => setLogData([]));
  }, [id, navigate]);

  // Fetch comments for each log
  useEffect(() => {
    if (isDemoMode()) {
      setComments({});
      return;
    }
    if (logData.length === 0) return;
    const fetchComments = async () => {
      const map = {};
      for (const log of logData) {
        try {
          const res = await api.get(`/api/comments/logs/${log.log_id}`);
          if (res.data.payload) {
            map[log.log_id] = res.data.payload.teacher_comments;
          }
        } catch {}
      }
      setComments(map);
    };
    fetchComments();
  }, [logData]);

  const handleDelete = () => {
    if (isDemoMode()) {
      alert('This feature is not available in demo mode.');
      return;
    }
    if (!window.confirm(`Delete student ${student.student_name}?`)) return;
    api
      .delete(`/api/students/${id}`)
      .then(() => navigate('/students'))
      .catch((e) => console.error(e));
  };

  const totalPages = logData.reduce((sum, l) => sum + (l.pages_read || 0), 0);
  const totalMinutes = logData.reduce((sum, l) => sum + (l.reading_minutes || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <Link to="/students" className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">
          ← All Students
        </Link>

        {/* Student Profile Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row items-center gap-6 mb-6">
          <img
            src={student.student_avatar || student.student_image || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(student.student_name || 'student')}`}
            alt={student.student_name}
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100"
          />
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-800">{student.student_name}</h1>
            <p className="text-indigo-600 font-medium">Grade {student.grade} · {student.academic_year}</p>
            {student.reading_level && (
              <p className="text-gray-500 text-sm mt-1">Reading Level: {student.reading_level}</p>
            )}
            {student.parent_email && (
              <p className="text-gray-400 text-sm">Parent: {student.parent_email}</p>
            )}
            {student.teachers_id && (
              <p className="text-gray-400 text-sm">Teacher ID: {student.teachers_id}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Link to={`/students/${id}/edit`} className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-600 transition">
              Edit
            </Link>
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition">
              Delete
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{logData.length}</p>
            <p className="text-xs text-gray-500">Reading Logs</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{totalPages}</p>
            <p className="text-xs text-gray-500">Total Pages</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{totalMinutes}</p>
            <p className="text-xs text-gray-500">Total Minutes</p>
          </div>
        </div>

        {/* Reading Log Timeline */}
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Reading Log</h2>
        {logData.length > 0 ? (
          <div className="space-y-4">
            {logData.map((log) => (
              <div key={log.log_id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-5">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                        📖
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{log.book_title}</h3>
                        <p className="text-xs text-gray-400">
                          {log.date_read ? new Date(log.date_read).toLocaleDateString('en-US', {
                            weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
                          }) : '—'}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-300">#{log.log_id}</span>
                  </div>

                  {/* Stats row */}
                  <div className="flex gap-4 mb-3">
                    <div className="bg-blue-50 rounded-lg px-3 py-1.5 text-center">
                      <p className="text-sm font-bold text-blue-700">{log.pages_read}</p>
                      <p className="text-xs text-blue-500">pages</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg px-3 py-1.5 text-center">
                      <p className="text-sm font-bold text-purple-700">{log.reading_minutes}</p>
                      <p className="text-xs text-purple-500">minutes</p>
                    </div>
                  </div>

                  {/* Reading inference */}
                  {log.reading_inference && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <p className="text-xs text-gray-400 mb-1">Student's Thoughts</p>
                      <p className="text-sm text-gray-700 italic">"{log.reading_inference}"</p>
                    </div>
                  )}

                  {/* Teacher comment */}
                  {comments[log.log_id] && (
                    <div className="bg-teal-50 rounded-lg p-3 border-l-4 border-teal-400">
                      <p className="text-xs text-teal-600 mb-1 font-medium">Teacher Comment</p>
                      <p className="text-sm text-teal-800">{comments[log.log_id]}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400 bg-white rounded-xl shadow-sm">
            <p className="text-4xl mb-2">📚</p>
            <p>No reading logs yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;
