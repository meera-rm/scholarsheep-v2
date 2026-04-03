/**
 * Notification Service
 *
 * Handles:
 * 1. In-app notifications for teachers (student reading activity)
 * 2. Parent email notifications when child logs a reading session
 *
 * Uses localStorage for in-app notifications.
 * Uses EmailJS for parent email notifications.
 */

import emailjs from 'emailjs-com';

const NOTIFICATIONS_KEY = 'scholarsheep_notifications';
const PARENT_EMAIL_KEY = 'scholarsheep_parent_email_settings';

// ─── EmailJS Configuration ───
// Sign up at https://www.emailjs.com (free tier: 200 emails/month)
// Create a service, template, and get your keys
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

// ─── In-App Notifications (Teacher) ───

function getNotifications() {
  const data = localStorage.getItem(NOTIFICATIONS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveNotifications(notifications) {
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
}

export function addNotification({ type, title, message, studentId, studentName, metadata }) {
  const notifications = getNotifications();
  const notification = {
    id: Date.now().toString(),
    type: type || 'reading_activity',
    title,
    message,
    studentId,
    studentName,
    metadata: metadata || {},
    read: false,
    createdAt: new Date().toISOString(),
  };
  notifications.unshift(notification); // newest first

  // Keep only last 100 notifications
  if (notifications.length > 100) {
    notifications.length = 100;
  }

  saveNotifications(notifications);
  return notification;
}

export function getTeacherNotifications() {
  return getNotifications();
}

export function getUnreadCount() {
  return getNotifications().filter((n) => !n.read).length;
}

export function markAsRead(notificationId) {
  const notifications = getNotifications();
  const idx = notifications.findIndex((n) => n.id === notificationId);
  if (idx !== -1) {
    notifications[idx].read = true;
    saveNotifications(notifications);
  }
}

export function markAllAsRead() {
  const notifications = getNotifications();
  notifications.forEach((n) => { n.read = true; });
  saveNotifications(notifications);
}

export function clearNotifications() {
  saveNotifications([]);
}

// ─── Daily Reading Summary for Teachers ───

export function getTodaysReaders() {
  const today = new Date().toISOString().split('T')[0];
  return getReadersForDate(today);
}

export function getYesterdaysReaders() {
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  return getReadersForDate(yesterday);
}

function getReadersForDate(dateStr) {
  const sessionsData = localStorage.getItem('scholarsheep_reading_sessions');
  const sessions = sessionsData ? JSON.parse(sessionsData) : [];

  const daySessions = sessions.filter((s) => s.sessionDate === dateStr);

  // Group by student (using bookId as proxy since we don't have student IDs in localStorage mode)
  const readerMap = {};
  daySessions.forEach((s) => {
    const key = s.bookId;
    if (!readerMap[key]) {
      readerMap[key] = {
        bookId: s.bookId,
        totalPages: 0,
        totalMinutes: 0,
        sessions: 0,
      };
    }
    readerMap[key].totalPages += s.pagesRead || 0;
    readerMap[key].totalMinutes += s.minutesSpent || 0;
    readerMap[key].sessions += 1;
  });

  return {
    date: dateStr,
    readers: Object.values(readerMap),
    totalSessions: daySessions.length,
    totalPages: daySessions.reduce((sum, s) => sum + (s.pagesRead || 0), 0),
    totalMinutes: daySessions.reduce((sum, s) => sum + (s.minutesSpent || 0), 0),
  };
}

// ─── Student Reading Activity Notifications (for teachers) ───

export function notifyTeacherOfReading({ studentName, bookTitle, pagesRead, minutesSpent }) {
  addNotification({
    type: 'reading_session',
    title: `${studentName} logged a reading session`,
    message: `Read ${pagesRead} pages of "${bookTitle}" (${minutesSpent} min)`,
    studentName,
    metadata: { bookTitle, pagesRead, minutesSpent },
  });
}

export function notifyTeacherOfBookComplete({ studentName, bookTitle, rating }) {
  addNotification({
    type: 'book_completed',
    title: `${studentName} finished a book!`,
    message: `Completed "${bookTitle}"${rating ? ` and rated it ${rating}/5 stars` : ''}`,
    studentName,
    metadata: { bookTitle, rating },
  });
}

export function notifyTeacherOfAward({ studentName, awardName, awardEmoji }) {
  addNotification({
    type: 'award_earned',
    title: `${studentName} earned a sticker!`,
    message: `${awardEmoji} ${awardName}`,
    studentName,
    metadata: { awardName, awardEmoji },
  });
}

// ─── Parent Email Notifications ───

export function getParentEmailSettings() {
  const data = localStorage.getItem(PARENT_EMAIL_KEY);
  return data
    ? JSON.parse(data)
    : { enabled: true, parentEmail: '', childName: '' };
}

export function saveParentEmailSettings(settings) {
  localStorage.setItem(PARENT_EMAIL_KEY, JSON.stringify(settings));
}

export async function sendParentEmail({ parentEmail, childName, bookTitle, pagesRead, minutesSpent, notes }) {
  const settings = getParentEmailSettings();
  if (!settings.enabled) return { sent: false, reason: 'disabled' };

  const emailTo = parentEmail || settings.parentEmail;
  if (!emailTo) return { sent: false, reason: 'no_email' };

  // Check if EmailJS is configured
  if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
    console.log('[Email Preview] Would send to:', emailTo);
    console.log('[Email Preview] Content:', { childName, bookTitle, pagesRead, minutesSpent, notes });

    // Store in localStorage so we can show "sent" emails in the UI
    const sentEmails = JSON.parse(localStorage.getItem('scholarsheep_sent_emails') || '[]');
    sentEmails.unshift({
      id: Date.now().toString(),
      to: emailTo,
      childName: childName || settings.childName || 'Your child',
      bookTitle,
      pagesRead,
      minutesSpent,
      notes,
      sentAt: new Date().toISOString(),
      preview: true, // indicates this was a preview, not actually sent
    });
    localStorage.setItem('scholarsheep_sent_emails', JSON.stringify(sentEmails));

    return { sent: true, preview: true };
  }

  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_email: emailTo,
        child_name: childName || settings.childName || 'Your child',
        book_title: bookTitle,
        pages_read: pagesRead,
        minutes_spent: minutesSpent,
        notes: notes || 'No notes today',
        date: new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      },
      EMAILJS_PUBLIC_KEY
    );
    return { sent: true, preview: false };
  } catch (error) {
    console.error('Failed to send parent email:', error);
    return { sent: false, reason: 'email_error', error };
  }
}

export function getSentEmails() {
  return JSON.parse(localStorage.getItem('scholarsheep_sent_emails') || '[]');
}
