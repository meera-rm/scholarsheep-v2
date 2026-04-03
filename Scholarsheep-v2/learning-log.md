# ScholarSheep v2 — Learning Log

## Overview

The Learning Log is the core tracking system of ScholarSheep v2. It allows students, teachers, and parents to track reading activity, monitor progress, earn rewards, and visualize growth over time. This document describes every feature, how it works, and how it connects to the rest of the app.

---

## 1. Book Tracking System

### 1.1 Reading Status Categories

Every book a student interacts with has one of these statuses:

| Status | Description |
|--------|-------------|
| **Want to Read** | Student has added the book to their wishlist |
| **Currently Reading** | Student is actively reading the book |
| **Completed** | Student has finished the book |
| **Abandoned** | Student stopped reading (not counted toward goals) |

### 1.2 What Gets Tracked Per Book

For each book entry in a student's reading log:

- **Book metadata**: title, author, ISBN, cover image, page count, genre, reading level (Lexile/grade)
- **Start date**: when the student began reading
- **End date**: when the student finished (or abandoned)
- **Pages read**: updated by the student (or teacher) as they progress
- **Current page / bookmark**: where the student left off
- **Rating**: 1-5 stars (after completion)
- **Review / Notes**: student's thoughts on the book (free text)
- **Reading time**: optional — minutes spent reading per session
- **Comprehension quiz score**: optional — if teacher assigns a quiz

### 1.3 How Students Add Books

Three ways to add a book:

1. **Search by title/author/ISBN** — uses the Open Library API (see Section 6) to find the book and auto-populate metadata
2. **Scan ISBN barcode** — mobile camera scans the barcode, looks up the book via Open Library
3. **Manual entry** — student types in the title and author (for books not in the API)

### 1.4 Reading Sessions

Students can log individual reading sessions:

```
Session {
  date: "2026-03-16"
  book_id: 42
  pages_read: 15        (from page 60 to page 75)
  minutes_spent: 30
  notes: "Learned about photosynthesis in chapter 4"
}
```

This enables daily/weekly reading streaks and time-based analytics.

---

## 2. Total Book Count & Statistics

### 2.1 Student-Level Stats

Each student's profile shows:

| Metric | Description |
|--------|-------------|
| **Total Books Completed** | Lifetime count of finished books |
| **Books This Year** | Count for the current school year (Aug-June) |
| **Books This Month** | Count for the current calendar month |
| **Pages Read (total)** | Sum of all pages across all completed books |
| **Pages Read (this year)** | Pages for the current school year |
| **Average Rating Given** | Average of all book ratings |
| **Reading Streak** | Consecutive days with at least one reading session |
| **Longest Streak** | Best streak ever achieved |
| **Favorite Genre** | Most-read genre based on completed books |
| **Average Books/Month** | Books completed ÷ months active |
| **Reading Time (total)** | Sum of all session minutes |
| **Current Reading Level** | Based on Lexile of completed books |

### 2.2 Class-Level Stats (Teacher View)

Teachers see aggregate data for their class:

| Metric | Description |
|--------|-------------|
| **Class Total Books** | Sum of all students' completed books |
| **Class Average** | Average books per student |
| **Top Readers** | Leaderboard — top 10 students by book count |
| **Most Popular Book** | Most-read title in the class |
| **Most Popular Genre** | Most-read genre in the class |
| **Students Below Goal** | Count of students under the monthly/yearly reading goal |
| **Class Reading Streak** | Days where at least 80% of students logged a session |
| **Genre Distribution** | Pie chart of what genres the class reads |
| **Reading Level Distribution** | Histogram of student reading levels |

### 2.3 Year-Over-Year Tracking

All statistics are stored by **school year** (configurable: Aug 1 – July 31 by default):

- Students can view their stats for any previous year
- Teachers can compare class performance across years
- Parents can see their child's growth trajectory
- A "Year in Review" summary is generated at the end of each school year

---

## 3. Awards & Sticker Reward System

### 3.1 How Awards Work

Awards are earned automatically when students hit milestones. They appear as collectible stickers/badges on the student's profile.

### 3.2 Award Categories

#### Reading Volume Awards
| Award | Criteria | Sticker |
|-------|----------|---------|
| **First Book** | Complete 1 book | Bronze book |
| **Bookworm** | Complete 5 books | Silver book |
| **Book Explorer** | Complete 10 books | Gold book |
| **Reading Machine** | Complete 25 books | Platinum book |
| **Library Legend** | Complete 50 books | Diamond book |
| **Century Reader** | Complete 100 books | Rainbow book |

#### Streak Awards
| Award | Criteria | Sticker |
|-------|----------|---------|
| **Getting Started** | 3-day reading streak | Bronze flame |
| **On Fire** | 7-day reading streak | Silver flame |
| **Unstoppable** | 14-day reading streak | Gold flame |
| **Reading Warrior** | 30-day reading streak | Platinum flame |
| **Marathon Reader** | 60-day reading streak | Diamond flame |

#### Genre Explorer Awards
| Award | Criteria | Sticker |
|-------|----------|---------|
| **Genre Curious** | Read books from 3 different genres | 3-color star |
| **Genre Adventurer** | Read books from 5 different genres | 5-color star |
| **Genre Master** | Read books from 8+ different genres | Rainbow star |

#### Page Count Awards
| Award | Criteria | Sticker |
|-------|----------|---------|
| **Page Turner** | Read 500 total pages | Bronze pages |
| **Chapter Champion** | Read 2,000 total pages | Silver pages |
| **Novel Navigator** | Read 5,000 total pages | Gold pages |
| **Epic Reader** | Read 10,000 total pages | Platinum pages |

#### Special Awards
| Award | Criteria | Sticker |
|-------|----------|---------|
| **Reviewer** | Write 5 book reviews | Pencil badge |
| **Critic** | Write 20 book reviews | Quill badge |
| **Speed Reader** | Finish a book in under 3 days | Lightning bolt |
| **Summer Reader** | Read 5+ books during summer break | Sun badge |
| **Helper** | Recommend a book that 3+ classmates also read | Heart badge |

### 3.3 Award Display

- **Student Profile Page**: Shows all earned stickers in a grid/shelf layout
- **Sticker Case**: A dedicated page showing all possible stickers (earned = colorful, unearned = greyed out with criteria shown)
- **Recent Awards**: Animated popup/toast when a student earns a new sticker
- **Leaderboard**: Optional — shows who has the most stickers in the class
- **Printable Certificate**: Teachers can generate a PDF certificate for award ceremonies

### 3.4 Teacher-Assigned Awards

Teachers can also create **custom awards** for their class:
- Custom sticker image (upload or choose from library)
- Custom criteria description
- Manual assignment to specific students
- Example: "Ms. Johnson's Star Reader of the Month"

---

## 4. Student Progress Tracking

### 4.1 Individual Student Progress (Teacher & Parent View)

A detailed progress page per student showing:

**Reading Activity Timeline**
- Calendar heatmap (like GitHub contribution graph) showing days with reading activity
- Color intensity = pages read that day
- Click a day to see which books were read and for how long

**Progress Charts**
- **Books completed per month** — bar chart (current year)
- **Pages read per week** — line chart (last 12 weeks)
- **Reading level progression** — line chart showing Lexile growth over time
- **Genre breakdown** — donut chart of completed books by genre
- **Daily reading minutes** — average per week, trend line

**Goal Tracking**
- Teachers set reading goals (e.g., "5 books per month" or "20 pages per day")
- Progress bar shows percentage toward current goal
- Green = on track, Yellow = slightly behind, Red = significantly behind

### 4.2 Class Progress Dashboard (Teacher Only)

**Class Overview Table**

| Student | Books (Year) | Books (Month) | Current Book | Pages This Week | Streak | On Track? |
|---------|-------------|---------------|--------------|-----------------|--------|-----------|
| Alice   | 23          | 4             | Charlotte's Web | 87           | 12 days | Yes |
| Bob     | 15          | 2             | —            | 0               | 0 days | No |

**Class Charts**
- **Distribution histogram**: How many students have read 0-5, 5-10, 10-15, 15+ books
- **Class reading trend**: Total books completed per month (line chart)
- **Genre popularity**: What the class is reading most
- **At-risk students**: Flagged students with 0 activity in the past 2 weeks

### 4.3 Parent Progress View

Parents see for their child:
- Current book and progress (page X of Y)
- Books completed this month/year
- Reading streak
- Recent awards earned
- Reading level and how it's changed
- Teacher's reading goal and child's progress toward it

---

## 5. Yearly Reading Report

At the end of each school year (or on demand), generate a **Year in Review**:

### For Students
- Total books read, total pages, total hours
- Favorite genre and favorite book (by rating)
- All awards earned this year
- Reading level at start vs. end of year
- Longest streak
- "Your reading journey" — month-by-month book list with covers

### For Teachers
- Class total books and average per student
- Top readers recognition
- Most improved students (reading level growth)
- Genre trends across the year
- Comparison to previous year (if available)
- Exportable CSV of all student data

### For Parents
- Child's full year summary
- Growth metrics
- Recommendations for summer reading

---

## 6. Book API Integration — Open Library

### 6.1 Why Open Library?

