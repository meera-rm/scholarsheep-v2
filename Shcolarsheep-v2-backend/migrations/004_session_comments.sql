-- ===== TEACHER COMMENTS ON STUDENT READING SESSIONS =====
CREATE TABLE IF NOT EXISTS session_comments (
  id SERIAL PRIMARY KEY,
  session_id INTEGER NOT NULL REFERENCES reading_sessions(id) ON DELETE CASCADE,
  teacher_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_session_comments_session ON session_comments(session_id, created_at);
