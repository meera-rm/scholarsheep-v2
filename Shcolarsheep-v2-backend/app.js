const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Controllers
const userController = require('./controllers/userController');
const readingLogController = require('./controllers/readingLogController');
const sessionController = require('./controllers/sessionController');
const bookSearchController = require('./controllers/bookSearchController');
const awardController = require('./controllers/awardController');
const notificationController = require('./controllers/notificationController');
const classController = require('./controllers/classController');
const goalController = require('./controllers/goalController');
const reportController = require('./controllers/reportController');

// Legacy controllers (original ScholarSheep endpoints)
const bookController = require('./controllers/bookController');
const teachersController = require('./controllers/teachersController');
const studentController = require('./controllers/studentController');
const commentController = require('./controllers/commentController');
const noteController = require('./controllers/noteController');
const subscriptionController = require('./controllers/subscriptionController');
const dictionaryController = require('./controllers/dictionaryController');

// New feature controllers
const bookClubController = require('./controllers/bookClubController');
const readingPartnerController = require('./controllers/readingPartnerController');
const leaderboardController = require('./controllers/leaderboardController');
const recommendationController = require('./controllers/recommendationController');

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to ScholarSheep v2 API!',
    version: '2.0.0',
    endpoints: [
      'POST /api/users/login',
      'POST /api/users (register)',
      'POST /api/users/google-login',
      'GET  /api/users/me',
      'GET  /api/reading-log',
      'POST /api/reading-log',
      'PUT  /api/reading-log/:id',
      'GET  /api/sessions',
      'POST /api/sessions',
      'GET  /api/sessions/streak',
      'GET  /api/sessions/heatmap',
      'GET  /api/book-search?q=',
      'GET  /api/awards',
      'GET  /api/awards/earned',
      'POST /api/awards/check',
      'POST /api/awards/custom',
      'POST /api/awards/assign',
      'GET  /api/notifications',
      'PUT  /api/notifications/read-all',
      'GET  /api/class/students',
      'GET  /api/class/stats',
      'GET  /api/class/daily/:date',
      'POST /api/class/enroll',
      'GET  /api/goals',
      'POST /api/goals',
      'GET  /api/reports/student/:userId/:year',
      'GET  /api/reports/class/:year',
    ],
  });
});

app.use('/api/users', userController);
app.use('/api/reading-log', readingLogController);
app.use('/api/sessions', sessionController);
app.use('/api/book-search', bookSearchController);
app.use('/api/awards', awardController);
app.use('/api/notifications', notificationController);
app.use('/api/class', classController);
app.use('/api/goals', goalController);
app.use('/api/reports', reportController);

// Legacy routes (original ScholarSheep — used by existing frontend pages)
app.use('/api/books', bookController);
app.use('/api/teachers', teachersController);
app.use('/api/students', studentController);
app.use('/api/comments', commentController);
app.use('/api/notes', noteController);
app.use('/api/subscriptions', subscriptionController);
app.use('/api/dictionary', dictionaryController);

// New feature routes
app.use('/api/book-clubs', bookClubController);
app.use('/api/reading-partners', readingPartnerController);
app.use('/api/leaderboard', leaderboardController);
app.use('/api/recommendations', recommendationController);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