| Feature | Open Library | Google Books | ISBNdb |
|---------|-------------|-------------|--------|
| **Cost** | 100% Free | Free (limited) | Paid |
| **No API Key** | Yes | No (needs key) | No |
| **Cover Images** | Yes | Yes | Yes |
| **Children's Books** | Excellent | Good | Good |
| **ISBN Lookup** | Yes | Yes | Yes |
| **Page Count** | Usually | Yes | Yes |
| **Reading Level** | Sometimes | No | No |
| **Rate Limits** | Generous | 1000/day | Varies |
| **Open Source** | Yes | No | No |

### 6.2 API Endpoints We Use

**Search books by title/author:**
```
GET https://openlibrary.org/search.json?q=harry+potter&limit=10
```
Returns: title, author, ISBN, first publish year, cover ID, subject/genre

**Get book details by ISBN:**
```
GET https://openlibrary.org/isbn/9780545010221.json
```
Returns: title, authors, publishers, publish date, number of pages, subjects

**Get cover image:**
```
GET https://covers.openlibrary.org/b/isbn/9780545010221-M.jpg
```
Sizes: S (small), M (medium), L (large)

**Search by subject (for genre browsing):**
```
GET https://openlibrary.org/subjects/children.json?limit=20
```

### 6.3 How Books Flow Into Our Database

```
Student searches "Diary of a Wimpy Kid"
        ↓
Frontend calls Open Library Search API
        ↓
Results displayed with covers and metadata
        ↓
Student clicks "Add to My Books"
        ↓
Frontend sends book data to our backend:
  POST /api/reading-log/books
  {
    title, author, isbn, cover_url,
    page_count, genre, reading_level,
    open_library_id
  }
        ↓
Backend checks if book already exists in our books table
  - If yes: use existing book_id
  - If no: insert new book, get book_id
        ↓
Backend creates reading_log entry:
  INSERT INTO reading_log (student_id, book_id, status, start_date)
        ↓
Student's reading list is updated
```

### 6.4 Caching Strategy

