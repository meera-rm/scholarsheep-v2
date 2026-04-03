# ScholarSheep v2 Backend — Learning Log

## Overview

This document describes every backend feature, how it works, which files are involved, and how each endpoint connects to the frontend. The backend is built with **Express.js + PostgreSQL + JWT** and provides the API for the ScholarSheep v2 reading engagement platform.

---

## 1. Architecture

```
Frontend (React 19 + Vite)
        │
        ▼
Express.js API Server (port 3010)
        │
        ├── middleware/authenticate.js   → JWT verification + role checking
        │
        ├── controllers/                 → Route handlers (HTTP logic)
        │       │
        │       ▼
        ├── queries/                     → SQL queries (data access layer)
        │       │
        │       ▼
        ├── services/                    → Business logic (awards engine, Open Library)
        │
        ▼
PostgreSQL Database (10 tables)
        │
        ▼
Open Library API (external — book search, covers)
```

### Request Flow

```
Client sends request with JWT in Authorization header
        ↓
authenticate middleware verifies token → attaches req.user
        ↓
authorize middleware checks req.user.role against allowed roles
        ↓
Controller handles the request, calls queries/services
        ↓
Query executes SQL against PostgreSQL via pg-promise
        ↓
Response sent back as JSON
```

---

## 2. Database Schema (10 Tables)

All tables are defined in `migrations/001_initial_schema.sql`.

### 2.1 users

Stores all accounts — students, teachers, parents, admins.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Auto-incrementing ID |
| username | VARCHAR(100) UNIQUE | Login username |
| email | VARCHAR(255) UNIQUE | Email address |
| password | VARCHAR(255) | bcrypt hashed password (null for Google-only users) |
| user_role | VARCHAR(20) | `student`, `teacher`, or `parent` |
| user_avatar | TEXT | Profile image URL |
| google_id | VARCHAR(100) UNIQUE | Google OAuth subject ID (null for email-only users) |
| created_at | TIMESTAMP | Account creation time |

### 2.2 books_catalog

Master catalog of all books. Populated from Open Library API or manual entry. Shared across all users — when a student adds a book, it goes here once.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Book ID |
| title | VARCHAR(500) | Book title |
| author | VARCHAR(300) | Author name |
| isbn | VARCHAR(20) UNIQUE | ISBN (used for deduplication) |
| cover_url | TEXT | Cover image URL from Open Library |
| page_count | INTEGER | Total pages |
| genre | VARCHAR(100) | Primary genre/subject |
| reading_level | VARCHAR(50) | Lexile or grade level |
| open_library_id | VARCHAR(100) | Open Library key (e.g., `/works/OL12345W`) |
| description | TEXT | Book description |
| publish_year | INTEGER | Year published |
| created_at | TIMESTAMP | When added to our catalog |

### 2.3 reading_log

One entry per user per book. Tracks which books each user is reading, has read, or wants to read.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Entry ID |
| user_id | INTEGER FK → users | Who is reading this |
| book_id | INTEGER FK → books_catalog | Which book |
| status | VARCHAR(20) | `want_to_read`, `reading`, `completed`, `abandoned` |
| start_date | DATE | When they started reading (auto-set) |
| end_date | DATE | When they finished (auto-set on completion) |
| current_page | INTEGER | Bookmark — where they are now |
| rating | INTEGER (1-5) | Star rating (set after reading) |
| review | TEXT | Written review/thoughts |
| school_year | VARCHAR(10) | e.g., `2025-2026` |
| created_at | TIMESTAMP | When added to log |
| updated_at | TIMESTAMP | Last modification |

**Constraint:** `UNIQUE(user_id, book_id)` — a user can only have one entry per book.

### 2.4 reading_sessions

Individual reading activity entries. A student may log multiple sessions per day across different books.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Session ID |
| user_id | INTEGER FK → users | Who read |
| book_id | INTEGER FK → books_catalog | Which book |
| reading_log_id | INTEGER FK → reading_log | Links to the log entry |
| session_date | DATE | Date of the session |
| pages_read | INTEGER | Pages read in this session |
| minutes_spent | INTEGER | Minutes spent reading |
| notes | TEXT | Optional notes about the session |
| created_at | TIMESTAMP | When logged |

**This is the key table for:**
- Reading streak calculation
- Heatmap data
- Teacher daily activity feed
- Parent email notifications

### 2.5 awards

Catalog of all stickers/badges. 18 pre-seeded system awards + teacher-created custom awards.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Award ID |
| name | VARCHAR(100) | Award name (e.g., "Bookworm") |
| description | TEXT | How to earn it |
| category | VARCHAR(50) | `volume`, `streak`, `genre`, `pages`, `special`, `custom` |
| criteria_type | VARCHAR(50) | `books_completed`, `streak_days`, `genres_read`, `pages_read`, `reviews_written`, `manual` |
| criteria_value | INTEGER | Threshold (e.g., 5 for "5 books completed") |
| sticker_image_url | TEXT | Custom image URL (for custom awards) |
| sticker_emoji | VARCHAR(10) | Emoji representation |
| tier | VARCHAR(20) | `bronze`, `silver`, `gold`, `platinum`, `diamond` |
| is_custom | BOOLEAN | false = system, true = teacher-created |
| created_by_teacher_id | INTEGER FK → teachers | Who created it (custom only) |
| created_at | TIMESTAMP | When created |

