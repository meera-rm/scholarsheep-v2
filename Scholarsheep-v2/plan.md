# ScholarSheep v2 — Implementation Plan

## Project Summary

ScholarSheep v2 is a full reading engagement platform for students (K-8), teachers, and parents. This plan covers the complete implementation strategy for:

1. **React 19 + Vite migration** (DONE)
2. **Role-based auth with Google login + JWT** (DONE — frontend ready, backend endpoint needed)
3. **Demo / Admin mode** (DONE — 4 test accounts, no backend needed)
4. **Learning Log** (DONE — book tracking, reading sessions, statistics)
5. **Open Library API integration** (DONE — search and add books)
6. **Awards & Sticker System** (DONE — 18 stickers, auto-award engine, celebration popups)
7. **Progress Dashboards** (DONE — student stats, charts, heatmap)
8. **Parent Email Notifications** (DONE — EmailJS integration, preview mode, settings UI)
9. **Teacher In-App Notifications** (DONE — bell icon, activity feed, today/yesterday readers)
10. **UI Improvements** (DONE — home page gradient, dark mode slate theme)
11. **Parent Dashboard Enhancement** (DONE — stats, recent books, email settings, stickers)
12. **Recent Activity Feed** (DONE — book name, cover, author in reading sessions on MyBooks)
13. **Open Library → School Library** (DONE — add API books to Reading Level / Casual lists)
14. **Photo Upload for Students & Teachers** (DONE — upload photo or auto-generate avatar)
15. **Bug Fixes** (DONE — memory game, flash cards, vocabulary, teachers/students pages, detail pages, form crashes)
16. **Backend v2** (DONE — 42 files, 70 endpoints, PostgreSQL, JWT, legacy + new routes)
17. **Database Setup** (DONE — local PostgreSQL, migrations, seed data: 12 books, 4 teachers, 16 students, 30 logs, 14 comments, 16 words, 18 awards)
18. **Daily Log Tracker** (DONE — 7-day student reading tracker on teacher detail page)
19. **Redesigned Teacher/Student Pages** (DONE — card layouts replacing tables, profile cards, stat cards, timeline logs)
20. **Student-Teacher Connections** (DONE — 16 students assigned to 4 teachers, NYC DOE reading levels)
21. **Redesigned Pomodoro Timer** (DONE — circular progress ring, gradient backgrounds, session dots)
22. **Redesigned Notes App** (DONE — colorful card grid, search, clean forms, fixed infinite loops)
23. **Admin Role Separation** (DONE — admin vs teacher permissions, nav changes, route restrictions)
24. **Bookshelf Headings & Font Consistency** (DONE — shelf labels, consistent fonts across all sections)
25. **Timer Nav & Dark Mode** (DONE — TIMER in nav bar, dark/light mode gradient switching, accessibility)
26. **Dark Mode Fixes** (DONE — books, games, card sliders, learning tools, RPS, Guess the Word)
27. **Reading Leaderboard** (DONE — weekly/monthly/all-time, sort by books/pages/streak, medals)
28. **Book Recommendations** (DONE — genre-based, curated fallback, horizontal slider on dashboard)
29. **Book Clubs** (DONE — create, join with invite code, discussions, member list)
30. **Real-time Socket Service** (DONE — socket.io wrapper, ready for backend WebSocket)
31. **Accessibility** (DONE — skip-to-content, focus indicators, semantic HTML, sr-only)
32. **Unit Tests** (DONE — 19 tests, Vitest, reading log + book club services)
33. **Reading Partners with Invite Codes & Chat** (DONE — invite/accept flow, 7-day expiry, chat, 16 discussion prompts)
34. **Teacher Dashboard Community Overview** (DONE — book clubs, partnerships, top readers cards)
35. **Backend — New Feature Endpoints** (DONE — 6 tables, 20 endpoints for clubs, partners, leaderboard, recommendations)
36. **Frontend-Backend API Connection** (DONE — all services API-first with localStorage fallback)
37. **Demo vs Live Data Mode Toggle** (DONE — footer toggle, demo accounts locked to localStorage)
38. **React 19 Patterns** (DONE — useActionState, form action, useTransition)
39. **About Page GitHub Fix** (DONE — repo list by name, commits via public API)
40. **Array Key Audit** (DONE — 14 fixes across 8 files, proper unique keys)
41. **Progress Dashboards** — per class, per year (PLANNED)

---

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│             FRONTEND (React 19 + Vite)       │
│                                              │
│  ┌─────────┐  ┌──────────┐  ┌────────────┐  │
│  │ Auth    │  │ Reading  │  │ Awards &   │  │
│  │ Context │  │ Log      │  │ Stickers   │  │
│  └────┬────┘  └────┬─────┘  └─────┬──────┘  │
│       │            │               │         │
│  ┌────┴────────────┴───────────────┴──────┐  │
│  │         Axios Instance (JWT)           │  │
│  └────────────────┬───────────────────────┘  │
└───────────────────┼──────────────────────────┘
                    │
         ┌──────────┴──────────┐
         │    BACKEND (Express) │
         │    PostgreSQL + JWT  │
         │                      │
         │  /api/users          │  ← auth (existing)
         │  /api/reading-log    │  ← NEW
         │  /api/sessions       │  ← NEW
         │  /api/book-search    │  ← NEW (Open Library proxy)
         │  /api/awards         │  ← NEW
         │  /api/class          │  ← NEW
         │  /api/goals          │  ← NEW
         │  /api/reports        │  ← NEW
         │  /api/books          │  ← existing (enhanced)
         │  /api/teachers       │  ← existing
         │  /api/students       │  ← existing
         └──────────┬──────────┘
                    │
         ┌──────────┴──────────┐
         │    PostgreSQL DB     │
         │  (Render / Supabase) │
         └──────────┬──────────┘
                    │
         ┌──────────┴──────────┐
         │  Open Library API    │
         │  (External — free)   │
         └─────────────────────┘
