/**
 * Book Club Service — manages book clubs with invite codes and discussion threads.
 * Uses localStorage for demo mode.
 */

const CLUBS_KEY = 'scholarsheep_book_clubs';
const POSTS_KEY = 'scholarsheep_club_posts';

function getClubs() {
  return JSON.parse(localStorage.getItem(CLUBS_KEY) || '[]');
}
function saveClubs(clubs) {
  localStorage.setItem(CLUBS_KEY, JSON.stringify(clubs));
}
function getPosts() {
  return JSON.parse(localStorage.getItem(POSTS_KEY) || '[]');
}
function savePosts(posts) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

function generateInviteCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// ─── Club CRUD ───

export function createClub({ name, description, bookTitle, bookCoverUrl, createdBy }) {
  const clubs = getClubs();
  const club = {
    id: Date.now().toString(),
    name,
    description: description || '',
    bookTitle: bookTitle || '',
    bookCoverUrl: bookCoverUrl || '',
    inviteCode: generateInviteCode(),
    createdBy: createdBy || 'teacher',
    members: [{ username: createdBy || 'teacher', role: 'leader', joinedAt: new Date().toISOString() }],
    status: 'active',
    createdAt: new Date().toISOString(),
  };
  clubs.push(club);
  saveClubs(clubs);
  return club;
}

export function getAllClubs() {
  return getClubs();
}

export function getClubById(id) {
  return getClubs().find((c) => c.id === id) || null;
}

export function joinClub(inviteCode, username) {
  const clubs = getClubs();
  const club = clubs.find((c) => c.inviteCode === inviteCode);
  if (!club) return { error: 'Invalid invite code' };
  if (club.members.some((m) => m.username === username)) return { error: 'Already a member' };

  club.members.push({ username, role: 'member', joinedAt: new Date().toISOString() });
  saveClubs(clubs);
  return club;
}

export function leaveClub(clubId, username) {
  const clubs = getClubs();
  const club = clubs.find((c) => c.id === clubId);
  if (!club) return null;
  club.members = club.members.filter((m) => m.username !== username);
  saveClubs(clubs);
  return club;
}

// ─── Discussion Posts ───

export function getClubPosts(clubId) {
  return getPosts().filter((p) => p.clubId === clubId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function addPost({ clubId, username, content }) {
  const posts = getPosts();
  const post = {
    id: Date.now().toString(),
    clubId,
    username,
    content,
    createdAt: new Date().toISOString(),
  };
  posts.push(post);
  savePosts(posts);
  return post;
}

export function deletePost(postId) {
  const posts = getPosts().filter((p) => p.id !== postId);
  savePosts(posts);
}

// ─── Reading Partners ───

const PARTNERS_KEY = 'scholarsheep_reading_partners';
const CHAT_KEY = 'scholarsheep_partner_chat';

function getPartners() {
  return JSON.parse(localStorage.getItem(PARTNERS_KEY) || '[]');
}
function savePartners(partners) {
  localStorage.setItem(PARTNERS_KEY, JSON.stringify(partners));
}
function getChats() {
  return JSON.parse(localStorage.getItem(CHAT_KEY) || '[]');
}
function saveChats(chats) {
  localStorage.setItem(CHAT_KEY, JSON.stringify(chats));
}

export function createPartnership({ student1, student2, bookTitle, assignedBy }) {
  const partners = getPartners();
  const pair = {
    id: Date.now().toString(),
    student1,
    student2: student2 || '', // empty if invite-based (waiting for partner)
    bookTitle: bookTitle || '',
    inviteCode: generateInviteCode(),
    assignedBy: assignedBy || 'student',
    status: student2 ? 'active' : 'pending',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    createdAt: new Date().toISOString(),
  };
  partners.push(pair);
  savePartners(partners);
  return pair;
}

export function acceptPartnerInvite(inviteCode, username) {
  const partners = getPartners();
  const pair = partners.find((p) => p.inviteCode === inviteCode && p.status === 'pending');
  if (!pair) return { error: 'Invalid or expired invite code' };
  if (pair.expiresAt && new Date(pair.expiresAt) < new Date()) {
    pair.status = 'expired';
    savePartners(partners);
    return { error: 'This invite code has expired. Ask your friend for a new one.' };
  }
  if (pair.student1 === username) return { error: 'You cannot partner with yourself' };
  pair.student2 = username;
  pair.status = 'active';
  savePartners(partners);
  return pair;
}

export function getMyPartners(username) {
  return getPartners().filter(
    (p) => (p.student1 === username || p.student2 === username)
  );
}

export function getAllPartnerships() {
  return getPartners();
}

export function removePartnership(id) {
  const partners = getPartners().filter((p) => p.id !== id);
  savePartners(partners);
}

// ─── Partner Chat ───

export function getPartnerChat(partnershipId) {
  return getChats()
    .filter((c) => c.partnershipId === partnershipId)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
}

export function sendMessage({ partnershipId, username, message }) {
  const chats = getChats();
  const msg = {
    id: Date.now().toString(),
    partnershipId,
    username,
    message,
    createdAt: new Date().toISOString(),
  };
  chats.push(msg);
  saveChats(chats);
  return msg;
}

export function deleteMessage(messageId) {
  const chats = getChats().filter((c) => c.id !== messageId);
  saveChats(chats);
}