### 2.6 student_awards

Join table — which users have earned which awards.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Record ID |
| user_id | INTEGER FK → users | Who earned it |
| award_id | INTEGER FK → awards | Which award |
| earned_date | DATE | When earned |
| school_year | VARCHAR(10) | School year |
| awarded_by | VARCHAR(20) | `system` (auto) or `teacher` (manual) |

**Constraint:** `UNIQUE(user_id, award_id, school_year)` — can only earn each award once per year.

### 2.7 reading_goals

Reading targets set by teachers for their students or entire class.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Goal ID |
| teacher_id | INTEGER FK → users | Teacher who set it |
| student_id | INTEGER FK → users | Specific student (NULL = whole class) |
| goal_type | VARCHAR(30) | `books_per_month`, `pages_per_day`, `minutes_per_day`, `books_per_year` |
| goal_value | INTEGER | Target number |
| school_year | VARCHAR(10) | School year |
| created_at | TIMESTAMP | When set |

### 2.8 class_enrollment

Links students to teachers/classes for a school year.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Record ID |
| student_id | INTEGER FK → users | Student |
| teacher_id | INTEGER FK → users | Teacher |
| class_name | VARCHAR(100) | e.g., "4th Grade Reading" |
| school_year | VARCHAR(10) | School year |
| enrolled_date | DATE | When enrolled |

**Constraint:** `UNIQUE(student_id, teacher_id, school_year)`

**This table is critical for:**
- Teacher seeing only their own students
- Notifications being routed to the correct teacher
- Class-level statistics

### 2.9 teacher_notifications

In-app notifications for teachers about student activity.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Notification ID |
| teacher_id | INTEGER FK → users | Which teacher receives this |
| type | VARCHAR(50) | `reading_session`, `book_completed`, `award_earned` |
| title | VARCHAR(255) | Short title |
| message | TEXT | Detailed message |
| student_id | INTEGER FK → users | Which student triggered it |
| student_name | VARCHAR(200) | Student's username (denormalized for speed) |
| metadata | JSONB | Extra data (book_id, pages, etc.) |
| is_read | BOOLEAN | Has teacher seen it |
| created_at | TIMESTAMP | When created |

### 2.10 teachers & students (legacy)

These tables from the original backend are preserved for backward compatibility with existing pages (TeacherIndex, StudentIndex, etc.).

### Database Indexes

```sql
idx_reading_log_user          ON reading_log(user_id)
idx_reading_log_status        ON reading_log(status)
idx_reading_log_year          ON reading_log(school_year)
idx_sessions_user_date        ON reading_sessions(user_id, session_date)
idx_sessions_date             ON reading_sessions(session_date)
idx_student_awards_user       ON student_awards(user_id)
idx_class_enrollment_teacher  ON class_enrollment(teacher_id, school_year)
idx_notifications_teacher     ON teacher_notifications(teacher_id, is_read)
idx_users_role                ON users(user_role)
```

---

## 3. Authentication & Authorization

### 3.1 JWT Token Flow

```
User logs in (POST /api/users/login)
        ↓
Server verifies password with bcrypt
        ↓
Server generates JWT with payload: { id, username, email, role, avatar }
        ↓
Returns { accessToken, refreshToken } (both expire in 30 days)
        ↓
Frontend stores accessToken in localStorage
        ↓
Every API request includes: Authorization: Bearer <accessToken>
        ↓
authenticate middleware verifies token and attaches req.user
```

### 3.2 Token Payload

```json
{
  "id": 1,
  "username": "alice_reader",
  "email": "alice@example.com",
  "role": "student",
  "avatar": "",
  "iat": 1711234567,
  "exp": 1713826567
}
```

### 3.3 Google OAuth Flow

```
Frontend: User clicks "Sign in with Google"
        ↓
Google returns a credential JWT (ID token)
        ↓
Frontend sends: POST /api/users/google-login { credential, role }
        ↓
Backend: google-auth-library verifies the Google token
        ↓
Backend: Extracts { googleId, email, name, picture } from token
        ↓
Backend: Checks if user exists by google_id → then by email
        ↓
If exists: return JWT tokens
If new: create user with role from request → return JWT tokens
```

### 3.4 Role-Based Access

The `authorize()` middleware restricts endpoints by role:

```javascript
// Only teachers can access
router.post('/enroll', authorize('teacher'), handler);

// Teachers and parents can access
router.get('/student/:id', authorize('teacher', 'parent'), handler);
```

| Role | Can Access |
|------|-----------|
| **student** | Own reading log, sessions, stats, awards, book search |
| **teacher** | Everything student can + class management, notifications, goals, custom awards, reports |
| **parent** | Own child's reading log, stats, awards + email notification settings |

### 3.5 Files

