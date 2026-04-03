import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getToken, setToken, removeToken, decodeToken, isTokenExpired } from '../utils/tokenManager';
import api from '../utils/axiosInstance';
import { demoLogin, isDemoMode } from '../services/demoAuthService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from stored token on mount
  useEffect(() => {
    const token = getToken();
    if (token && !isTokenExpired(token)) {
      const decoded = decodeToken(token);
      setUser({
        id: decoded.id || decoded.user_id,
        username: decoded.username || decoded.user_name,
        email: decoded.email || decoded.user_email,
        role: decoded.role || decoded.user_role,
        avatar: decoded.avatar || decoded.user_avatar,
      });
    } else {
      removeToken();
    }
    setIsLoading(false);
  }, []);

  // Login with username + password
  const loginWithCredentials = async (username, password) => {
    // Try demo mode first
    if (isDemoMode()) {
      const demoResult = demoLogin(username, password);
      if (demoResult) {
        setToken(demoResult.accessToken);
        localStorage.setItem('refreshToken', demoResult.refreshToken);
        setUser(demoResult.user);
        return demoResult.user;
      }
    }

    // Fall back to real backend
    const response = await api.post('/api/users/login', { username, password });
    const { accessToken, refreshToken } = response.data;

    if (!accessToken) {
      throw new Error(response.data.message || 'Login failed');
    }

    setToken(accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    const decoded = decodeToken(accessToken);
    const userData = {
      id: decoded.id || decoded.user_id,
      username: decoded.username || decoded.user_name,
      email: decoded.email || decoded.user_email,
      role: decoded.role || decoded.user_role,
      avatar: decoded.avatar || decoded.user_avatar,
    };
    setUser(userData);
    return userData;
  };

  // Register new user
  const register = async ({ username, email, password, role, avatar }) => {
    // In demo mode, just create a demo token
    if (isDemoMode()) {
      const header = btoa(JSON.stringify({ alg: 'none', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({
        id: `new-${Date.now()}`,
        username,
        email,
        role,
        avatar: avatar || '',
        exp: Math.floor(Date.now() / 1000) + 86400 * 30,
      }));
      const token = `${header}.${payload}.demo`;
      setToken(token);
      const userData = { id: `new-${Date.now()}`, username, email, role, avatar: avatar || '' };
      setUser(userData);
      return userData;
    }

    const response = await api.post('/api/users', {
      username, email, password, userrole: role, useravatar: avatar || '',
    });
    const { accessToken, refreshToken } = response.data;

    if (!accessToken) {
      throw new Error(response.data.message || 'Registration failed');
    }

    setToken(accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    const decoded = decodeToken(accessToken);
    const userData = {
      id: decoded.id || decoded.user_id,
      username: decoded.username || decoded.user_name,
      email: decoded.email || decoded.user_email,
      role: decoded.role || decoded.user_role,
      avatar: decoded.avatar || decoded.user_avatar,
    };
    setUser(userData);
    return userData;
  };

  // Google OAuth login
  const loginWithGoogle = async (googleCredential, selectedRole) => {
    const response = await api.post('/api/users/google-login', {
      credential: googleCredential,
      role: selectedRole,
    });
    const { accessToken, refreshToken } = response.data;

    if (!accessToken) {
      throw new Error(response.data.message || 'Google login failed');
    }

    setToken(accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    const decoded = decodeToken(accessToken);
    const userData = {
      id: decoded.id || decoded.user_id,
      username: decoded.username || decoded.user_name,
      email: decoded.email || decoded.user_email,
      role: decoded.role || decoded.user_role,
      avatar: decoded.avatar || decoded.user_avatar,
    };
    setUser(userData);
    return userData;
  };

  const logout = useCallback(() => {
    removeToken();
    localStorage.removeItem('refreshToken');
    setUser(null);
  }, []);

  const isAuthenticated = !!user;

  const hasRole = useCallback(
    (roles) => {
      if (!user) return false;
      const userRole = user.role;
      // Admin has access to everything
      if (userRole === 'admin') return true;
      if (typeof roles === 'string') return userRole === roles;
      return roles.includes(userRole);
    },
    [user]
  );

  const value = {
    user,
    isLoading,
    isAuthenticated,
    loginWithCredentials,
    loginWithGoogle,
    register,
    logout,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
