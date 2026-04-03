# ScholarSheep v2 Backend — Implementation Plan

## Project Summary

The ScholarSheep v2 backend is a RESTful API built with **Express.js + PostgreSQL + JWT**. It serves the React 19 frontend and provides 27 endpoints covering authentication, reading tracking, book search, awards, notifications, class management, goals, and reporting.

### What's Built

1. **User Authentication** (DONE) — login, register, Google OAuth, JWT tokens, role-based access
2. **Reading Log CRUD** (DONE) — add/update/remove books, status tracking, auto-dates
3. **Reading Sessions** (DONE) — daily session logging, streak calculation, heatmap data
4. **Book Search Proxy** (DONE) — Open Library API integration for book search + ISBN lookup
5. **Awards Engine** (DONE) — 18 system stickers, auto-check, custom awards, manual assignment
6. **Teacher Notifications** (DONE) — in-app notifications routed via class enrollment
7. **Class Management** (DONE) — enrollment, class stats, daily activity feed
8. **Reading Goals** (DONE) — teacher-set goals per student or per class
9. **Year Reports** (DONE) — student + class yearly reading summaries
10. **Database Schema** (DONE) — 10 tables, indexes, seed data, migration runner

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 18+ | Runtime |
| Express.js | 4.18 | HTTP framework |
| PostgreSQL | 14+ | Database |
| pg-promise | 11.9 | PostgreSQL client |
| bcrypt | 5.1 | Password hashing |
| jsonwebtoken | 9.0 | JWT generation + verification |
| google-auth-library | 9.14 | Google OAuth token verification |
| axios | 1.7 | HTTP client for Open Library API |
| cors | 2.8 | Cross-origin resource sharing |
| morgan | 1.10 | Request logging |
| dotenv | 16.4 | Environment variable loading |
| nodemon | 3.1 | Dev auto-restart |

---

## File Structure

```
CapstoneGroup5-v2-backend/
├── server.js                              ← Entry point (port 3010)
├── app.js                                 ← Express app + all 9 route registrations
├── package.json                           ← Dependencies + scripts
├── .env                                   ← DB connection, JWT secrets, Google Client ID
├── .env.example                           ← Template for .env
├── .gitignore                             ← node_modules, .env
│
├── db/
│   └── dbConfig.js                        ← PostgreSQL connection (pg-promise)
│
├── middleware/
│   └── authenticate.js                    ← JWT verify + role-based authorize()
│
├── utils/
│   ├── jwt-helpers.js                     ← generateTokens(user)
│   └── emailValidation.js                 ← Email regex
│
├── migrations/
│   ├── 001_initial_schema.sql             ← Full schema (10 tables + indexes + seeds)
│   └── run.js                             ← Node script to execute migration
│
├── services/
│   ├── openLibraryService.js              ← searchBooks(), getBookByISBN()
│   └── awardService.js                    ← checkAndAwardStickers(), getSchoolYear()
│
├── queries/
│   ├── users.js                           ← User CRUD + find by username/email/google
│   ├── booksCatalog.js                    ← Book catalog CRUD + ISBN dedup
│   ├── readingLog.js                      ← Reading log CRUD + stats aggregation
│   ├── sessions.js                        ← Session CRUD + streak SQL + heatmap
│   ├── awards.js                          ← Award list + earned + custom + assign
│   ├── notifications.js                   ← Teacher notification CRUD + broadcast
│   ├── classEnrollment.js                 ← Class enrollment CRUD
│   └── goals.js                           ← Reading goals CRUD
│
├── controllers/
│   ├── userController.js                  ← /api/users — auth endpoints
│   ├── readingLogController.js            ← /api/reading-log — book tracking
│   ├── sessionController.js               ← /api/sessions — daily reading + notifications
│   ├── bookSearchController.js            ← /api/book-search — Open Library proxy
│   ├── awardController.js                 ← /api/awards — stickers + custom + assign
│   ├── notificationController.js          ← /api/notifications — teacher inbox
│   ├── classController.js                 ← /api/class — enrollment + stats + daily
│   ├── goalController.js                  ← /api/goals — reading targets
│   ├── reportController.js                ← /api/reports — yearly summaries
│   ├── bookController.js                  ← /api/books — legacy CRUD (original books table)
│   ├── teachersController.js              ← /api/teachers — legacy CRUD
│   ├── studentController.js               ← /api/students — legacy CRUD + /logs nested route
│   ├── commentController.js               ← /api/comments — legacy CRUD
│   ├── noteController.js                  ← /api/notes — legacy CRUD
│   ├── subscriptionController.js          ← /api/subscriptions — legacy CRUD
│   └── dictionaryController.js            ← /api/dictionary — legacy CRUD (flashcards/vocab)
│
├── learning-log.md                        ← Detailed feature documentation (this companion)
└── plan.md                                ← This file
```

