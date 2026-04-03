import React, { useState, useActionState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleLoginButton from '../Components/auth/GoogleLoginButton';
import { toast } from 'react-toastify';
import { isDemoMode, getDemoAccounts } from '../services/demoAuthService';
import logoImage from '../Components/asset/ScholarSheep.png';

const ROLES = [
  { key: 'student', label: 'Student', icon: '📚' },
  { key: 'teacher', label: 'Teacher', icon: '🎓' },
  { key: 'parent', label: 'Parent', icon: '👨‍👩‍👧' },
];

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithCredentials, loginWithGoogle } = useAuth();
  const [selectedRole, setSelectedRole] = useState('student');
  const from = location.state?.from?.pathname || '/';

  const navigateByRole = (role) => {
    switch (role) {
      case 'admin': navigate('/teacher-dashboard'); break;
      case 'teacher': navigate('/teacher-dashboard'); break;
      case 'parent': navigate('/parent-dashboard'); break;
      default: navigate(from !== '/' ? from : '/student-dashboard');
    }
  };

  // React 19: useActionState replaces useState + handleSubmit + isSubmitting + error
  const [loginState, loginAction, isLoggingIn] = useActionState(
    async (prevState, formData) => {
      const username = formData.get('username');
      const password = formData.get('password');
      try {
        const userData = await loginWithCredentials(username, password);
        toast.success(`Welcome back, ${userData.username}!`);
        navigateByRole(userData.role);
        return { error: null };
      } catch (err) {
        return { error: err.response?.data?.message || err.message || 'Login failed' };
      }
    },
    { error: null }
  );

  const handleGoogleSuccess = async (credential) => {
    try {
      const userData = await loginWithGoogle(credential, selectedRole);
      toast.success(`Welcome, ${userData.username}!`);
      navigateByRole(userData.role);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Google login failed');
    }
  };

  // For demo account auto-fill we need controlled inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img className="h-16 w-20 rounded-lg" src={logoImage} alt="ScholarSheep" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Welcome Back</h1>
        <p className="text-center text-gray-500 mb-6">Sign in to ScholarSheep</p>

        {/* Role Selector */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-600 mb-2 text-center">I am a:</p>
          <div className="flex gap-2 justify-center">
            {ROLES.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => setSelectedRole(r.key)}
                className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedRole === r.key
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>{r.icon}</span>
                <span>{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Google Login */}
        <GoogleLoginButton
          onSuccess={handleGoogleSuccess}
          onError={(msg) => toast.error(msg)}
        />

        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-sm text-gray-400">or</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Error */}
        {loginState.error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
            {loginState.error}
          </div>
        )}

        {/* React 19: form action instead of onSubmit + e.preventDefault */}
        <form action={loginAction}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingIn ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-teal-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>

        {/* Demo Accounts */}
        {isDemoMode() && (
          <div className="mt-6 border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-400 text-center mb-3 uppercase tracking-wide">Demo Accounts (click to fill)</p>
            <div className="grid grid-cols-2 gap-2">
              {getDemoAccounts().map((acc) => (
                <button
                  key={acc.key}
                  type="button"
                  onClick={() => {
                    setUsername(acc.username);
                    setPassword(acc.password);
                    setSelectedRole(acc.role === 'admin' ? 'teacher' : acc.role);
                  }}
                  className="text-left bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-2 transition border border-gray-100"
                >
                  <p className="text-xs font-semibold text-gray-700 capitalize">{acc.role}</p>
                  <p className="text-xs text-gray-400">{acc.username}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
