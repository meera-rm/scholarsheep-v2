import axios from 'axios';
import React, { useState, useEffect } from 'react';
import EmptyView from '../../emptyView/EmptyView';
import BookLoader from '../../loader/BookLoader';
import BookCard from '../bookCard/BookCard';
// import httpService from '../../httpService';

const API = process.env.REACT_APP_API_URL;

const alphabets = [
  'All',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'Y',
  'Z',
];
let filteredData =[];

const SearchAndFilter = ({reading}) => {
  const [bookData, setBookData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filterParam, setFilterParam] = useState(['All']);
  const [paginate, setpaginate] = useState(8);
  const [searchParam] = useState([
    'book_title',
    'book_author',
    'reading_level',
  ]);

  useEffect(() => {
    // httpService
    axios.get(`${API}/api/books`)
      //  .then((response) => console.log(response.data))
      .then((response) => {
        setBookData(response.data.payload);
        setLoading(true);
      })
      .catch((error) => {
        console.error('catch', error);
        setLoading(true);
        setError(error);
      });
  }, []);
  const data = Object.values(bookData);
  if(reading==='AZ')
  { 
     filteredData = bookData.filter(book => book.reading_level !== 'CR');
}else {filteredData = bookData}

  function search(bookData) {
    // eslint-disable-next-line
   
    return filteredData.filter((book) => {
      console.log(book);
      if (book.reading_level === filterParam) {
        return searchParam.some((newBook) => {
          return (
            book[newBook].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        });
      } else if (filterParam === 'All') {
        return searchParam.some((newBook) => {
          return (
            book[newBook].toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        });
      }
    });
  }

  const load_more = (e) => {
    console.log(e.target.value);
    setpaginate((prevValue) => prevValue + 8);
  };

  if (error) {
    return <>{error.message}</>;
  } else if (!loading) {
    return (
      <div className='text-center'>
        <BookLoader />
      </div>
    );
  } else {
    return (
      <div className='wrapper'>
        <div className='flex justify-center mt-10 text-center'>
          <label htmlFor='search-form'>
            <input
              type='search'
              name='search-form'
              id='search-form'
              className='border-2 border-black outline  mr-5'
              placeholder='Search for a book by title'
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className='sr-only'>Search here</span>
          </label>

          <div className=''>
            <select
              onChange={(e) => {
                setFilterParam(e.target.value);
              }}
              className='border-2 border-black outline'
              aria-label='Filter Books By ReadingLevel'
            >
              <option key={'readinglevel'} value='choose'>
                -- Select Reading Level--
              </option>
              {reading==='AZ'?(<>
              {alphabets.map((item, index) => (
                <option key={item + index} value={item}>
                  Filter By {item}
                </option>
              ))}
              </>)
              :(<option key={'CR'} value={'CR'}>
              Filter By {'CR'}
            </option>)}
            </select>
            <span className='focus'></span>
          </div>
        </div>
        {search(data).length === 0 ? (
          <EmptyView message='No books found.' />
        ) : (
          <div className='grid grid-cols-1 space-evenly md:grid-cols-2 lg:grid-cols-3'>
            {search(data)
              .slice(0, paginate)
              .map((book) => (
                <div key={book.book_id}>
                  <BookCard book={book} />
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
};

export default SearchAndFilter;
