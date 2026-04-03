import { useState, useEffect, useRef } from 'react';
import { searchBooks } from '../services/openLibraryService';

export function useBookSearch(query, delay = 400) {
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setError(null);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      try {
        const data = await searchBooks(query.trim(), 12);
        setResults(data);
      } catch (err) {
        setError('Failed to search books. Please try again.');
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, delay]);

  return { results, isSearching, error };
}
