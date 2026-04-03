import axios from 'axios';

const OPEN_LIBRARY_BASE = 'https://openlibrary.org';
const COVERS_BASE = 'https://covers.openlibrary.org';

export async function searchBooks(query, limit = 12) {
  const res = await axios.get(`${OPEN_LIBRARY_BASE}/search.json`, {
    params: {
      q: query,
      limit,
      fields:
        'title,author_name,isbn,cover_i,first_publish_year,subject,number_of_pages_median,key',
    },
  });
  return res.data.docs.map((book) => ({
    title: book.title,
    author: book.author_name?.[0] || 'Unknown',
    isbn: book.isbn?.[0] || null,
    coverUrl: book.cover_i
      ? `${COVERS_BASE}/b/id/${book.cover_i}-M.jpg`
      : null,
    publishYear: book.first_publish_year,
    pageCount: book.number_of_pages_median || null,
    genre: book.subject?.[0] || null,
    openLibraryKey: book.key || null,
  }));
}

export async function searchBooksByISBN(isbn) {
  try {
    const res = await axios.get(`${OPEN_LIBRARY_BASE}/isbn/${isbn}.json`);
    const data = res.data;
    return {
      title: data.title,
      author: data.authors?.[0]?.name || 'Unknown',
      isbn,
      coverUrl: `${COVERS_BASE}/b/isbn/${isbn}-M.jpg`,
      pageCount: data.number_of_pages || null,
      publishYear: data.publish_date || null,
      openLibraryKey: data.key || null,
    };
  } catch {
    return null;
  }
}

export function getCoverUrl(isbn, size = 'M') {
  if (!isbn) return null;
  return `${COVERS_BASE}/b/isbn/${isbn}-${size}.jpg`;
}

export function getCoverById(coverId, size = 'M') {
  if (!coverId) return null;
  return `${COVERS_BASE}/b/id/${coverId}-${size}.jpg`;
}
