-- ScholarSheep v2 — New Features: Book Clubs, Reading Partners, Partner Chat, Recommendations

-- ===== BOOK CLUBS =====
CREATE TABLE IF NOT EXISTS book_clubs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  book_title VARCHAR(500),
  book_cover_url TEXT,
  invite_code VARCHAR(10) UNIQUE NOT NULL,
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS book_club_members (
  id SERIAL PRIMARY KEY,
  club_id INTEGER NOT NULL REFERENCES book_clubs(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  username VARCHAR(100),
  role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('member', 'leader')),
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(club_id, user_id)
);

CREATE TABLE IF NOT EXISTS book_club_posts (
  id SERIAL PRIMARY KEY,
  club_id INTEGER NOT NULL REFERENCES book_clubs(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  username VARCHAR(100),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ===== READING PARTNERS =====
CREATE TABLE IF NOT EXISTS reading_partners (
  id SERIAL PRIMARY KEY,
  student1_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  student1_name VARCHAR(200),
  student2_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  student2_name VARCHAR(200),
  book_title VARCHAR(500),
  invite_code VARCHAR(10) UNIQUE,
  assigned_by VARCHAR(200),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'expired')),
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS partner_chat (
  id SERIAL PRIMARY KEY,
  partnership_id INTEGER NOT NULL REFERENCES reading_partners(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  username VARCHAR(200),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ===== BOOK RECOMMENDATIONS (precomputed) =====
CREATE TABLE IF NOT EXISTS book_recommendations (
  id SERIAL PRIMARY KEY,
  book_id INTEGER NOT NULL REFERENCES books_catalog(id) ON DELETE CASCADE,
  recommended_book_id INTEGER NOT NULL REFERENCES books_catalog(id) ON DELETE CASCADE,
  score NUMERIC(5,2) DEFAULT 0,
  reason VARCHAR(50),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(book_id, recommended_book_id)
);

-- ===== INDEXES =====
CREATE INDEX IF NOT EXISTS idx_club_members_club ON book_club_members(club_id);
CREATE INDEX IF NOT EXISTS idx_club_posts_club ON book_club_posts(club_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_partners_student1 ON reading_partners(student1_id);
CREATE INDEX IF NOT EXISTS idx_partners_student2 ON reading_partners(student2_id);
CREATE INDEX IF NOT EXISTS idx_partners_invite ON reading_partners(invite_code);
CREATE INDEX IF NOT EXISTS idx_partner_chat ON partner_chat(partnership_id, created_at);
CREATE INDEX IF NOT EXISTS idx_recommendations_book ON book_recommendations(book_id, score DESC);
