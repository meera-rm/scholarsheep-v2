import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import httpService from '../httpService';


const API = process.env.REACT_APP_API_URL;

const alphabets = [
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

const AllBooks = () => {
  const [bookData, setBookData] = useState([]);
  const [q, setQ] = useState('');

  const [searchParam] = useState([
    'book_title',
    'book_author',
    // 'reading_level',
  ]);

  const [filterParam, setFilterParam] = useState(['All']);

  const [show, setShow] = useState(false);

  useEffect(() => {
    // https://medium.com/@deniswachira_/how-to-asynchronously-call-apis-inside-the-useeffect-hook-ce524431ce6#:~:text=In%20this%20method%2C%20we%20can,the%20declaration%20of%20the%20function.&text=I%20have%20used%20an%20arrow,keyword%20before%20the%20function%20definition.
 


    const fetchBooks = async () =>{
         const response = await httpService.get(`${API}/api/books`);
         setBookData(response.data.payload)
    } 
    fetchBooks()
     // promise approach
    // axios.get(`${API}/api/books`)
    //   //  .then((response) => console.log(response.data))
    //   .then((response) => setBookData(response.data.payload))
    //   .catch((e) => console.log('catch', e));
   
      // iifee approach

    // (async () => {
    //   const res = await httpService.get(`${API}/api/books);
    //   setBookData(res.data.payload)
    // })();
 
}, []);
    
  

  const data = Object.values(bookData);

  function search(bookData) {
    // eslint-disable-next-line
    return bookData.filter((book) => {
      if (book.reading_level === filterParam) {
        return searchParam.some((newBook) => {
          return (
            book[newBook].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      } else if (filterParam === 'All') {
        return searchParam.some((newBook) => {
          return (
            book[newBook].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      }
    });
  }

  const newAlphabet = alphabets.map((book) => {
    return <option value={book}>{book} </option>;
  });

  return (
    <div className=' md:col-span-2 '>
      {/* <div className='text-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 '>
        
      </div> */}
      <h2 className='text-center mt-10 mb-5 text-5xl font-bold text-teal-600 '>
        Books
      </h2>

      <div className='text-right'>
        <Link to={`/books/new`}>
          <button className=' mr-20 btn bg-indigo-500 px-4 py-4 rounded text-white  font-georgia hover:bg-indigo-400 '>
            Add Books{' '}
          </button>
        </Link>
      </div>

      <div className='flex justify-center mt-10 text-center'>
        <label htmlFor='search-form'>
          <input
            type='search'
            name='search-form'
            id='search-form'
            className='border-2 border-black outline  mr-5'
            placeholder='Search for a book by title'
            value={q}
            onChange={(e) => setQ(e.target.value)}
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
            <option value='choose'>-- Select Reading Level--</option>
            <option value='All'>Filter By Reading Level</option>
            {newAlphabet}
          </select>
          <span className='focus'></span>
        </div>
      </div>

      <div className='mt-14 grid text-center md:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-16'>
        {/* <div className='max-w-sm rounded overflow-hidden shadow-lg '> */}
        {search(data)?.map((book) => {
          return (
            <div>
              <section
                className='text-center w-40 h-20'
                // rounded-sm  hover:shadow-sm'
                key={book.book_id + book.book_title}
              >
                <div>
                  <Link
                    className='text-center'
                    to={`/books/` + book.book_id}
                    key={book.book_id}
                  >
                    <img
                      style={{ width: '600px', height: '200px' }}
                      className='text-center'
                      src={`${book.book_picture}`}
                      alt={book.book_picture}
                    />

                    {/* </div>
               <div> */}
                    <p className='align-middle'>id: {book.book_id}</p>
                    <p className='content-center'>
                      Reading Level: {book.reading_level}
                    </p>
                  </Link>
                </div>
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllBooks;
