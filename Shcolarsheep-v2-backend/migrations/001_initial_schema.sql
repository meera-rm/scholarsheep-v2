-- ScholarSheep v2 — Full Database Schema
-- Run with: psql -d scholarsheep_v2 -f migrations/001_initial_schema.sql

-- ===== USERS =====
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255),
  user_role VARCHAR(20) NOT NULL DEFAULT 'student',
  user_avatar TEXT DEFAULT '',
  google_id VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ===== TEACHERS =====
CREATE TABLE IF NOT EXISTS teachers (
  teacher_id SERIAL PRIMARY KEY,
  teacher_name VARCHAR(200) NOT NULL,
  school_name TEXT,
  school_district INTEGER,
  school_address TEXT,
  zipcode INTEGER,
  state_name TEXT,
  class_subject TEXT,
  teaching_grade TEXT,
  teacher_avatar TEXT,
  teacher_email VARCHAR(255),
  teacher_bio TEXT,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ===== STUDENTS =====
CREATE TABLE IF NOT EXISTS students (
  student_id SERIAL PRIMARY KEY,
  student_name VARCHAR(200) NOT NULL,
  parent_name TEXT,
  parent_email VARCHAR(255),
  student_email VARCHAR(255),
  grade TEXT,
  academic_year VARCHAR(20),
  reading_level TEXT,
  student_avatar TEXT,
  student_image TEXT,
  teachers_id INTEGER REFERENCES teachers(teacher_id) ON UPDATE CASCADE ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ===== BOOKS CATALOG (populated from Open Library + manual) =====
CREATE TABLE IF NOT EXISTS books_catalog (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  author VARCHAR(300),
  isbn VARCHAR(20) UNIQUE,
  cover_url TEXT,
  page_count INTEGER,
  genre VARCHAR(100),
  reading_level VARCHAR(50),
  open_library_id VARCHAR(100),
  description TEXT,
  publish_year INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ===== READING LOG (one entry per user per book) =====
CREATE TABLE IF NOT EXISTS reading_log (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  book_id INTEGER NOT NULL REFERENCES books_catalog(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'want_to_read'
    CHECK (status IN ('want_to_read', 'reading', 'completed', 'abandoned')),
  start_date DATE,
  end_date DATE,
  current_page INTEGER DEFAULT 0,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  school_year VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, book_id)
);

-- ===== READING SESSIONS (daily reading activity) =====
CREATE TABLE IF NOT EXISTS reading_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  book_id INTEGER NOT NULL REFERENCES books_catalog(id) ON DELETE CASCADE,
  reading_log_id INTEGER REFERENCES reading_log(id) ON DELETE CASCADE,
  session_date DATE NOT NULL,
  pages_read INTEGER DEFAULT 0,
  minutes_spent INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ===== AWARDS CATALOG =====
CREATE TABLE IF NOT EXISTS awards (
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
  created_by_teacher_id INTEGER REFERENCES teachers(teacher_id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ===== STUDENT EARNED AWARDS =====
CREATE TABLE IF NOT EXISTS student_awards (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  award_id INTEGER NOT NULL REFERENCES awards(id) ON DELETE CASCADE,
  earned_date DATE NOT NULL DEFAULT CURRENT_DATE,
  school_year VARCHAR(10),
  awarded_by VARCHAR(20) DEFAULT 'system',
  UNIQUE(user_id, award_id, school_year)
);

-- ===== READING GOALS =====
CREATE TABLE IF NOT EXISTS reading_goals (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER REFERENCES users(id),
  student_id INTEGER REFERENCES users(id),
  goal_type VARCHAR(30) NOT NULL,
  goal_value INTEGER NOT NULL,
  school_year VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ===== CLASS ENROLLMENT =====
CREATE TABLE IF NOT EXISTS class_enrollment (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  teacher_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  class_name VARCHAR(100),
  school_year VARCHAR(10),
  enrolled_date DATE DEFAULT CURRENT_DATE,
  UNIQUE(student_id, teacher_id, school_year)
);

-- ===== TEACHER NOTIFICATIONS =====
CREATE TABLE IF NOT EXISTS teacher_notifications (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  student_id INTEGER REFERENCES users(id),
  student_name VARCHAR(200),
  metadata JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ===== INDEXES =====
CREATE INDEX IF NOT EXISTS idx_reading_log_user ON reading_log(user_id);
CREATE INDEX IF NOT EXISTS idx_reading_log_status ON reading_log(status);
CREATE INDEX IF NOT EXISTS idx_reading_log_year ON reading_log(school_year);
CREATE INDEX IF NOT EXISTS idx_sessions_user_date ON reading_sessions(user_id, session_date);
CREATE INDEX IF NOT EXISTS idx_sessions_date ON reading_sessions(session_date);
CREATE INDEX IF NOT EXISTS idx_student_awards_user ON student_awards(user_id);
CREATE INDEX IF NOT EXISTS idx_class_enrollment_teacher ON class_enrollment(teacher_id, school_year);
CREATE INDEX IF NOT EXISTS idx_notifications_teacher ON teacher_notifications(teacher_id, is_read);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(user_role);

-- ===== SEED DEFAULT AWARDS =====
INSERT INTO awards (name, description, category, criteria_type, criteria_value, sticker_emoji, tier)
VALUES
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
  ('Critic', 'Write 20 book reviews', 'special', 'reviews_written', 20, '🖊️', 'gold')
ON CONFLICT DO NOTHING;
