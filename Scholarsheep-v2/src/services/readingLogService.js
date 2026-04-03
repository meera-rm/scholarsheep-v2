/**
 * Reading Log Service — API-first with localStorage fallback
 *
 * Tries the backend API first. If it fails (no connection, demo mode, etc.),
 * falls back to localStorage so the app always works.
 */

import api from '../utils/axiosInstance';
import { isDemoMode } from './demoAuthService';
import * as local from './readingLogLocal';

const useApi = () => !isDemoMode();

// ─── Reading Log CRUD ───

export async function getAllBooks() {
  if (useApi()) {
    try {
      const res = await api.get('/api/reading-log');
      const books = res.data.books || [];
      // Cache in localStorage
      localStorage.setItem('scholarsheep_reading_log', JSON.stringify(books));
      return books;
    } catch { /* fall through */ }
  }
  return local.getAllBooks();
}

export function getAllBooksSync() {
  return local.getAllBooks();
}

export async function getBooksByStatus(status) {
  const books = await getAllBooks();
  return books.filter((b) => b.status === status);
}

export async function getBookById(id) {
  if (useApi()) {
    try {
      const res = await api.get(`/api/reading-log/${id}`);
      return res.data.entry;
    } catch { /* fall through */ }
  }
  return local.getBookById(id);
}

export async function addBook(bookData) {
  if (useApi()) {
    try {
      const res = await api.post('/api/reading-log', {
        title: bookData.title,
        author: bookData.author,
        isbn: bookData.isbn,
        cover_url: bookData.coverUrl,
        page_count: bookData.pageCount,
        genre: bookData.genre,
        open_library_id: bookData.openLibraryKey,
        status: bookData.status || 'want_to_read',
      });
      return res.data.entry;
    } catch { /* fall through */ }
  }
  return local.addBook(bookData);
}

export async function updateBook(id, updates) {
  if (useApi()) {
    try {
      const res = await api.put(`/api/reading-log/${id}`, updates);
      return res.data.entry;
    } catch { /* fall through */ }
  }
  return local.updateBook(id, updates);
}

export async function removeBook(id) {
  if (useApi()) {
    try {
      await api.delete(`/api/reading-log/${id}`);
      return;
    } catch { /* fall through */ }
  }
  return local.removeBook(id);
}

// ─── Reading Sessions ───

export async function logSession(session) {
  if (useApi()) {
    try {
      const res = await api.post('/api/sessions', {
        book_id: session.bookId,
        reading_log_id: session.readingLogId,
        session_date: session.sessionDate,
        pages_read: session.pagesRead,
        minutes_spent: session.minutesSpent,
        notes: session.notes,
      });
      return res.data.session;
    } catch { /* fall through */ }
  }
  return local.logSession(session);
}

export async function getSessionsForBook(bookId) {
  if (useApi()) {
    try {
      const res = await api.get(`/api/sessions/book/${bookId}`);
      return res.data.sessions || [];
    } catch { /* fall through */ }
  }
  return local.getSessionsForBook(bookId);
}

export async function getAllSessions() {
  if (useApi()) {
    try {
      const res = await api.get('/api/sessions');
      return res.data.sessions || [];
    } catch { /* fall through */ }
  }
  return local.getAllSessions();
}

// ─── Statistics ───

export async function getStats() {
  if (useApi()) {
    try {
      const res = await api.get('/api/reading-log/stats');
      const stats = res.data.stats;
      const streakRes = await api.get('/api/sessions/streak');
      const streak = streakRes.data.streak;
      return {
        totalBooks: stats.total_books || 0,
        booksThisYear: stats.total_books || 0,
        booksThisMonth: 0,
        totalPages: stats.total_pages || 0,
        totalPagesThisYear: stats.total_pages || 0,
        totalMinutes: 0,
        avgRating: parseFloat(stats.avg_rating) || 0,
        streak: streak?.current_streak || 0,
        longestStreak: streak?.longest_streak || 0,
        favoriteGenre: 'N/A',
        genreBreakdown: [],
        booksPerMonth: [],
        currentlyReading: stats.currently_reading || 0,
        wantToRead: stats.want_to_read || 0,
      };
    } catch { /* fall through */ }
  }
  return local.getStats();
}

// ─── Heatmap ───

export async function getHeatmapData() {
  if (useApi()) {
    try {
      const res = await api.get('/api/sessions/heatmap');
      const heatmap = {};
      (res.data.heatmap || []).forEach((d) => {
        heatmap[d.session_date] = {
          pages: d.total_pages,
          minutes: d.total_minutes,
          count: d.session_count,
        };
      });
      return heatmap;
    } catch { /* fall through */ }
  }
  return local.getHeatmapData();
}

// ─── Awards ───

export async function checkAwards() {
  if (useApi()) {
    try {
      const res = await api.post('/api/awards/check');
      return res.data.newAwards || [];
    } catch { /* fall through */ }
  }
  return local.checkAwards();
}

export async function getAllAwards() {
  if (useApi()) {
    try {
      const allRes = await api.get('/api/awards');
      const earnedRes = await api.get('/api/awards/earned');
      const all = allRes.data.awards || [];
      const earned = earnedRes.data.earned || [];
      const earnedMap = {};
      earned.forEach((e) => { earnedMap[e.award_id] = e.earned_date; });
      return all.map((a) => ({
        ...a,
        earned: !!earnedMap[a.id],
        earnedDate: earnedMap[a.id] || null,
      }));
    } catch { /* fall through */ }
  }
  return local.getAllAwards();
}

export function getEarnedAwardCount() {
  // Sync version for quick counts — uses localStorage cache
  return local.getEarnedAwardCount();
}

// ─── Re-export sync versions for components that need them ───
// Some components call these synchronously (e.g., in useMemo, render).
// They use the localStorage cache which is kept in sync by the async functions above.

export const getAllBooksLocal = local.getAllBooks;
export const getStatsLocal = local.getStats;
export const getAllSessionsLocal = local.getAllSessions;
export const getAllAwardsLocal = local.getAllAwards;
