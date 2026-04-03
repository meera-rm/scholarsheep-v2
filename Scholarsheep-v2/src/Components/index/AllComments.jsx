import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// import httpService from './httpService';
// import Table from 'react-bootstrap/Table';

const API = process.env.REACT_APP_API_URL;

const AllLogs = () => {
  const [comments, setComments] = useState([]);

  let { logId } = useParams();

  useEffect(() => {
    // httpService
    axios.get(`${API}/api/comments`)
      // .then((response) => console.log(response.data))
      .then((response) => setComments(response.data))
      .catch((e) => console.error('catch', e));
  }, [logId]);

  return (
    <div className='px-16 py-6 md:col-span-2 '>
      <h2 className='text-center  mt-10 mb-5 text-5xl font-bold text-teal-600  '>Comments</h2>
      <div className='text-center '>
        <Link to={`/logs/new`}>
          <button className=' btn bg-indigo-500 px-4 py-4 rounded text-white hover:bg-teal-400'>
            Add Comments{' '}
          </button>
        </Link>
      </div>
      <div className='mt-2 grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16'>
        {/* <div className='max-w-sm rounded overflow-hidden shadow-lg '> */}
        {comments?.map((comment) => {
          return (
            <section
              className='border rounded-md  hover:shadow-md'
              key={comment.comment_id}
            >
              <div className='display-cards'>
                <Link
                  className='text-center'
                  to={`/comments/` + comment.comment_id}
                  key={comment.comment_id}
                >
                  {/* </div>
               <div> */}
                  <p className='text-center'>
                    Teachers Comments: {comment.teacher_comment}
                  </p>
                </Link>
              </div>
            </section>
          );
        })}
        {/* </div> */}
      </div>
    </div>
  );
};

export default AllLogs;
