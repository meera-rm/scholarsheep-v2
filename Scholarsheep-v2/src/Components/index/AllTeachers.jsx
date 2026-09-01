import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/axiosInstance';

const AllTeachers = () => {
  const [teacherData, setTeacherData] = useState([]);

  useEffect(() => {
    api.get('/api/teachers')
      .then((response) => setTeacherData(response.data.payload || []))
      .catch((e) => console.error('catch', e));
  }, []);

  return (
    <div className='px-16 py-6 md:col-span-2 '>
      <h2 className='text-center  mt-10 mb-5 text-5xl font-bold text-teal-600  '>Teachers</h2>
      <div className='text-center '>
        <Link to={`/teachers/new`}>
          <button className=' btn bg-indigo-500 px-4 py-4 rounded text-white hover:bg-teal-400'>
            Add Teachers{' '}
          </button>
        </Link>
      </div>
      <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16'>
        {/* <div className='max-w-sm rounded overflow-hidden shadow-lg '> */}
      
      {/* // (<TeacherCard teacher={teacher}/>) */}
        {teacherData?.map((teacher) => {
          return (
            <section
              className='border rounded-md hover:shadow-md'
              key={teacher.teacher_id + teacher.teacher_name}
            >
              <div className='display-cards border-2 px-5 py-5 border-indigo-300'>
                <Link
                  className='text-center'
                  to={`/teachers/` + teacher.teacher_id}
                  key={teacher.teacher_id}
                >
                  {/* <img

                  className='text-center'
                  src={`${book.book_picture}`}
                  alt=''
                /> */}

                  {/* </div>
             <div> */}
                 
                 <div className='flex justify-between'>
                  <img width='100px' height='100px'
                    className='text-center rounded-full'
                    src={teacher.teacher_avatar || `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(teacher.teacher_name)}`}
                    alt={`${teacher.teacher_name} avatar`}
                  />
                 
                  <div>
                  <p className='text-center text-1xl  text-gray-500 '>{teacher.teacher_name} </p>
                  <p className='text-center '>
                    Subject:{teacher.class_subject}
                  </p>
                  <p className='text-center '>
                    Grade: {teacher.teaching_grade}
                  </p>
                  </div>
                    </div>
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

export default AllTeachers;
