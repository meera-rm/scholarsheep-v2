import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentDailyLogTracker from './StudentDailyLogTracker';

const API = process.env.REACT_APP_API_URL;

const TeacherDetails = () => {
  const [teacher, setTeacher] = useState({});
  const [students, setStudents] = useState([]);
  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`${API}/api/teachers/${id}`)
      .then((response) => setTeacher(response.data.payload))
      .catch(() => navigate('/not-found'));

    axios
      .get(`${API}/api/students`)
      .then((response) => {
        const all = response.data.payload || [];
        setStudents(all.filter((s) => String(s.teachers_id) === String(id)));
      })
      .catch((e) => console.error(e));
  }, [id, navigate]);

  const handleDelete = (studentId) => {
    if (!window.confirm('Remove this student?')) return;
    axios
      .delete(`${API}/api/students/${studentId}`)
      .then(() => setStudents(students.filter((s) => s.student_id !== studentId)))
      .catch((e) => console.error(e));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">

        {/* Back */}
        <Link to="/teachers" className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">
          ← All Teachers
        </Link>

        {/* Teacher Profile Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row items-center gap-6 mb-6">
          <img
            src={teacher.teacher_avatar || `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(teacher.teacher_name || 'teacher')}`}
            alt={teacher.teacher_name}
            className="w-24 h-24 rounded-full object-cover border-4 border-teal-100"
          />
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-800">{teacher.teacher_name}</h1>
            <p className="text-teal-600 font-medium">{teacher.class_subject} · Grade {teacher.teaching_grade}</p>
            <p className="text-gray-500 text-sm mt-1">{teacher.school_name} · District {teacher.school_district}</p>
            <p className="text-gray-400 text-sm">{teacher.school_address}{teacher.state_name ? `, ${teacher.state_name}` : ''} {teacher.zipcode || ''}</p>
          </div>
          <div className="flex gap-3">
            <Link to={`/teachers/${id}/edit`} className="bg-teal-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-teal-600 transition">
              Edit
            </Link>
            <Link to="/students/new" className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-600 transition">
              + Add Student
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <p className="text-3xl font-bold text-teal-600">{students.length}</p>
            <p className="text-xs text-gray-500 mt-1">Students</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <p className="text-3xl font-bold text-blue-600">{teacher.teaching_grade || '—'}</p>
            <p className="text-xs text-gray-500 mt-1">Grade</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <p className="text-3xl font-bold text-purple-600">{teacher.class_subject || '—'}</p>
            <p className="text-xs text-gray-500 mt-1">Subject</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <p className="text-3xl font-bold text-orange-600">{teacher.school_district || '—'}</p>
            <p className="text-xs text-gray-500 mt-1">District</p>
          </div>
        </div>

        {/* Daily Reading Log Tracker */}
        <StudentDailyLogTracker students={students} />

        {/* Students Grid */}
        <h2 className="text-lg font-semibold text-gray-700 mb-3">My Students</h2>
        {students.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map((student) => (
              <div key={student.student_id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={student.student_avatar || student.student_image || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(student.student_name)}`}
                      alt={student.student_name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <Link to={`/students/${student.student_id}`} className="font-semibold text-gray-800 hover:text-teal-600 transition truncate block">
                        {student.student_name}
                      </Link>
                      <p className="text-xs text-gray-400">ID: {student.student_id}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-400">Grade</p>
                      <p className="font-semibold text-gray-700">{student.grade || '—'}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-400">Reading Level</p>
                      <p className="font-semibold text-gray-700">{student.reading_level || '—'}</p>
                    </div>
                  </div>

                  {student.parent_email && (
                    <p className="text-xs text-gray-400 mt-3 truncate">
                      Parent: {student.parent_email}
                    </p>
                  )}
                  {student.academic_year && (
                    <p className="text-xs text-gray-400">Year: {student.academic_year}</p>
                  )}
                </div>

                {/* Card Actions */}
                <div className="flex border-t border-gray-100">
                  <Link
                    to={`/students/${student.student_id}`}
                    className="flex-1 text-center py-2.5 text-sm text-teal-600 hover:bg-teal-50 transition font-medium"
                  >
                    View
                  </Link>
                  <Link
                    to={`/students/${student.student_id}/edit`}
                    className="flex-1 text-center py-2.5 text-sm text-indigo-600 hover:bg-indigo-50 transition font-medium border-l border-gray-100"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(student.student_id)}
                    className="flex-1 text-center py-2.5 text-sm text-red-500 hover:bg-red-50 transition font-medium border-l border-gray-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <p className="text-4xl mb-2">👩‍🏫</p>
            <p>No students assigned yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDetails;
