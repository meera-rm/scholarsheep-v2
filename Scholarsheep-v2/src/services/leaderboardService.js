/**
 * Leaderboard Service — API-first with localStorage fallback
 */

import api from '../utils/axiosInstance';
import { isDemoMode } from './demoAuthService';
import * as local from './readingLogLocal';

const useApi = () => !isDemoMode();

export async function getLeaderboard(period = 'alltime', sortBy = 'books') {
  if (useApi()) {
    try {
      const res = await api.get(`/api/leaderboard?period=${period}&sort=${sortBy}`);
      return res.data.leaderboard || [];
    } catch { /* fall through */ }
  }
  return getLocalLeaderboard(period, sortBy);
}

export async function getClassLeaderboard(period = 'alltime', sortBy = 'books') {
  if (useApi()) {
    try {
      const res = await api.get(`/api/leaderboard/class?period=${period}&sort=${sortBy}`);
      return res.data.leaderboard || [];
    } catch { /* fall through */ }
  }
  return getLocalLeaderboard(period, sortBy);
}

// localStorage fallback with demo data
function getLocalLeaderboard(period, sortBy) {
  const books = local.getAllBooks();
  const sessions = local.getAllSessions();
  const completed = books.filter((b) => b.status === 'completed');

  const demoStudents = [
    { name: 'You', avatar: '', books: completed.length, pages: completed.reduce((s, b) => s + (b.pageCount || 0), 0), streak: 0 },
    { name: 'Celia Edward', avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Zoey', books: Math.max(0, completed.length + 3), pages: 450, streak: 12 },
    { name: 'Jade Duncan', avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Lucy', books: Math.max(0, completed.length + 1), pages: 320, streak: 7 },
    { name: 'Barry Lioudis', avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Zoe', books: Math.max(0, completed.length - 1), pages: 180, streak: 3 },
    { name: 'Emma Wilson', avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Emma', books: Math.max(0, completed.length - 2), pages: 120, streak: 5 },
    { name: 'Noah Garcia', avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Noah', books: Math.max(0, completed.length + 2), pages: 380, streak: 9 },
  ];

  const sorted = [...demoStudents].sort((a, b) => {
    if (sortBy === 'pages') return b.pages - a.pages;
    if (sortBy === 'streak') return b.streak - a.streak;
    return b.books - a.books;
  });

  return sorted.map((s, i) => ({ ...s, rank: i + 1 }));
}
