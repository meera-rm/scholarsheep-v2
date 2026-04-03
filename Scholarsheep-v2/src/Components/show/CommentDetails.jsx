import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import httpService from '../httpService';
import { AiFillDelete } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';
import { BiArrowBack } from 'react-icons/bi';
// import  AllLogs from './AllLogs'

const API = process.env.REACT_APP_API_URL;

const CommentDetails = () => {
  const [comment, setComment] = useState([]);

  let navigate = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    // httpService
    axios.get(`${API}/api/logs/${id}`)
      .then((response) => {
        setComment(response.data);
      })
      .catch(() => navigate('/not-found'));
  }, [id, navigate, comment]);

  //Delete functions
  const handleDelete = () => {
    // httpService
    axios.delete(`${API}/api/comments/${id}`)
      .then(() => {
        navigate('/comments');
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className='max-h-screen grid place-items-center font-mono'>
      <div className='bg-white h-24 w-64 rounded-md'></div>
      <h2 className='font-bold mb-5 mt-10 text-teal-600 text-5xl'>
        Comment Details
      </h2>
      <article className='text-center '>
        <div>
          <p className='font-bold'>
            Id:
            <span className='font-semibold'>{comment.comment_id}</span>
          </p>
          <p className='font-bold'>
            Teachers Comments:
            <span className='font-semibold'>{comment.teacher_comments}</span>
          </p>

          <p className='font-bold'>
            Books Id:<span className='font-semibold'>{comment.books_id}</span>
          </p>
          <p className='font-bold'>
            Student Id:
            <span className='font-semibold'>{comment.students_id}</span>
          </p>
          <p className='font-bold'>
            Log Id:<span className='font-semibold'>{comment.logs_id}</span>
          </p>
          <p className='font-bold'>
            Teacher Id:
            <span className='font-semibold'>{comment.teachers_id}</span>
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
          <div>
            {' '}
            <Link to={`/students/${id}/edit`}>
              {/* <button className=' bg-teal-500 px-6 py-4 text-white rounded '>
                Edit{' '}
              </button> */}
              <BsPencilSquare  className='cursor-pointer' />
            </Link>
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

export default CommentDetails;
