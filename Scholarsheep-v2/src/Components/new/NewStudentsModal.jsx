import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import httpService from '../httpService';
const API = process.env.REACT_APP_API_URL;

const NewStudentsModal = (props) => {
  const navigate = useNavigate();
  let { id } = useParams();

  //declare states
  const [student, setStudent] = useState({
    student_id: '',
    student_name: '',
    parent_name: '',
    parent_email: '',
    student_email: '',
    grade: '',
    academic_year: '',
    reading_level: '',
    teachers_id: id,
  });

  const handleTextChange = (event) => {
    console.log(event.target.value);

    setStudent({
      ...student,
      [event.target.id]: event.target.value,
    });
    console.log('in text change', student);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('inhandlesumbit', student);
    //  httpService
    axios.post(`${API}/api/students/new`, student)
      .then(() => {
        console.log('added');
        notify()
        // navigate(`/students`);
       
      })
      .catch((c) => console.error('catch', c));
  };

  const notify = () => {
    toast.success(
      '🦄 , You added a new book',
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    )
    setTimeout(() => {
      navigate('/students')
    }, 2000)
  }
  return (
    <div className='flex items-center h-screen w-full bg-teal-lighter'>
      <div className='w-full bg-white rounded shadow-lg p-8 m-2 md:max-w-sm md:mx-auto'>
        <form
          className=' md:flex md:flex-wrap md:justify-between'
          onSubmit={handleSubmit}
        >
          <div className='flex flex-col mb-4 md:w-full'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='parent_name'
            >
              Parent Name
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='parent_name'
              type='text'
              name='parent_name'
              value={student.parent_name}
              autoComplete='off'
              placeholder='Parent name'
              onChange={handleTextChange}
              required
            />
          </div>

          <div className='flex flex-col mb-4 md:w-full'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='student_name'
            >
              Student Name
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='student_name'
              type='text'
              name='student_name'
              value={student.student_name}
              placeholder='Student Name'
              autoComplete='off'
              onChange={handleTextChange}
              required
            />
          </div>
          <div className='flex flex-col mb-4 md:w-full'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='parent_email'
            >
              Parent Email
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='parent_email'
              name='parent_email'
              type='text'
              value={student.parent_email}
              placeholder='Parent email'
              autoComplete='off'
              onChange={handleTextChange}
              required
            />
          </div>

          <div className='flex flex-col mb-4 md:w-full'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='student_email'
            >
              Student Email
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='student_email'
              type='text'
              name='student_email'
              value={student.student_email}
              autoComplete='off'
              placeholder='Student email'
              onChange={handleTextChange}
              required
            />
          </div>

          <div className='flex flex-col mb-4 md:w-full'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='grade'
            >
              Student Grade
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='grade'
              type='text'
              name='grade'
              value={student.grade}
              autoComplete='off'
              placeholder='Grade'
              onChange={handleTextChange}
              required
            />
          </div>
          <div className='flex flex-col mb-4 md:w-full'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='academic_year'
            >
              Academic year
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='academic_year'
              type='text'
              name='academic_year'
              value={student.academic_year}
              onChange={handleTextChange}
              autoComplete='off'
              placeholder='Academic year'
              required
            />
          </div>
          <div className='flex flex-col mb-4 md:w-full'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='reading_level'
            >
              Reading Level
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='reading_level'
              type='text'
              name='reading_level'
              value={student.reading_level}
              onChange={handleTextChange}
              autoComplete='off'
              placeholder='Reading level'
              required
            />
          </div>

          {/* <div className='flex flex-col mb-4 md:w-full'>
            <label className='mb-2 uppercase font-bold text-lg text-grey-darkest' htmlFor='reading_level'>
              Teachers Id:{' '}
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='teachers_id'
              type='text'
              name='teachers_id'
              value={id}
            />
          </div> */}

          {/* <div className='add-btn'> */}
          <div className='justify-center ml-6 space-x-6 '>
            <input className=' px-5  py-3 rounded bg-teal-500' type='submit' />
            {/* <button style={{ border: 'none' }} className='second'></button> */}
            <Link to={`/students`}>
              <button className=' px-5  py-3 rounded bg-teal-500'>
                Cancel{' '}
              </button>
            </Link>
          </div>
        </form>
        <ToastContainer/>

      </div>
    </div>
  );
};

export default NewStudentsModal;
