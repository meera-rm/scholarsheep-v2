/**
 * Class Service — teacher-only: roster, a student's reading sessions, and comments on them.
 */

import api from '../utils/axiosInstance';
import { isDemoMode } from './demoAuthService';

export async function getMyStudents() {
  if (isDemoMode()) return [];
  const res = await api.get('/api/class/students');
  return res.data.students || [];
}

export async function getStudentSessions(studentId) {
  if (isDemoMode()) return [];
  const res = await api.get(`/api/sessions/student/${studentId}`);
  return res.data.sessions || [];
}

export async function getSessionComments(sessionId) {
  if (isDemoMode()) return [];
  const res = await api.get(`/api/sessions/${sessionId}/comments`);
  return res.data.comments || [];
}

export async function addSessionComment(sessionId, comment) {
  const res = await api.post(`/api/sessions/${sessionId}/comments`, { comment });
  return res.data.comment;
}