**Total: 42 files** (excluding node_modules)

---

## All 42 API Endpoints

### Authentication (4)

| # | Method | Endpoint | Auth | Role | Description |
|---|--------|----------|------|------|-------------|
| 1 | POST | `/api/users/login` | None | Any | Login with username + password → returns JWT |
| 2 | POST | `/api/users` | None | Any | Register new user → returns JWT |
| 3 | POST | `/api/users/google-login` | None | Any | Google OAuth login/register → returns JWT |
| 4 | GET | `/api/users/me` | JWT | Any | Get current user from token |

### Reading Log (7)

| # | Method | Endpoint | Auth | Role | Description |
|---|--------|----------|------|------|-------------|
| 5 | GET | `/api/reading-log` | JWT | Any | Get user's full reading log with book details |
| 6 | GET | `/api/reading-log/stats` | JWT | Any | Get aggregate reading stats |
| 7 | GET | `/api/reading-log/user/:userId` | JWT | Any | Get another user's log (teacher/parent) |
| 8 | GET | `/api/reading-log/:id` | JWT | Any | Get single log entry |
| 9 | POST | `/api/reading-log` | JWT | Any | Add book to log (creates in catalog if new) |
| 10 | PUT | `/api/reading-log/:id` | JWT | Any | Update status, rating, review, page |
| 11 | DELETE | `/api/reading-log/:id` | JWT | Any | Remove book from log |

### Reading Sessions (5)

| # | Method | Endpoint | Auth | Role | Description |
|---|--------|----------|------|------|-------------|
| 12 | GET | `/api/sessions` | JWT | Any | Get user's all sessions |
| 13 | GET | `/api/sessions/streak` | JWT | Any | Get current + longest streak |
| 14 | GET | `/api/sessions/heatmap` | JWT | Any | Get 365 days of daily aggregated data |
| 15 | GET | `/api/sessions/daily/:date` | JWT | Any | Get all sessions for a specific date |
| 16 | POST | `/api/sessions` | JWT | Any | Log a reading session + notify teachers |

### Book Search (2)

| # | Method | Endpoint | Auth | Role | Description |
|---|--------|----------|------|------|-------------|
| 17 | GET | `/api/book-search?q=` | JWT | Any | Search Open Library by title/author |
| 18 | GET | `/api/book-search/isbn/:isbn` | JWT | Any | Look up book by ISBN |

### Awards (5)

| # | Method | Endpoint | Auth | Role | Description |
|---|--------|----------|------|------|-------------|
| 19 | GET | `/api/awards` | JWT | Any | List all available awards |
| 20 | GET | `/api/awards/earned` | JWT | Any | Get current user's earned awards |
| 21 | POST | `/api/awards/check` | JWT | Any | Trigger award check for current user |
| 22 | POST | `/api/awards/custom` | JWT | Teacher | Create a custom award |
| 23 | POST | `/api/awards/assign` | JWT | Teacher | Manually assign award to student |

### Teacher Notifications (3)

