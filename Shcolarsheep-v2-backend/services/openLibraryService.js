const axios = require('axios');

const BASE = 'https://openlibrary.org';
const COVERS = 'https://covers.openlibrary.org';

async function searchBooks(query, limit = 12) {
  const res = await axios.get(`${BASE}/search.json`, {
    params: {
      q: query,
      limit,
      fields: 'title,author_name,isbn,cover_i,first_publish_year,subject,number_of_pages_median,key',
    },
  });

  return res.data.docs.map((book) => ({
    title: book.title,
    author: book.author_name?.[0] || 'Unknown',
    isbn: book.isbn?.[0] || null,
    cover_url: book.cover_i ? `${COVERS}/b/id/${book.cover_i}-M.jpg` : null,
    publish_year: book.first_publish_year,
    page_count: book.number_of_pages_median || null,
    genre: book.subject?.[0] || null,
    open_library_id: book.key || null,
  }));
}

async function getBookByISBN(isbn) {
  try {
    const res = await axios.get(`${BASE}/isbn/${isbn}.json`);
    const data = res.data;
    return {
      title: data.title,
      author: data.authors?.[0]?.name || 'Unknown',
      isbn,
      cover_url: `${COVERS}/b/isbn/${isbn}-M.jpg`,
      page_count: data.number_of_pages || null,
      publish_year: data.publish_date || null,
      open_library_id: data.key || null,
    };
  } catch {
    return null;
  }
}

module.exports = { searchBooks, getBookByISBN };