```

---

## Phase 1: Auth & Infrastructure (COMPLETED)

### What's Done
- [x] Copy project to `/Users/meeraramesh/CapstoneGroup5-v2/`
- [x] Migrate CRA → Vite 6
- [x] Upgrade React 18 → React 19
- [x] Remove Firebase — replaced with backend JWT auth
- [x] Create `AuthContext.jsx` with login, register, Google OAuth, logout
- [x] Create `ProtectedRoute.jsx` for role-based route guards
- [x] Create `axiosInstance.js` with JWT interceptor
- [x] Create `tokenManager.js` for JWT storage/decode
- [x] Create `GoogleLoginButton.jsx` using `@react-oauth/google`
- [x] Create unified `Login.jsx` with role selector + Google + credentials
- [x] Create unified `Register.jsx` with role selector + Google + credentials
- [x] Update `AnimatedRoutes.js` with protected routes by role
- [x] Update `nav.js` with role-aware navigation
- [x] Create `TeacherDashboard.jsx`, `StudentDashboard.jsx`, `Unauthorized.jsx`
- [x] Update `package.json` — all React 19 compatible deps, no Firebase
- [x] Create `.env` and `vite.config.js`

### Backend (DONE — built at ~/CapstoneGroup5-v2-backend/)
- [x] `POST /api/users/google-login` endpoint with `google-auth-library`
- [x] `user_role` column in users table
- [x] Google OAuth Client ID in backend `.env`
- [x] All 42 endpoints running on port 3010
- [x] PostgreSQL database `scholarsheep_v2` with migrations + seed data

---

## Phase 2: Database Schema & Backend API for Learning Log

### Priority: HIGH
### Estimated Files: 8 backend files, 2 SQL migrations

### Step 2.1: Database Migration

Create migration file `migrations/002_learning_log.sql`:

```sql
-- Books catalog (populated from Open Library + manual entries)
CREATE TABLE books_catalog (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  author VARCHAR(300),
  isbn VARCHAR(20) UNIQUE,
  cover_url TEXT,
  page_count INTEGER,
  genre VARCHAR(100),
  reading_level VARCHAR(50),
  open_library_id VARCHAR(50),
  description TEXT,
  publish_year INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Student reading log
CREATE TABLE reading_log (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  book_id INTEGER REFERENCES books_catalog(id),
  status VARCHAR(20) DEFAULT 'want_to_read',
  start_date DATE,
  end_date DATE,
  current_page INTEGER DEFAULT 0,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  school_year VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(student_id, book_id)
);

-- Reading sessions
CREATE TABLE reading_sessions (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  book_id INTEGER REFERENCES books_catalog(id),
  reading_log_id INTEGER REFERENCES reading_log(id) ON DELETE CASCADE,
  session_date DATE NOT NULL,
  pages_read INTEGER DEFAULT 0,
  minutes_spent INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Awards catalog
CREATE TABLE awards (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  criteria_type VARCHAR(50),
  criteria_value INTEGER,
  sticker_image_url TEXT,
  sticker_emoji VARCHAR(10),
  tier VARCHAR(20),
  is_custom BOOLEAN DEFAULT FALSE,
  created_by_teacher_id INTEGER REFERENCES teachers(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Student earned awards
CREATE TABLE student_awards (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  award_id INTEGER REFERENCES awards(id),
  earned_date DATE NOT NULL,
  school_year VARCHAR(10),
  awarded_by VARCHAR(20) DEFAULT 'system',
  UNIQUE(student_id, award_id, school_year)
);

-- Reading goals
CREATE TABLE reading_goals (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER REFERENCES teachers(id),
  student_id INTEGER REFERENCES students(id),
  goal_type VARCHAR(30),
  goal_value INTEGER NOT NULL,
  school_year VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Class enrollment
CREATE TABLE class_enrollment (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  teacher_id INTEGER REFERENCES teachers(id) ON DELETE CASCADE,
  class_name VARCHAR(100),
  school_year VARCHAR(10),
  enrolled_date DATE DEFAULT NOW(),
  UNIQUE(student_id, teacher_id, school_year)
);

-- Seed default awards
INSERT INTO awards (name, description, category, criteria_type, criteria_value, sticker_emoji, tier) VALUES
('First Book', 'Complete your first book', 'volume', 'books_completed', 1, '📖', 'bronze'),
('Bookworm', 'Complete 5 books', 'volume', 'books_completed', 5, '🐛', 'silver'),
('Book Explorer', 'Complete 10 books', 'volume', 'books_completed', 10, '🗺️', 'gold'),
('Reading Machine', 'Complete 25 books', 'volume', 'books_completed', 25, '🤖', 'platinum'),
('Library Legend', 'Complete 50 books', 'volume', 'books_completed', 50, '👑', 'diamond'),
('Century Reader', 'Complete 100 books', 'volume', 'books_completed', 100, '💯', 'diamond'),
('Getting Started', '3-day reading streak', 'streak', 'streak_days', 3, '🔥', 'bronze'),
('On Fire', '7-day reading streak', 'streak', 'streak_days', 7, '🔥', 'silver'),
('Unstoppable', '14-day reading streak', 'streak', 'streak_days', 14, '🔥', 'gold'),
('Reading Warrior', '30-day reading streak', 'streak', 'streak_days', 30, '⚔️', 'platinum'),
('Genre Curious', 'Read books from 3 genres', 'genre', 'genres_read', 3, '⭐', 'bronze'),
('Genre Adventurer', 'Read books from 5 genres', 'genre', 'genres_read', 5, '🌟', 'silver'),
('Genre Master', 'Read books from 8+ genres', 'genre', 'genres_read', 8, '🌈', 'gold'),
('Page Turner', 'Read 500 total pages', 'pages', 'pages_read', 500, '📄', 'bronze'),
('Chapter Champion', 'Read 2000 total pages', 'pages', 'pages_read', 2000, '📚', 'silver'),
('Novel Navigator', 'Read 5000 total pages', 'pages', 'pages_read', 5000, '🧭', 'gold'),
('Reviewer', 'Write 5 book reviews', 'special', 'reviews_written', 5, '✏️', 'bronze'),
('Critic', 'Write 20 book reviews', 'special', 'reviews_written', 20, '🖊️', 'gold');
```

### Step 2.2: Backend Files to Create

All files go in the **existing backend repo** (`CapstoneGroup5Backend`):

```
CapstoneGroup5Backend/
├── controllers/
│   ├── readingLogController.js    ← NEW: CRUD for reading log
│   ├── sessionController.js       ← NEW: reading sessions
│   ├── bookSearchController.js    ← NEW: Open Library proxy
│   ├── awardController.js         ← NEW: awards logic
│   ├── classController.js         ← NEW: class stats & enrollment
│   ├── goalController.js          ← NEW: reading goals
│   └── reportController.js        ← NEW: year reports & export
├── queries/
│   ├── readingLog.js              ← NEW: reading_log SQL queries
│   ├── sessions.js                ← NEW: reading_sessions SQL queries
│   ├── booksCatalog.js            ← NEW: books_catalog SQL queries
│   ├── awards.js                  ← NEW: awards SQL queries
│   ├── classEnrollment.js         ← NEW: class_enrollment SQL queries
│   ├── goals.js                   ← NEW: reading_goals SQL queries
│   └── reports.js                 ← NEW: aggregate stats SQL queries
├── services/
│   ├── openLibraryService.js      ← NEW: Open Library API client
│   └── awardService.js            ← NEW: auto-award checking logic
├── middleware/
│   └── authorization.js           ← UPDATE: add role-based middleware
└── app.js                         ← UPDATE: register new routes
```

### Step 2.3: Backend Route Registration (in app.js)

```javascript
// Add to existing app.js
const readingLogController = require('./controllers/readingLogController');
const sessionController = require('./controllers/sessionController');
const bookSearchController = require('./controllers/bookSearchController');
const awardController = require('./controllers/awardController');
const classController = require('./controllers/classController');
const goalController = require('./controllers/goalController');
const reportController = require('./controllers/reportController');

app.use('/api/reading-log', readingLogController);
app.use('/api/sessions', sessionController);
app.use('/api/book-search', bookSearchController);
app.use('/api/awards', awardController);
app.use('/api/class', classController);
app.use('/api/goals', goalController);
app.use('/api/reports', reportController);
```

### Step 2.4: Open Library Service

```javascript
// services/openLibraryService.js
const axios = require('axios');

const OPEN_LIBRARY_BASE = 'https://openlibrary.org';
const COVERS_BASE = 'https://covers.openlibrary.org';

async function searchBooks(query, limit = 10) {
  const res = await axios.get(`${OPEN_LIBRARY_BASE}/search.json`, {
    params: { q: query, limit, fields: 'title,author_name,isbn,cover_i,first_publish_year,subject,number_of_pages_median' }
  });
  return res.data.docs.map(book => ({
    title: book.title,
    author: book.author_name?.[0] || 'Unknown',
    isbn: book.isbn?.[0] || null,
    cover_url: book.cover_i ? `${COVERS_BASE}/b/id/${book.cover_i}-M.jpg` : null,
    publish_year: book.first_publish_year,
    page_count: book.number_of_pages_median || null,
    genre: book.subject?.[0] || null,
  }));
}

async function getBookByISBN(isbn) {
  const res = await axios.get(`${OPEN_LIBRARY_BASE}/isbn/${isbn}.json`);
  return res.data;
}

function getCoverUrl(isbn, size = 'M') {
  return `${COVERS_BASE}/b/isbn/${isbn}-${size}.jpg`;
}

module.exports = { searchBooks, getBookByISBN, getCoverUrl };
```

### Step 2.5: Award Checking Service

```javascript
// services/awardService.js — runs after each reading log update or session log
async function checkAndAwardStickers(studentId, db) {
  // 1. Count books completed
  const { count: booksCompleted } = await db.one(
    "SELECT COUNT(*) FROM reading_log WHERE student_id=$1 AND status='completed'", [studentId]
  );

  // 2. Calculate current streak
  // Query consecutive days with reading sessions ending at today
  const streak = await calculateStreak(studentId, db);

  // 3. Count unique genres
  const { count: genresRead } = await db.one(
    `SELECT COUNT(DISTINCT bc.genre) FROM reading_log rl
     JOIN books_catalog bc ON rl.book_id = bc.id
     WHERE rl.student_id=$1 AND rl.status='completed' AND bc.genre IS NOT NULL`, [studentId]
  );

  // 4. Sum total pages
  const { total: totalPages } = await db.one(
    `SELECT COALESCE(SUM(bc.page_count), 0) as total FROM reading_log rl
     JOIN books_catalog bc ON rl.book_id = bc.id
     WHERE rl.student_id=$1 AND rl.status='completed'`, [studentId]
  );

  // 5. Count reviews
  const { count: reviewsWritten } = await db.one(
    "SELECT COUNT(*) FROM reading_log WHERE student_id=$1 AND review IS NOT NULL AND review != ''", [studentId]
  );

  // 6. Check each award criteria against student's stats
  const awards = await db.any("SELECT * FROM awards WHERE is_custom = false");
  const earned = await db.any("SELECT award_id FROM student_awards WHERE student_id=$1", [studentId]);
  const earnedIds = new Set(earned.map(e => e.award_id));

  const newAwards = [];
  for (const award of awards) {
    if (earnedIds.has(award.id)) continue;

    let qualifies = false;
    switch (award.criteria_type) {
      case 'books_completed': qualifies = booksCompleted >= award.criteria_value; break;
      case 'streak_days': qualifies = streak >= award.criteria_value; break;
      case 'genres_read': qualifies = genresRead >= award.criteria_value; break;
      case 'pages_read': qualifies = totalPages >= award.criteria_value; break;
      case 'reviews_written': qualifies = reviewsWritten >= award.criteria_value; break;
    }

    if (qualifies) {
      await db.none(
        "INSERT INTO student_awards (student_id, award_id, earned_date, school_year) VALUES ($1,$2,NOW(),$3)",
        [studentId, award.id, getCurrentSchoolYear()]
      );
      newAwards.push(award);
    }
  }

  return newAwards; // Return newly earned awards for toast notifications
}
```

---

## Phase 3: Frontend — Book Search & Reading Log

### Priority: HIGH
### Estimated Files: 8 components, 2 pages

### Step 3.1: Book Search Component

**File:** `src/Components/readingLog/BookSearchBar.jsx`

How it works:
1. Student types in the search input (debounced — waits 300ms after typing stops)
2. Frontend calls `GET /api/book-search?q=<query>`
3. Backend proxies to Open Library Search API
4. Results displayed as cards with cover images, titles, authors
5. Student clicks "Add to My Books" → selects status (Want to Read / Currently Reading)
6. Book gets saved to `books_catalog` + `reading_log` tables

### Step 3.2: Reading Log Page

**File:** `src/Pages/ReadingLog/MyBooks.jsx`

Layout:
```
┌──────────────────────────────────────────┐
│  My Reading Log          [+ Add Book]    │
│                                          │
│  [All] [Reading] [Completed] [Want]      │  ← filter tabs
│                                          │
│  ┌────────┐ ┌────────┐ ┌────────┐       │
│  │ cover  │ │ cover  │ │ cover  │       │  ← book cards grid
│  │ Title  │ │ Title  │ │ Title  │       │
│  │ Author │ │ Author │ │ Author │       │
│  │ ████░░ │ │ ✓ Done │ │ ♡ Want │       │  ← status/progress
│  │ p.45/  │ │ ★★★★☆ │ │        │       │
│  │   220  │ │        │ │        │       │
│  └────────┘ └────────┘ └────────┘       │
│                                          │
│  Stats: 23 books read · 4,500 pages     │
│         12 day streak · 🔥               │
└──────────────────────────────────────────┘
```

### Step 3.3: Book Detail / Progress Page

**File:** `src/Pages/ReadingLog/BookProgress.jsx`

When a student clicks a book from their log:
- See full book details (cover, author, page count, genre)
- Update current page (slider or number input)
- Change status (reading → completed)
- Log a reading session (pages read today, minutes, notes)
- Rate the book (1-5 stars) when completed
- Write a review

### Step 3.4: New Frontend Files

```
src/
├── Components/
│   └── readingLog/
│       ├── BookSearchBar.jsx        ← Debounced search with Open Library
│       ├── BookSearchResults.jsx    ← Search results grid
│       ├── BookCard.jsx             ← Book cover + title + progress
│       ├── ReadingLogList.jsx       ← Filterable book list
│       ├── ReadingSessionForm.jsx   ← Log today's reading
│       ├── BookRating.jsx           ← Star rating component
│       ├── BookReviewForm.jsx       ← Write/edit review
│       └── ProgressBar.jsx          ← Pages read / total pages
├── Pages/
│   └── ReadingLog/
│       ├── MyBooks.jsx              ← Main reading log page
│       ├── AddBook.jsx              ← Search + add book page
│       └── BookProgress.jsx         ← Single book detail + update
```

---

## Phase 4: Frontend — Statistics & Charts

### Priority: MEDIUM
### Estimated Files: 6 components, 2 pages
### New Dependency: `recharts` (MIT license, React 19 compatible, lightweight)

### Step 4.1: Student Stats Page

**File:** `src/Pages/Stats/MyStats.jsx`

```
┌──────────────────────────────────────────────┐
│  My Reading Stats                    2025-26  │
│                                               │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐        │
│  │  23  │ │ 4.5k │ │  12  │ │ ★4.2 │        │  ← stat cards
│  │books │ │pages │ │streak│ │ avg  │        │
│  └──────┘ └──────┘ └──────┘ └──────┘        │
│                                               │
│  Books Per Month                              │
│  █ █ ██ █ ███ ██ █ ██                        │  ← bar chart
│  S O N  D J  F  M A M  J                     │
│                                               │
│  Reading Activity                             │
│  ░░█░░██░█░░░░░█████░░░░████░██░░░█████░░░   │  ← heatmap
│                                               │
│  Genre Breakdown          Reading Level       │
│  ┌────────────┐          ┌────────────┐       │
│  │ 🟢 Fiction │          │    ↗ 780L  │       │  ← donut + line
│  │ 🔵 Science │          │   ↗        │       │
│  │ 🟡 Fantasy │          │  ↗  620L   │       │
│  └────────────┘          └────────────┘       │
└──────────────────────────────────────────────┘
```

### Step 4.2: Reading Calendar Heatmap

**File:** `src/Components/stats/ReadingCalendarHeatmap.jsx`

- 365-day grid (like GitHub contributions)
- Each cell = 1 day
- Color intensity = pages read (0=grey, 1-10=light green, 11-30=medium, 31+=dark)
- Hover shows: "March 16: Read 25 pages of Charlotte's Web"
- Built with CSS grid (no extra library needed)

### Step 4.3: Stats Components

```
src/Components/stats/
├── StatsOverview.jsx            ← Dashboard stat cards
├── BooksPerMonthChart.jsx       ← Bar chart (recharts)
├── ReadingCalendarHeatmap.jsx   ← GitHub-style heatmap
├── GenreDonutChart.jsx          ← Donut chart (recharts)
├── ReadingLevelChart.jsx        ← Line chart (recharts)
├── GoalProgressBar.jsx          ← Progress toward teacher's goal
```

---

## Phase 5: Frontend — Awards & Stickers

### Priority: MEDIUM
### Estimated Files: 4 components, 1 page

### Step 5.1: Sticker Case Page

**File:** `src/Pages/Awards/MyStickerCase.jsx`

```
┌──────────────────────────────────────────────┐
│  My Sticker Collection          14/18 earned  │
│                                               │
│  📖 Reading Volume                            │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌────┐ │
│  │ 📖  │ │ 🐛  │ │ 🗺️  │ │ 🤖  │ │ 🔒 │ │
│  │First │ │Book- │ │Expl- │ │Mach- │ │Leg-│ │
│  │ Book │ │ worm │ │orer  │ │ ine  │ │end │ │
│  │  ✓   │ │  ✓   │ │  ✓   │ │  ✓   │ │25  │ │
│  └──────┘ └──────┘ └──────┘ └──────┘ └────┘ │
│                                               │
│  🔥 Streaks                                   │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐        │
│  │ 🔥  │ │ 🔥  │ │ 🔥  │ │ 🔒  │        │
│  │ 3day │ │ 7day │ │14day │ │30day │        │
│  │  ✓   │ │  ✓   │ │  ✓   │ │ 30  │        │
│  └──────┘ └──────┘ └──────┘ └──────┘        │
│                                               │
│  ⭐ Genre Explorer                            │
│  ...                                          │
└──────────────────────────────────────────────┘
```

- Earned stickers: full color with checkmark
- Unearned stickers: greyed out with lock icon and criteria shown
- Click earned sticker: shows date earned and fun animation
- New sticker earned: confetti/celebration popup

### Step 5.2: Award Notification System

When a student logs a session or completes a book:
1. Backend `checkAndAwardStickers()` runs
2. Returns list of newly earned awards
3. Frontend shows animated toast for each new award
4. Toast has sticker emoji, name, and "View Collection" link

### Step 5.3: Teacher Custom Awards

**File:** `src/Pages/Awards/CustomAwards.jsx`

Teachers can:
1. Create new award (name, description, emoji/image, criteria or manual)
2. View all custom awards they've created
3. Assign awards to specific students
4. See which students earned which awards

### Step 5.4: Award Components

```
src/Components/awards/
├── StickerCase.jsx              ← Grid of all stickers
├── StickerCard.jsx              ← Individual sticker (earned/locked)
├── StickerPopup.jsx             ← Celebration animation
├── NewAwardToast.jsx            ← Toast notification for new awards
```

---

## Phase 6: Frontend — Class Dashboard (Teacher)

### Priority: MEDIUM-HIGH
### Estimated Files: 5 components, 3 pages

### Step 6.1: Class Overview

**File:** `src/Pages/ClassDashboard/ClassOverview.jsx`

```
┌──────────────────────────────────────────────────────────┐
│  Class Dashboard — Ms. Ramesh's 4th Grade    2025-2026   │
│                                                           │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │
│  │  156 │ │  6.5 │ │ Fic- │ │  4   │ │ 89%  │          │
│  │total │ │ avg/ │ │tion  │ │ at   │ │  on  │          │
│  │books │ │ stdt │ │ #1   │ │ risk │ │track │          │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘          │
│                                                           │
│  Student         Books  This Mo  Current Book   Streak   │
│  ─────────────────────────────────────────────────────    │
│  Alice Chen       23     4      Charlotte's Web   12  ✅ │
│  Bob Smith        15     2      —                  0  ⚠️ │
│  Carol Davis      31     5      Matilda           22  ✅ │
│  David Lee         3     0      —                  0  🔴 │
│  ...                                                      │
│                                                           │
│  [Set Goals]  [Custom Awards]  [Export CSV]               │
└──────────────────────────────────────────────────────────┘
```

### Step 6.2: Student Detail View (Teacher)

**File:** `src/Pages/ClassDashboard/StudentDetail.jsx`

Teachers click a student's name to see their full reading profile:
- All the same charts as the student's own stats page
- Plus: goal progress, award history, session log
- Teacher can add notes about the student
- Teacher can assign custom awards

### Step 6.3: Goal Setting Page

**File:** `src/Pages/ClassDashboard/SetGoals.jsx`

- Set class-wide goals (e.g., "5 books per month")
- Override for individual students (e.g., "3 books per month" for a struggling reader)
- Goal types: books/month, books/year, pages/day, minutes/day
- View who is on track vs. behind

### Step 6.4: Class Dashboard Components

```
src/Components/classDashboard/
├── ClassStatsCards.jsx          ← Aggregate stat cards
├── StudentTable.jsx             ← Sortable table of all students
├── StudentProgressCard.jsx      ← Summary card per student
├── AtRiskStudents.jsx           ← Flagged students list
├── ClassTrendChart.jsx          ← Books per month for whole class
```

---

## Phase 7: Parent Dashboard Enhancement

### Priority: MEDIUM
### Estimated Files: 3 components, 1 page update

### Step 7.1: Update Parent Dashboard

Update existing `ParentDashboard.js` to show:

- Child's current book + progress
- Books completed this month and year
- Reading streak
- Recent awards earned (last 5)
- Reading goal progress
- Link to year-in-review
- Simple version of the stats charts (books per month, genre breakdown)

### Step 7.2: Parent Components

```
src/Components/parentDashboard/
├── ChildReadingStatus.jsx       ← Current book + progress
├── ChildStatsOverview.jsx       ← Key metrics cards
├── RecentAwards.jsx             ← Last 5 stickers earned
```

---

## Phase 8: Year-in-Review

### Priority: LOW (build last)
### Estimated Files: 2 components, 1 page

### Step 8.1: Year Review Page

**File:** `src/Pages/YearReview/YearReview.jsx`

A beautiful, scrollable single-page summary:

```
┌──────────────────────────────────────┐
│     📚 Your 2025-2026 Year in       │
│           Reading Review              │
│                                       │
│         23 Books Read                 │
│        4,500 Pages                    │
│         42 Hours                      │
│                                       │
│   Your Journey Month by Month         │
│   [book covers arranged by month]     │
│                                       │
│   Favorite Genre: Fantasy             │
│   Favorite Book: ★★★★★ Matilda       │
│                                       │
│   Stickers Earned: 14                 │
│   [grid of earned stickers]           │
│                                       │
│   Reading Level: 620L → 780L (+26%)  │
│                                       │
│   Longest Streak: 22 days             │
│                                       │
│        🎉 Great Year! 🎉             │
└──────────────────────────────────────┘
```

---

## Phase 9: Route Updates (Frontend)

Add these new routes to `AnimatedRoutes.js`:

```jsx
// Student routes
<Route path='/my-books' element={<ProtectedRoute allowedRoles={['student']}><MyBooks /></ProtectedRoute>} />
<Route path='/my-books/add' element={<ProtectedRoute allowedRoles={['student']}><AddBook /></ProtectedRoute>} />
<Route path='/my-books/:id' element={<ProtectedRoute allowedRoles={['student']}><BookProgress /></ProtectedRoute>} />
<Route path='/my-stats' element={<ProtectedRoute allowedRoles={['student']}><MyStats /></ProtectedRoute>} />
<Route path='/my-stickers' element={<ProtectedRoute allowedRoles={['student']}><MyStickerCase /></ProtectedRoute>} />

// Teacher routes
<Route path='/class-dashboard' element={<ProtectedRoute allowedRoles={['teacher']}><ClassOverview /></ProtectedRoute>} />
<Route path='/class-dashboard/:studentId' element={<ProtectedRoute allowedRoles={['teacher']}><StudentDetail /></ProtectedRoute>} />
<Route path='/class-dashboard/goals' element={<ProtectedRoute allowedRoles={['teacher']}><SetGoals /></ProtectedRoute>} />
<Route path='/class-dashboard/awards' element={<ProtectedRoute allowedRoles={['teacher']}><CustomAwards /></ProtectedRoute>} />

// Parent routes
<Route path='/child-progress' element={<ProtectedRoute allowedRoles={['parent']}><ChildProgress /></ProtectedRoute>} />

// Shared routes
<Route path='/year-review/:year' element={<ProtectedRoute><YearReview /></ProtectedRoute>} />
```

---

## Implementation Order & Status

| Order | Phase | What | Status | Depends On |
|-------|-------|------|--------|------------|
| 1 | Phase 1 | Auth + React 19 + Vite migration | **DONE** | — |
| 2 | Phase 1b | Demo/Admin mode (4 test accounts) | **DONE** | Phase 1 |
| 3 | Phase 3 | Book search + reading log frontend | **DONE** | Phase 1 |
| 4 | Phase 4 | Stats & charts frontend | **DONE** | Phase 3 |
| 5 | Phase 5 | Awards & stickers (18 awards, auto-engine) | **DONE** | Phase 3 |
| 6 | Phase 7 | Parent dashboard + email notifications | **DONE** | Phase 3 |
| 7 | Phase 9 | Teacher in-app notifications + activity feed | **DONE** | Phase 3 |
| 8 | Phase 10 | UI improvements (home gradient, dark mode) | **DONE** | — |
| 9 | Phase 9b | Route updates (AnimatedRoutes) | **DONE** | All above |
| 10 | Phase 2.1 | Database migration + seed data | **DONE** | Phase 1 |
| 11 | Phase 2.2 | Backend v2 (42 endpoints, 32 files) | **DONE** | Phase 2.1 |
| 12 | Phase 11 | Recent reading activity feed (book names) | **DONE** | Phase 3 |
| 13 | Phase 12 | Open Library → school library (reading level/casual) | **DONE** | Phase 3 |
| 14 | Phase 13 | Photo upload for students & teachers | **DONE** | — |
| 15 | Phase 14 | Bug fixes (8 components + 2 form crashes) | **DONE** | — |
| 16 | Phase 15 | Daily log tracker on teacher detail page | **DONE** | Phase 14 |
| 17 | Phase 16 | Redesigned teacher/student detail pages (cards) | **DONE** | Phase 15 |
| 18 | Phase 17 | Student-teacher connections + NYC reading levels | **DONE** | Phase 16 |
| 19 | Phase 18 | Populated 30 logs + 14 teacher comments | **DONE** | Phase 17 |
| 20 | Phase 19 | Redesigned Pomodoro Timer (progress ring, gradients) | **DONE** | — |
| 21 | Phase 20 | Redesigned Notes App (cards, search, clean forms) | **DONE** | — |
| 22 | Phase 21 | Admin role separation (permissions, nav, routes) | **DONE** | — |
| 23 | Phase 22 | Bookshelf headings + font consistency across /books | **DONE** | — |
| 24 | Phase 23 | Timer in nav bar + dark mode gradient switching | **DONE** | — |
| 25 | Phase 24 | Dark mode fixes (books, games, cards, RPS, GuessWord) | **DONE** | — |
| 26 | Phase 25 | Reading Leaderboard (rankings, filters, medals) | **DONE** | — |
| 27 | Phase 26 | Book Recommendations (genre-based + curated) | **DONE** | — |
| 28 | Phase 27 | Book Clubs (create, join, discuss, invite friends) | **DONE** | — |
| 29 | Phase 28 | Real-time Socket Service (socket.io wrapper) | **DONE** | — |
| 30 | Phase 29 | Accessibility (skip-to-content, focus, semantic HTML) | **DONE** | — |
| 31 | Phase 30 | Unit Tests (19 tests, Vitest, 2 service suites) | **DONE** | — |
| 32 | Phase 31 | Reading Partners (invite codes, expiry, chat, prompts) | **DONE** | Phase 27 |
| 33 | Phase 32 | Teacher Dashboard — community overview (clubs, partners, leaderboard) | **DONE** | Phase 25-28 |
| 34 | Phase 33 | Backend — 6 new tables, 20 new endpoints | **DONE** | — |
| 35 | Phase 34 | Frontend-Backend API connection (all services) | **DONE** | Phase 33 |
| 36 | Phase 35 | Demo vs Live data mode toggle | **DONE** | Phase 34 |
| 37 | Phase 36 | React 19 patterns (useActionState, useTransition) | **DONE** | — |
| 38 | Phase 37 | About page GitHub integration fix | **DONE** | — |
| 39 | Phase 38 | Array key audit (14 fixes across 8 files) | **DONE** | — |
| 40 | Phase 6 | Class dashboard deep dive (per-student) | PLANNED | Phase 2 |
| 41 | Phase 8 | Year-in-review page | PLANNED | Phase 4, 5 |

---

## What's Built (Frontend — works with localStorage, no backend needed)

### Complete Feature List

| Feature | Files | Status |
|---------|-------|--------|
| React 19 + Vite 6 migration | `vite.config.js`, `package.json`, `index.html` | DONE |
| Role-based auth (student/teacher/parent) | `AuthContext.jsx`, `ProtectedRoute.jsx` | DONE |
| Google OAuth login button | `GoogleLoginButton.jsx` | DONE |
| Demo/admin accounts (4 roles) | `demoAuthService.js`, updated `Login.jsx` | DONE |
| Unified login page with role selector | `Login.jsx` | DONE |
| Unified registration page | `Register.jsx` | DONE |
| Role-aware navigation bar | `nav.jsx` | DONE |
| Student dashboard with reading log links | `StudentDashboard.jsx` | DONE |
| Teacher dashboard with activity feed | `TeacherDashboard.jsx` | DONE |
| Parent dashboard with email settings | `ParentDashboard.jsx` | DONE |
| Open Library book search (debounced) | `openLibraryService.js`, `BookSearchBar.jsx` | DONE |
| Reading log (All/Reading/Finished/Wishlist tabs) | `ReadingLogList.jsx`, `MyBooks.jsx` | DONE |
| Book progress page (update pages, status, rating) | `BookProgress.jsx` | DONE |
| Reading session logger (pages, minutes, notes) | `ReadingSessionForm.jsx` | DONE |
| Book rating (1-5 stars) | `BookRating.jsx` | DONE |
| Book reviews | In `BookProgress.jsx` | DONE |
| Manual book entry form | In `AddBook.jsx` | DONE |
| Statistics dashboard (8 stat cards) | `StatsOverview.jsx`, `MyStats.jsx` | DONE |
| Books per month bar chart | `BooksPerMonthChart.jsx` | DONE |
| Genre donut chart | `GenreDonutChart.jsx` | DONE |
| 365-day reading heatmap | `ReadingCalendarHeatmap.jsx` | DONE |
| Reading streak tracker | In `readingLogService.js` | DONE |
| 18 stickers across 5 categories | In `readingLogService.js` | DONE |
| Auto-award engine | `checkAwards()` in `readingLogService.js` | DONE |
| Sticker case page (earned/locked grid) | `StickerCase.jsx`, `MyStickerCase.jsx` | DONE |
| Sticker celebration popup | `StickerPopup.jsx` | DONE |
| Teacher notification bell (nav bar) | `NotificationBell.jsx` | DONE |
| Teacher activity feed (today/yesterday) | `TeacherActivityFeed.jsx` | DONE |
| Parent email notifications (EmailJS) | `notificationService.js`, `ParentEmailSettings.jsx` | DONE |
| Home page light gradient background | `Home.jsx` | DONE |
| Dark mode (slate blue theme) | `App.css` | DONE |
| Unauthorized (403) page | `Unauthorized.jsx` | DONE |
| Protected routes by role | `AnimatedRoutes.jsx` | DONE |
| Recent reading activity (book names in sessions) | `RecentActivity.jsx`, `readingLogService.js` | DONE |
| Open Library → school library (add to reading level/casual) | `ApiBookSearch.jsx` | DONE |
| Photo upload for students & teachers | `PhotoUpload.jsx`, `NewStudents.jsx`, `NewTeachers.jsx` | DONE |
| Avatar fallback (upload → image → DiceBear) | `AllStudents.jsx`, `AllTeachers.jsx` | DONE |
| Memory game fix (require→import) | `MemoryGame.jsx` | DONE |
| Flash cards fix (toArray + per-card toggle + seed data) | `FlashCardList.jsx` | DONE |
| Vocabulary page fix (same + refresh after add) | `DisplayCardList.jsx`, `AddVocab.jsx` | DONE |
| Teachers list fix (infinite loop + response parsing) | `AllTeachers.jsx` | DONE |
| Students list fix (response parsing) | `AllStudents.jsx` | DONE |
| Teacher detail fix (infinite loop + missing route) | `TeacherDetails.jsx` | DONE |
| Student detail fix (response parsing + logs route) | `StudentDetails.jsx` | DONE |
| New student form crash fix (ToastContainer undefined) | `NewStudents.jsx` | DONE |
| New teacher form crash fix (ToastContainer undefined) | `NewTeachers.jsx` | DONE |
| Daily log tracker (7-day student reading) | `StudentDailyLogTracker.jsx` | DONE |
| Redesigned teacher detail page (cards) | `TeacherDetails.jsx` | DONE |
| Redesigned student detail page (timeline) | `StudentDetails.jsx` | DONE |
| Teacher comments on log cards | `StudentDetails.jsx` + backend `GET /api/comments/logs/:logId` | DONE |
| Student-teacher connections (teachers_id) | Database: 16 students → 4 teachers | DONE |
| NYC DOE reading levels (F&P benchmarks) | Database: levels B-P based on grade | DONE |
| Teacher ID on student cards | `AllStudents.jsx` | DONE |
| Redesigned Pomodoro Timer (progress ring, gradients, session dots) | `MyTimer.jsx` | DONE |
| Redesigned Notes list (colorful cards, search) | `Notes.jsx`, `ListNotes.jsx` | DONE |
| Redesigned New Note (clean form, auto user ID) | `NewNotes.jsx` | DONE |
| Redesigned Show Note (full card, fixed infinite loop) | `ShowNotes.jsx` | DONE |
| Redesigned Edit Note (clean form, fixed infinite loop) | `UpdateNotes.jsx` | DONE |
| Admin role (superuser access to all routes) | `AuthContext.jsx`, `ProtectedRoute.jsx`, `demoAuthService.js` | DONE |
| Admin-only teacher management | `AnimatedRoutes.jsx` (routes), `nav.jsx` (links) | DONE |
| Teacher sees "MY STUDENTS" not "TEACHERS" | `nav.jsx` (desktop + mobile) | DONE |
| Bookshelf headings (Reading Level / Casual) | `BookShelf.jsx` | DONE |
| Readers Corner image centered | `BookShelf.jsx` | DONE |
| Font consistency — Learning Tools | `LearningTools.scss` | DONE |
| Font consistency — Notes App tab | `Note.scss` | DONE |
| Font consistency — Graded Reading title | `DigitalBookLinks.scss` | DONE |
| Font consistency — Books List title | `Slider.scss` | DONE |
| Font consistency — Reading Level/Casual page titles | `ReadingLevelBooks.jsx`, `CasualReading.jsx` | DONE |
| Rainbow tab animation (connected path) | `DisplayTools.scss` | DONE |
| Tab click fix (e.currentTarget.value) | `DisplayTools.jsx` | DONE |
| TIMER button in nav (all users) | `nav.jsx` | DONE |
| Timer dark/light mode (gradient + text switching) | `MyTimer.jsx` | DONE |
| Timer text accessibility (softer secondary text) | `MyTimer.jsx` | DONE |
| Dark mode — book cards | `App.css` | DONE |
| Dark mode — bookshelf titles | `App.css` | DONE |
| Dark mode — learning tools section | `App.css` | DONE |
| Dark mode — notes app section | `App.css` | DONE |
| Dark mode — graded reading + books list titles | `App.css` | DONE |
| Dark mode — card sliders (above Reading Corner) | `App.css` | DONE |
| Dark mode — game cards (listing page) | `App.css` | DONE |
| Dark mode — RPS game page (`bg-teal-100`) | `App.css` | DONE |
| Dark mode — Guess the Word page (`bg-cyan-50`) | `App.css` | DONE |
| Dark mode — search bar input | `App.css` | DONE |
| Reading Leaderboard (weekly/monthly/alltime + sort) | `ClassLeaderboard.jsx`, `leaderboardService.js` | DONE |
| Book Recommendations (genre-based + curated slider) | `BookRecommendations.jsx`, `recommendationService.js` | DONE |
| Book Clubs — create with invite code | `CreateBookClub.jsx`, `bookClubService.js` | DONE |
| Book Clubs — join with invite code | `MyBookClubs.jsx` | DONE |
| Book Clubs — discussion thread | `BookClubDetail.jsx` | DONE |
| Book Clubs — member list + copy invite | `BookClubDetail.jsx` | DONE |
| Real-time Socket Service | `socketService.js` | DONE |
| Skip to Content (accessibility) | `SkipToContent.jsx`, `App.jsx` | DONE |
| Focus indicators (accessibility) | `index.css` | DONE |
| Semantic HTML (role, id, aria-label) | `App.jsx` | DONE |
| Unit Tests — reading log service (11 tests) | `readingLogService.test.js` | DONE |
| Unit Tests — book club service (8 tests) | `bookClubService.test.js` | DONE |
| Vitest test configuration | `vite.config.js`, `test/setup.js` | DONE |
| Student Dashboard — leaderboard + clubs cards | `StudentDashboard.jsx` | DONE |
| Student Dashboard — book recommendations | `StudentDashboard.jsx` | DONE |
| Routes — leaderboard, book-clubs, create, detail | `AnimatedRoutes.jsx` | DONE |
| Reading Partners — invite code flow | `ReadingPartners.jsx`, `bookClubService.js` | DONE |
| Reading Partners — partner chat | `ReadingPartners.jsx` | DONE |
| Reading Partners — 16 discussion prompts | `ReadingPartners.jsx` | DONE |
| Reading Partners — 7-day code expiry | `bookClubService.js` | DONE |
| Teacher Dashboard — book clubs overview | `TeacherDashboard.jsx` | DONE |
| Teacher Dashboard — partnerships overview | `TeacherDashboard.jsx` | DONE |
| Teacher Dashboard — top readers mini-leaderboard | `TeacherDashboard.jsx` | DONE |
| Backend — book_clubs + members + posts tables | `003_new_features.sql` | DONE |
| Backend — reading_partners + partner_chat tables | `003_new_features.sql` | DONE |
| Backend — book_recommendations table | `003_new_features.sql` | DONE |
| Backend — 9 book club endpoints | `bookClubController.js` | DONE |
| Backend — 6 reading partner endpoints | `readingPartnerController.js` | DONE |
| Backend — 2 leaderboard endpoints | `leaderboardController.js` | DONE |
| Backend — 3 recommendation endpoints | `recommendationController.js` | DONE |
| Route — /reading-partners | `AnimatedRoutes.jsx` | DONE |
| API-first services (5 files refactored) | `readingLogService.js`, `bookClubService.js`, `leaderboardService.js`, `recommendationService.js`, `notificationService.js` | DONE |
| localStorage fallback files (3 backups) | `readingLogLocal.js`, `bookClubLocal.js`, `notificationLocal.js` | DONE |
| Async useEffect in 10+ components | MyBooks, BookProgress, MyStats, MyStickerCase, ParentDashboard, etc. | DONE |
| Demo/Live data mode toggle | `DataModeToggle.jsx`, `Footer.jsx`, `demoAuthService.js` | DONE |
| Demo account data isolation | `demoAuthService.js` — demo accounts locked to localStorage | DONE |
| React 19 — useActionState | `Login.jsx`, `CreateBookClub.jsx` | DONE |
| React 19 — form action | `Login.jsx`, `CreateBookClub.jsx` | DONE |
| React 19 — useTransition | `StudentDashboard.jsx`, `ClassLeaderboard.jsx` | DONE |
| About page — repo list by name | `AllReposInfo.jsx` | DONE |
| About page — commits via public API | `CommitHistory.jsx` | DONE |
| Array key fix — FlashCardList (2) | `key={definition}`, `key={ex}` | DONE |
| Array key fix — DisplayCardList (4) | `key={definition}`, `key={ex}`, `key={syn}`, `key={ant}` | DONE |
| Array key fix — TeacherActivityFeed | `key={reader.bookId}` | DONE |
| Array key fix — RPS, GuessWord, MemoryGame | `key={option}`, composite key, `key={data.id}` | DONE |
| Array key fix — Profile topics, BooksPerMonth | `key={topic}`, `key={d.month}` | DONE |

---

## New Dependencies Added

### Frontend (`package.json`)
```json
"@react-oauth/google": "^0.12.1"    // Google OAuth (no Firebase)
"react-toastify": "^10.0.0"         // Toast notifications
"emailjs-com": "^3.2.0"             // Parent email notifications (free 200/mo)
```

### Backend (DONE — ~/CapstoneGroup5-v2-backend/package.json)
```json
"google-auth-library": "^9.14.0"    // Verify Google OAuth tokens
"axios": "^1.7.0"                   // Call Open Library API
"bcrypt": "^5.1.0"                  // Password hashing
"jsonwebtoken": "^9.0.1"            // JWT tokens
"pg-promise": "^11.9.0"             // PostgreSQL client
```

---

## External Services Summary

| Service | Purpose | Cost | Auth Required | Status |
|---------|---------|------|---------------|--------|
| Open Library API | Book search, metadata, covers | Free | No API key | INTEGRATED |
| Google OAuth | Google sign-in | Free | Client ID | FRONTEND READY |
| EmailJS | Parent email notifications | Free (200/mo) | Service ID + Template ID | INTEGRATED (preview mode) |
| DiceBear API | Auto-generated avatars | Free | No key | INTEGRATED |
| PostgreSQL (local) | Database | Free | Local connection | RUNNING |
| PostgreSQL (Render) | Database (production) | Free tier | Connection string | EXISTING |
| Render | Backend hosting | Free tier | — | EXISTING |
| Netlify | Frontend hosting | Free tier | — | EXISTING |

---

## File Count Summary (Final)

| Category | New Files | Modified Files |
|----------|-----------|----------------|
| Frontend Components — Auth | 2 | 0 |
| Frontend Components — Reading Log | 7 | 0 |
| Frontend Components — Stats | 4 | 0 |
| Frontend Components — Awards | 3 | 0 |
| Frontend Components — Notifications | 3 | 0 |
| Frontend Components — Common | 1 (PhotoUpload) | 0 |
| Frontend Pages | 10 | 2 (ParentDashboard, Home) |
| Frontend Context/Utils | 3 | 0 |
| Frontend Services | 3 | 0 |
| Frontend Hooks | 1 | 0 |
| Core Config | 5 (.env, vite, tailwind, postcss, .gitignore) | 2 (nav.jsx, AnimatedRoutes.jsx) |
| Bug Fixes | 0 | 8 (MemoryGame, FlashCardList, DisplayCardList, AddVocab, AllTeachers, AllStudents, TeacherDetails, StudentDetails) |
| New/Updated Forms | 0 | 2 (NewStudents, NewTeachers) |
| Books Page | 1 (ApiBookSearch) | 1 (BookCardList) |
| Frontend Components — Show | 1 (StudentDailyLogTracker) | 2 (TeacherDetails, StudentDetails) |
| **Frontend Total** | **~47 new files** | **~18 modified** |
| Backend (~/CapstoneGroup5-v2-backend/) | 32 | 0 |
| **Grand Total** | **~77 files** | **~16 modified** |

---

## Demo Login Credentials

| Role | Username | Password |
|------|----------|----------|
| Admin (teacher) | `admin` | `admin123` |
| Teacher | `ms_ramesh` | `teacher123` |
| Student | `alice_reader` | `student123` |
| Parent | `parent_chen` | `parent123` |

---

## Remaining TODO

| # | Feature | Effort |
|---|---------|--------|
| 1 | Replace frontend localStorage with backend API calls | Medium — swap `readingLogService.js` localStorage with `axiosInstance` calls to `/api/reading-log`, `/api/sessions`, `/api/awards` |
| 2 | Class dashboard deep dive (per-student view) | Medium — build `ClassOverview.jsx`, `StudentDetail.jsx`, `SetGoals.jsx` |
| 3 | Year-in-review page | Low — build `YearReview.jsx` using `GET /api/reports/student/:userId/:year` |
| 4 | CSV export for teachers | Low — add download button calling `/api/reports/class/:year` |
| 5 | Google OAuth Client ID setup | Low — create Google Cloud project, set `VITE_GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_ID` |
| 6 | EmailJS production setup | Low — create EmailJS account, set service/template/key in `.env` |
| 7 | Deploy backend to Render | Low — push to GitHub, create Render web service + PostgreSQL |
