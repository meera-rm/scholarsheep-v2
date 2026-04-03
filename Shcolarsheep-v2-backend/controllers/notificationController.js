const express = require('express');
const router = express.Router();
const Notifications = require('../queries/notifications');
const { authenticate, authorize } = require('../middleware/authenticate');

router.use(authenticate);
router.use(authorize('teacher'));

// GET /api/notifications — get teacher's notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notifications.getByTeacher(req.user.id);
    const { count: unreadCount } = await Notifications.getUnreadCount(req.user.id);
    res.json({ notifications, unreadCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/notifications/unread-count
router.get('/unread-count', async (req, res) => {
  try {
    const { count } = await Notifications.getUnreadCount(req.user.id);
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/notifications/:id/read — mark one as read
router.put('/:id/read', async (req, res) => {
  try {
    await Notifications.markAsRead(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/notifications/read-all — mark all as read
router.put('/read-all', async (req, res) => {
  try {
    await Notifications.markAllAsRead(req.user.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
