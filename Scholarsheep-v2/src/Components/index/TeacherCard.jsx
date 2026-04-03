import { Link } from 'react-router-dom';
const Teacher = ({teacher}) =>{

    
    return( 
        <section
              className='border rounded-md  hover:shadow-md'
              key={teacher.teacher_id + teacher.teacher_name}
            >
              <div className='display-cards border-2 border-indigo-300'>
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
                  <p className='text-center '>
                    Teacher Name: {teacher.teacher_name}
                  </p>
                  <p className='text-center '>
                    Subject:{teacher.class_subject}
                  </p>
                  <p className='text-center '>
                    Grade: {teacher.teaching_grade}
                  </p>
                </Link>
              </div>
            </section>

          )
  }
  export default Teacher;