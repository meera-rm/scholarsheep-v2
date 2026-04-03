import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import httpService from '../httpService';
import Pagination from '../features/Pagination';
import NewLogs from '../new/NewLogs';

import Comment from './Comment';

import NewComments from '../new/NewComments';

import Modal from '../features/Modal';
import { MdDelete } from 'react-icons/md';
import { MdTableView } from 'react-icons/md';
import { MdAddComment } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

const API = process.env.REACT_APP_API_URL;

const StudentLogsView = (props) => {


  const [studentData, setStudentData] = useState([]);
  const [logData, setLogData] = useState([]);
  const [book, setBook] = useState([]);
  const [comments, setComments] = useState([]);
  const [choice] = useState(2);
  //Popup code
  const [showModal, setShowModal] = useState(false);

  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    // httpService
    axios.get(`${API}/api/students/${id}`)
      .then((response) => {
        setStudentData(response.data);
        // console.log(response.data);
      })
      .catch(() => navigate('/not-found'));
  }, [id, navigate]);

  useEffect(() => {
    // httpService
    axios.get(`${API}/api/students/${id}/logs`)
      .then((response) => {
        // console.log(response.data);
        setLogData(response.data);
      })
      .catch(() => navigate('/not-found'));
  }, [id, navigate]);

  useEffect(() => {
    //  shttpService
    axios.get(`${API}/api/books`).then((response) => {
      // console.log(response.data.payload);
      setBook(response.data.payload);
    });
    //     .catch(() => navigate('/not-found'));
  }, [id, navigate]);

  useEffect(() => {
    // httpService
    axios.get(`${API}/api/comments`)
      .then((response) => {
        setComments(response.data.payload);
      })
      .catch(() => navigate('/not-found'));
  }, [id, navigate]);

  //Delete functions
  const handleDelete = () => {
    // httpService
    axios.delete(`${API}/api/students/${id}`)
      .then(() => {
        navigate('/students');
      })
      .catch((e) => console.error(e));
  };

  const [currentPage, setCurrentPage] = useState(1);

  const [logsPerPage] = useState(6);

  const indexOfLastRecord = currentPage * logsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - logsPerPage;
  const currentRecords = logData.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(logData.length / logsPerPage);

  const [message, setMessage] = useState(true);

  const onClick = () => setMessage(false);

  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <div>
        <h2 className="font-bold mt-10 mb-5 text-teal-600 text-center text-5xl'">
          Student Dashboard
        </h2>
      </div>

      <div>
        <p className='font-bold'>
          Student Name:{'   '}
          <span className='font-semibold'>{studentData.student_name}</span>
        </p>
        <p className='font-bold'>
          Student Grade:
          <span className='font-semibold'>{studentData.grade}</span>
        </p>
        <p className='font-bold'>
          Parent Email:{' '}
          <span className='font-semibold'>{studentData.parent_email}</span>
        </p>
        <p className='font-bold'>
          Teacher Id:{' '}
          <span className='font-semibold'>{studentData.teachers_id}</span>
        </p>
      </div>

      <div className='py-8'>
        <div className=' mt-10 flex md:justify-center ml-6 space-x-6'>
          {/* <Link to={'/logs/new'}> */}
          <button
            className='bg-indigo-500 text-center px-6 py-4 text-white rounded hover:bg-indigo-400'
            onClick={() => setShowModal(true)}
          >
            Add Logs{' '}
          </button>

          {/* </Link> */}

          <Link to={`/teachers/${studentData.teachers_id}`}>
            <button className='bg-indigo-500 text-center px-6 py-4 text-white rounded hover:bg-indigo-400'>
              Back{' '}
            </button>
          </Link>
        </div>

        {/* {showModal ? (
          <>
            <Modal
              showModal={showModal}
              setShowModal={setShowModal}
              choice={choice}
              studentData={studentData}
              book={book}
            />
          </>
        ) : null} */}

        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow-md rounded-lg overflow-hidden'>
            <table className='min-w-full leading-normal'>
              <thead>
                <tr>
                  <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Id
                  </th>
                  <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Date Read
                  </th>
                  <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Book Title
                  </th>
                  <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Book Id
                  </th>
                  <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Minutes Read
                  </th>
                  <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Pages Read
                  </th>
                  <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Reading thoughts
                  </th>

                   <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Teacher Comments
                  </th>
                  <th className=' px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Add
                  </th>
                  <th className=' px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((log, index) => {
                  return (
                    <tr key={log.log_id}>
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <Link
                          className='font-bold text-black-700 hover:underline'
                          to={`/logs/${log.log_id}`}
                        >
                          {index + 1}
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
                          {/* <Book log={log} books={books} /> */}
                        </Link>
                      </td>
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
                        <Link
                          className='font-bold text-black-700 hover:underline'
                          to={`/logs/${log.log_id}`}
                        >
                          {log.books_id}
                          {/* <Book log={log} books={books} /> */}
                        </Link>
                      </td>
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
                      {/* <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
                        {message ? (
                          <Link
                            className='font-bold text-black-700 hover:underline'
                            to={`/logs/${log.log_id}`}
                          >
                            {<Comment log={log} comments={comments} />}
                          </Link>
                        ) : (
                          // </td> */}
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <div className='ml-3 p-3 text-sm text-indigo-900'>
                          <Link to={`/comments/new`}>
                            <button
                              className=' bg-teal-500 px-6 py-4 text-black rounded '
                            >
                              <MdAddComment />{' '}
                            </button>
                          </Link>
                          {/* )} */}
                        </div>
                      </td>

                      {/* <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        {/* <div className='flex'> */}
                      {/* <div className="flex-shrink-0 w-10 h-10"> *
                           <div className='ml-3 p-3 text-sm text-indigo-900'>
                            <Link to={`/students`}>
                              <button
                                className=' bg-teal-500 px-6 py-4 text-black rounded '
                              >
                                <MdTableView />{' '}
                              </button>
                            </Link>
                          </div> 
                        </td>  */}
                      {/* <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <div className='ml-3 p-3 text-sm text-indigo-900'>
                          <Link to={`/students/${id}/edit`}>
                            <button className=' bg-teal-500 px-6 py-4 text-black rounded '>
                              <MdAddComment />{' '}
                            </button>
                          </Link>
                        </div>
                      </td> */}
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <div className='ml-3 p-3 text-sm text-indigo-900'>
                          <Link to={`/students/{id}/Logs/`}>
                            <button
                              className=' bg-teal-500 px-6 py-4 text-black rounded '
                              onClick={handleDelete}
                            >
                              <MdDelete />{' '}
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogsView;
