import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import httpService from '../httpService';
const API = process.env.REACT_APP_API_URL;

const NewLogs = (props) => {
  const navigate = useNavigate();
  let { id } = useParams();

  //declare states
  const [newLog, setNewLog] = useState({
    reading_inference: '',
    book_title: '',
    reading_minutes: '',
    pages_read: '',
    books_id: '',
    students_id: id,
  });

  const handleTextChange = (event) => {
    console.log(event.target.value);

    setNewLog({
      ...newLog,
      [event.target.id]: event.target.value,
    });
    console.log('in text change', newLog);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('inhandlesumbit', newLog);
    //  httpService
    httpService
      .post(`${API}/api/logs/new`, newLog)
      .then(() => {
        console.log('added');
        notify();
        navigate(`/students/student_id`);
      })
      .catch((c) => console.error('catch', c));
  };

  const notify = () => {
    toast.success('🦄 , You added a new book', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    setTimeout(() => {
      navigate('/students/student_id');
    }, 2000);
  };

  return (
    <div className='flex items-center h-screen w-full bg-teal-lighter'>
      <div className='w-full bg-white rounded shadow-lg p-2 m-2 md:max-w-sm md:mx-auto'>
        <form
          className='mb-4 md:flex md:flex-wrap md:justify-between'
          onSubmit={handleSubmit}
        >
          <div className='flex flex-col mb-4 md:w-full'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='book_title'
            >
              Book Title
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='book_title'
              name='book_title'
              value={newLog.book_title}
              type='text'
              autoComplete='off'
              onChange={handleTextChange}
              placeholder='Book Title'
            />
          </div>

          <div className='flex flex-col mb-4 md:w-half'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='reading_inference'
            >
              Reading Inference
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='reading_inference'
              name='reading_inference'
              value={newLog.reading_inference}
              type='text'
              onChange={handleTextChange}
              autoComplete='off'
              placeholder='Reading Inference'
              required
            />
          </div>

          <div className='flex flex-col mb-4 md:w-half'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='pages_read'
            >
              Pages Read
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='pages_read'
              type='number'
              name='pages_read'
              value={newLog.pages_read}
              placeholder='Pages read'
              autoComplete='off'
              onChange={handleTextChange}
              required
            />
          </div>

          <div className='flex flex-col mb-4 md:w-half'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='reading_minutes'
            >
              Minutes Read
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='reading_minutes'
              type='number'
              name='reading_minutes'
              autoComplete='off'
              value={newLog.reading_minutes}
              placeholder='Reading minutes'
              onChange={handleTextChange}
              required
            />
          </div>

          <div className='flex flex-col mb-4 md:w-half'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='reading_minutes'
            >
              Book Id
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='books_id'
              type='number'
              name='books_id'
              autoComplete='off'
              value={newLog.books_id}
              placeholder='Book Id'
              onChange={handleTextChange}
              required
            />
          </div>

          <div className='md:justify-center ml-6 space-x-6 '>
            <input className=' px-5 py-3 rounded bg-teal-500' type='submit' />
            {/* <button lassName=' px-5  py-3 rounded bg-teal-500' className='second'></button> */}

            <Link to={`/students/student_id`}>
              <button className=' px-5 py-3 rounded bg-teal-500'>
                Cancel{' '}
              </button>
            </Link>
          </div>
        </form>
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default NewLogs;
