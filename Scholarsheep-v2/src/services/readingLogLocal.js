/**
 * Reading Log Service
 *
 * This service manages reading log data. Currently uses localStorage as the data layer
 * so the app works without a backend. When the backend endpoints are ready,
 * swap localStorage calls with api.get/post/put/delete calls.
 */

const STORAGE_KEY = 'scholarsheep_reading_log';
const SESSIONS_KEY = 'scholarsheep_reading_sessions';
const AWARDS_KEY = 'scholarsheep_student_awards';

// ─── Helpers ───

function getLog() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveLog(log) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
}

function getSessions() {
  const data = localStorage.getItem(SESSIONS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveSessions(sessions) {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

function getSchoolYear() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed
  if (month >= 7) return `${year}-${year + 1}`;
  return `${year - 1}-${year}`;
}

// ─── Reading Log CRUD ───

export function getAllBooks() {
  return getLog();
}

export function getBooksByStatus(status) {
  return getLog().filter((b) => b.status === status);
}

export function getBookById(id) {
  return getLog().find((b) => b.id === id) || null;
}

export function addBook(bookData) {
  const log = getLog();
  const newEntry = {
    id: Date.now().toString(),
    title: bookData.title,
    author: bookData.author,
    isbn: bookData.isbn || null,
    coverUrl: bookData.coverUrl || null,
    pageCount: bookData.pageCount || 0,
    genre: bookData.genre || null,
    openLibraryKey: bookData.openLibraryKey || null,
    status: bookData.status || 'want_to_read',
    currentPage: 0,
    startDate: bookData.status === 'reading' ? new Date().toISOString().split('T')[0] : null,
    endDate: null,
    rating: null,
    review: '',
    schoolYear: getSchoolYear(),
    createdAt: new Date().toISOString(),
  };
  log.push(newEntry);
  saveLog(log);
  checkAwards();
  return newEntry;
}

export function updateBook(id, updates) {
  const log = getLog();
  const idx = log.findIndex((b) => b.id === id);
  if (idx === -1) return null;

  // Auto-set dates on status change
  if (updates.status === 'reading' && !log[idx].startDate) {
    updates.startDate = new Date().toISOString().split('T')[0];
  }
  if (updates.status === 'completed' && !log[idx].endDate) {
    updates.endDate = new Date().toISOString().split('T')[0];
    updates.currentPage = log[idx].pageCount || updates.currentPage;
  }

  log[idx] = { ...log[idx], ...updates };
  saveLog(log);
  checkAwards();
  return log[idx];
}

export function removeBook(id) {
  const log = getLog().filter((b) => b.id !== id);
  saveLog(log);
}

// ─── Reading Sessions ───

export function logSession(session) {
  const sessions = getSessions();
  // Look up the book name to store with the session
  const book = session.bookId ? getBookById(session.bookId) : null;
  const newSession = {
    id: Date.now().toString(),
    bookId: session.bookId,
    bookTitle: book?.title || session.bookTitle || '',
    bookAuthor: book?.author || session.bookAuthor || '',
    bookCoverUrl: book?.coverUrl || session.bookCoverUrl || '',
    sessionDate: session.sessionDate || new Date().toISOString().split('T')[0],
    pagesRead: session.pagesRead || 0,
    minutesSpent: session.minutesSpent || 0,
    notes: session.notes || '',
    createdAt: new Date().toISOString(),
  };
  sessions.push(newSession);
  saveSessions(sessions);

  // Update current page on the book
  if (session.bookId && session.pagesRead) {
    const book = getBookById(session.bookId);
    if (book) {
      const newPage = (book.currentPage || 0) + session.pagesRead;
      updateBook(session.bookId, { currentPage: newPage });
    }
  }

  checkAwards();
  return newSession;
}

export function getSessionsForBook(bookId) {
  return getSessions().filter((s) => s.bookId === bookId);
}

export function getAllSessions() {
  return getSessions();
}

// ─── Statistics ───

export function getStats() {
  const log = getLog();
  const sessions = getSessions();
  const completed = log.filter((b) => b.status === 'completed');
  const currentYear = getSchoolYear();
  const completedThisYear = completed.filter((b) => b.schoolYear === currentYear);

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisMonthYear = now.getFullYear();
  const completedThisMonth = completed.filter((b) => {
    if (!b.endDate) return false;
    const d = new Date(b.endDate);
    return d.getMonth() === thisMonth && d.getFullYear() === thisMonthYear;
  });

  const totalPages = completed.reduce((sum, b) => sum + (b.pageCount || 0), 0);
  const totalPagesThisYear = completedThisYear.reduce((sum, b) => sum + (b.pageCount || 0), 0);

  const totalMinutes = sessions.reduce((sum, s) => sum + (s.minutesSpent || 0), 0);

  const ratings = completed.filter((b) => b.rating).map((b) => b.rating);
  const avgRating = ratings.length > 0 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 0;

  // Genre breakdown
  const genreCounts = {};
  completed.forEach((b) => {
    const g = b.genre || 'Other';
    genreCounts[g] = (genreCounts[g] || 0) + 1;
  });
  const genreBreakdown = Object.entries(genreCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Books per month (last 12 months)
  const booksPerMonth = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = d.toLocaleString('default', { month: 'short' });
    const count = completed.filter((b) => {
      if (!b.endDate) return false;
      const ed = new Date(b.endDate);
      return ed.getMonth() === d.getMonth() && ed.getFullYear() === d.getFullYear();
    }).length;
    booksPerMonth.push({ month, count });
  }

  // Reading streak
  const streak = calculateStreak(sessions);

  return {
    totalBooks: completed.length,
    booksThisYear: completedThisYear.length,
    booksThisMonth: completedThisMonth.length,
    totalPages,
    totalPagesThisYear,
    totalMinutes,
    avgRating: parseFloat(avgRating),
    streak: streak.current,
    longestStreak: streak.longest,
    favoriteGenre: genreBreakdown[0]?.name || 'N/A',
    genreBreakdown,
    booksPerMonth,
    currentlyReading: log.filter((b) => b.status === 'reading').length,
    wantToRead: log.filter((b) => b.status === 'want_to_read').length,
  };
}

function calculateStreak(sessions) {
  if (sessions.length === 0) return { current: 0, longest: 0 };

  const uniqueDays = [...new Set(sessions.map((s) => s.sessionDate))].sort().reverse();
  if (uniqueDays.length === 0) return { current: 0, longest: 0 };

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  // Current streak
  let current = 0;
  if (uniqueDays[0] === today || uniqueDays[0] === yesterday) {
    current = 1;
    for (let i = 1; i < uniqueDays.length; i++) {
      const prev = new Date(uniqueDays[i - 1]);
      const curr = new Date(uniqueDays[i]);
      const diff = (prev - curr) / 86400000;
      if (diff === 1) {
        current++;
      } else {
        break;
      }
    }
  }

  // Longest streak
  let longest = 1;
  let tempStreak = 1;
  const sorted = [...uniqueDays].sort();
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diff = (curr - prev) / 86400000;
    if (diff === 1) {
      tempStreak++;
      longest = Math.max(longest, tempStreak);
    } else {
      tempStreak = 1;
    }
  }

  return { current, longest: Math.max(longest, current) };
}

// ─── Heatmap Data ───

export function getHeatmapData() {
  const sessions = getSessions();
  const heatmap = {};
  sessions.forEach((s) => {
    const date = s.sessionDate;
    if (!heatmap[date]) {
      heatmap[date] = { pages: 0, minutes: 0, count: 0 };
    }
    heatmap[date].pages += s.pagesRead || 0;
    heatmap[date].minutes += s.minutesSpent || 0;
    heatmap[date].count += 1;
  });
  return heatmap;
}

// ─── Awards ───

const DEFAULT_AWARDS = [
  { id: 'a1', name: 'First Book', emoji: '📖', category: 'volume', criteria: 'books', value: 1, tier: 'bronze' },
  { id: 'a2', name: 'Bookworm', emoji: '🐛', category: 'volume', criteria: 'books', value: 5, tier: 'silver' },
  { id: 'a3', name: 'Book Explorer', emoji: '🗺️', category: 'volume', criteria: 'books', value: 10, tier: 'gold' },
  { id: 'a4', name: 'Reading Machine', emoji: '🤖', category: 'volume', criteria: 'books', value: 25, tier: 'platinum' },
  { id: 'a5', name: 'Library Legend', emoji: '👑', category: 'volume', criteria: 'books', value: 50, tier: 'diamond' },
  { id: 'a6', name: 'Century Reader', emoji: '💯', category: 'volume', criteria: 'books', value: 100, tier: 'diamond' },
  { id: 'a7', name: 'Getting Started', emoji: '🔥', category: 'streak', criteria: 'streak', value: 3, tier: 'bronze' },
  { id: 'a8', name: 'On Fire', emoji: '🔥', category: 'streak', criteria: 'streak', value: 7, tier: 'silver' },
  { id: 'a9', name: 'Unstoppable', emoji: '🔥', category: 'streak', criteria: 'streak', value: 14, tier: 'gold' },
  { id: 'a10', name: 'Reading Warrior', emoji: '⚔️', category: 'streak', criteria: 'streak', value: 30, tier: 'platinum' },
  { id: 'a11', name: 'Genre Curious', emoji: '⭐', category: 'genre', criteria: 'genres', value: 3, tier: 'bronze' },
  { id: 'a12', name: 'Genre Adventurer', emoji: '🌟', category: 'genre', criteria: 'genres', value: 5, tier: 'silver' },
  { id: 'a13', name: 'Genre Master', emoji: '🌈', category: 'genre', criteria: 'genres', value: 8, tier: 'gold' },
  { id: 'a14', name: 'Page Turner', emoji: '📄', category: 'pages', criteria: 'pages', value: 500, tier: 'bronze' },
  { id: 'a15', name: 'Chapter Champion', emoji: '📚', category: 'pages', criteria: 'pages', value: 2000, tier: 'silver' },
  { id: 'a16', name: 'Novel Navigator', emoji: '🧭', category: 'pages', criteria: 'pages', value: 5000, tier: 'gold' },
  { id: 'a17', name: 'Reviewer', emoji: '✏️', category: 'special', criteria: 'reviews', value: 5, tier: 'bronze' },
  { id: 'a18', name: 'Critic', emoji: '🖊️', category: 'special', criteria: 'reviews', value: 20, tier: 'gold' },
];

function getEarnedAwards() {
  const data = localStorage.getItem(AWARDS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveEarnedAwards(awards) {
  localStorage.setItem(AWARDS_KEY, JSON.stringify(awards));
}

export function checkAwards() {
  const stats = getStats();
  const log = getLog();
  const sessions = getSessions();
  const earned = getEarnedAwards();
  const earnedIds = new Set(earned.map((e) => e.awardId));

  const completed = log.filter((b) => b.status === 'completed');
  const uniqueGenres = new Set(completed.map((b) => b.genre || 'Other')).size;
  const totalPages = completed.reduce((sum, b) => sum + (b.pageCount || 0), 0);
  const reviewCount = completed.filter((b) => b.review && b.review.trim().length > 0).length;
  const streak = calculateStreak(sessions);

  const newAwards = [];

  for (const award of DEFAULT_AWARDS) {
    if (earnedIds.has(award.id)) continue;

    let qualifies = false;
    switch (award.criteria) {
      case 'books':
        qualifies = completed.length >= award.value;
        break;
      case 'streak':
        qualifies = streak.longest >= award.value;
        break;
      case 'genres':
        qualifies = uniqueGenres >= award.value;
        break;
      case 'pages':
        qualifies = totalPages >= award.value;
        break;
      case 'reviews':
        qualifies = reviewCount >= award.value;
        break;
    }

    if (qualifies) {
      const entry = {
        awardId: award.id,
        earnedDate: new Date().toISOString().split('T')[0],
      };
      earned.push(entry);
      newAwards.push({ ...award, earnedDate: entry.earnedDate });
    }
  }

  if (newAwards.length > 0) {
    saveEarnedAwards(earned);
  }

  return newAwards;
}

export function getAllAwards() {
  const earned = getEarnedAwards();
  const earnedMap = {};
  earned.forEach((e) => {
    earnedMap[e.awardId] = e.earnedDate;
  });

  return DEFAULT_AWARDS.map((a) => ({
    ...a,
    earned: !!earnedMap[a.id],
    earnedDate: earnedMap[a.id] || null,
  }));
}

export function getEarnedAwardCount() {
  return getEarnedAwards().length;
}
