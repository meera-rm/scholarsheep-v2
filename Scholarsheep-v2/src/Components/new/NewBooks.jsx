import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import {ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import httpService from '../httpService';
const API = process.env.REACT_APP_API_URL;

const NewBooks = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  //declare states
  const [newBook, setNewBook] = useState({
    book_title: '',
    book_author: '',
    isbn_number: '',
    publication: '',
    book_picture: '',
    grade: '',
    reading_level: '',
  });


 

  const onInputChange = (event) => {
    console.log(event.target.value);
    setNewBook({
      ...newBook,
      [event.target.id]: event.target.value,
    });
    console.log('in text change', newBook);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   
    console.log('inhandlesumbit', newBook);

    //  httpService
    axios.post(`${API}/api/books/new`, newBook)
      .then(() => {
        console.log('added');
        notify();
        // navigate(`/books`);
        
      })
      .catch((err) => console.error('catch', err));
  };

  const notify = () => {
    toast.success(
      '🦄 , You added a new book',
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    )
    setTimeout(() => {
      navigate('/books')
    }, 2000)
  }


  return (
    <div className='flex items-center h-screen w-full bg-teal-lighter'>
      <div className='w-full bg-white rounded shadow-lg p-8 m-2 md:max-w-sm md:mx-auto'>
        {/* <div className='flex flex-col text-center h-screen items-center justify-center '>
      <div className='rounded-md  py-4 px-6 text-black lg:w-2/5 md:w-3/5 w-4/5'> */}
        <form
          className='mb-4 md:flex md:flex-wrap md:justify-between'
          onSubmit={handleSubmit}
        >
          <div className='flex flex-col mb-4 md:w-full'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='book_title'
            >
              Title
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='book_title'
              type='text'
              value={newBook.book_title}
              name='book_title'
              autoComplete='off'
              onChange={onInputChange}
              placeholder='Book title'
              required
            />
          </div>

          {/* <div className='mb-4'>
            <label className='py-6' htmlFor='book_title'>
              Title:{''}
            </label>
            <input
              className='border-2 border-black-700 outline'
              id='book_title'
              type='text'
              value={newBook.book_title}
              name='book_title'
              autoComplete='off'
              onChange={onInputChange}
              placeholder='Book title'
              required
            />
          </div> */}

          <div className='flex flex-col mb-4 md:w-full'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='book_author'
            >
              Author
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='book_author'
              type='text'
              name='book_author'
              value={newBook.book_author}
              placeholder='Author'
              autoComplete='off'
              onChange={onInputChange}
              required
            />
          </div>
          {/* <div className='mb-4'>
            <label className='py-6' htmlFor='book_author'>
              Author:{' '}
            </label>
            <input
              className='border-2 border-black-700 outline'
              id='book_author'
              type='text'
              name='book_author'
              value={newBook.book_author}
              placeholder='author'
              autoComplete='off'
              onChange={onInputChange}
            />
          </div> */}
          <div className='flex flex-col mb-4 md:w-full'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='isbn_number'
            >
              ISBN
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='isbn_number'
              type='text'
              name='isbn_number'
              placeholder='Isbn number'
              autoComplete='off'
              value={newBook.isbn_number}
              onChange={onInputChange}
              required
            />
          </div>
          {/* <div className='mb-4'>
            <label className='py-6' htmlFor='isbn_number'>
              ISBN :{' '}
            </label>
            <input
              className='border-2 border-black-700 outline'
              id='isbn_number'
              type='text'
              name='isbn_number'
              placeholder='isbn number'
              autoComplete='off'
              value={newBook.isbn_number}
              onChange={onInputChange}
              required
            />
          </div> */}
          <div className='flex flex-col mb-4 md:w-full'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='publication'
            >
              Publication
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='publication'
              name='publication'
              type='text'
              required
              value={newBook.publication}
              autoComplete='off'
              placeholder='Publication'
              onChange={onInputChange}
            />
          </div>
          {/* <div className='mb-4'>
            <label className='py-6 ' htmlFor='publication'>
              Publication:{' '}
            </label>
            <input
              className='border-2 border-black-700 outline'
              id='publication'
              name='publication'
              type='text'
              required
              value={newBook.publication}
              autoComplete='off'
              placeholder='publication'
              onChange={onInputChange}
            />
          </div> */}

          <div className='flex flex-col mb-4 md:w-full'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='book_picture'
            >
              Image
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='book_picture'
              type='text'
              name='book_picture'
              value={newBook.book_picture}
              autoComplete='off'
              placeholder='Cover image of book'
              onChange={onInputChange}
              required
            />
          </div>
          {/* <div className='mb-4'>
            <label className='py-6 ' htmlFor='book_picture'>
              Image:{' '}
            </label>
            <input
              className='border-2 border-black-700 outline'
              id='book_picture'
              type='text'
              name='book_picture'
              value={newBook.book_picture}
              autoComplete='off'
              placeholder='cover image of book'
              onChange={onInputChange}
              required
            />
          </div> */}
          <div className='flex flex-col mb-4 md:w-full'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='grade'
            >
              Grade
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='grade'
              type='text'
              name='grade'
              value={newBook.grade}
              autoComplete='off'
              placeholder='Students Grade'
              onChange={onInputChange}
              required
            />
          </div>
          {/* <div className='mb-4'>
            <label className='py-6 ' htmlFor='grade'>
              Grade:{' '}
            </label>
            <input
              className='border-2 border-black-700 outline'
              id='grade'
              type='text'
              name='grade'
              value={newBook.grade}
              autoComplete='off'
              placeholder='students Grade'
              onChange={onInputChange}
              required
            />
          </div> */}
          <div className='flex flex-col mb-4 md:w-full'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='grade'
            >
              Reading Level
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='reading_level'
              type='text'
              name='reading_level'
              placeholder='Reading level'
              autoComplete='off'
              value={newBook.reading_level}
              onChange={onInputChange}
              required
            />
          </div>
          {/* <div className='mb-4'>
            <label className='py-6' htmlFor='reading_level'>
              {' '}
              Level:{'  '}{' '}
            </label>
            <input
              className='border-2 border-black-700 outline'
              id='reading_level'
              type='text'
              name='reading_level'
              placeholder='reading level'
              autoComplete='off'
              value={newBook.reading_level}
              onChange={onInputChange}
              required
            />
          </div> */}
          <div className='justify-center ml-6 space-x-6 '>
            <input className=' px-5  py-3 rounded bg-teal-500' type='submit' />
            <button style={{ border: 'none' }} className='second'></button>
            <Link
              style={{ margin: '0 auto', textAlign: 'center' }}
              to={`/books`}
            >
              <button className=' px-5  py-3 rounded bg-teal-500'>
                Cancel{' '}
              </button>
            </Link>
          </div>
        </form>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default NewBooks;
