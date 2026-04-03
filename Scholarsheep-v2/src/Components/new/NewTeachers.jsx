import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PhotoUpload from '../common/PhotoUpload';

const API = process.env.REACT_APP_API_URL;

const NewTeachers = () => {
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState({
    teacher_name: '',
    school_name: '',
    school_district: '',
    school_address: '',
    zipcode: '',
    state_name: '',
    class_subject: '',
    teaching_grade: '',
    teacher_avatar: '',
  });

  const handleTextChange = (event) => {
    console.log(event.target.value);

    setTeacher({
      ...teacher,
      [event.target.id]: event.target.value,
    });
    console.log('in text change', teacher);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('inhandlesumbit', teacher);
    // httpService
    axios.post(`${API}/api/teachers/new`, {
        ...teacher,
        teacher_avatar: teacher.teacher_avatar || `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(teacher.teacher_name || 'teacher')}`,
      })
      .then(() => {
        console.log('added');
        notify()
        // navigate(`/teachers`);
        
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
      navigate('/teachers')
    }, 2000)
  }



  return (
    // <div className='add-trans'>
    // <div className='flex flex-col text-center h-screen items-center justify-center '>
    //   <div className='rounded-md  py-4 px-6 text-black lg:w-2/5 md:w-3/5 w-4/5'>
    <div className='flex items-center h-screen w-full bg-teal-lighter'>
      <div className='w-full bg-white rounded shadow-lg p-8 m-2 md:max-w-sm md:mx-auto'>
        <form
          className='mb-4 md:flex md:flex-wrap md:justify-between'
          onSubmit={handleSubmit}
        >
         
          <PhotoUpload
            name={teacher.teacher_name}
            value={teacher.teacher_avatar}
            onChange={(url) => setTeacher({ ...teacher, teacher_avatar: url })}
          />
          <div className='flex flex-col mb-4 md:w-full'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='teacher_name'
            >
              TeacherName
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='teacher_name'
              name='teacher_name'
              value={teacher.teacher_name}
              type='text'
              autoComplete='off'
              onChange={handleTextChange}
              placeholder='Teacher name'
            />
          </div>
          <div className='flex flex-col mb-4 md:w-full'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='school_name'
            >
              School Name
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='school_name'
              type='text'
              name='school_name'
              value={teacher.school_name}
              autoComplete='off'
              placeholder='School name'
              onChange={handleTextChange}
            />
          </div>
          {/* <div className='mb-4'>
            <label className='py-6' htmlFor='school_district'>
              School Disctrict:
            </label>
            <input
              className='border-2 border-black-700 outline'
              id='school_district'
              type='text'
              name='school_district'
              placeholder='school_district'
              value={teacher.school_district}
              autoComplete='off'
              onChange={handleTextChange}
            />
          </div> */}
          <div className='flex flex-col mb-4 md:w-full'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='school_district'
            >
              School District
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='school_district'
              type='text'
              name='school_district'
              placeholder='School district'
              value={teacher.school_district}
              autoComplete='off'
              onChange={handleTextChange}
            />
          </div>
          {/* <div className='mb-4'>
            <label className='py-6' htmlFor='school_address'>
              School Address:
            </label>
            <input
              className='border-2 border-black-700 outline'
              id='school_address'
              name='school_address'
              type='text'
              value={teacher.school_address}
              autoComplete='off'
              placeholder='school_address'
              onChange={handleTextChange}
            />
          </div> */}
          <div className='flex flex-col mb-4 md:w-full'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='school_address'
            >
              School Address
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='school_address'
              name='school_address'
              type='text'
              value={teacher.school_address}
              autoComplete='off'
              placeholder='School address'
              onChange={handleTextChange}
            />
          </div>

          {/* <div className='mb-4'>
            <label className='py-6' htmlFor='zipcode'>
              ZipCode:{' '}
            </label>
            <input
              className='border-2 border-black-700 outline'
              id='zipcode'
              type='text'
              name='zipcode'
              value={teacher.zipcode}
              autoComplete='off'
              placeholder='zipcode'
              onChange={handleTextChange}
            />
          </div> */}
          <div className='flex flex-col mb-4 md:w-full'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='zipcode'
            >
              ZipCode
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='zipcode'
              type='text'
              name='zipcode'
              value={teacher.zipcode}
              autoComplete='off'
              placeholder='Zipcode'
              onChange={handleTextChange}
            />
          </div>
          {/* <div className='mb-4'>
            <label className='py-6' htmlFor='state_name'>
              State Name:
            </label>
            <input
              className='border-2 border-black-700 outline'
              id='state_name'
              type='text'
              name='state_name'
              value={teacher.state_name}
              autoComplete='off'
              placeholder='state_name'
              onChange={handleTextChange}
            />
          </div> */}
          <div className='flex flex-col mb-4 md:w-full'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='state_name'
            >
              State Name
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='state_name'
              type='text'
              name='state_name'
              value={teacher.state_name}
              autoComplete='off'
              placeholder='State name'
              onChange={handleTextChange}
            />
          </div>
          {/* <div className='mb-4'>
            <label className='py-6' htmlFor='class_subject'>
              Subject:
            </label>
            <input
              className='border-2 border-black-700 outline'
              id='class_subject'
              type='text'
              name='class_subject'
              value={teacher.class_subject}
              autoComplete='off'
              placeholder='class_subject'
              onChange={handleTextChange}
            />
          </div> */}
          <div className='flex flex-col mb-4 md:w-full'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='class_subject'
            >
              Subject
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='class_subject'
              type='text'
              name='class_subject'
              value={teacher.class_subject}
              autoComplete='off'
              placeholder='Class subject'
              onChange={handleTextChange}
            />
          </div>
          {/* <div className='mb-4'>
            <label className='py-6' htmlFor='teaching_grade'>
              Teaching Grade:
            </label>
            <input
              className='border-2 border-black-700 outline'
              id='teaching_grade'
              type='text'
              name='teaching_grade'
              value={teacher.teaching_grade}
              autoComplete='off'
              placeholder='teaching_grade'
              onChange={handleTextChange}
            />
          </div> */}
          <div className='flex flex-col mb-4 md:w-full'>
            <label
              className='mb-2 uppercase font-bold text-lg text-grey-darkest'
              htmlFor='teaching_grade'
            >
              Teaching Grade:
            </label>
            <input
              className='border py-2 px-3 text-grey-darkest'
              id='teaching_grade'
              type='text'
              name='teaching_grade'
              value={teacher.teaching_grade}
              autoComplete='off'
              placeholder='Teaching grade'
              onChange={handleTextChange}
            />
          </div>
          <br />
          {/* <div className='add-btn'> */}
          <div className='justify-center ml-6 space-x-6 '>
            <input
              className=' px-5 py-3 rounded bg-teal-500'
              type='submit'
              value='submit'
            />

            <Link to={`/teachers`}>
              <button className=' px-5  py-3 rounded bg-teal-500'>
                Cancel{' '}
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTeachers;
