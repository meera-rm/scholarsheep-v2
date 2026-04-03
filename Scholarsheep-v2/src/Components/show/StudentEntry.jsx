import React ,{useState} from 'react';
import { Link ,useNavigate  } from 'react-router-dom';
import axios from 'axios';
import httpService from '../httpService';
import { MdDelete } from 'react-icons/md';
import { MdTableView } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { MdAddComment } from 'react-icons/md';
const API = process.env.REACT_APP_API_URL;

const StudentEntry=({student})=>{
    const [message, setMessage] = useState(true);
    const [selectedReading, setSelectedReading] = useState(null);
    const [teacherComments, setTeacherComments] = useState('');
    const onClick = () => setMessage(false);

    let navigate = useNavigate();


    const handleCommentInputChange = (event) => {
      setTeacherComments(event.target.value);
    };
  
    const handleCommentSubmit = (readingId) => {
      // Assuming there's a function to submit comments to the backend
      // You can send the comments for the respective reading using its ID
      // Example: submitCommentsToBackend(readingId, teacherComments);
      console.log(`Comments submitted for Reading ID ${readingId}: ${teacherComments}`);
    };



  //Delete functions
  const handleDelete = (studentId) => {
   
    // httpService
    axios.delete(`${API}/api/students/${studentId}`)
      .then(() => {
        navigate('/students');
      })
      .catch((e) => console.error(e));
  };


    return(
        <tr key={student.student_id}>
                      <td className='px-5 py-5 border-2 border-gray-200 bg-white text-sm'>
                        <Link
                          className='font-bold text-black-700 hover:underline'
                          to={`/students/${student.student_id}`}
                        >
                          {student.student_id}
                        </Link>
                      </td>

                      <td className='px-5 py-5 border-2 border-gray-200 bg-white text-sm'>
                        <Link
                          className='font-bold text-black-700 hover:underline'
                          to={`/students/${student.student_id}`}
                        >
                          {student.student_name}
                        </Link>
                      </td>

                      <td className='px-5 py-5 border-2 border-gray-200 bg-white text-sm '>
                        <Link
                          className='font-bold text-black-700 hover:underline'
                          to={`/students/${student.student_id}`}
                        >
                          {student.reading_level}
                          {/* <Book log={log} bookData={bookData} /> */}
                        </Link>
                      </td>

                      <td className='px-5 py-5 border-2 border-gray-200 bg-white text-sm'>
                        {/* <div className='flex'> */}
                        {/* <div className="flex-shrink-0 w-10 h-10"> */}
                        <div className='ml-3 p-3 text-sm text-indigo-900'>
                          {/* <Link to={{
                            pathname:`/students/${student.student_id}`,
                            state:{fromTeacherDetails: true },
                            }}>  */}

                          <Link
                            to={`/students/${student.student_id}`}
                            state={{ role: 'teacher' }}
                          >
                            <button
                              className=' bg-teal-500 px-6 py-4 text-black rounded'
                              //  onClick={(e) => setView(true)}
                            >
                              <MdTableView />{' '}
                            </button>
                            {/* {view && <StudentLogsView 
                                bookData={bookData}
                                student={student}
                                teacher={teacher}
                                />} */}
                          </Link>
                        </div>
                      </td>


                      {/* <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                     
                        <div className='ml-3 p-3 text-sm text-indigo-900'>
                          <Link to={`/comments/new`}>
                            <button
                              className=' bg-teal-500 px-6 py-4 text-black rounded '
                              onClick={onClick}
                            >
                              <MdAddComment />{' '}
                            </button>
                          </Link>
                        </div>
                      </td> */}

                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <div className='ml-3 p-3 text-sm text-indigo-900'>
                          <Link to={`/students/${student.student_id}/edit`}>
                            <button className=' bg-teal-500 px-6 py-4 text-black rounded '>
                              <FaEdit />{' '}
                            </button>
                          </Link>
                        </div>
                      </td>
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <div className='ml-3 p-3 text-sm text-indigo-900'>
                          <Link to={`/teachers`}>
                            {/* // <Link to={`/teachers/${student.student_id}/edit`}> */}

                            <button
                              className=' bg-teal-500 px-6 py-4 text-black rounded '
                              onClick={() => handleDelete}
                            >
                              <MdDelete />{' '}
                            </button>
                          </Link>
                        </div>
                        {/* </div> */}
                      </td>
                    </tr>
    )

}
export default StudentEntry;