| # | Method | Endpoint | Auth | Role | Description |
|---|--------|----------|------|------|-------------|
| 24 | GET | `/api/notifications` | JWT | Teacher | Get notifications + unread count |
| 25 | PUT | `/api/notifications/:id/read` | JWT | Teacher | Mark one as read |
| 26 | PUT | `/api/notifications/read-all` | JWT | Teacher | Mark all as read |

### Class Management (4)

| # | Method | Endpoint | Auth | Role | Description |
|---|--------|----------|------|------|-------------|
| 27 | GET | `/api/class/students` | JWT | Teacher | List enrolled students |
| 28 | GET | `/api/class/stats` | JWT | Teacher | Aggregate class reading statistics |
| 29 | GET | `/api/class/daily/:date` | JWT | Teacher | Who read on a date + summary |
| 30 | POST | `/api/class/enroll` | JWT | Teacher | Enroll a student |

### Reading Goals (3)

| # | Method | Endpoint | Auth | Role | Description |
|---|--------|----------|------|------|-------------|
| 31 | GET | `/api/goals` | JWT | Any | Get goals (role-aware) |
| 32 | POST | `/api/goals` | JWT | Teacher | Set a reading goal |
| 33 | DELETE | `/api/goals/:id` | JWT | Teacher | Remove a goal |

### Year Reports (2)

| # | Method | Endpoint | Auth | Role | Description |
|---|--------|----------|------|------|-------------|
| 34 | GET | `/api/reports/student/:userId/:year` | JWT | Any | Student yearly report |
| 35 | GET | `/api/reports/class/:year` | JWT | Teacher | Class yearly report |

### Legacy — Books (5)

| # | Method | Endpoint | Auth | Role | Description |
|---|--------|----------|------|------|-------------|
| 36 | GET | `/api/books` | None | Any | List all books (original books table) |
| 37 | GET | `/api/books/:bookId` | None | Any | Get single book |
| 38 | POST | `/api/books/new` | None | Any | Add a book |
| 39 | PUT | `/api/books/:bookId` | None | Any | Update a book |
| 40 | DELETE | `/api/books/:bookId` | None | Any | Delete a book |

### Legacy — Teachers (5)

| # | Method | Endpoint | Auth | Role | Description |
|---|--------|----------|------|------|-------------|
| 41 | GET | `/api/teachers` | None | Any | List all teachers |
| 42 | GET | `/api/teachers/:id` | None | Any | Get single teacher |
| 43 | POST | `/api/teachers/new` | None | Any | Add a teacher |
| 44 | PUT | `/api/teachers/:teacherId` | None | Any | Update a teacher |
| 45 | DELETE | `/api/teachers/:id` | None | Any | Delete a teacher |

### Legacy — Students (6)

| # | Method | Endpoint | Auth | Role | Description |
|---|--------|----------|------|------|-------------|
| 46 | GET | `/api/students` | None | Any | List all students |
| 47 | GET | `/api/students/:studentId` | None | Any | Get single student |
| 48 | GET | `/api/students/:studentId/logs` | None | Any | Get reading logs for a student |
| 49 | POST | `/api/students/new` | None | Any | Add a student |
| 50 | PUT | `/api/students/:studentId` | None | Any | Update a student |
| 51 | DELETE | `/api/students/:studentId` | None | Any | Delete a student |

### Legacy — Comments, Notes, Subscriptions, Dictionary (19)

