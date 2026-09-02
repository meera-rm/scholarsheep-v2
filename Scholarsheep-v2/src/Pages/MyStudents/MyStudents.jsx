import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyStudents } from '../../services/classService';

const MyStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyStudents()
      .then(setStudents)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Students</h1>

        {loading && <p className="text-gray-500">Loading...</p>}

        {!loading && students.length === 0 && (
          <p className="text-gray-500">No students enrolled in your class yet.</p>
        )}

        <div className="grid gap-3">
          {students.map((s) => (
            <Link
              key={s.student_id}
              to={`/my-students/${s.student_id}`}
              className="bg-white rounded-lg shadow p-4 flex items-center justify-between hover:shadow-md transition"
            >
              <div>
                <p className="font-semibold text-gray-800">{s.username}</p>
                <p className="text-sm text-gray-500">{s.class_name || 'No class name'}</p>
              </div>
              <span className="text-teal-600 text-sm font-medium">View reading sessions →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyStudents;
