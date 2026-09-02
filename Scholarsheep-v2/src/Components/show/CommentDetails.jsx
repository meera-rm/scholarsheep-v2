import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/axiosInstance';
import { isDemoMode } from '../../services/demoAuthService';
import { AiFillDelete } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';
import { BiArrowBack } from 'react-icons/bi';
// import  AllLogs from './AllLogs'

const CommentDetails = () => {
  const [comment, setComment] = useState([]);

  let navigate = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    api.get(`/api/comments/${id}`)
      .then((response) => {
        setComment(response.data.payload);
      })
      .catch(() => navigate('/not-found'));
  }, [id, navigate, comment]);

  //Delete functions
  const handleDelete = () => {
    if (isDemoMode()) {
      alert('This feature is not available in demo mode.');
      return;
    }
    api.delete(`/api/comments/${id}`)
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
            <Link to={'/comments'}>
              {/* <button className=' bg-teal-500 px-6 py-4 text-white rounded '>
                Back{' '}
              </button> */}
               <BiArrowBack  className='cursor-pointer' />
            </Link>
          </div>
          <div>
            {' '}
            <Link to={`/comments/${id}/edit`}>
              {/* <button className=' bg-teal-500 px-6 py-4 text-white rounded '>
                Edit{' '}
              </button> */}
              <BsPencilSquare  className='cursor-pointer' />
            </Link>
          </div>
          <div>
            {' '}
            {/* <button
                className='bg-teal-500 px-6 py-4 text-white rounded'
                onClick={handleDelete}
              >
                Delete
              </button> */}
              <AiFillDelete className='cursor-pointer' onClick={handleDelete} />
          </div>
        </div>
      </article>
    </div>
  );
};

export default CommentDetails;