| File | Purpose |
|------|---------|
| `middleware/authenticate.js` | `authenticate()` — verifies JWT, `authorize(...roles)` — checks role |
| `utils/jwt-helpers.js` | `generateTokens(user)` — creates access + refresh tokens |
| `controllers/userController.js` | Login, register, Google OAuth endpoints |

---

## 4. Reading Log API

### 4.1 Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/reading-log` | Any | Get current user's full reading log (with book details) |
| GET | `/api/reading-log/stats` | Any | Get current user's aggregate stats |
| GET | `/api/reading-log/user/:userId` | Any | Get another user's log (for teacher/parent views) |
| GET | `/api/reading-log/:id` | Any | Get single entry with book details |
| POST | `/api/reading-log` | Any | Add a book to reading log |
| PUT | `/api/reading-log/:id` | Any | Update status, rating, review, current page |
| DELETE | `/api/reading-log/:id` | Any | Remove book from log |

### 4.2 Adding a Book (POST /api/reading-log)

Request body:
```json
{
  "title": "Charlotte's Web",
  "author": "E.B. White",
  "isbn": "9780064400558",
  "cover_url": "https://covers.openlibrary.org/b/isbn/9780064400558-M.jpg",
  "page_count": 184,
  "genre": "Fiction",
  "open_library_id": "/works/OL87440W",
  "status": "reading"
}
```

What happens:
1. Check if book exists in `books_catalog` by ISBN
2. If not, create it (ON CONFLICT updates existing)
3. Create `reading_log` entry linking user to book
4. If status is `reading`, auto-set `start_date` to today
5. Run `checkAndAwardStickers()` — may earn "First Book" sticker
6. Return entry + any new awards

### 4.3 Updating Status (PUT /api/reading-log/:id)

When status changes to `completed`:
- `end_date` auto-set to today
- `current_page` set to total pages
- Teacher notification sent: "alice_reader finished a book!"
- Award engine runs (may earn volume/genre/pages stickers)
- New award notifications sent to teacher

### 4.4 Stats Response (GET /api/reading-log/stats)

```json
{
  "stats": {
    "total_books": 23,
    "currently_reading": 2,
    "want_to_read": 5,
    "total_pages": 4500,
    "avg_rating": 4.2
  }
}
```

### 4.5 Files

| File | Purpose |
|------|---------|
| `controllers/readingLogController.js` | All reading log endpoints |
| `queries/readingLog.js` | SQL queries — getByUser, create, update, remove, getStats |
| `queries/booksCatalog.js` | SQL queries — findByISBN, createBook |

---

## 5. Reading Sessions API

### 5.1 Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/sessions` | Any | Get current user's all sessions |
| GET | `/api/sessions/streak` | Any | Get current + longest reading streak |
| GET | `/api/sessions/heatmap` | Any | Get 365 days of daily reading stats |
| GET | `/api/sessions/book/:bookId` | Any | Get sessions for a specific book |
| GET | `/api/sessions/daily/:date` | Any | Get all sessions for a date (teacher view) |
| POST | `/api/sessions` | Any | Log a new reading session |

### 5.2 Logging a Session (POST /api/sessions)

Request body:
```json
{
  "book_id": 42,
  "reading_log_id": 15,
  "session_date": "2026-03-16",
  "pages_read": 25,
  "minutes_spent": 30,
  "notes": "Learned about Charlotte's plan to save Wilbur"
}
```

What happens:
1. Insert into `reading_sessions`
2. Update `current_page` on the reading log entry (+25 pages)
3. Notify all of this student's teachers via `notifyTeachersOfStudent()`
4. Run `checkAndAwardStickers()` — may earn streak/pages stickers
5. Return session + any new awards

**This is the trigger point for:**
- Teacher in-app notifications (bell icon)
- Teacher activity feed (today/yesterday readers)
- Frontend triggers parent email notification

### 5.3 Streak Calculation (SQL)

The streak query uses window functions:
1. Get all distinct session dates for the user
2. Number them in reverse chronological order
3. Subtract the row number from each date — consecutive dates produce the same group value
4. Count the group that includes today or yesterday = current streak
5. Find the largest group = longest streak

### 5.4 Heatmap Data (GET /api/sessions/heatmap)

Returns daily aggregated data for the last 365 days:
```json
{
  "heatmap": [
    { "session_date": "2026-03-16", "total_pages": 25, "total_minutes": 30, "session_count": 1 },
    { "session_date": "2026-03-15", "total_pages": 40, "total_minutes": 45, "session_count": 2 }
  ]
}
```

### 5.5 Files

| File | Purpose |
|------|---------|
| `controllers/sessionController.js` | All session endpoints + notification triggers |
| `queries/sessions.js` | SQL queries — create, getByUser, getStreak, getDailyStats, getByDate |

---

## 6. Book Search API (Open Library Proxy)

### 6.1 Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/book-search?q=harry+potter&limit=12` | Any | Search books by title/author |
| GET | `/api/book-search/isbn/9780545010221` | Any | Look up book by ISBN |

### 6.2 Why a Proxy?

