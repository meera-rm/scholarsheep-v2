import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import httpService from '../httpService';
import { MdAddComment } from 'react-icons/md';
import Modal from '../features/Modal';
const API = process.env.REACT_APP_API_URL;

const LogEntry = ({ log, index ,student}) => {
  console.log('log',log,student.teachers_id)
  const [comment, setComment] = useState({});
  const [message, setMessage] = useState(true);
   const onClick = () => setMessage(false);
 
  const [choice] = useState(3);
  //Popup code
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    //  httpService
    axios
      .get(`${API}/api/comments/logs/${log.log_id}`)
      .then((response) => {
        console.log(response.data.payload);
        setComment(response.data.payload);
      })
      .catch((err) => console.log(err));
  }, [log.log_id]);

  

  return (
    <>
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          choice={choice}
          // comment={comment}
          student={student}
          log={log}
        />
      )}

      <tr key={log.log_id}>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <Link
            className='font-bold text-black-700 hover:underline'
            to={`/logs/${log.log_id}`}
          >
            {log.log_id}
          </Link>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <Link
            className='font-bold text-black-700 hover:underline'
            to={`/logs/${log.log_id}`}
          >
            {log.date_read.slice(0, 10)}
          </Link>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
          <Link
            className='font-bold text-black-700 hover:underline'
            to={`/logs/${log.log_id}`}
          >
            {log.book_title}
          </Link>
        </td>
        {/* <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
                <Link
                    className='font-bold text-black-700 hover:underline'
                    to={`/logs/${log.log_id}`}
                >
                    {log.books_id}
                </Link>
            </td> */}
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <Link
            className='font-bold text-black-700 hover:underline'
            to={`/logs/${log.log_id}`}
          >
            {log.reading_minutes}
          </Link>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
          <Link
            className='font-bold text-black-700 hover:underline'
            to={`/logs/${log.log_id}`}
          >
            {log.pages_read}
          </Link>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
          <Link
            className='font-bold text-black-700 hover:underline'
            to={`/logs/${log.log_id}`}
          >
            {log.reading_inference}
          </Link>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
          <div className='ml-3 p-3 text-sm text-indigo-900'>
            {comment ? (
              <div>
                <div>{comment.teacher_comments}</div>
              </div>
            ) : (
              <>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  // onClick={onClick}
                  onClick={() => setShowModal(true)}
                >
                  <MdAddComment />
                </button>
              </>
            )}
          </div>
        </td>
      </tr>
    </>
  );
};
export default LogEntry;
