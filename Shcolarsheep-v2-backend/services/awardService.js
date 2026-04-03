const db = require('../db/dbConfig');

function getSchoolYear() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  if (month >= 7) return `${year}-${year + 1}`;
  return `${year - 1}-${year}`;
}

async function checkAndAwardStickers(userId) {
  // 1. Count books completed
  const { count: booksCompleted } = await db.one(
    "SELECT COUNT(*)::int as count FROM reading_log WHERE user_id=$1 AND status='completed'",
    [userId]
  );

  // 2. Calculate current streak
  const streakResult = await db.oneOrNone(`
    WITH dates AS (
      SELECT DISTINCT session_date FROM reading_sessions WHERE user_id=$1 ORDER BY session_date DESC
    ),
    streaks AS (
      SELECT session_date,
        session_date - (ROW_NUMBER() OVER (ORDER BY session_date DESC))::int AS grp
      FROM dates
    )
    SELECT COUNT(*)::int AS streak
    FROM streaks
    WHERE grp = (SELECT grp FROM streaks LIMIT 1)
      AND session_date >= CURRENT_DATE - 1
  `, [userId]);
  const streak = streakResult?.streak || 0;

  // 3. Count unique genres
  const { count: genresRead } = await db.one(`
    SELECT COUNT(DISTINCT bc.genre)::int as count
    FROM reading_log rl
    JOIN books_catalog bc ON rl.book_id = bc.id
    WHERE rl.user_id=$1 AND rl.status='completed' AND bc.genre IS NOT NULL
  `, [userId]);

  // 4. Sum total pages
  const { total: totalPages } = await db.one(`
    SELECT COALESCE(SUM(bc.page_count), 0)::int as total
    FROM reading_log rl
    JOIN books_catalog bc ON rl.book_id = bc.id
    WHERE rl.user_id=$1 AND rl.status='completed'
  `, [userId]);

  // 5. Count reviews
  const { count: reviewsWritten } = await db.one(
    "SELECT COUNT(*)::int as count FROM reading_log WHERE user_id=$1 AND review IS NOT NULL AND review != ''",
    [userId]
  );

  // 6. Get all system awards and check criteria
  const allAwards = await db.any("SELECT * FROM awards WHERE is_custom = false");
  const earned = await db.any("SELECT award_id FROM student_awards WHERE user_id=$1", [userId]);
  const earnedIds = new Set(earned.map((e) => e.award_id));
  const schoolYear = getSchoolYear();

  const newAwards = [];

  for (const award of allAwards) {
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
        "INSERT INTO student_awards (user_id, award_id, earned_date, school_year) VALUES ($1, $2, CURRENT_DATE, $3) ON CONFLICT DO NOTHING",
        [userId, award.id, schoolYear]
      );
      newAwards.push(award);
    }
  }

  return newAwards;
}

module.exports = { checkAndAwardStickers, getSchoolYear };