| # | Method | Endpoint | Auth | Role | Description |
|---|--------|----------|------|------|-------------|
| 52 | GET | `/api/comments` | None | Any | List all comments |
| 53 | GET | `/api/comments/:commentId` | None | Any | Get single comment |
| 54 | POST | `/api/comments/new` | None | Any | Add a comment |
| 55 | PUT | `/api/comments/:commentId` | None | Any | Update a comment |
| 56 | DELETE | `/api/comments/:commentId` | None | Any | Delete a comment |
| 57 | GET | `/api/notes` | None | Any | List all notes |
| 58 | GET | `/api/notes/:noteId` | None | Any | Get single note |
| 59 | POST | `/api/notes/new` | None | Any | Add a note |
| 60 | PUT | `/api/notes/:noteId` | None | Any | Update a note |
| 61 | DELETE | `/api/notes/:noteId` | None | Any | Delete a note |
| 62 | GET | `/api/subscriptions` | None | Any | List all subscriptions |
| 63 | POST | `/api/subscriptions` | None | Any | Add subscription |
| 64 | PUT | `/api/subscriptions/update/:email` | None | Any | Update subscription |
| 65 | DELETE | `/api/subscriptions/unsubscribe/:email` | None | Any | Delete subscription |
| 66 | GET | `/api/dictionary` | None | Any | List all words |
| 67 | GET | `/api/dictionary/:word` | None | Any | Get single word |
| 68 | POST | `/api/dictionary` | None | Any | Add a word |
| 69 | PUT | `/api/dictionary/:id` | None | Any | Update a word |
| 70 | DELETE | `/api/dictionary/:id` | None | Any | Delete a word |

---

## Setup Guide

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- A Google Cloud project with OAuth 2.0 Client ID (for Google login)

### Step 1: Install Dependencies

```bash
cd ~/CapstoneGroup5-v2-backend
npm install
```

### Step 2: Configure Environment

Edit `.env`:
```env
PORT=3010
DATABASE_URL=postgres://user:password@localhost:5432/scholarsheep_v2
ACCESS_TOKEN_SECRET=your_random_secret_at_least_32_chars
REFRESH_TOKEN_SECRET=another_random_secret_at_least_32_chars
GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

### Step 3: Create Database

```bash
createdb scholarsheep_v2
```

### Step 4: Run Migrations

```bash
npm run migrate
```

This creates all 10 tables, indexes, and seeds 18 default awards.

### Step 5: Start the Server

```bash
# Development (auto-restart on changes)
npm run dev

# Production
npm start
```

Server starts on `http://localhost:3010`

### Step 6: Point Frontend to Backend

In the frontend `.env`:
```env
VITE_API_URL=http://localhost:3010
```

### Step 7: Connect Frontend

In the frontend `src/services/demoAuthService.js`, set:
```javascript
export function isDemoMode() {
  return false; // Disable demo mode, use real backend
}
```

---

## Testing Endpoints with curl

### Register a user
```bash
curl -X POST http://localhost:3010/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"alice@test.com","password":"test123","userrole":"student"}'
```

### Login
```bash
curl -X POST http://localhost:3010/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"test123"}'
```

### Search books
```bash
curl "http://localhost:3010/api/book-search?q=harry+potter" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Add book to reading log
```bash
curl -X POST http://localhost:3010/api/reading-log \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Charlotte'\''s Web","author":"E.B. White","isbn":"9780064400558","page_count":184,"status":"reading"}'
```

### Log a reading session
```bash
curl -X POST http://localhost:3010/api/sessions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"book_id":1,"reading_log_id":1,"pages_read":25,"minutes_spent":30,"notes":"Great chapter"}'
```

### Check awards
```bash
curl -X POST http://localhost:3010/api/awards/check \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get teacher comment for a log
```bash
curl -s http://localhost:3010/api/comments/logs/1
# Returns: { success: true, payload: { teacher_comments: "Great understanding..." } }
```

### Get student logs
```bash
curl -s http://localhost:3010/api/students/1/logs
# Returns: { success: true, payload: [{ log_id, book_title, pages_read, ... }] }
```

---

## Deployment (Render)

### Step 1: Push to GitHub
```bash
cd ~/CapstoneGroup5-v2-backend
git init
git add -A
git commit -m "ScholarSheep v2 backend — Express + PostgreSQL + JWT"
git remote add origin git@github.com:meera-ramesh19/CapstoneGroup5-v2-backend.git
git push -u origin main
```

