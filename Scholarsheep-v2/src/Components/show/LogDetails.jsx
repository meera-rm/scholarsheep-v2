import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import httpService from '../httpService';
// import  AllLogs from './AllLogs'
import { AiFillDelete } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';
import { BiArrowBack } from 'react-icons/bi';

const API = process.env.REACT_APP_API_URL;

const LogDetails = () => {
  const [log, setLog] = useState([]);

  let navigate = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    // httpService
    axios.get(`${API}/api/logs/${id}`)
      .then((response) => {
        setLog(response.data);
      })
      .catch(() => navigate('/not-found'));
  }, [id, navigate, log]);

  //Delete functions
  const handleDelete = () => {
    // httpService
    axios.delete(`${API}/api/logs/${id}`)
      .then(() => {
        navigate('/logs');
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className='max-h-screen grid place-items-center font-mono'>
      <div className='bg-white h-24 w-64 rounded-md'></div>
      <h2 className='font-bold mb-5 mt-10 text-teal-600 text-5xl'>
        Log Details
      </h2>
      <article className='text-center '>
        <div>
          <p className='font-bold'>
            Id:
            <span className='font-semibold'>{log.log_id}</span>
          </p>
          <p className='font-bold'>
            Date Read:<span className='font-semibold'>{log.date_read}</span>
          </p>
          <p className='font-bold'>
            Reading Inference:
            <span className='font-semibold'>{log.reading_inference}</span>
          </p>
          <p className='font-bold'>
            Reading_minutes :{' '}
            <span className='font-semibold'>{log.reading_minutes}</span>
          </p>
          <p className='font-bold'>
            Pages Read: <span className='font-semibold'>{log.pages_read}</span>
          </p>
          <p className='font-bold'>
            Books Id:<span className='font-semibold'>{log.books_id}</span>
          </p>
          <p className='font-bold'>
            Student Id:<span className='font-semibold'>{log.students_id}</span>
          </p>
        </div>

        <div className=' mt-10 flex justify-center ml-6 space-x-6'>
          <div>
            {' '}
            <Link to={'/students'}>
              {/* <button className=' bg-teal-500 px-6 py-4 text-white rounded '>
                Back{' '}
              </button> */}
               <BiArrowBack  className='cursor-pointer' />
            </Link>
          </div>

           {/* <div>


          <div>
            {' '}
            <Link to={`/students/${id}/edit`}>
              <button className=' bg-teal-500 px-6 py-4 text-white rounded '>
                Edit{' '}
              </button>
            </Link>

          </div> */}
          <div> 


          </div> 
 
          <div>

            {' '}
            <Link to={'/students'}>
              {/* <button
                className='bg-teal-500 px-6 py-4 text-white rounded'
                onClick={handleDelete}
              >
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

export default LogDetails;
