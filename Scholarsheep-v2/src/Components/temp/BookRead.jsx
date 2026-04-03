import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import BookCard from '../books/bookCard/BookCard';
import './BookCardList.scss';
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

const BookCardList = () => {
  const [bookData, setBookData] = useState([]);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(['']);
  const [paginate, setpaginate] = useState(8);
  const [searchParam] = useState([
    'book_title',
    'book_author',
    'reading_level',
  ]);

  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/api/books`)
      //  .then((response) => console.log(response.data))
      .then((response) => {
        setBookData(response.data.payload);
        setLoaded(true);
      })
      .catch((error) => {
        console.error('catch', error);
        setLoaded(true);
        setError(error);
      });
  }, []);

  const data = Object.values(bookData);
  const search_parameters = Object.keys(Object.assign({}, ...data));
  const filter_items = [...new Set(data.map((book) => book.reading_level))];

  function search(bookData) {
    return bookData.filter(
      (book) =>
        book.reading_level.includes(filter) &&
        search_parameters.some((parameter) =>
          book[parameter].toString().toLowerCase().includes(query)
        )
    );
  }

  const load_more = (event) => {
    setpaginate((prevValue) => prevValue + 8);
  };

  // function search(bookData) {
  //   // eslint-disable-next-line
  //   return bookData.filter((book) => {
  //     if (book.reading_level === filterParam) {
  //       return searchParam.some((newBook) => {
  //         return (
  //           book[newBook].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
  //         );
  //       });
  //     } else if (filterParam === 'All') {
  //       return searchParam.some((newBook) => {
  //         return (
  //           book[newBook].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
  //         );
  //       });
  //     }
  //   });
  // }

  const newAlphabet = alphabets.map((book) => {
    return <option value={book}>{book} </option>;
  });
  if (error) {
    return <>{error.message}</>;
  } else if (!loaded) {
    return <>loading...</>;
  } else {
    return (
      <div>
        <div className='cardGrid'>
          {search(data)
            .slice(0, paginate)
            ?.map((book) => {
              return (
                // <li>
                <div>
                  {' '}
                  <BookCard book={book} />{' '}
                </div>

                // // </li>
              );
            })}
        </div>
        {/* </div>
        //  </div> */}

        <button  style={{margin:'0 auto'}}onClick={load_more}>Load More</button>
      </div>
    );
  }
};

export default BookCardList;





      // // <div className='md:col-span-2'>
      // //   {/* //   <div className='text-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 '> */}
      // //   <p className='p-4 text-teal-800 '>DICTIONARY/PDF BOOKS LINK:</p>
      // //   {/* <div className='text-center'>
      // //     <Link to={`/dictionary`}>
      // //       <p
      // //         className='px-4 py-4 rounded text-black font-georgia  underline'
      // //         onClick={() => setShow(!show)}
      // //       >
      // //         {' '}
      // //         DICTIONARY LINK
      // //       </p>
            
      // //     </Link>
      // //   </div> */}

      // //     <div>
      //     <p className='p-4 text-black underline'>
      //     <LovingToReadLink />
      //   </p>
      // </div>
      // <div>
      //   <p className='p-4 text-black underline '>
      //     <WilBooksLink/>
      //   </p>
      // </div>
      // <div>
      //   <p className='p-4 text-black underline'>
      //     <GetEpicLink />
      //   </p>
      // </div>
      // //   {/* // </div> */}
      // //   <h2 className='text-center  mt-10 mb-5 text-5xl font-bold text-teal-600 '>
      // //     Books
      // //   </h2>

      // //   <div className='text-right mr-80'>
      // //     <Link to={`/books/new`}>
      // //       <button className='mr-20 btn bg-indigo-500 px-4 py-4 rounded text-white  font-georgia hover:bg-indigo-400 '>
      // //         Add Books{' '}
      // //       </button>
      // //     </Link>
      // //   </div>

      // //   <div className='flex justify-evenly mt-10 text-center'>
      // //     <label htmlFor='search-form'>
      // //       <input
      // //         type='search'
      // //         name='search-form'
      // //         id='search-form'
      // //         className='border-2 border-black outline  mr-5'
      // //         placeholder='Search for..'
      // //         value={query}
      // //         onChange={(e) => setQuery(e.target.value)}
      // //       />
      // //       <span className='sr-only'>Search here</span>
      // //     </label>

      // //     <div className=''>
      // //       <select
      // //         onChange={(e) => {
      // //           setFilter(e.target.value);
      // //         }}
      // //         className='border-2 border-black outline'
      // //         aria-label='Filter Books By ReadingLevel'
      // //       >
      // //         <option value='choose'>-- Select Reading Level--</option>
      // //         <option value=''>Filter By Reading Level</option>
      // //         {/* {newAlphabet} */}
      // //         {filter_items.map((item) => (
      // //           <option value={item}>Filter By {item}</option>
      // //         ))}
      // //       </select>
      // //       <span className='focus'></span>
      // //     </div>
      // //   </div>

      //   {/* <div className='mt-14 grid text-center md:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-16'> */}
      //   {/* <div className='max-w-sm rounded overflow-hidden shadow-lg '> */}
      //   {/* <div className='container'>*/}


      // // loading gif
// {
//   /* <div class="tenor-gif-embed" data-postid="17733403" data-share-method="host" data-aspect-ratio="1.33333" data-width="100%"><a href="https://tenor.com/view/gb-notebook-laptop-gif-17733403">Gb Notebook Sticker</a>from <a href="https://tenor.com/search/gb-stickers">Gb Stickers</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script> */
// }
// // https://tenor.com/view/gb-notebook-laptop-gif-17733403