- Prevents CORS issues (Open Library doesn't set CORS headers for all browsers)
- Allows server-side caching in the future
- Normalizes the response format for our frontend
- Filters to only the fields we need

### 6.3 Search Response

```json
{
  "results": [
    {
      "title": "Harry Potter and the Sorcerer's Stone",
      "author": "J. K. Rowling",
      "isbn": "9780590353427",
      "cover_url": "https://covers.openlibrary.org/b/id/10521270-M.jpg",
      "publish_year": 1997,
      "page_count": 309,
      "genre": "Fiction",
      "open_library_id": "/works/OL82563W"
    }
  ]
}
```

### 6.4 Files

| File | Purpose |
|------|---------|
| `controllers/bookSearchController.js` | Search and ISBN lookup endpoints |
| `services/openLibraryService.js` | Axios client for Open Library API |

---

## 7. Awards & Stickers API

### 7.1 Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/awards` | Any | List all 18 system + custom awards |
| GET | `/api/awards/earned` | Any | Get current user's earned awards |
| GET | `/api/awards/earned/:userId` | Any | Get a specific user's earned awards |
| POST | `/api/awards/check` | Any | Manually trigger award check |
| POST | `/api/awards/custom` | Teacher | Create a custom award |
| POST | `/api/awards/assign` | Teacher | Manually assign award to student |

### 7.2 Auto-Award Engine

`services/awardService.js` → `checkAndAwardStickers(userId)`

This runs automatically after every:
- Reading log entry created
- Reading log status updated
- Reading session logged
- Review written

**How it works:**

```
1. Query COUNT of completed books for this user
2. Calculate reading streak from reading_sessions dates
3. Query COUNT(DISTINCT genre) from completed books
4. Query SUM(page_count) from completed books
5. Query COUNT of non-empty reviews
6. Get all system awards + already earned awards
7. For each un-earned award:
   - Compare user's stat against criteria_value
   - If met → INSERT into student_awards
8. Return array of newly earned awards
```

### 7.3 The 18 System Awards

| Category | Name | Criteria | Tier |
|----------|------|----------|------|
| Volume | First Book | 1 book completed | Bronze |
| Volume | Bookworm | 5 books | Silver |
| Volume | Book Explorer | 10 books | Gold |
| Volume | Reading Machine | 25 books | Platinum |
| Volume | Library Legend | 50 books | Diamond |
| Volume | Century Reader | 100 books | Diamond |
| Streak | Getting Started | 3-day streak | Bronze |
| Streak | On Fire | 7-day streak | Silver |
| Streak | Unstoppable | 14-day streak | Gold |
| Streak | Reading Warrior | 30-day streak | Platinum |
| Genre | Genre Curious | 3 genres | Bronze |
| Genre | Genre Adventurer | 5 genres | Silver |
| Genre | Genre Master | 8 genres | Gold |
| Pages | Page Turner | 500 pages | Bronze |
| Pages | Chapter Champion | 2000 pages | Silver |
| Pages | Novel Navigator | 5000 pages | Gold |
| Special | Reviewer | 5 reviews | Bronze |
| Special | Critic | 20 reviews | Gold |

### 7.4 Custom Awards (Teacher)

Teachers can create awards for their specific class:

```json
POST /api/awards/custom
{
  "name": "Star Reader of March",
  "description": "Best reader in Ms. Ramesh's class for March 2026",
  "sticker_emoji": "🌟",
  "tier": "gold"
}
```

Then assign to a student:
```json
POST /api/awards/assign
{
  "student_id": 5,
  "award_id": 19
}
```

### 7.5 Files

| File | Purpose |
|------|---------|
| `controllers/awardController.js` | Award CRUD endpoints |
| `queries/awards.js` | SQL queries — getAll, getEarnedByUser, assignAward, createCustomAward |
| `services/awardService.js` | `checkAndAwardStickers()` — the auto-award engine |

---

## 8. Teacher Notifications API

### 8.1 Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/notifications` | Teacher | Get notifications + unread count |
| GET | `/api/notifications/unread-count` | Teacher | Get just the unread count (for bell badge) |
| PUT | `/api/notifications/:id/read` | Teacher | Mark one notification as read |
| PUT | `/api/notifications/read-all` | Teacher | Mark all as read |

### 8.2 How Notifications Are Created

Notifications are NOT created via a direct API call. They are created **automatically** by the session and reading log controllers when a student takes an action:

| Student Action | Notification Type | Message Example |
|---------------|-------------------|-----------------|
| Logs reading session | `reading_session` | "alice_reader logged a reading session — Read 25 pages (30 min)" |
| Marks book as completed | `book_completed` | "alice_reader finished a book! — Completed 'Charlotte's Web' — rated 5/5" |
| Earns a new sticker | `award_earned` | "alice_reader earned a sticker! — 📖 First Book" |

### 8.3 Routing to the Right Teacher

When a student triggers a notification:
1. Query `class_enrollment` for all teachers of this student
2. Create a notification for EACH teacher
3. Each teacher sees only notifications about their own students

```javascript
// queries/notifications.js
async function notifyTeachersOfStudent(studentId, notification) {
  const teachers = await db.any(
    'SELECT DISTINCT teacher_id FROM class_enrollment WHERE student_id=$1',
    [studentId]
  );
  for (const { teacher_id } of teachers) {
    await create({ ...notification, teacher_id });
  }
}
```

### 8.4 Frontend Integration

- **NotificationBell.jsx** polls `GET /api/notifications/unread-count` every 10 seconds
- Bell badge shows the count
- Clicking bell fetches full notification list
- Clicking a notification calls `PUT /api/notifications/:id/read`
- "Mark all read" calls `PUT /api/notifications/read-all`

### 8.5 Files

| File | Purpose |
|------|---------|
| `controllers/notificationController.js` | Notification CRUD endpoints (teacher only) |
| `queries/notifications.js` | SQL queries + `notifyTeachersOfStudent()` helper |
| `controllers/sessionController.js` | Creates notifications when sessions logged |
| `controllers/readingLogController.js` | Creates notifications on book completion + awards |

---

## 9. Class Management API

### 9.1 Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/class/students` | Teacher | List all enrolled students |
| GET | `/api/class/stats` | Teacher | Aggregate class reading statistics |
| GET | `/api/class/daily/:date` | Teacher | Who read on a specific date |
| POST | `/api/class/enroll` | Teacher | Enroll a student in the class |
| DELETE | `/api/class/enroll/:studentId` | Teacher | Remove a student from class |

### 9.2 Class Stats Response (GET /api/class/stats)

```json
{
  "stats": {
    "total_students": 24,
    "total_books": 156,
    "total_pages": 34000,
    "avg_books": 6.5,
    "students_data": [
      {
        "student_id": 5,
        "username": "alice_reader",
        "total_books": 23,
        "currently_reading": 2,
        "want_to_read": 5,
        "total_pages": 4500,
        "avg_rating": 4.2,
        "current_streak": 12,
        "longest_streak": 22
      }
    ]
  }
}
```

Students are sorted by `total_books` descending (leaderboard order).

### 9.3 Daily Activity (GET /api/class/daily/2026-03-16)

Returns all reading sessions for a date, filtered to only this teacher's enrolled students:

```json
{
  "date": "2026-03-16",
  "sessions": [...],
  "summary": {
    "total_sessions": 12,
    "unique_readers": 8,
    "total_pages": 340,
    "total_minutes": 420
  }
}
```

This powers the **TeacherActivityFeed** component (Today/Yesterday toggle).

### 9.4 Files

| File | Purpose |
|------|---------|
| `controllers/classController.js` | Class endpoints — enroll, stats, daily |
| `queries/classEnrollment.js` | SQL queries — getStudentsByTeacher, enroll, unenroll |

---

## 10. Reading Goals API

### 10.1 Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/goals` | Any | Get goals (teachers see goals they set, students see their goals) |
| GET | `/api/goals/student/:studentId` | Teacher/Parent | Get goals for a specific student |
| POST | `/api/goals` | Teacher | Set a reading goal |
| DELETE | `/api/goals/:id` | Teacher | Remove a goal |

### 10.2 Goal Types

| Type | Example |
|------|---------|
| `books_per_month` | Read 5 books per month |
| `books_per_year` | Read 40 books this school year |
| `pages_per_day` | Read 20 pages per day |
| `minutes_per_day` | Read 30 minutes per day |

### 10.3 Class-Wide vs Individual Goals

- If `student_id` is NULL → the goal applies to the entire class
- If `student_id` is set → the goal applies only to that student
- Students see both class-wide and individual goals

### 10.4 Files

| File | Purpose |
|------|---------|
| `controllers/goalController.js` | Goal CRUD endpoints |
| `queries/goals.js` | SQL queries — getByStudent, getByTeacher, create, remove |

---

## 11. Year Reports API

### 11.1 Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/reports/student/:userId/:year` | Any | Student's yearly reading report |
| GET | `/api/reports/class/:year` | Teacher | Class yearly aggregate report |

### 11.2 Student Report Response

```json
{
  "year": "2025-2026",
  "total_books": 23,
  "total_pages": 4500,
  "total_hours": 42,
  "favorite_genre": "Fiction",
  "books": [...],
  "genre_breakdown": [
    { "genre": "Fiction", "count": 12 },
    { "genre": "Fantasy", "count": 6 }
  ],
  "awards": [...],
  "books_per_month": [
    { "month": "Sep", "count": 3 },
    { "month": "Oct", "count": 4 }
  ]
}
```

### 11.3 Class Report Response

```json
{
  "year": "2025-2026",
  "total_students": 24,
  "total_books": 156,
  "avg_books_per_student": 6.5,
  "students": [
    { "student_id": 5, "username": "alice_reader", "books_completed": 23, "total_pages": 4500 }
  ]
}
```

### 11.4 Files

| File | Purpose |
|------|---------|
| `controllers/reportController.js` | Report generation endpoints |

---

## 12. Parent Email Notifications

Parent email notifications are handled **on the frontend** using EmailJS (see frontend `learning-log.md` Section 12). The backend's role is:

1. **Reading session endpoint** returns session data → frontend sends email
2. **Student reading log** is accessible to parents via `GET /api/reading-log/user/:userId`
3. **Student stats** are accessible to parents via `GET /api/reading-log/stats`

The backend does NOT send emails directly. This keeps the architecture simple and avoids needing SMTP configuration on the server.

---

## 13. File Reference

### Root Files

| File | Purpose |
|------|---------|
| `server.js` | Entry point — starts Express on PORT (default 3010) |
| `app.js` | Express app — middleware, route registration, error handling |
| `package.json` | Dependencies and scripts |
| `.env` | Environment variables (DB, JWT secrets, Google Client ID) |

### Middleware

| File | Exports | Purpose |
|------|---------|---------|
| `middleware/authenticate.js` | `authenticate`, `authorize` | JWT verification + role checking |

### Utilities

| File | Exports | Purpose |
|------|---------|---------|
| `utils/jwt-helpers.js` | `generateTokens(user)` | Creates access + refresh JWT tokens |
| `utils/emailValidation.js` | `validateEmail(email)` | Email regex validator |

### Database

| File | Exports | Purpose |
|------|---------|---------|
| `db/dbConfig.js` | `db` | pg-promise database connection |
| `migrations/001_initial_schema.sql` | — | v2 schema (users, books_catalog, reading_log, sessions, awards, goals, enrollment, notifications) |
| `migrations/002_legacy_tables.sql` | — | Legacy schema (books, logs, comments, notes, subscriptions, dictionary) + seed data |
| `migrations/run.js` | — | Migration runner — executes both files in order |

### Services

| File | Exports | Purpose |
|------|---------|---------|
| `services/openLibraryService.js` | `searchBooks`, `getBookByISBN` | Open Library API client |
| `services/awardService.js` | `checkAndAwardStickers`, `getSchoolYear` | Auto-award engine |

### Queries (SQL Layer)

| File | Tables | Key Functions |
|------|--------|---------------|
| `queries/users.js` | users | findByUsername, findByEmail, findByGoogleId, createUser |
| `queries/booksCatalog.js` | books_catalog | findByISBN, createBook |
| `queries/readingLog.js` | reading_log | getByUser, create, update, remove, getStats |
| `queries/sessions.js` | reading_sessions | create, getStreak, getDailyStats, getByDate |
| `queries/awards.js` | awards, student_awards | getAll, getEarnedByUser, assignAward, createCustomAward |
| `queries/notifications.js` | teacher_notifications | getByTeacher, create, markAsRead, notifyTeachersOfStudent |
| `queries/classEnrollment.js` | class_enrollment | getStudentsByTeacher, enroll, unenroll |
| `queries/goals.js` | reading_goals | getByStudent, getByTeacher, create, remove |
| `queries/books.js` | books | getAllBooks, getABook, createBook, updateBook, deleteBook |
| `queries/teachers.js` | teachers | allTeachers, oneTeacher, createTeacher, updateTeacher, deleteTeacher |
| `queries/students.js` | students | getAllStudents, getAStudent, createStudent, updateStudent, deleteStudent |
| `queries/comments.js` | comments | getAllComments, getComment, newComment, updateComment, deleteComment |
| `queries/notes.js` | notes | getAllNotes, getANote, createNote, updateNote, deleteNote |
| `queries/subscriptions.js` | email_subscriptions | getAllSubscriptions, getASubscription, createSubscription, updateSubscription, deleteSubscription |
| `queries/dictionary.js` | personal_dictionary | allWords, getAWord, createWord, updateWord, deleteWord |

### Controllers (Route Handlers)

| File | Base Route | Endpoints |
|------|-----------|-----------|
| `controllers/userController.js` | `/api/users` | login, register, google-login, me |
| `controllers/readingLogController.js` | `/api/reading-log` | CRUD + stats |
| `controllers/sessionController.js` | `/api/sessions` | CRUD + streak + heatmap + daily |
| `controllers/bookSearchController.js` | `/api/book-search` | search + ISBN lookup |
| `controllers/awardController.js` | `/api/awards` | list + earned + check + custom + assign |
| `controllers/notificationController.js` | `/api/notifications` | list + read + read-all |
| `controllers/classController.js` | `/api/class` | students + stats + daily + enroll |
| `controllers/goalController.js` | `/api/goals` | CRUD |
| `controllers/reportController.js` | `/api/reports` | student year report + class year report |
| `controllers/bookController.js` | `/api/books` | Legacy books CRUD (original table) |
| `controllers/teachersController.js` | `/api/teachers` | Legacy teachers CRUD |
| `controllers/studentController.js` | `/api/students` | Legacy students CRUD + `/logs` nested |
| `controllers/commentController.js` | `/api/comments` | Legacy comments CRUD |
| `controllers/noteController.js` | `/api/notes` | Legacy notes CRUD |
| `controllers/subscriptionController.js` | `/api/subscriptions` | Legacy subscriptions CRUD |
| `controllers/dictionaryController.js` | `/api/dictionary` | Legacy dictionary/flashcard CRUD |

---

## 14. Frontend ↔ Backend Mapping

How each frontend feature maps to backend endpoints:

| Frontend Feature | Frontend File | Backend Endpoint |
|-----------------|---------------|-----------------|
| Login page | `Login.jsx` | `POST /api/users/login` |
| Register page | `Register.jsx` | `POST /api/users` |
| Google login | `GoogleLoginButton.jsx` | `POST /api/users/google-login` |
| Session restore | `AuthContext.jsx` | `GET /api/users/me` |
| Book search | `BookSearchBar.jsx` | `GET /api/book-search?q=` |
| Add book to log | `AddBook.jsx` | `POST /api/reading-log` |
| Reading log list | `MyBooks.jsx` | `GET /api/reading-log` |
| Book progress page | `BookProgress.jsx` | `PUT /api/reading-log/:id` |
| Log reading session | `ReadingSessionForm.jsx` | `POST /api/sessions` |
| Reading streak | `MyStats.jsx` | `GET /api/sessions/streak` |
| Heatmap data | `ReadingCalendarHeatmap.jsx` | `GET /api/sessions/heatmap` |
| Sticker collection | `MyStickerCase.jsx` | `GET /api/awards` + `GET /api/awards/earned` |
| Award check after action | `BookProgress.jsx` | `POST /api/awards/check` |
| Notification bell | `NotificationBell.jsx` | `GET /api/notifications` |
| Unread count | `NotificationBell.jsx` | `GET /api/notifications/unread-count` |
| Mark notification read | `NotificationBell.jsx` | `PUT /api/notifications/:id/read` |
| Teacher activity feed | `TeacherActivityFeed.jsx` | `GET /api/class/daily/:date` |
| Class stats | `ClassDashboard` (planned) | `GET /api/class/stats` |
| Reading goals | `SetGoals` (planned) | `GET /api/goals` + `POST /api/goals` |
| Year report | `YearReview` (planned) | `GET /api/reports/student/:userId/:year` |
| Parent dashboard | `ParentDashboard.jsx` | `GET /api/reading-log/user/:childId` |
| Books page (library list) | `BooksList.jsx`, `SearchAndFilter.jsx` | `GET /api/books` |
| Books page (API → library) | `ApiBookSearch.jsx` | `POST /api/books/new` |
| Single book view | `ShowBooks.jsx` | `GET /api/books/:bookId` |
| Teachers list | `AllTeachers.jsx` | `GET /api/teachers` |
| Teacher detail | `TeacherDetails.jsx` | `GET /api/teachers/:id` + `GET /api/students` |
| Students list | `AllStudents.jsx` | `GET /api/students` |
| Student detail | `StudentDetails.jsx` | `GET /api/students/:id` + `GET /api/students/:id/logs` |
| Comments | `IndexComments.jsx`, etc. | `GET /api/comments`, `POST /api/comments/new` |
| Notes | `Notes.jsx`, `NewNotes.jsx`, etc. | `GET /api/notes`, `POST /api/notes/new` |
| Flash cards | `FlashCard.jsx` | `GET /api/dictionary` |
| Vocabulary | `AddVocab.jsx` | `GET /api/dictionary`, `POST /api/dictionary` |
| Subscriptions | `ListSubscription.jsx` | `GET /api/subscriptions`, `POST /api/subscriptions` |
| New student (with photo) | `NewStudents.jsx` | `POST /api/students/new` |
| New teacher (with photo) | `NewTeachers.jsx` | `POST /api/teachers/new` |
| Student log timeline (with comments) | `StudentDetails.jsx` | `GET /api/students/:id/logs` + `GET /api/comments/logs/:logId` |
| Daily log tracker (teacher page) | `StudentDailyLogTracker.jsx` | `GET /api/students/:id/logs` (for each student) |

---

## 15. Seed Data Reference

### Complete Database Contents

| Table | Records | Details |
|-------|---------|---------|
| **teachers** | 4 | Ms. Fundy (Gr 1), Ms. Perez (Gr K), Mr. Edmundson (Gr 3), Ms. Blackmond (Gr 2) |
| **students** | 16 | 5 + 4 + 3 + 4 per teacher, with NYC DOE F&P reading levels |
| **books** | 12 | Night Owl, Cookies Week, Daddy Hugs, Charlotte's Web, Matilda, Diary of a Wimpy Kid, Harry Potter, Lightning Thief, Wonder, The One and Only Ivan, Dog Man, The Bad Guys |
| **logs** | 30 | Reading sessions spread across last 7 days for all students |
| **comments** | 14 | Teacher feedback on student reading logs |
| **personal_dictionary** | 16 | Vocabulary words (adventure, brave, curious, etc.) grades K-5 |
| **email_subscriptions** | 3 | Parent email subscriptions |
| **awards** | 18 | System sticker awards across 5 categories |

### NYC DOE Reading Level Benchmarks (Fountas & Pinnell)

| Grade | EOY Benchmark | Mid-Year Range Assigned |
|-------|--------------|------------------------|
| K | Level D | B, C, D, D |
| 1 | Level J | G, H, I, J, K |
| 2 | Level M | J, K, L, M |
| 3 | Level P | M, O, P |

### Student-Teacher Assignments

| Teacher (ID) | Grade | Students |
|-------------|-------|----------|
| Ms. Fundy (1) | 1 | Celia (H), Jade (I), Barry (J), Emma (G), Noah (K) |
| Ms. Perez (2) | K | Sophia (C), Liam (D), Olivia (D), Ava (B) |
| Mr. Edmundson (3) | 3 | James (O), Isabella (M), Lucas (P) |
| Ms. Blackmond (4) | 2 | Mia (K), Ethan (J), Charlotte (L), Alexander (M) |

---

## 16. Book Clubs API (NEW)

### Database Tables
- `book_clubs` — club name, description, book, invite code, creator, status
- `book_club_members` — club ↔ user with role (leader/member)
- `book_club_posts` — threaded discussion posts

### Endpoints (9)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/book-clubs` | JWT | List user's clubs |
| GET | `/api/book-clubs/all` | JWT | List all clubs (teacher view) |
| GET | `/api/book-clubs/:id` | JWT | Club detail + members + posts |
| POST | `/api/book-clubs` | JWT | Create a club (generates invite code) |
| POST | `/api/book-clubs/join` | JWT | Join by invite code |
| DELETE | `/api/book-clubs/:id/leave` | JWT | Leave a club |
| GET | `/api/book-clubs/:id/posts` | JWT | Get discussion posts |
| POST | `/api/book-clubs/:id/posts` | JWT | Add a post |
| DELETE | `/api/book-clubs/:id/posts/:postId` | JWT | Delete a post |

### Files
| File | Purpose |
|------|---------|
| `queries/bookClubs.js` | SQL — createClub, getClubsByUser, addMember, getPosts, addPost |
| `controllers/bookClubController.js` | 9 endpoints with invite code generation |

---

## 17. Reading Partners API (NEW)

### Database Tables
- `reading_partners` — student pairs with invite code, expiry (7 days), status (pending/active/expired)
- `partner_chat` — messages between partners

### Endpoints (6)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/reading-partners` | JWT | Get my partnerships (teacher sees all) |
| POST | `/api/reading-partners` | JWT | Create partnership / generate invite |
| POST | `/api/reading-partners/accept` | JWT | Accept invite code (with expiry check) |
| DELETE | `/api/reading-partners/:id` | JWT | Remove partnership |
| GET | `/api/reading-partners/:id/chat` | JWT | Get chat messages |
| POST | `/api/reading-partners/:id/chat` | JWT | Send a message |

### Invite Code Logic
1. `POST /api/reading-partners` creates a partnership with `status='pending'` and `expires_at` = 7 days
2. `POST /api/reading-partners/accept` checks: code exists → not expired → not self-invite → sets `status='active'`
3. Expired codes return HTTP 410: "This invite code has expired"

### Files
| File | Purpose |
|------|---------|
| `queries/readingPartners.js` | SQL — createPartnership, getByInviteCode, acceptInvite, getChat, sendMessage |
| `controllers/readingPartnerController.js` | 6 endpoints with expiry logic |

---

## 18. Leaderboard API (NEW)

### Endpoints (2)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/leaderboard?period=weekly\|monthly\|alltime&sort=books\|pages` | JWT | Global student leaderboard |
| GET | `/api/leaderboard/class?period=&sort=` | JWT | Teacher's class-only leaderboard |

### How It Works
- Joins `users` → `reading_log` → `books_catalog` to compute books_completed and total_pages
- Period filter: `weekly` (last 7 days), `monthly` (current month), `alltime`
- Sort: `books` (default) or `pages`
- Class leaderboard joins through `class_enrollment` to filter to teacher's students

### Files
| File | Purpose |
|------|---------|
| `queries/leaderboard.js` | SQL — getLeaderboard, getClassLeaderboard |
| `controllers/leaderboardController.js` | 2 endpoints with period/sort params |

---

## 19. Recommendations API (NEW)

### Database Table
- `book_recommendations` — precomputed book-to-book pairs with co-occurrence score

### Endpoints (3)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/recommendations/for-me` | JWT | Personalized — top genre the user hasn't read |
| GET | `/api/recommendations/:bookId` | JWT | "Students who read this also read..." |
| POST | `/api/recommendations/refresh` | Teacher | Recompute co-occurrence from reading_log data |

### Co-occurrence Algorithm
```sql
-- Find books read by the same users
SELECT rl1.book_id, rl2.book_id AS recommended,
  COUNT(DISTINCT rl1.user_id) AS score
FROM reading_log rl1
JOIN reading_log rl2 ON rl1.user_id = rl2.user_id AND rl1.book_id != rl2.book_id
WHERE rl1.status = 'completed' AND rl2.status = 'completed'
GROUP BY rl1.book_id, rl2.book_id
```

### Files
| File | Purpose |
|------|---------|
| `queries/recommendations.js` | SQL — getForBook, getForUser, refreshRecommendations |
| `controllers/recommendationController.js` | 3 endpoints |
