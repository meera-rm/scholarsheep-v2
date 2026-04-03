import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
// import Table from 'react-bootstrap/Table';
import Student from './Student.jsx';
import httpService from '../httpService.jsx';
const API = process.env.REACT_APP_API_URL;

const AllLogs = () => {
  const [logData, setLogData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    // httpService
    axios.get(`${API}/api/logs`)
      // .then((response) => console.log(response.data))
      .then((response) => setLogData(response.data))
      .catch((e) => console.error('catch', e));
  }, [logData]);

  //   useEffect(() => {
  //axios
  // .get(`${API}/api/books/:${logData.books_id}`)
  // //  .then((response) => console.log(response.data))
  // .then((response) => setBookData(response.data.payload))
  // .catch((e) => console.error('catch', e));
  // }, [logData]);

  useEffect(() => {
    //  httpService 
    axios.get(`${API}/api/students`)
      // console.log(response.data.payload))
      .then((response) => {
        setStudentData(response.data);
      })
      .catch((e) => navigate('/not-found'));
  }, [navigate]);

  return (
    <div className='px-16 py-6 md:col-span-2 '>
      <h2 className='text-center  mt-10 mb-5 text-5xl font-bold text-teal-600  '>Logs</h2>
      <div className='text-center '>
        <Link to={`/logs/new`}>
          <button className=' btn bg-indigo-500 px-4 py-4 rounded text-white hover:bg-teal-400'>
            Add Logs{' '}
          </button>
        </Link>
      </div>
      <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16'>
        {/* <div className='max-w-sm rounded overflow-hidden shadow-lg '> */}
        {logData?.map((log) => {
          return (
            <section
              className='border rounded-md  hover:shadow-md'
              key={log.log_id}
            >
              <div className='display-cards'>
                <Link
                  className='text-center'
                  to={`/logs/` + log.log_id}
                  key={log.log_id}
                >
                  <img
                    className='text-center'
                    src={`${bookData.book_picture}`}
                    alt=''
                  />

                  {/* </div>
               <div> */}

                  <p className='text-center border-2 border-indigo-300'>
                    Student Name:{' '}
                    <Student log={log} studentData={studentData} />
                  </p>
                  <p className='text-center border-2 border-indigo-300'>
                    Pages Read: {log.pages_read}
                  </p>
                  <p className='text-center border-2 border-indigo-300'>
                    Log Id: {log.log_id}
                  </p>
                  <p className='text-center border-2 border-indigo-300'>
                    Minutes Read: {log.reading_minutes}
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
