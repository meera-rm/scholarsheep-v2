import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
// import httpService from '../httpService';

const API = process.env.REACT_APP_API_URL;

const UpdateComments = () => {
  let { id } = useParams();

  const navigate = useNavigate();

  const [comment, setComment] = useState({
    comment_id: '',
    teacher_comments: '',
    books_id: '',
    students_id: '',
    logs_id: '',
    teachers_id: '',
  });

  useEffect(() => {
    //  httpService
    axios.get(`${API}/api/comments/${id}`)
      .then((res) => {
        setComment(res.data.payload);
      })
      .catch((e) => console.error(e));
    console.log('data=', comment);
  }, [id, comment]);

  const onInputChange = (event) => {
    console.comment(event.target.value);
    setComment({
      ...comment,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // httpService
    axios.put(`${API}/api/comments/${id}`, comment)
      .then(
        (res) => {
          navigate(`/comments/:${id}`);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn('catch', c));
  };

  return (
    // <div className='edit-student'>
    <div className='flex flex-col text-center h-screen items-center justify-center '>
      <div className='rounded-md  py-4 px-6 text-black lg:w-2/5 md:w-3/5 w-4/5'></div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='py-6' htmlFor='teacher_comments'>
            Comments
          </label>

          <input className='border-2 border-black-700 outline'

            id='teacher_comments'
            name='teacher_comments'
            value={comment.teacher_comments}
            autoComplete='off'
            type='text'
            onChange={onInputChange}
            placeholder='Teacher Comments'
          />
        </div>

        <div className='justify-center ml-6 space-x-6'>
          {/* <div> */}
          <input className='px-5  py-3 rounded bg-teal-500' type='submit' />
          {/* </div>
          <div> */}
          <Link to={`/students/${id}`}>
            <button className='px-5  py-3 rounded bg-teal-500'>Back</button>
          </Link>
          {/* </div> */}
        </div>
      </form>
    </div>
  );
};

export default UpdateComments;
