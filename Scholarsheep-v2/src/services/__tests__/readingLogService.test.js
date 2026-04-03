import { describe, it, expect, beforeEach } from 'vitest';
import {
  addBook, getAllBooks, updateBook, removeBook,
  logSession, getAllSessions, getStats,
  checkAwards, getAllAwards, getBooksByStatus,
} from '../readingLogLocal';

beforeEach(() => {
  localStorage.clear();
});

describe('Reading Log Service', () => {
  describe('addBook', () => {
    it('adds a book to the reading log', () => {
      const book = addBook({ title: 'Test Book', author: 'Author', pageCount: 100 });
      expect(book.title).toBe('Test Book');
      expect(book.status).toBe('want_to_read');
      expect(getAllBooks()).toHaveLength(1);
    });

    it('sets start date when adding as reading', () => {
      const book = addBook({ title: 'Reading', author: 'A', status: 'reading' });
      expect(book.startDate).toBeTruthy();
    });
  });

  describe('updateBook', () => {
    it('updates book status', () => {
      const book = addBook({ title: 'Test', author: 'A' });
      const updated = updateBook(book.id, { status: 'reading' });
      expect(updated.status).toBe('reading');
      expect(updated.startDate).toBeTruthy();
    });

    it('sets end date when completing', () => {
      const book = addBook({ title: 'Test', author: 'A', status: 'reading' });
      const updated = updateBook(book.id, { status: 'completed' });
      expect(updated.status).toBe('completed');
      expect(updated.endDate).toBeTruthy();
    });

    it('updates rating', () => {
      const book = addBook({ title: 'Test', author: 'A' });
      const updated = updateBook(book.id, { rating: 5 });
      expect(updated.rating).toBe(5);
    });
  });

  describe('removeBook', () => {
    it('removes a book', () => {
      const book = addBook({ title: 'Test', author: 'A' });
      expect(getAllBooks()).toHaveLength(1);
      removeBook(book.id);
      expect(getAllBooks()).toHaveLength(0);
    });
  });

  describe('getBooksByStatus', () => {
    it('filters by status', () => {
      addBook({ title: 'A', author: 'A', status: 'reading' });
      addBook({ title: 'B', author: 'B', status: 'want_to_read' });
      addBook({ title: 'C', author: 'C', status: 'completed' });
      expect(getBooksByStatus('reading')).toHaveLength(1);
      expect(getBooksByStatus('want_to_read')).toHaveLength(1);
      expect(getBooksByStatus('completed')).toHaveLength(1);
    });
  });

  describe('logSession', () => {
    it('logs a reading session', () => {
      const book = addBook({ title: 'Test', author: 'A', status: 'reading', pageCount: 100 });
      const session = logSession({ bookId: book.id, pagesRead: 20, minutesSpent: 30 });
      expect(session.pagesRead).toBe(20);
      expect(session.bookTitle).toBe('Test');
      expect(getAllSessions()).toHaveLength(1);
    });

    it('updates current page after session', () => {
      const book = addBook({ title: 'Test', author: 'A', status: 'reading', pageCount: 100 });
      logSession({ bookId: book.id, pagesRead: 25 });
      const updated = getAllBooks().find((b) => b.id === book.id);
      expect(updated.currentPage).toBe(25);
    });
  });

  describe('getStats', () => {
    it('returns correct stats', () => {
      addBook({ title: 'A', author: 'A', status: 'completed', pageCount: 100 });
      addBook({ title: 'B', author: 'B', status: 'reading', pageCount: 200 });
      addBook({ title: 'C', author: 'C', status: 'want_to_read' });
      const stats = getStats();
      expect(stats.totalBooks).toBe(1);
      expect(stats.currentlyReading).toBe(1);
      expect(stats.wantToRead).toBe(1);
      expect(stats.totalPages).toBe(100);
    });
  });

  describe('checkAwards', () => {
    it('awards First Book on first completion', () => {
      addBook({ title: 'Test', author: 'A', status: 'completed', pageCount: 50 });
      const newAwards = checkAwards();
      const allAwards = getAllAwards();
      const firstBook = allAwards.find((a) => a.name === 'First Book');
      expect(firstBook.earned).toBe(true);
    });

    it('does not double-award', () => {
      addBook({ title: 'A', author: 'A', status: 'completed', pageCount: 50 });
      checkAwards();
      addBook({ title: 'B', author: 'B', status: 'completed', pageCount: 50 });
      const newAwards = checkAwards();
      const firstBookAwards = newAwards.filter((a) => a.name === 'First Book');
      expect(firstBookAwards).toHaveLength(0);
    });
  });
});
