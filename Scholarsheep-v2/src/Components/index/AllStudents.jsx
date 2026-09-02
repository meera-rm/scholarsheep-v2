import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../utils/axiosInstance';
import { isDemoMode } from '../../services/demoAuthService';

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  let { teacherId } = useParams();

  useEffect(() => {
    if (isDemoMode()) {
      setStudents([]);
      return;
    }
    api.get('/api/students')
      .then((response) => setStudents(response.data.payload || []))
      .catch((e) => console.error('catch', e));
  }, []);

  return (
    <div className='px-16 py-6 md:col-span-2 '>
      <h2 className='text-center  mt-10 mb-5 text-5xl font-bold text-teal-600  '>
        Students
      </h2>
       <div className='text-center '>
        <Link to={`/students/new`}>
          <button className=' btn bg-indigo-500 px-4 py-4 rounded text-white hover:bg-teal-400'>
            Add Students{' '}
          </button>
        </Link>
      </div> 
      <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16'>
        {/* <div className='max-w-sm rounded overflow-hidden shadow-lg '> */}
        {students?.map((student) => {
          return (
            <section
              className='border-2 border-indigo-300 rounded-md pl-2 hover:shadow-md'
              key={student.student_id + student.student_name}
            >
              <div className='display-cards px-5 py-5'>
                <Link
                  className='text-center'
                  to={`/students/` + student.student_id}
                  key={student.student_id}
                >
                  {/* </div>
               <div> */}
                  <div className='flex justify-between'>
                  <img width='100px' height='100px'
                    className='text-center rounded-full'
                    src={student.student_avatar || student.student_image || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(student.student_name)}`}
                    alt={`${student.student_name} avatar`}
                  />
                 
                  <div>
                  <p className='text-center text-4xl text-gray-500'>
                     {student.student_name}
                  </p> 
                  {/* <p className='text-center'>
                    Student Name: {student.student_name}
                  </p> */}
                  <p className='text-center'>
                    Student Number: {student.student_id}
                  </p>
               
                  <p className='text-center'>
                    Parent Email: 
                  </p>
                  <p className='text-center'>{student.parent_email}</p>
                  <p className='text-center'>Year: {student.academic_year}</p>
                  <p className='text-center'>
                    Reading Level: {student.reading_level}
                  </p>
                  {student.teachers_id && (
                    <p className='text-center'>
                      Teacher ID: {student.teachers_id}
                    </p>
                  )}
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

export default AllStudents;
