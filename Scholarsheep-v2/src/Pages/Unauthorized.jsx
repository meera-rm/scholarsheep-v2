import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Unauthorized = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-red-400 mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Access Denied</h2>
        <p className="text-gray-500 mb-6">
          You don't have permission to view this page.
          {user && (
            <span> You are logged in as a <strong>{user.role}</strong>.</span>
          )}
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
          >
            Go Home
          </Link>
          <Link
            to="/login"
            className="px-6 py-2 border border-teal-500 text-teal-500 rounded-lg hover:bg-teal-50 transition"
          >
            Switch Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
