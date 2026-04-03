/**
 * Recommendation Service — API-first with localStorage fallback
 */

import api from '../utils/axiosInstance';
import { isDemoMode } from './demoAuthService';
import * as local from './readingLogLocal';

const useApi = () => !isDemoMode();

export async function getRecommendationsForBook(bookId) {
  if (useApi()) {
    try {
      const res = await api.get(`/api/recommendations/${bookId}`);
      if (res.data.recommendations?.length > 0) return res.data.recommendations;
    } catch { /* fall through */ }
  }
  return getDefaultRecommendations();
}

export async function getPersonalRecommendations() {
  if (useApi()) {
    try {
      const res = await api.get('/api/recommendations/for-me');
      if (res.data.recommendations?.length > 0) return res.data.recommendations;
    } catch { /* fall through */ }
  }
  return getLocalPersonalRecommendations();
}

function getLocalPersonalRecommendations() {
  const allBooks = local.getAllBooks();
  const completed = allBooks.filter((b) => b.status === 'completed');
  if (completed.length === 0) return getDefaultRecommendations();

  const genreCounts = {};
  completed.forEach((b) => { const g = b.genre || 'Fiction'; genreCounts[g] = (genreCounts[g] || 0) + 1; });
  const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Fiction';

  const readIsbns = new Set(allBooks.map((b) => b.isbn).filter(Boolean));
  return getDefaultRecommendations(topGenre).filter((b) => !readIsbns.has(b.isbn)).slice(0, 6);
}

function getDefaultRecommendations(genre) {
  const all = [
    { title: "Charlotte's Web", author: 'E.B. White', isbn: '9780064400558', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780064400558-M.jpg', genre: 'Fiction', pageCount: 184 },
    { title: 'Matilda', author: 'Roald Dahl', isbn: '9780142410370', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780142410370-M.jpg', genre: 'Fiction', pageCount: 240 },
    { title: "Harry Potter and the Sorcerer's Stone", author: 'J.K. Rowling', isbn: '9780590353427', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780590353427-M.jpg', genre: 'Fantasy', pageCount: 309 },
    { title: 'The Lightning Thief', author: 'Rick Riordan', isbn: '9780786838653', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780786838653-M.jpg', genre: 'Fantasy', pageCount: 377 },
    { title: 'Wonder', author: 'R.J. Palacio', isbn: '9780375869020', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780375869020-M.jpg', genre: 'Fiction', pageCount: 315 },
    { title: 'Diary of a Wimpy Kid', author: 'Jeff Kinney', isbn: '9780810993136', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780810993136-M.jpg', genre: 'Fiction', pageCount: 217 },
    { title: 'Dog Man', author: 'Dav Pilkey', isbn: '9780545581608', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780545581608-M.jpg', genre: 'Comics', pageCount: 240 },
    { title: 'The One and Only Ivan', author: 'Katherine Applegate', isbn: '9780061992278', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780061992278-M.jpg', genre: 'Fiction', pageCount: 305 },
    { title: 'Holes', author: 'Louis Sachar', isbn: '9780440414803', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780440414803-M.jpg', genre: 'Fiction', pageCount: 233 },
    { title: 'The Bad Guys', author: 'Aaron Blabey', isbn: '9780545912402', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780545912402-M.jpg', genre: 'Comics', pageCount: 140 },
    { title: 'Magic Tree House: Dinosaurs Before Dark', author: 'Mary Pope Osborne', isbn: '9780679824114', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780679824114-M.jpg', genre: 'Adventure', pageCount: 68 },
  ];
  if (genre) { const match = all.filter((b) => b.genre === genre); if (match.length >= 3) return match; }
  return all.sort(() => Math.random() - 0.5).slice(0, 6);
}