### Step 2: Create Render Web Service
1. Go to [render.com](https://render.com) → New → Web Service
2. Connect your GitHub repo
3. Settings:
   - **Build command:** `npm install`
   - **Start command:** `npm start`
   - **Environment:** Node
4. Add environment variables from `.env`

### Step 3: Create Render PostgreSQL
1. Render → New → PostgreSQL
2. Copy the Internal Database URL
3. Set as `DATABASE_URL` env var on the web service

### Step 4: Run Migration
After first deploy, open the Render shell and run:
```bash
node migrations/run.js
```

### Step 5: Update Frontend
Set `VITE_API_URL` in the frontend to the Render service URL.

---

## Status Summary

| Component | Files | Endpoints | Status |
|-----------|-------|-----------|--------|
| User Auth (login/register/Google) | 3 | 4 | DONE |
| Reading Log CRUD | 2 | 7 | DONE |
| Reading Sessions + Notifications | 2 | 5 | DONE |
| Book Search (Open Library) | 2 | 2 | DONE |
| Awards Engine + CRUD | 3 | 5 | DONE |
| Teacher Notifications | 2 | 3 | DONE |
| Class Management | 2 | 4 | DONE |
| Reading Goals | 2 | 3 | DONE |
| Year Reports | 1 | 2 | DONE |
| Legacy — Books | 2 | 5 | DONE |
| Legacy — Teachers | 2 | 5 | DONE |
| Legacy — Students (+logs route) | 2 | 6 | DONE |
| Legacy — Comments | 2 | 5 | DONE |
| Legacy — Notes | 2 | 5 | DONE |
| Legacy — Subscriptions | 2 | 5 | DONE |
| Legacy — Dictionary (flashcards) | 2 | 5 | DONE |
| Database Schema + Migration (2 files) | 2 | — | DONE |
| Middleware + Utils | 3 | — | DONE |
| Config (server, app, env) | 4 | — | DONE |
| Book Clubs (create, join, posts) | 2 | 9 | DONE |
| Reading Partners (invite, accept, chat) | 2 | 6 | DONE |
| Leaderboard (global + class) | 2 | 2 | DONE |
| Recommendations (per-book, per-user, refresh) | 2 | 3 | DONE |
| New Features Migration | 1 | — | DONE |
| **Total** | **51** | **90** | **ALL DONE** |

---

## Seed Data (from migrations)

| Table | Records | Data |
|-------|---------|------|
| books | 12 | Night Owl, Cookies Week, Charlotte's Web, Matilda, Diary of a Wimpy Kid, Harry Potter, etc. |
| teachers | 4 | Ms. Fundy, Ms. Perez, Mr. Edmundson, Ms. Blackmond |
| students | 3 | Celia Edward, Jade Duncan, Barry Lioudis |
| awards | 18 | First Book, Bookworm, On Fire, Genre Curious, Page Turner, Reviewer, etc. |
| personal_dictionary | 16 | adventure, brave, curious, discover, fiction, generous, etc. (grades K-5) |
| email_subscriptions | 3 | Thomas, Christine, Norma |

---

## Bug Fixes Applied

| Issue | Fix | File |
|-------|-----|------|
| `GET /api/students/:id/logs` didn't exist | Added nested route returning logs for a student | `controllers/studentController.js` |
| Legacy tables missing from DB | Created `002_legacy_tables.sql` with books, logs, comments, notes, subscriptions, dictionary tables + seed data | `migrations/002_legacy_tables.sql` |
| Migration runner only ran 1 file | Updated to loop through all migration files | `migrations/run.js` |
| `students` table PK was `id`, legacy code expected `student_id` | Changed PK to `student_id` + added legacy columns (parent_name, student_email, etc.) | `migrations/001_initial_schema.sql` |
| `teachers` table PK was `id`, legacy code expected `teacher_id` | Changed PK to `teacher_id` + added legacy columns (school_name, zipcode, etc.) | `migrations/001_initial_schema.sql` |
| FK references to `teachers(id)` broken | Updated to `teachers(teacher_id)` | `migrations/001_initial_schema.sql` |
| No flashcard/vocabulary data | Seeded 16 words across grades K-5 with definitions, examples, synonyms, antonyms | `migrations/002_legacy_tables.sql` |
