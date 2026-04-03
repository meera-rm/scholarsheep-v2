/**
 * Notification Service — API-first with localStorage fallback
 */

import api from '../utils/axiosInstance';
import { isDemoMode } from './demoAuthService';
import * as local from './notificationLocal';

const useApi = () => !isDemoMode();

// Re-export everything from local that doesn't need API
export { getParentEmailSettings, saveParentEmailSettings, getSentEmails, sendParentEmail } from './notificationLocal';

// ─── Teacher Notifications ───

export async function getTeacherNotifications() {
  if (useApi()) {
    try {
      const res = await api.get('/api/notifications');
      return res.data.notifications || [];
    } catch { /* fall through */ }
  }
  return local.getTeacherNotifications();
}

export async function getUnreadCount() {
  if (useApi()) {
    try {
      const res = await api.get('/api/notifications');
      return res.data.unreadCount || 0;
    } catch { /* fall through */ }
  }
  return local.getUnreadCount();
}

export async function markAsRead(notificationId) {
  if (useApi()) {
    try { await api.put(`/api/notifications/${notificationId}/read`); return; } catch { /* fall through */ }
  }
  return local.markAsRead(notificationId);
}

export async function markAllAsRead() {
  if (useApi()) {
    try { await api.put('/api/notifications/read-all'); return; } catch { /* fall through */ }
  }
  return local.markAllAsRead();
}

export function clearNotifications() {
  return local.clearNotifications();
}

// ─── Activity Feed ───

export async function getTodaysReaders() {
  if (useApi()) {
    try {
      const today = new Date().toISOString().split('T')[0];
      const res = await api.get(`/api/class/daily/${today}`);
      return res.data;
    } catch { /* fall through */ }
  }
  return local.getTodaysReaders();
}

export async function getYesterdaysReaders() {
  if (useApi()) {
    try {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const res = await api.get(`/api/class/daily/${yesterday}`);
      return res.data;
    } catch { /* fall through */ }
  }
  return local.getYesterdaysReaders();
}

// ─── Notification Creators (write to both API and localStorage) ───

export async function notifyTeacherOfReading(data) {
  local.notifyTeacherOfReading(data);
  // API notifications are created server-side by sessionController
}

export async function notifyTeacherOfBookComplete(data) {
  local.notifyTeacherOfBookComplete(data);
}

export async function notifyTeacherOfAward(data) {
  local.notifyTeacherOfAward(data);
}

export function addNotification(data) {
  return local.addNotification(data);
}
