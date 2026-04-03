import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import httpService from '../httpService';
import { AiFillDelete } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';
import { BiArrowBack } from 'react-icons/bi';
const API = process.env.REACT_APP_API_URL;

const BookDetails = () => {
  const [book, setBook] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };


  let navigate = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    // httpService
   
    axios.get(`${API}/api/books/${id}`)
      .then((response) => {
        setBook(response.data.payload);
      })
      .catch(() => navigate('/not-found'));
  }, [id, navigate, book]);

  // const filterBooksbyReadingLevel = (letter) =>{
  //   return book.filter((bookItem) => bookItem.reading_level === letter.toUpperCase())[0];
  // }

  //Delete functions
  const handleDelete = () => {
    axios
      .delete(`${API}/api/books/${id}`)
      .then(() => {
        navigate('/books');
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className='max-h-screen grid place-items-center '>
      <div className='bg-white h-24 w-64 rounded-md'></div>
      <h2 className='font-bold mb-5 text-teal-600 mt-10 text-5xl'>
        Book Details
      </h2>
    

      <article className='text-center'>
         {/* <div>
          <p className='font-bold'>
            <img
              className='text-center object-contain h-52 w-96'
              src={`${book.book_picture}`}
              alt={book.book_picture}
            />
          </p>
          <p className='font-bold'>
            {' '}
            Id:
            <span className='font-semibold'>{book.book_id}</span>
          </p>
          <p className='font-bold'>
            Book Title:<span className='font-semibold'>{book.book_title}</span>
          </p>

          <p className='font-bold'>
            Book Author:
            <span className='font-semibold'>{book.book_author}</span>
          </p>
          <p className='font-bold'>
            ISBN : <span className='font-semibold'>{book.isbn_number}</span>
          </p>
          <p className='font-bold'>
            Publication:{' '}
            <span className='font-semibold'>{book.publication}</span>
          </p>
          <p className='font-bold'>
            Reading Level:
            <span className='font-semibold'>{book.reading_level}</span>
          </p>
        </div>  */}

    
     <div
      className={`bookCard ${expanded ? 'expanded' : 'bookCard'}`}
      onClick={handleExpand}
    >
      <img
        className='bookCard__image'
        width='150px'
        height='150px'
         src={book.book_picture}
        // src='https://dummyimage.com/150x150/c2c2c2/00'
        alt=''
      />

      <div
        className={`bookCard__text ${expanded ? 'expanded' : ''}`}
        onClick={handleExpand}
      >
         <div className='bookCard__textcontent'> 
          <h2 className='bookCard__title'>{`${book.book_title}`}</h2>
         
          <ol className='bookCard__summary'>
          <li className='bookCard__summary-list'>
              Id: <span>{`${book.book_id}`} </span>
            </li>
            <li className='bookCard__summary-list'>
              Reading Level: 
              <span>{`${book.reading_level}`}
                  </span> 
            </li>
            <li className='bookCard__summary-list'>
              {' '}
              Book Author: 
              <span>{`${book.book_author}`}
                  </span>
            </li>
           
            <li className='bookCard__summary-list'>
              ISBN : 
              <span>{`${book.isbn_number}`}</span>
            </li>
            <li className='bookCard__summary-list'>
              {' '}
              Publication: 
              <span>{`${book.publication}`}</span> 
            </li>
          </ol>
        </div>
        </div>
        <svg
          className={`bookCard__chevron ${expanded ? 'expanded' : ''}`}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 100 35'
          width='30'
        >
          <path
            d='M5 30L50 5l45 25'
            fill='none'
            stroke='#000'
            strokeWidth='5'
          />
        </svg>
    
    
    </div> 

        <div className=' mt-10 flex justify-center ml-6 space-x-6'>
          <div className='bg-teal-500 px-6 py-4 rounded text-white'>
            {' '}
            <Link to={'/books/level'}>
              {/* <button className='show-btns'>Back </button> */}
              <BiArrowBack className='cursor-pointer' />
            </Link>
          </div>
          <div className='bg-teal-500 px-6 py-4 text-white rounded '>
            {' '}
            <Link to={`/books/${id}/edit`}>
              {/* <button className='show-btns'>Edit </button> */}
              <BsPencilSquare className='cursor-pointer' />
            </Link>
          </div>
          <div className='bg-teal-500 px-6 py-4 text-white rounded '>
            {' '}
            <Link to={'/books'}>
              {/* <button className='show-btns' onClick={handleDelete}>
               Delete      
              </button> */}
              <AiFillDelete className='cursor-pointer' onClick={handleDelete} />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BookDetails;