To avoid hitting Open Library on every search:
- Cache search results in our database for 30 days
- Store book metadata permanently once a student adds a book
- Store cover image URLs (hotlink to Open Library's CDN)
- For popular books, we'll have pre-cached data from other students' searches

---

## 7. Database Schema for Learning Log

### New Tables

```sql
-- Books catalog (populated from Open Library API + manual entries)
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

-- Student reading log (one entry per student per book)
CREATE TABLE reading_log (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  book_id INTEGER REFERENCES books_catalog(id),
  status VARCHAR(20) DEFAULT 'want_to_read',
    -- 'want_to_read', 'reading', 'completed', 'abandoned'
  start_date DATE,
  end_date DATE,
  current_page INTEGER DEFAULT 0,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  school_year VARCHAR(10),  -- e.g., '2025-2026'
  UNIQUE(student_id, book_id)
);

-- Reading sessions (daily reading activity)
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

-- Awards / stickers catalog
CREATE TABLE awards (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50),
    -- 'volume', 'streak', 'genre', 'pages', 'special', 'custom'
  criteria_type VARCHAR(50),
    -- 'books_completed', 'streak_days', 'genres_read', 'pages_read', 'reviews_written', 'manual'
  criteria_value INTEGER,
    -- e.g., 5 for "5 books completed"
  sticker_image_url TEXT,
  sticker_emoji VARCHAR(10),
  tier VARCHAR(20),
    -- 'bronze', 'silver', 'gold', 'platinum', 'diamond'
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
    -- 'system' (auto) or 'teacher' (manual)
  UNIQUE(student_id, award_id, school_year)
);

-- Reading goals (set by teacher per class or per student)
CREATE TABLE reading_goals (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER REFERENCES teachers(id),
  student_id INTEGER REFERENCES students(id),
    -- NULL = applies to entire class
  goal_type VARCHAR(30),
    -- 'books_per_month', 'pages_per_day', 'minutes_per_day', 'books_per_year'
  goal_value INTEGER NOT NULL,
  school_year VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Class enrollment (links students to teachers/classes)
CREATE TABLE class_enrollment (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  teacher_id INTEGER REFERENCES teachers(id) ON DELETE CASCADE,
  class_name VARCHAR(100),
  school_year VARCHAR(10),
  enrolled_date DATE DEFAULT NOW(),
  UNIQUE(student_id, teacher_id, school_year)
);
```

### Key Indexes

```sql
CREATE INDEX idx_reading_log_student ON reading_log(student_id);
CREATE INDEX idx_reading_log_status ON reading_log(status);
CREATE INDEX idx_reading_log_year ON reading_log(school_year);
CREATE INDEX idx_sessions_student_date ON reading_sessions(student_id, session_date);
CREATE INDEX idx_student_awards_student ON student_awards(student_id);
CREATE INDEX idx_class_enrollment_teacher ON class_enrollment(teacher_id, school_year);
```

---

## 8. API Endpoints (Backend)

### Reading Log
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/reading-log/:studentId` | Get student's full reading log | Student/Teacher/Parent |
| GET | `/api/reading-log/:studentId/stats` | Get student's reading statistics | Student/Teacher/Parent |
| POST | `/api/reading-log/books` | Add a book to catalog (from API or manual) | Any authenticated |
| POST | `/api/reading-log` | Add a book to student's reading list | Student |
| PUT | `/api/reading-log/:id` | Update status, rating, review, current page | Student |
| DELETE | `/api/reading-log/:id` | Remove a book from student's list | Student |

### Reading Sessions
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/sessions/:studentId` | Get student's reading sessions | Student/Teacher/Parent |
| POST | `/api/sessions` | Log a reading session | Student |
| GET | `/api/sessions/:studentId/streak` | Get current and longest streak | Student/Teacher/Parent |

### Book Search (Open Library Proxy)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/book-search?q=title` | Search Open Library for books | Any authenticated |
| GET | `/api/book-search/isbn/:isbn` | Look up book by ISBN | Any authenticated |

### Awards
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/awards` | List all available awards | Any authenticated |
| GET | `/api/awards/student/:studentId` | Get student's earned awards | Student/Teacher/Parent |
| POST | `/api/awards/check/:studentId` | Check and award new stickers | System/Teacher |
| POST | `/api/awards/custom` | Create a custom award | Teacher |
| POST | `/api/awards/assign` | Manually assign award to student | Teacher |

### Class & Goals
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/class/:teacherId/stats` | Class reading statistics | Teacher |
| GET | `/api/class/:teacherId/students` | All students with reading data | Teacher |
| POST | `/api/goals` | Set a reading goal | Teacher |
| GET | `/api/goals/:studentId` | Get student's goals and progress | Student/Teacher/Parent |

### Year Reports
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/reports/student/:studentId/:year` | Student yearly report | Student/Teacher/Parent |
| GET | `/api/reports/class/:teacherId/:year` | Class yearly report | Teacher |
| GET | `/api/reports/export/:teacherId/:year` | Export class data as CSV | Teacher |

---

## 9. Frontend Pages & Components

### New Pages

| Page | Route | Role | Description |
|------|-------|------|-------------|
| My Reading Log | `/my-books` | Student | List of all books with status filters |
| Add Book | `/my-books/add` | Student | Search Open Library + add to list |
| Book Progress | `/my-books/:id` | Student | Update pages, log sessions, write review |
| My Stats | `/my-stats` | Student | Personal reading statistics & charts |
| My Stickers | `/my-stickers` | Student | Award collection / sticker case |
| Class Dashboard | `/class-dashboard` | Teacher | Class overview with all student stats |
| Student Detail | `/class-dashboard/:studentId` | Teacher | Deep dive into one student's data |
| Set Goals | `/class-dashboard/goals` | Teacher | Set reading goals for class/students |
| Custom Awards | `/class-dashboard/awards` | Teacher | Create and assign custom stickers |
| Child Progress | `/child-progress` | Parent | View child's reading data |
| Year Review | `/year-review/:year` | All | Yearly reading summary |

### New Components

| Component | Description |
|-----------|-------------|
| `BookSearchBar` | Search input that queries Open Library API with debounced autocomplete |
| `BookCard` | Displays book cover, title, author, student's progress bar |
| `ReadingLogList` | Filterable/sortable list of all books in student's log |
| `ReadingSessionForm` | Form to log today's reading (pages, minutes, notes) |
| `ReadingCalendarHeatmap` | GitHub-style heatmap of daily reading activity |
| `StatsOverview` | Dashboard cards showing key metrics (books, pages, streak) |
| `ProgressChart` | Recharts/Chart.js line/bar charts for reading trends |
| `GenreDonut` | Donut chart showing genre distribution |
| `StickerCase` | Grid of all stickers (earned = color, unearned = grey) |
| `StickerPopup` | Animated celebration when a new sticker is earned |
| `GoalProgressBar` | Shows progress toward teacher-set reading goals |
| `ClassTable` | Sortable table of all students with key metrics |
| `StudentProgressCard` | Summary card for a student in the class view |
| `LeaderboardWidget` | Top readers sidebar widget |
| `YearReviewCard` | Visual summary card for year-in-review |

---

## 10. Role-Based Access Summary

| Feature | Student | Teacher | Parent |
|---------|---------|---------|--------|
| Add books to reading log | Yes | No | No |
| Log reading sessions | Yes | No | No |
| View own stats | Yes | — | — |
| View sticker collection | Yes | View students' | View child's |
| Write book reviews | Yes | No | No |
| View class dashboard | No | Yes | No |
| Set reading goals | No | Yes | No |
| Create custom awards | No | Yes | No |
| Assign manual awards | No | Yes | No |
| View child's progress | No | All students | Own child only |
| Export data | No | Yes (CSV) | No |
| Year-in-review | Own | Class + per student | Child's |
| Receive email notifications | No | No | Yes |
| View in-app notifications | No | Yes | No |
| See daily reader activity feed | No | Yes | No |

---

## 11. Demo / Admin Mode (BUILT)

### Purpose
Allows testing the full app without a live backend. Demo mode creates fake JWT tokens locally and provides pre-configured test accounts.

### Demo Accounts

| Role | Username | Password | What You Can Test |
|------|----------|----------|-------------------|
| **Admin** (teacher) | `admin` | `admin123` | Full teacher access — manage students, books, view notifications |
| **Teacher** | `ms_ramesh` | `teacher123` | Teacher dashboard, activity feed, notification bell |
| **Student** | `alice_reader` | `student123` | Reading log, book search, sessions, stickers, stats |
| **Parent** | `parent_chen` | `parent123` | Parent dashboard, email settings, child progress |

### How It Works

1. `src/services/demoAuthService.js` provides 4 pre-defined accounts
2. `AuthContext.jsx` checks demo mode first before hitting the real backend API
3. Login page shows clickable account cards at the bottom — click to auto-fill credentials
4. Demo tokens are base64-encoded JSON (not cryptographically signed — for testing only)
5. Set `isDemoMode()` to `false` in `demoAuthService.js` when connecting to the real backend

### How to Test

1. Go to `/login`
2. Click any demo account card at the bottom
3. Click "Sign In"
4. You're logged in with that role — navigate to role-specific pages

---

## 12. Parent Email Notifications (BUILT)

### Purpose
When a student (child) logs a reading session, the parent receives an email notification with details about what the child read.

### How It Works

```
Student logs reading session
        ↓
BookProgress.jsx calls sendParentEmail()
        ↓
notificationService.js checks:
  1. Is email enabled in parent settings?
  2. Is there a parent email address configured?
  3. Is EmailJS configured with real keys?
        ↓
If EmailJS is configured → sends real email via EmailJS API
If not configured → saves email as "preview" in localStorage
        ↓
Toast notification shown: "Parent notified by email!" or "Parent email preview saved"
```

### Email Content

Each email includes:
- Child's name
- Book title being read
- Number of pages read in the session
- Minutes spent reading
- Session notes (if any)
- Date of the reading session

### Parent Email Settings

Parents configure notifications at **Parent Dashboard → Email Notification Settings**:
- **Enable/disable** email notifications (toggle)
- **Parent email address** — where to send notifications
- **Child's name** — used in the email subject/body
- **Email history** — view all sent/preview emails

### EmailJS Setup (Free — 200 emails/month)

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{to_email}}` — parent's email
   - `{{child_name}}` — child's name
   - `{{book_title}}` — book being read
   - `{{pages_read}}` — pages read
   - `{{minutes_spent}}` — minutes spent
   - `{{notes}}` — session notes
   - `{{date}}` — date of session
4. Add keys to `.env`:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

### Preview Mode

Before EmailJS is configured, all emails are saved as previews in localStorage. Parents can view them in the email history section of their settings panel. This allows testing the full flow without sending real emails.

### Files

| File | Purpose |
|------|---------|
| `src/services/notificationService.js` | `sendParentEmail()`, email settings CRUD, sent email history |
| `src/Components/notifications/ParentEmailSettings.jsx` | Settings UI for parents — email, child name, toggle, history |
| `src/Pages/ParentDashboard.jsx` | Updated — includes ParentEmailSettings component |
| `src/Pages/ReadingLog/BookProgress.jsx` | Updated — calls `sendParentEmail()` on session log |

---

## 13. Teacher In-App Notifications (BUILT)

### Purpose
Teachers receive in-app notifications when students:
- Log a reading session (pages read, minutes, book title)
- Complete a book
- Earn a new sticker/award

Teachers can also see a **daily activity feed** showing which students read today and yesterday.

### Notification Types

| Type | Icon | Triggered When | Example |
|------|------|---------------|---------|
| `reading_session` | 📖 | Student logs a reading session | "alice_reader logged a reading session — Read 15 pages of 'Charlotte's Web' (30 min)" |
| `book_completed` | ✅ | Student marks a book as finished | "alice_reader finished a book! — Completed 'Charlotte's Web' and rated it 5/5 stars" |
| `award_earned` | 🏆 | Student earns a new sticker | "alice_reader earned a sticker! — 📖 First Book" |

### Notification Bell (Nav Bar)

When logged in as a teacher:
- A **bell icon** appears in the top navigation bar
- If there are unread notifications, a **red badge** shows the count
- Clicking the bell opens a **dropdown panel** showing:
  - List of recent notifications (newest first, max 20)
  - Unread notifications highlighted in blue
  - "Mark all read" button
  - Click a notification to mark it as read
  - Timestamps: "just now", "5m ago", "2h ago", "Mar 16"

### Teacher Activity Feed (Dashboard)

The Teacher Dashboard now has a **Student Reading Activity** widget at the top:

- **Today/Yesterday toggle** — switch between today's and yesterday's data
- **Summary cards**: number of readers, total pages, total minutes
- **Reader list**: which books were read, pages per session, minutes per session

This lets teachers see at a glance who read yesterday and who didn't — without needing to check each student individually.

### How It Works

```
Student logs session / completes book / earns award
        ↓
BookProgress.jsx calls notifyTeacherOfReading() / notifyTeacherOfBookComplete() / notifyTeacherOfAward()
        ↓
notificationService.js creates notification object and stores in localStorage
        ↓
Teacher logs in → NotificationBell polls every 10 seconds
        ↓
Bell badge shows unread count
        ↓
Teacher Dashboard shows TeacherActivityFeed with today/yesterday sessions
```

### Files

| File | Purpose |
|------|---------|
| `src/services/notificationService.js` | Notification CRUD, daily reader queries, teacher notification helpers |
| `src/Components/notifications/NotificationBell.jsx` | Bell icon + dropdown panel in nav bar |
| `src/Components/notifications/TeacherActivityFeed.jsx` | Today/Yesterday reader summary widget |
| `src/Components/common/nav.jsx` | Updated — shows NotificationBell for teacher role |
| `src/Pages/TeacherDashboard.jsx` | Updated — includes TeacherActivityFeed |
| `src/Pages/ReadingLog/BookProgress.jsx` | Updated — triggers all notifications on student actions |

---

## 14. UI / Dark Mode Improvements (BUILT)

### Home Page Background
- Changed from no background to a **light teal gradient** (`from-teal-50 via-white to-teal-50`)
- All text is clearly visible against the light background
- Clean, professional look that matches the ScholarSheep brand

### Dark Mode Theme
The original dark mode used a medium gray (`#A9A9A9`) with dark teal text (`#022828`) — hard to read.

New dark mode uses:
| Element | Old | New |
|---------|-----|-----|
| Background | `#A9A9A9` (gray) | `#1e293b` (slate blue) |
| Text | `#022828` (dark teal) | `#e2e8f0` (light gray) |
| Cards | Same gray | `#1e293b` (slightly lighter slate) |
| Page background | Same gray | `#0f172a` (deep navy) |
| Borders | Default | `#334155` (slate border) |

### Files Changed
| File | Change |
|------|--------|
| `src/App.css` | Updated dark mode CSS variables for better contrast |
| `src/Pages/Home.jsx` | Added `min-h-screen bg-gradient-to-b from-teal-50 via-white to-teal-50` |

---

## 15. Recent Reading Activity Feed (BUILT)

### Purpose
Shows the last 10 reading sessions on the My Books page (`/my-books`) with the **book name**, cover image, author, date, pages read, and minutes.

### How It Works
- `RecentActivity.jsx` is a standalone component added to MyBooks with a one-line insert
- Each reading session now stores `bookTitle`, `bookAuthor`, and `bookCoverUrl` alongside `bookId` (updated in `readingLogService.js`)
- For older sessions without stored book names, it falls back to looking up the book by ID
- Each entry links to the book's progress page when clicked

### Files
| File | Purpose |
|------|---------|
| `src/Components/readingLog/RecentActivity.jsx` | New — standalone component showing recent sessions with book names |
| `src/Pages/ReadingLog/MyBooks.jsx` | Updated — added import + `<RecentActivity />` (2 lines) |
| `src/services/readingLogService.js` | Updated — `logSession()` now stores `bookTitle`, `bookAuthor`, `bookCoverUrl` |

---

## 16. Open Library Books in School Library (BUILT)

### Purpose
Books found via the Open Library API search on the `/books` page can be added to the school's book library (the `books` database table) so they appear in the **Reading Level** and **Casual Reading** lists.

### How It Works
When hovering over a book in the API search results, two buttons appear:

| Button | Action |
|--------|--------|
| **+ My Books** | Adds to student's personal reading log (wishlist) |
| **+ Library** | Opens an inline form to set **Reading Level** (A-Z or CR) and **Grade** (K-8), then saves to the `books` database table via `POST /api/books/new` |

- Selecting **CR** as reading level → book appears on the **Casual Reading** page (`/books/casual`)
- Selecting **A-Z** → book appears on the **Reading Level** page (`/books/level`), filterable by level

### Files
| File | Purpose |
|------|---------|
| `src/Components/books/booksCardList/ApiBookSearch.jsx` | Updated — two hover buttons, inline "Add to Library" form with reading level + grade dropdowns |

---

## 17. Bug Fixes — Existing Pages (FIXED)

### Memory Game (`/games/memorygame`)
- **Bug**: Used `require()` for flag images — not supported in Vite
- **Fix**: Converted all `require('./images/franceflag.png')` to ES module `import` statements
- **File**: `src/Components/games/memorygame/MemoryGame.jsx`

### Flash Cards (`/flashcard`)
- **Bug 1**: No seed data in `personal_dictionary` table — page was blank
- **Bug 2**: `definitions`, `example` are TEXT strings but `.map()` was called on them expecting arrays — crashed silently
- **Bug 3**: Single `showMore` boolean toggled ALL cards at once instead of individually
- **Fix**: Added `toArray()` helper, changed to per-card `showMoreId` state, seeded 16 vocabulary words (grades K-5)
- **Files**: `src/Components/tools/FlashCard/FlashCardList.jsx`, backend migration `002_legacy_tables.sql`

### Vocabulary Page (`/vocabulary`)
- **Bug 1**: `DisplayCardList.jsx` had same `.map()` crash on strings
- **Bug 2**: Single `showMore` boolean for all cards
- **Bug 3**: `AddVocab.jsx` used stale React state when saving — word name and grade were empty
- **Bug 4**: Word list didn't refresh after adding a new word
- **Fix**: Same `toArray()` helper + per-card toggle, rewrote save logic to pass values directly, added `fetchAllWords()` refresh after save
- **Files**: `src/Components/tools/Vocabulary/DisplayCardList.jsx`, `src/Components/tools/Vocabulary/AddVocab.jsx`

### Teachers Page (`/teachers`)
- **Bug 1**: `useEffect` dependency `[teacherData]` caused infinite re-fetch loop
- **Bug 2**: Unused `react-bootstrap/Table` import caused errors
- **Fix**: Changed dependency to `[]`, removed unused import
- **File**: `src/Components/index/AllTeachers.jsx`

### Students Page (`/students`)
- **Bug 1**: `setStudents(response.data)` set the whole `{ success, payload }` object instead of the array
- **Bug 2**: Same unused `react-bootstrap/Table` import
- **Fix**: Changed to `response.data.payload || []`, removed unused import
- **File**: `src/Components/index/AllStudents.jsx`

### Teacher Detail Page (`/teachers/:id`)
- **Bug 1**: `useEffect` dependency `[id, navigate, teacher]` caused infinite loop
- **Bug 2**: Fetched `/api/teachers/${id}/students` — nested route didn't exist
- **Fix**: Changed to `[id, navigate]`, fetches all students then filters by `teachers_id`
- **File**: `src/Components/show/TeacherDetails.jsx`

### Student Detail Page (`/students/:id`)
- **Bug 1**: `setStudent(response.data)` instead of `response.data.payload`
- **Bug 2**: `/api/students/${id}/logs` endpoint didn't exist
- **Fix**: Fixed response parsing, added graceful fallback for missing logs, added `GET /api/students/:studentId/logs` to backend
- **Files**: `src/Components/show/StudentDetails.jsx`, backend `controllers/studentController.js`

---

## 18. Photo Upload for Students & Teachers (BUILT)

### Purpose
Students and teachers can now upload a photo or use an auto-generated avatar when creating their profile.

### How It Works

**Default behavior (no upload):**
- An avatar is **auto-generated** using DiceBear Pixel Art API based on the person's name
- Example: `https://api.dicebear.com/7.x/pixel-art/svg?seed=CeliaEdward`
- The avatar updates live as the user types their name in the form

**If a photo is uploaded:**
- The uploaded photo replaces the generated avatar
- Photos are converted to base64 data URLs for storage
- Users can also paste an image URL directly

### PhotoUpload Component (`src/Components/common/PhotoUpload.jsx`)

Reusable component with three options:
1. **Upload Photo** — opens file picker (accepts images), converts to base64
2. **Generate Avatar** — creates a random DiceBear avatar
3. **Paste URL** — text input for direct image URL

Shows a live preview (round 80x80 image) of the current avatar/photo.

### Avatar Display Fallback Chain

On the student/teacher list cards, the avatar displays using this priority:
1. `student_avatar` / `teacher_avatar` (uploaded photo or generated avatar from the form)
2. `student_image` (legacy field from seed data)
3. Auto-generated DiceBear avatar from the person's name (final fallback)

### Files
| File | Purpose |
|------|---------|
| `src/Components/common/PhotoUpload.jsx` | New — reusable photo upload + avatar generator component |
| `src/Components/new/NewStudents.jsx` | Updated — uses PhotoUpload, removed old disabled profilePic field |
| `src/Components/new/NewTeachers.jsx` | Updated — uses PhotoUpload, removed old picture URL field |
| `src/Components/index/AllStudents.jsx` | Updated — avatar fallback chain: student_avatar → student_image → DiceBear |
| `src/Components/index/AllTeachers.jsx` | Updated — avatar fallback: teacher_avatar → DiceBear |

---

## 19. New Student/Teacher Form Crash Fix (FIXED)

### Bug
Both `NewStudents.jsx` and `NewTeachers.jsx` rendered a blank page — nothing displayed.

### Cause
We changed the import from `{ ToastContainer, toast }` to just `{ toast }` when adding PhotoUpload, but both files still had `<ToastContainer/>` in their JSX. Since `ToastContainer` was now `undefined`, React crashed silently and rendered nothing.

### Fix
Removed `<ToastContainer/>` from both forms — it's not needed since there's already a global `<ToastContainer>` in `index.jsx`.

### Files
| File | Change |
|------|--------|
| `src/Components/new/NewStudents.jsx` | Removed `<ToastContainer />` |
| `src/Components/new/NewTeachers.jsx` | Removed `<ToastContainer/>` |

---

## 20. Teacher Daily Log Tracker (BUILT)

### Purpose
On each individual teacher's page (`/teachers/:id`), shows how many of their students logged reading each day over the last 7 days.

### How It Works

**7-Day Summary Bar:**
- Shows 7 clickable date cards (Today → 6 days ago)
- Each card displays: count of students who logged / total students, and percentage
- Green background = some students logged, Gray = nobody logged, Teal = selected date

**Student List for Selected Date:**
- Click any day to see each student's status
- ✅ Green row with pages + minutes if they logged reading
- ❌ Red row with "No reading logged" if they didn't

### Component
`src/Components/show/StudentDailyLogTracker.jsx` — standalone component that:
1. Takes `students` array as prop
2. Fetches `GET /api/students/:id/logs` for each student
3. Groups logs by date
4. Renders the 7-day summary + detail list

### Files
| File | Purpose |
|------|---------|
| `src/Components/show/StudentDailyLogTracker.jsx` | New — daily reading tracker for teacher pages |
| `src/Components/show/TeacherDetails.jsx` | Updated — added import + component |

---

## 21. Redesigned Teacher & Student Detail Pages (BUILT)

### Purpose
Replaced the old table-based layouts with modern card-based designs for better readability and usability.

### Teacher Detail Page (`/teachers/:id`) — New Design

```
┌─────────────────────────────────────────────┐
│  ← All Teachers                              │
│                                              │
│  ┌──────────────────────────────────────┐    │
│  │  [Avatar]  Ms. Fundy                 │    │
│  │            Reading · Grade 1         │    │
│  │            P.S. 152 · District 2     │  [Edit] [+ Add Student]
│  └──────────────────────────────────────┘    │
│                                              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐       │
│  │  5   │ │  1   │ │Reading│ │  2   │       │
│  │Studts│ │Grade │ │Subject│ │Distr.│       │
│  └──────┘ └──────┘ └──────┘ └──────┘       │
│                                              │
│  [Daily Reading Log Tracker — 7 days]        │
│                                              │
│  My Students                                 │
│  ┌────────┐ ┌────────┐ ┌────────┐          │
│  │[Avatar]│ │[Avatar]│ │[Avatar]│          │
│  │ Celia  │ │ Jade   │ │ Barry  │          │
│  │ Gr:1   │ │ Gr:1   │ │ Gr:1   │          │
│  │ RL:H   │ │ RL:I   │ │ RL:J   │          │
│  │View|Edit│ │View|Edit│ │View|Edit│          │
│  └────────┘ └────────┘ └────────┘          │
└─────────────────────────────────────────────┘
```

### Student Detail Page (`/students/:id`) — New Design

```
┌──────────────────────────────────────────┐
│  ← All Students                           │
│                                           │
│  ┌──────────────────────────────────┐     │
│  │  [Avatar]  Celia Edward          │     │
│  │            Grade 1 · 2025-2026   │  [Edit] [Delete]
│  │            Reading Level: H      │     │
│  │            Parent: thomas@...    │     │
│  └──────────────────────────────────┘     │
│                                           │
│  ┌──────┐ ┌──────┐ ┌──────┐             │
│  │  7   │ │ 165  │ │ 225  │             │
│  │ Logs │ │Pages │ │ Min  │             │
│  └──────┘ └──────┘ └──────┘             │
│                                           │
│  Reading Log                              │
│  ┌──────────────────────────────────┐     │
│  │ 📖 Night Owl                     │     │
│  │    Mon, Mar 17, 2026             │     │
│  │    [20 pages] [30 minutes]       │     │
│  │                                   │     │
│  │    Student's Thoughts:            │     │
│  │    "I loved how the owl was brave"│     │
│  │                                   │     │
│  │    Teacher Comment:               │     │
│  │    "Great understanding of the    │     │
│  │     story!"                       │     │
│  └──────────────────────────────────┘     │
│  ┌──────────────────────────────────┐     │
│  │ 📖 Cookies Week                   │     │
│  │    ...                            │     │
│  └──────────────────────────────────┘     │
└──────────────────────────────────────────┘
```

### Key Changes

| Before | After |
|--------|-------|
| Plain text teacher info | Profile card with avatar, colored badges |
| No stats | 4 stat cards (students, grade, subject, district) |
| Student table with tiny buttons | Student card grid with avatar, info, View/Edit/Remove |
| "Student Name" column showed timestamp | Replaced with proper "Date" column |
| Log table with cramped columns | Timeline cards with book icon, stats badges, thought/comment sections |
| No teacher comments visible | Teacher comments in teal accent box on each log card |

### Files
| File | Purpose |
|------|---------|
| `src/Components/show/TeacherDetails.jsx` | Completely redesigned — profile card, stat cards, student grid |
| `src/Components/show/StudentDetails.jsx` | Completely redesigned — profile card, stat cards, log timeline cards |

---

## 22. Student-Teacher Connections & Seed Data (DONE)

### Student Assignments

All 16 students are assigned to teachers via `teachers_id` foreign key:

| Teacher | Grade | # Students |
|---------|-------|-----------|
| Ms. Fundy | 1 | 5 (Celia, Jade, Barry, Emma, Noah) |
| Ms. Perez | K | 4 (Sophia, Liam, Olivia, Ava) |
| Mr. Edmundson | 3 | 3 (James, Isabella, Lucas) |
| Ms. Blackmond | 2 | 4 (Mia, Ethan, Charlotte, Alexander) |

### NYC DOE Reading Level Benchmarks (Fountas & Pinnell)

Reading levels assigned based on NYC Department of Education end-of-year benchmarks:

| Grade | EOY Benchmark | Description |
|-------|--------------|-------------|
| **K** | Level **D** | Students identify letter-sound relationships, read simple pattern books |
| **1** | Level **J** | Students read early chapter books, decode multi-syllable words |
| **2** | Level **M** | Students read longer chapter books, understand literary elements |
| **3** | Level **P** | Students read complex chapter books, analyze character development |
| **4** | Level **S** | Students read multi-chapter novels, make inferences across texts |
| **5** | Level **V** | Students read grade-level novels, synthesize information from multiple sources |

### Student Reading Levels (Mid-Year — March)

Realistic spread: some below, approaching, at, or above benchmark.

| Student | Grade | Level | vs Benchmark |
|---------|-------|-------|-------------|
| Emma Wilson | 1 | G | Below (J) |
| Celia Edward | 1 | H | Below (J) |
| Jade Duncan | 1 | I | Approaching (J) |
| Barry Lioudis | 1 | J | At benchmark |
| Noah Garcia | 1 | K | Above benchmark |
| Ava Davis | K | B | Below (D) |
| Sophia Martinez | K | C | Approaching (D) |
| Liam Johnson | K | D | At benchmark |
| Olivia Brown | K | D | At benchmark |
| Isabella Kim | 3 | M | Below (P) |
| James Lee | 3 | O | Approaching (P) |
| Lucas Park | 3 | P | At benchmark |
| Ethan White | 2 | J | Below (M) |
| Mia Thompson | 2 | K | Below (M) |
| Charlotte Harris | 2 | L | Approaching (M) |
| Alexander Clark | 2 | M | At benchmark |

### Seed Data Summary

| Table | Records | Details |
|-------|---------|---------|
| teachers | 4 | NYC public school teachers, each with school, district, grade |
| students | 16 | 4-5 per teacher, with NYC reading levels |
| books | 12 | Children's books with covers from Open Library |
| logs | 30 | Reading sessions spread across last 7 days |
| comments | 14 | Teacher feedback on student reading logs |
| personal_dictionary | 16 | Vocabulary words grades K-5 |
| email_subscriptions | 3 | Parent email subscriptions |
| awards | 18 | System sticker awards |

### Backend Endpoints Added
| Endpoint | Purpose |
|----------|---------|
| `GET /api/comments/logs/:logId` | Get teacher comment for a specific reading log |
| `GET /api/students/:studentId/logs` | Get all reading logs for a student |

---

## 23. Redesigned Pomodoro Timer (BUILT)

### Purpose
Complete visual overhaul of the reading timer at `/timer`.

### Before
- Flat teal box with tiny +/- buttons
- Plain text timer display, hard to read
- Used `document.getElementById('beep')` (fragile DOM access)

### After
- **Full-screen gradient background** — changes color by phase:
  - Teal gradient = Reading Time
  - Orange gradient = Snack Break
  - Purple gradient = Screen Break
- **Circular SVG progress ring** — visually shows time remaining as a ring that fills
- **Large mono-font time** (06:23) centered inside the ring
- **Phase label** with emoji (📖 Reading Time, 🍎 Snack Break, 🎮 Screen Break)
- **Pill-shaped Start/Pause/Reset buttons** — white with hover scale animation
- **Time setter cards** — glass-morphism style (+/- buttons, disabled while timer runs)
- **Session dots** — 4 dots fill up as sessions complete, long break triggers after every 4th session
- **useRef for audio** — replaced fragile `document.getElementById` with React ref
- **Clean useEffect** — fixed dependency arrays, separated tick logic from phase transition logic

### Files
| File | Change |
|------|--------|
| `src/Components/pomodoro/MyTimer.jsx` | Complete rewrite — new design, fixed bugs |

---

## 24. Redesigned Notes App (BUILT)

### Purpose
Complete redesign of the notes system at `/notes`, `/notes/new`, `/notes/:id`, `/notes/:id/edit`.

### Notes List (`/notes`) — Before vs After

| Before | After |
|--------|-------|
| Sidebar + embedded pomodoro timer | Clean standalone page |
| Teal cards with cramped id/title/date | Colorful pastel card grid (6 rotating colors) |
| No search | Search bar filtering by title + content |
| No empty state | Empty state with emoji + helpful text |

### New Note (`/notes/new`) — Before vs After

| Before | After |
|--------|-------|
| CKEditor (heavy, often broken) | Clean native textarea |
| Gray slate background | White card with large title input |
| Manual UserID text field | Auto-sets from auth context |
| "Add Note" button at bottom | "Save Note" button fixed in header |
| No feedback | Toast notifications on save |

### Show Note (`/notes/:id`) — Before vs After

| Before | After |
|--------|-------|
| Cramped layout | Full-width white card |
| Icon-only buttons (confusing) | Clear "Edit" and "Delete" text buttons |
| Truncated content | Full content with HTML sanitization |
| `useEffect` dependency `[note]` — infinite loop | Fixed to `[id, navigate]` |

### Edit Note (`/notes/:id/edit`) — Before vs After

| Before | After |
|--------|-------|
| CKEditor with broken layout | Clean textarea matching New Note design |
| Icon-only submit button | "Save Changes" button in header |
| `useEffect` dependency `[notes]` — infinite loop | Fixed to `[id, navigate]` |
| `httpService` import (unused) | Removed |

### Key Technical Fixes
- Removed CKEditor dependency (was heavy and causing build issues)
- Fixed infinite `useEffect` loops in ShowNotes and UpdateNotes (had state in dependency arrays)
- Removed unused `httpService` imports
- Added auth-aware user ID for new notes
- Added toast notifications for save/update/delete feedback

### Files
| File | Change |
|------|--------|
| `src/Components/note/Notes.jsx` | Complete rewrite — search, colorful card grid, no sidebar/timer |
| `src/Components/note/NewNotes.jsx` | Complete rewrite — clean form, auto user ID, removed CKEditor |
| `src/Components/note/ShowNotes.jsx` | Complete rewrite — full content card, fixed infinite loop |
| `src/Components/note/UpdateNotes.jsx` | Complete rewrite — clean edit form, fixed infinite loop |
| `src/Components/note/ListNotes.jsx` | Complete rewrite — colorful cards with truncated previews |

---

## 25. Admin Role & Permission Separation (BUILT)

### Purpose
Separated admin functionality from teacher role. Teachers should only manage their own students — not view/add/edit/delete other teachers. That's an admin responsibility.

### Role Permissions

| Feature | Student | Teacher | Parent | Admin |
|---------|---------|---------|--------|-------|
| View all teachers list (`/teachers`) | No | No | No | Yes |
| Add new teachers (`/teachers/new`) | No | No | No | Yes |
| Edit/delete teachers | No | No | No | Yes |
| View own teacher profile (`/teachers/:id`) | — | Yes | — | Yes |
| View/manage own students (`/students`) | No | Yes (own) | No | Yes (all) |
| Add new students | No | Yes | No | Yes |
| Teacher dashboard | — | Yes | — | Yes |
| Student dashboard | Yes | — | — | Yes |
| Parent dashboard | — | — | Yes | Yes |
| Reading log, stats, stickers | Yes | Yes | Yes | Yes |
| Notification bell | — | Yes | — | Yes |
| All protected routes | — | — | — | Yes (superuser) |

### How Admin Superuser Works

**`AuthContext.jsx` — `hasRole()`:**
```javascript
if (userRole === 'admin') return true;
```
Admin passes ALL role checks automatically.

**`ProtectedRoute.jsx`:**
```javascript
if (allowedRoles && user.role !== 'admin' && !allowedRoles.includes(user.role)) {
  return <Navigate to="/unauthorized" />;
}
```
Admin bypasses all route restrictions.

### Navigation Changes

**Teacher sees:**
- BOOKS, GAMES, MY STUDENTS, MY BOOKS, DASHBOARD, notification bell, LOGOUT

**Admin sees:**
- BOOKS, GAMES, TEACHERS, STUDENTS, MY BOOKS, DASHBOARD, notification bell, LOGOUT

**Key change:** Teachers no longer see the "TEACHERS" nav link. They see "MY STUDENTS" instead of "STUDENTS".

### Demo Accounts Updated

| Role | Username | Password | What they see |
|------|----------|----------|---------------|
| **Admin** | `admin` | `admin123` | Everything — teachers list, all students, dashboards |
| **Teacher** | `ms_ramesh` | `teacher123` | Own students only, teacher dashboard, no teachers list |
| **Student** | `alice_reader` | `student123` | Reading log, stats, stickers, student dashboard |
| **Parent** | `parent_chen` | `parent123` | Child progress, email settings, parent dashboard |

### Route Changes

| Route | Before | After |
|-------|--------|-------|
| `/teachers` (list all) | `allowedRoles={['teacher']}` | `allowedRoles={['admin']}` |
| `/teachers/new` | `allowedRoles={['teacher']}` | `allowedRoles={['admin']}` |
| `/teachers/:id/edit` | `allowedRoles={['teacher']}` | `allowedRoles={['admin']}` |
| `/teachers/:id` (view) | `allowedRoles={['teacher']}` | `allowedRoles={['teacher', 'admin']}` |

### Files Changed

| File | Change |
|------|--------|
| `src/services/demoAuthService.js` | Admin account role changed from `teacher` to `admin` |
| `src/context/AuthContext.jsx` | `hasRole()` returns `true` for admin on all checks |
| `src/Components/auth/ProtectedRoute.jsx` | Admin bypasses `allowedRoles` check |
| `src/Components/common/AnimatedRoutes.jsx` | Teacher routes split into admin-only and teacher+admin |
| `src/Components/common/nav.jsx` | Teacher sees "MY STUDENTS", admin sees "TEACHERS" + "STUDENTS" |

---

## 26. Bookshelf Headings & Font Consistency (BUILT)

### Bookshelf Headings
Added descriptive headings above each bookshelf in the Reading Corner section:

- **Left shelf**: "Reading Level Books" — "Books organized by Fountas & Pinnell levels A-Z" — "Click the shelf to browse by level"
- **Right shelf**: "Casual Reading" — "Fun books to read for enjoyment" — "Click the shelf to browse casual reads"

Headings are inside each `<Link>` wrapper so they're centered with their shelf and clickable.

### Readers Corner Image
Centered using `flex justify-center` wrapper instead of `margin: 0 auto` on the image directly.

### Font Updates for Consistency

All section headings on the `/books` page now use the same pattern: `1.5rem / font-weight 700 / dark teal`.

| Section | Before | After |
|---------|--------|-------|
| Learning Tools title | `2em / 900 / Roboto / #03958e` | `1.5rem / 700 / #0f766e` |
| Tool card titles (Dictionary, etc.) | `1.5em / 600 / gray` | `1.125rem / 600 / #1f2937` |
| Tool card descriptions | `1.5em / 600 / gray` | `0.875rem / 400 / #9ca3af` |
| Notes App title | `2em / 900 / Roboto / #03958e` | `1.5rem / 700 / #0f766e` |
| Notes card title/description | `1.5em / 600` | `1.125rem / 600` + `0.875rem / 400` |
| Graded Reading title | `2em / 900 / #03958e` | `1.5rem / 700 / #03958e` |
| Books List title | `2em / 900 / #03958e` | `1.5rem / 700 / #0f766e` |
| Reading Level Books page title | `text-2xl / teal-600` | `text-xl / font-bold / teal-700` |
| Casual Reading page title | `text-2xl / teal-600` | `text-xl / font-bold / teal-700` |

### Learning Tools Card Styling
- Removed heavy black box-shadow
- Added `border-radius: 12px`, `padding: 16px`
- Added subtle hover shadow + lift animation
- Matches card style used throughout the app

### DisplayTools Tab Animation
- Rainbow gradient line flows along the bottom of the tab bar
- Active tab has animated 3-sided rainbow border (top + left + right)
- Whitesmoke strip covers the bottom line under the active tab creating a connected path
- Colors cycle through: teal → purple → coral → yellow → violet → blue
- Fixed `e.target.value` bug → `e.currentTarget.value` so clicking the span inside the button works
- Inactive tabs use `bg-transparent` so the rainbow line shows through

### Files Changed

| File | Change |
|------|--------|
| `src/Components/bookShelf/BookShelf.jsx` | Added headings above each shelf, centered Readers Corner image |
| `src/Components/tools/LearnTools/LearningTools.scss` | Updated fonts, removed heavy shadow, added rounded cards |
| `src/Pages/Notes/Note.scss` | Updated fonts to match Learning Tools |
| `src/Components/digitalBookLinks/DigitalBookLinks.scss` | Reduced title font to 1.5rem |
| `src/Components/slider/Slider.scss` | Reduced Books List title font to 1.5rem |
| `src/Components/books/bookCard/ReadingLevelBooks.jsx` | Title font updated to text-xl font-bold teal-700 |
| `src/Components/books/bookCard/CasualReading.jsx` | Title font updated to text-xl font-bold teal-700 |
| `src/Components/tools/SelectTools/DisplayTools.jsx` | Pill buttons inside tabs, `e.currentTarget.value` fix |
| `src/Components/tools/SelectTools/DisplayTools.scss` | Animated rainbow border, transparent inactive tabs |

---

## 27. Timer Navigation & Dark Mode Support (BUILT)

### Timer in Nav
Added TIMER button to the navigation bar for all users (desktop + mobile), between GAMES and role-specific links. Uses `MdTimer` icon.

### Timer Dark Mode
The Pomodoro timer now detects `data-theme` and switches colors:

| Phase | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Reading Time | teal-400 → teal-600 | teal-700 → teal-900 |
| Snack Break | orange-300 → orange-500 | orange-600 → orange-800 |
| Screen Break | purple-400 → purple-600 | purple-700 → purple-900 |
| Text color | Black (with /60-/80 for secondary) | White (with /60-/80 for secondary) |
| Progress ring | Black stroke | White stroke |
| Buttons/cards | Black/10 backgrounds | White/15 backgrounds |
| Session dots | Black | White |

Uses `MutationObserver` to detect `data-theme` attribute changes on `<html>` in real time.

### Timer Accessibility
Secondary text (Session label, "minutes", setter labels) use softer opacity for visual hierarchy while staying readable:
- Session label: 70% opacity
- Setter card labels: 70% opacity
- "minutes" text: 60% opacity
- Setter numbers: 80% opacity

### Files
| File | Change |
|------|--------|
| `src/Components/pomodoro/MyTimer.jsx` | Dark mode detection, dynamic colors via inline styles, `MutationObserver` |
| `src/Components/common/nav.jsx` | Added TIMER nav button with `MdTimer` icon |

---

## 28. Dark Mode Fixes — Books, Games & Components (BUILT)

### Problem
Multiple pages had text that turned white in dark mode but backgrounds stayed light — making text invisible.

### Fixes Applied in `App.css`

| Component | Light Background | Dark Background | Elements Fixed |
|-----------|-----------------|-----------------|----------------|
| Book cards (`.bookCard`) | `white` | `#1e293b` (slate) | Card bg + title text |
| Bookshelf titles | inherited | `#e2e8f0` (white) | Title text |
| Learning Tools | `#03958e` | `#5eead4` (bright teal) | Title, card titles, descriptions |
| Graded Reading title | `#03958e` | `#5eead4` | Title text |
| Books List title | `#03958e` | `#5eead4` | Title text |
| Notes App title | `#03958e` | `#5eead4` | Title, card text |
| Search bar | white bg | `#1e293b` + white text | Input field |
| Card sliders (above Reading Corner) | default | `#1e293b` + white text | Both left + right cards, dot indicators |
| Game cards (listing page) | `#EEF2F7` | `#1e293b` + teal border | All 6 game type cards |
| RPS game page | `bg-teal-100` | `#134e4a` (dark teal) | Full page background |
| Guess the Word game page | `bg-cyan-50` | `#164e63` (dark cyan) | Full page background |

### Files
| File | Change |
|------|--------|
| `src/App.css` | Added 15+ dark mode CSS rules for all affected components |

---

## 29. Reading Leaderboard (BUILT)

### Purpose
Class-wide ranking showing who's reading the most, with weekly/monthly/all-time views.

### How It Works
- **Period toggle**: This Week / This Month / All Time — filters completed books by date
- **Sort toggle**: Books Read / Pages Read / Streak — changes ranking order
- **Ranked list**: shows rank (medals for top 3), avatar, name, books, pages, streak
- **"You" highlight**: current user's row is highlighted in teal
- Uses localStorage data in demo mode; ready for backend `/api/leaderboard` endpoint

### Route
`/leaderboard` — any authenticated user

### Files
| File | Purpose |
|------|---------|
| `src/services/leaderboardService.js` | Computes rankings from reading log data |
| `src/Pages/Leaderboard/ClassLeaderboard.jsx` | Leaderboard page with filters and ranked list |

---

## 30. Book Recommendations (BUILT)

### Purpose
"Recommended for You" — suggests books based on what the student has read.

### How It Works
- Analyzes completed books to find the student's top genre
- Recommends books in that genre they haven't read yet
- Falls back to a curated list of 12 popular children's books
- Horizontal scrollable card slider with covers and "+ Add" button

### Where It Appears
- **Student Dashboard** — "Recommended for You" section above the reading log cards

### Files
| File | Purpose |
|------|---------|
| `src/services/recommendationService.js` | Genre-based recommendations + curated fallback list |
| `src/Components/books/BookRecommendations.jsx` | Horizontal card slider component |
| `src/Pages/StudentDashboard.jsx` | Updated — added `<BookRecommendations />` |

---

## 31. Book Clubs (BUILT)

### Purpose
Teachers create reading groups where students join, discuss books, and invite friends.

### Features
- **Create a club** — teachers set name, description, select a book, get auto-generated 6-character invite code
- **Join with invite code** — students enter code on the Book Clubs page
- **Member list** — shows all members with avatars, leader badge
- **Discussion thread** — post comments, see other members' thoughts with timestamps
- **Copy invite code** — one-click copy button for sharing with friends
- **Leave club** — members can leave at any time

### Routes
| Route | Auth | Description |
|-------|------|-------------|
| `/book-clubs` | Any authenticated | List of clubs + join with code |
| `/book-clubs/create` | Teacher/Admin | Create a new club |
| `/book-clubs/:id` | Any authenticated | Club detail — members, discussion, invite code |

### Files
| File | Purpose |
|------|---------|
| `src/services/bookClubService.js` | CRUD for clubs, members, posts (localStorage) |
| `src/Pages/BookClubs/MyBookClubs.jsx` | Club list + join form |
| `src/Pages/BookClubs/BookClubDetail.jsx` | Club detail — members, discussion, invite code |
| `src/Pages/BookClubs/CreateBookClub.jsx` | Create club form |

---

## 32. Real-time Socket Service (BUILT)

### Purpose
Enables real-time communication between students and teachers via WebSocket.

### How It Works
- `socketService.js` manages a singleton socket.io connection
- Connects with JWT token for authentication
- Supports event listeners: `onSocketEvent` / `offSocketEvent`
- Falls back gracefully when socket.io-client isn't installed
- Ready for backend events: `student:session_logged`, `student:book_completed`, `student:award_earned`

### Files
| File | Purpose |
|------|---------|
| `src/services/socketService.js` | Socket.io client wrapper — connect, disconnect, events |

---

## 33. Accessibility (BUILT)

### Skip to Content
- `SkipToContent` component renders as first child in `App.jsx`
- Invisible until user presses Tab — then shows "Skip to main content" link
- Jumps to `#main-content` (the `<main>` element)

### Focus Indicators
- All focusable elements get a visible **teal outline** on keyboard focus (`*:focus-visible`)
- 3px solid `#0d9488` with 2px offset — matches app theme
- Only shows on keyboard navigation, not mouse clicks

### Semantic HTML
- `<main>` has `id="main-content"` and `role="main"`
- Dark mode toggle has `aria-label="Toggle dark mode"`
- `.sr-only` utility class for screen-reader-only text

### Files
| File | Change |
|------|--------|
| `src/Components/common/SkipToContent.jsx` | New — skip-to-content link |
| `src/App.jsx` | Added SkipToContent, `id="main-content"`, `role="main"` |
| `src/index.css` | Added `*:focus-visible` styles and `.sr-only` class |

---

## 34. Unit Tests (BUILT)

### Setup
- **Vitest** (Vite-native test runner, Jest-compatible)
- **jsdom** environment for DOM testing
- **Test setup file** mocks `localStorage` and `matchMedia`
- Run with: `npx vitest run`

### Test Suites

**Reading Log Service** — 11 tests:
| Test | What It Verifies |
|------|-----------------|
| addBook — adds to log | Book appears in getAllBooks |
| addBook — sets start date for reading | startDate is set |
| updateBook — changes status | Status updates correctly |
| updateBook — sets end date on complete | endDate auto-set |
| updateBook — updates rating | Rating saved |
| removeBook | Book removed from list |
| getBooksByStatus — filters | Correct count per status |
| logSession — logs session | Session appears, bookTitle stored |
| logSession — updates current page | Page count incremented |
| getStats — returns correct stats | totalBooks, currentlyReading, wantToRead, totalPages |
| checkAwards — awards First Book | Award marked as earned |
| checkAwards — no double-award | Same award not given twice |

**Book Club Service** — 8 tests:
| Test | What It Verifies |
|------|-----------------|
| createClub — creates with invite code | 6-char code generated, leader added |
| joinClub — valid code | Member count increases |
| joinClub — invalid code | Returns error |
| joinClub — duplicate member | Returns error |
| leaveClub — removes member | Member count decreases |
| addPost + getClubPosts | Posts stored and retrieved |
| deletePost | Post removed |

### Results
```
 Test Files  2 passed (2)
      Tests  19 passed (19)
   Duration  1.40s
```

### Files
| File | Purpose |
|------|---------|
| `src/test/setup.js` | Test environment setup — localStorage mock, matchMedia mock |
| `src/services/__tests__/readingLogService.test.js` | 11 tests for reading log CRUD + awards |
| `src/services/__tests__/bookClubService.test.js` | 8 tests for book club CRUD |
| `vite.config.js` | Added `test` config block for Vitest |

---

## 35. Reading Partners with Invite Codes & Chat (BUILT)

### Purpose
Students can invite friends to be reading partners using invite codes. Partners can chat about books using built-in discussion prompts.

### How Invite Codes Work

**Student creates invite:**
1. Go to `/reading-partners` → "Invite a Reading Partner"
2. Optionally enter a book to read together
3. Click "Get Invite Code" → generates 6-character code (e.g., `X3KM9P`)
4. Code appears in yellow "Your Invite Codes" section with Copy button
5. Shows days remaining until expiry

**Friend accepts invite:**
1. Go to `/reading-partners` → "Join a Partner"
2. Enter the 6-character code
3. Click "Join Partner" → partnership becomes active
4. Chat is now available

**Teachers can also pair students directly** — enter both names in the "Pair Students" form.

### Invite Code Rules
| Rule | Detail |
|------|--------|
| Format | 6 uppercase alphanumeric characters |
| Expiry | 7 days from creation |
| Single use | Code is consumed when partner joins |
| Visibility | Pending codes shown with Copy button until used or expired |
| Expired code | Returns error: "This invite code has expired" |
| Self-invite | Blocked: "You cannot partner with yourself" |

### Partner Chat
- Real-time-style messaging between paired students
- Your messages: teal bubbles on the right
- Partner's messages: gray bubbles on the left
- Timestamps on each message

### Discussion Prompts (16 built-in)
Tap a prompt to instantly send it as a message — no need to think of what to say.

| Category | Prompts |
|----------|---------|
| **Characters** | Favorite character, be any character, character change, character as friend |
| **Story** | Most surprising part, retell in 3 sentences, change the ending, what happens after |
| **Feelings** | What made you laugh, sad/worried part, how did it make you feel, reminds you of |
| **Thinking** | Lesson learned, recommend to friend, new word learned, questions about story |

### Route
`/reading-partners` — any authenticated user

### Files
| File | Purpose |
|------|---------|
| `src/services/bookClubService.js` | Updated — createPartnership with invite code + expiry, acceptPartnerInvite with expiry check, partner chat CRUD |
| `src/Pages/BookClubs/ReadingPartners.jsx` | Full page — invite/join forms, pending codes display, partner list, chat, discussion prompts |

---

## 36. Teacher Dashboard — Community Overview (BUILT)

### Purpose
Teachers can now see book clubs, reading partnerships, and top readers directly on their dashboard.

### Three-Card Layout (between Activity Feed and Quick Actions)

**Book Clubs Card:**
- Shows up to 4 clubs with name, member count, book title
- "View All" → `/book-clubs`
- "+ Create Club" button
- Links to individual club pages

**Reading Partners Card:**
- Active count (green) + Pending count (yellow)
- Shows up to 3 active partnerships with avatars
- "Manage" → `/reading-partners`
- "+ Pair Students" button

**Top Readers Card:**
- Top 5 readers with medals (🥇🥈🥉), avatar, name, book count
- "Full Board" → `/leaderboard`
- "View Leaderboard" button

### Files
| File | Change |
|------|--------|
| `src/Pages/TeacherDashboard.jsx` | Complete update — added imports for bookClubService, leaderboardService; added Community Overview 3-card grid |

---

## 37. Backend — New Feature Endpoints (BUILT)

### Database (migration 003_new_features.sql)
6 new tables:

| Table | Columns | Purpose |
|-------|---------|---------|
| `book_clubs` | id, name, description, book_title, book_cover_url, invite_code, created_by, status | Reading groups |
| `book_club_members` | id, club_id, user_id, username, role | Club membership |
| `book_club_posts` | id, club_id, user_id, username, content | Discussion threads |
| `reading_partners` | id, student1_id/name, student2_id/name, book_title, invite_code, status, expires_at | Partner pairs |
| `partner_chat` | id, partnership_id, user_id, username, message | Partner messaging |
| `book_recommendations` | id, book_id, recommended_book_id, score, reason | Co-occurrence data |

### New Endpoints (20 total)

**Book Clubs** — 9 endpoints:
`GET /api/book-clubs`, `GET /api/book-clubs/all`, `GET /api/book-clubs/:id`, `POST /api/book-clubs`, `POST /api/book-clubs/join`, `DELETE /api/book-clubs/:id/leave`, `GET /api/book-clubs/:id/posts`, `POST /api/book-clubs/:id/posts`, `DELETE /api/book-clubs/:id/posts/:postId`

**Reading Partners** — 6 endpoints:
`GET /api/reading-partners`, `POST /api/reading-partners`, `POST /api/reading-partners/accept`, `DELETE /api/reading-partners/:id`, `GET /api/reading-partners/:id/chat`, `POST /api/reading-partners/:id/chat`

**Leaderboard** — 2 endpoints:
`GET /api/leaderboard`, `GET /api/leaderboard/class`

**Recommendations** — 3 endpoints:
`GET /api/recommendations/for-me`, `GET /api/recommendations/:bookId`, `POST /api/recommendations/refresh`

### Backend Files Added
| File | Purpose |
|------|---------|
| `migrations/003_new_features.sql` | 6 tables + 7 indexes |
| `queries/bookClubs.js` | Club CRUD, members, posts |
| `queries/readingPartners.js` | Partnership CRUD, invite accept, chat |
| `queries/leaderboard.js` | Global + class leaderboard SQL |
| `queries/recommendations.js` | Per-book, per-user, co-occurrence refresh |
| `controllers/bookClubController.js` | 9 endpoints |
| `controllers/readingPartnerController.js` | 6 endpoints |
| `controllers/leaderboardController.js` | 2 endpoints |
| `controllers/recommendationController.js` | 3 endpoints |
| `app.js` | Updated — 4 new route registrations |
| `migrations/run.js` | Updated — added 003 to migration list |

---

## 38. Frontend-Backend API Connection (BUILT)

### Architecture
All services now use a dual-layer pattern:
- **API-first**: calls the backend via `axiosInstance` (JWT auth)
- **localStorage fallback**: if API fails or demo mode is ON, uses local data

### Services Refactored

| Service | API Endpoints | Fallback File |
|---------|--------------|---------------|
| `readingLogService.js` | `/api/reading-log`, `/api/sessions`, `/api/awards` | `readingLogLocal.js` |
| `bookClubService.js` | `/api/book-clubs`, `/api/reading-partners` | `bookClubLocal.js` |
| `leaderboardService.js` | `/api/leaderboard` | Local mock data |
| `recommendationService.js` | `/api/recommendations` | Curated book list |
| `notificationService.js` | `/api/notifications`, `/api/class/daily/:date` | `notificationLocal.js` |

### Components Updated for Async
All `useEffect` calls that previously used sync service functions were updated to use `async/await`:
- MyBooks, BookProgress, MyStats, MyStickerCase, ParentDashboard
- BookRecommendations, RecentActivity, TeacherActivityFeed, NotificationBell
- TeacherDashboard, MyBookClubs, ReadingPartners, ClassLeaderboard

---

## 39. Demo vs Live Data Mode Toggle (BUILT)

### Toggle Component
A switch in the **footer** of every page:
- **Demo mode** (yellow, left): all data in localStorage, demo accounts work
- **Live mode** (teal, right): all data goes to/from PostgreSQL backend

### Data Isolation
Demo accounts (`admin`, `ms_ramesh`, `alice_reader`, `parent_chen`) are **permanently locked to localStorage**:
- `isDemoMode()` checks the JWT token for demo account IDs
- If demo account → always returns `true` → toggle is grayed out and disabled
- Demo users see: "🔒 Demo account (read-only, no API access)"
- Real users can freely toggle between Demo and Live

### Files
| File | Purpose |
|------|---------|
| `src/services/demoAuthService.js` | Updated — `isDemoMode()` checks account + toggle, `isDemoAccount()`, `toggleDemoMode()` |
| `src/Components/common/DataModeToggle.jsx` | Toggle switch component with demo account lock |
| `src/Components/common/Footer.jsx` | Updated — added DataModeToggle |

---

## 40. React 19 Patterns (BUILT)

### Features Used

| Pattern | Old (React 18) | New (React 19) | Where |
|---------|---------------|----------------|-------|
| `useActionState` | `useState` + `handleSubmit` + `setIsSubmitting` + `setError` | `const [state, action, isPending] = useActionState(fn)` | Login, CreateBookClub |
| `<form action={fn}>` | `<form onSubmit={handleSubmit}>` + `e.preventDefault()` | `<form action={formAction}>` | Login, CreateBookClub |
| `useTransition` | Direct setState blocks UI | `startTransition(async () => { ... })` | StudentDashboard, Leaderboard |
| Async `useEffect` | `useEffect(() => { setState(syncCall()) })` | `useEffect(() => { startTransition(async () => { ... }) })` | StudentDashboard |

### Files
| File | React 19 Pattern |
|------|-----------------|
| `src/Pages/Login.jsx` | `useActionState` + `<form action>` |
| `src/Pages/BookClubs/CreateBookClub.jsx` | `useActionState` + `<form action>` |
| `src/Pages/StudentDashboard.jsx` | `useTransition` for async data loading with skeleton |
| `src/Pages/Leaderboard/ClassLeaderboard.jsx` | `useTransition` for non-blocking filter changes |

---

## 41. About Page GitHub Integration Fix (BUILT)

### AllReposInfo
- **Before**: Filtered by hardcoded repo IDs that no longer matched → showed nothing
- **After**: Filters by repo names: `CapstoneGroup5`, `CapstoneGroup5Backend`, `CapstoneGroup5-v2`, `CapstoneGroup5-v2-backend`. Falls back to latest 6 repos. Loading/error states added.

### CommitHistory
- **Before**: Used `Octokit` with undefined `process.env.TOKEN` → failed silently
- **After**: Uses plain `fetch()` to public GitHub API. Fetches from both v2 and original repos, shows repo name tag, proper loading/error states.

### Files
| File | Change |
|------|--------|
| `src/Pages/About/ReposOfSingleUser/AllReposInfo.jsx` | Filter by name, loading state, error handling |
| `src/Pages/About/AllCommitsOfAUser/CommitHistory.jsx` | Replaced Octokit with fetch, multi-repo support |

---

## 42. Array Key Audit (FIXED)

### Problem
React uses `key` to track list items. Using array `index` as key causes bugs when items are added, removed, or reordered — wrong items get re-rendered, form inputs attach to wrong rows.

### Fixes Applied

| File | Before | After | Reason |
|------|--------|-------|--------|
| FlashCardList.jsx | `key={idx}` (2 places) | `key={definition}`, `key={ex}` | Text content is unique |
| DisplayCardList.jsx | `key={idx}` (4 places) | `key={definition}`, `key={ex}`, `key={syn}`, `key={ant}` | Text content is unique |
| TeacherActivityFeed.jsx | `key={i}` | `key={reader.bookId \|\| i}` | bookId is the identifier |
| RockpaperScissor.jsx | `key={index}` | `key={option}` | Each emoji is unique |
| GuessWord.jsx | `key={index}` (2 places) | `` key={`${letter}-${index}`} `` | Letters repeat, composite key needed |
| MemoryGame.jsx | `key={i}` | `key={data.id \|\| i}` | Cards have random id |
| Profile.jsx (topics) | `key={index}` | `key={topic}` | Topics are unique strings |
| BooksPerMonthChart.jsx | `key={i}` | `key={d.month}` | Month names are unique |

### Kept as index (OK — static lists)
StickerPopup confetti dots, MyTimer session dots, skeleton placeholders, heatmap day labels, Slider images, color palette, temp files.
