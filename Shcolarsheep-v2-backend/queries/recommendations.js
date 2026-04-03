const db = require('../db/dbConfig');

// Get recommendations for a book (collaborative filtering)
const getForBook = (bookId, limit = 6) =>
  db.any(`
    SELECT bc.*, br.score, br.reason
    FROM book_recommendations br
    JOIN books_catalog bc ON br.recommended_book_id = bc.id
    WHERE br.book_id = $1
    ORDER BY br.score DESC
    LIMIT $2
  `, [bookId, limit]);

// Get personalized recommendations for a user (based on their top genre)
const getForUser = (userId, limit = 6) =>
  db.any(`
    WITH user_genres AS (
      SELECT bc.genre, COUNT(*)::int AS cnt
      FROM reading_log rl
      JOIN books_catalog bc ON rl.book_id = bc.id
      WHERE rl.user_id = $1 AND rl.status = 'completed' AND bc.genre IS NOT NULL
      GROUP BY bc.genre
      ORDER BY cnt DESC
      LIMIT 1
    ),
    user_books AS (
      SELECT book_id FROM reading_log WHERE user_id = $1
    )
    SELECT bc.*
    FROM books_catalog bc
    WHERE bc.genre = (SELECT genre FROM user_genres)
      AND bc.id NOT IN (SELECT book_id FROM user_books)
    ORDER BY RANDOM()
    LIMIT $2
  `, [userId, limit]);

// Refresh recommendations using co-occurrence (users who read X also read Y)
const refreshRecommendations = () =>
  db.none(`
    INSERT INTO book_recommendations (book_id, recommended_book_id, score, reason, updated_at)
    SELECT
      rl1.book_id,
      rl2.book_id AS recommended_book_id,
      COUNT(DISTINCT rl1.user_id)::numeric AS score,
      'also_read' AS reason,
      NOW() AS updated_at
    FROM reading_log rl1
    JOIN reading_log rl2 ON rl1.user_id = rl2.user_id AND rl1.book_id != rl2.book_id
    WHERE rl1.status = 'completed' AND rl2.status = 'completed'
    GROUP BY rl1.book_id, rl2.book_id
    HAVING COUNT(DISTINCT rl1.user_id) >= 1
    ON CONFLICT (book_id, recommended_book_id)
    DO UPDATE SET score = EXCLUDED.score, updated_at = NOW()
  `);

module.exports = { getForBook, getForUser, refreshRecommendations };
