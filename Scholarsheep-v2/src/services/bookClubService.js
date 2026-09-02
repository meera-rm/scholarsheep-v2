/**
 * Book Club Service — API-first with localStorage fallback
 */

import api from '../utils/axiosInstance';
import { isDemoMode } from './demoAuthService';
import * as local from './bookClubLocal';

const useApi = () => !isDemoMode();

// Backend rows are snake_case and the list endpoint only returns a member
// count, not the full member array the UI shape (and localStorage fallback)
// uses — normalize both onto the same shape here.
function mapClub(c) {
  if (!c) return c;
  return {
    id: c.id,
    name: c.name,
    description: c.description || '',
    bookTitle: c.book_title || c.bookTitle || '',
    bookCoverUrl: c.book_cover_url || c.bookCoverUrl || '',
    inviteCode: c.invite_code || c.inviteCode,
    createdBy: c.created_by || c.createdBy,
    memberCount: c.member_count ?? c.memberCount ?? 0,
    createdAt: c.created_at || c.createdAt,
  };
}

function mapMember(m) {
  return { username: m.username, role: m.role, joinedAt: m.joined_at || m.joinedAt };
}

// Same normalization for reading-partner rows — the backend returns
// snake_case (student1_name, invite_code, book_title, expires_at), but the
// UI (and localStorage fallback) reads camelCase (student1, inviteCode,
// bookTitle, expiresAt), so every partnership needs mapping through here.
function mapPartnership(p) {
  if (!p) return p;
  return {
    id: p.id,
    student1: p.student1_name || p.student1,
    student2: p.student2_name || p.student2 || '',
    bookTitle: p.book_title || p.bookTitle || '',
    inviteCode: p.invite_code || p.inviteCode,
    assignedBy: p.assigned_by || p.assignedBy,
    status: p.status,
    expiresAt: p.expires_at || p.expiresAt,
    createdAt: p.created_at || p.createdAt,
  };
}

function mapChatMessage(m) {
  if (!m) return m;
  return {
    id: m.id,
    username: m.username,
    message: m.message,
    createdAt: m.created_at || m.createdAt,
  };
}

// ─── Book Clubs ───

export async function createClub(data) {
  if (useApi()) {
    try {
      const res = await api.post('/api/book-clubs', {
        name: data.name, description: data.description,
        book_title: data.bookTitle, book_cover_url: data.bookCoverUrl,
      });
      return mapClub(res.data.club);
    } catch { /* fall through */ }
  }
  return local.createClub(data);
}

export async function getAllClubs() {
  if (useApi()) {
    try { const res = await api.get('/api/book-clubs/all'); return (res.data.clubs || []).map(mapClub); } catch { /* fall through */ }
  }
  return local.getAllClubs();
}

export async function getClubById(id) {
  if (useApi()) {
    try {
      const res = await api.get(`/api/book-clubs/${id}`);
      return { ...mapClub(res.data.club), members: (res.data.members || []).map(mapMember) };
    } catch { /* fall through */ }
  }
  return local.getClubById(id);
}

export async function joinClub(inviteCode, username) {
  if (useApi()) {
    try {
      const res = await api.post('/api/book-clubs/join', { invite_code: inviteCode });
      return mapClub(res.data.club);
    } catch (err) { return { error: err.response?.data?.message || 'Failed to join' }; }
  }
  return local.joinClub(inviteCode, username);
}

export async function leaveClub(clubId, username) {
  if (useApi()) { try { await api.delete(`/api/book-clubs/${clubId}/leave`); return; } catch { /* fall through */ } }
  return local.leaveClub(clubId, username);
}

export async function getClubPosts(clubId) {
  if (useApi()) { try { const res = await api.get(`/api/book-clubs/${clubId}/posts`); return res.data.posts || []; } catch { /* fall through */ } }
  return local.getClubPosts(clubId);
}

export async function addPost(data) {
  if (useApi()) {
    try { const res = await api.post(`/api/book-clubs/${data.clubId}/posts`, { content: data.content }); return res.data.post; } catch { /* fall through */ }
  }
  return local.addPost(data);
}

export async function deletePost(postId, clubId) {
  if (useApi()) { try { await api.delete(`/api/book-clubs/${clubId}/posts/${postId}`); return; } catch { /* fall through */ } }
  return local.deletePost(postId);
}

// ─── Reading Partners ───

export async function createPartnership(data) {
  if (useApi()) {
    try {
      const res = await api.post('/api/reading-partners', { student1_name: data.student1, student2_name: data.student2, book_title: data.bookTitle });
      return mapPartnership(res.data.partnership);
    } catch { /* fall through */ }
  }
  return local.createPartnership(data);
}

export async function acceptPartnerInvite(inviteCode, username) {
  if (useApi()) {
    try {
      const res = await api.post('/api/reading-partners/accept', { invite_code: inviteCode });
      return mapPartnership(res.data.partnership);
    } catch (err) { return { error: err.response?.data?.message || 'Failed to accept' }; }
  }
  return local.acceptPartnerInvite(inviteCode, username);
}

export async function getMyPartners(username) {
  if (useApi()) { try { const res = await api.get('/api/reading-partners'); return (res.data.partnerships || []).map(mapPartnership); } catch { /* fall through */ } }
  return local.getMyPartners(username);
}

export async function getAllPartnerships() {
  if (useApi()) { try { const res = await api.get('/api/reading-partners'); return (res.data.partnerships || []).map(mapPartnership); } catch { /* fall through */ } }
  return local.getAllPartnerships();
}

export async function removePartnership(id) {
  if (useApi()) { try { await api.delete(`/api/reading-partners/${id}`); return; } catch { /* fall through */ } }
  return local.removePartnership(id);
}

export async function getPartnerChat(partnershipId) {
  if (useApi()) { try { const res = await api.get(`/api/reading-partners/${partnershipId}/chat`); return (res.data.messages || []).map(mapChatMessage); } catch { /* fall through */ } }
  return local.getPartnerChat(partnershipId);
}

export async function sendMessage(data) {
  if (useApi()) {
    try { const res = await api.post(`/api/reading-partners/${data.partnershipId}/chat`, { message: data.message }); return mapChatMessage(res.data.message); } catch { /* fall through */ }
  }
  return local.sendMessage(data);
}

export async function deleteMessage(messageId) {
  if (useApi()) { try { await api.delete(`/api/reading-partners/chat/${messageId}`); return; } catch { /* fall through */ } }
  return local.deleteMessage(messageId);
}
