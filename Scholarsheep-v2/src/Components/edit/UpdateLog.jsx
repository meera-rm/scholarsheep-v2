import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
// import httpService from './httpService';

const API = process.env.REACT_APP_API_URL;

const UpdateLog = () => {
  let { id } = useParams();

  const navigate = useNavigate();

  const [log, setLog] = useState({
    log_id: '',
    date_read: '',
    reading_inference: '',
    reading_minutes: '',
    pages_read: '',
    role_name: '',
    books_id: '',
    students_id: '',
  });

  useEffect(() => {
    // httpService
    axios.get(`${API}/api/logs/${id}`)
      .then((res) => {
        setLog(res.data.payload);
      })
      .catch((e) => console.error(e));
    console.log('data=', log);
  }, [id, log]);

  const onInputChange = (event) => {
    console.log(event.target.value);
    setLog({
      ...log,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // httpService
    axios.put(`${API}/api/logs/${id}`, log)
      .then(
        (res) => {
          navigate(`/logs/:${id}`);
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
          <label className='py-6' htmlFor='reading_inference'>
            Inference:
          </label>

          <input className='border-2 border-black-700 outline'

            id='reading_inference'
            name='reading_inference'
            value={log.reading_inference}
            type='text'
            onChange={onInputChange}
            placeholder='Reading Inference'
          />
        </div>
        <div>
          <label className='py-6' htmlFor='reading_minutes'>
            Minutes Read:
          </label>

          <input className='border-2 border-black-700 outline'

            id='reading_minutes'
            type='text'
            name='reading_minutes'
            value={log.reading_minutes}
            autoComplete='off'
            placeholder='Minutes Read'
            onChange={onInputChange}
          />
        </div>
        <div>
          <label className='py-6' htmlFor='pages_read'>
            Pages Read:
          </label>

          <input className='border-2 border-black-700 outline'

            id='pages_read'
            type='text'
            name='pages_read'
            value={log.pages_read}
            autoComplete='off'
            onChange={onInputChange}
          />
        </div>
        <div>
          <label className='py-6' htmlFor='books_id'>
            Book Id:
          </label>

          <input className='border-2 border-black-700 outline'

            id='books_id'
            name='books_id'
            type='text'
            value={log.books_id}
            autoComplete='off'
            placeholder='books_id'
            onChange={onInputChange}
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

export default UpdateLog;
