import React from 'react';
import NewLogs from '../new/NewLogs';
import NewStudentsModal from '../new/NewStudentsModal';
import NewComments from '../new/NewComments';

const Modal = ({ showModal, setShowModal, choice, teacher, studentData,student,log}) => {
  let name = '';
  // const name = choice === 1 ? 'Students' : 'Logs';
  if (choice === 1) {
    name = 'Students';
  } else if (choice === 2) {
    name = 'Logs';
  } else if (choice === 3) {
    name = 'Comments';
  }

  return (
    <div className='flex justify-center items-center overflow-x-hidden overflow-y-scroll fixed z-50 inset-4 outline-none focus:outline-none'>
      <div className='relative  w-auto my-6 mx-auto max-w-3xl'>
        <div className='mt-20 border-0 w-full rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none '>
          <div className='flex items-start justify-between mt-35 p-5 border-b border-solid border-gray-300 rounded-t '>
            <h3 className='text-3xl text-center font=semibold'>
              New {`${name}`}
            </h3>
            <button
              className='bg-transparent border-0 text-black float-right'
              onClick={() => setShowModal(false)}
            >
              <span className='text-black opacity-7 h-6 w-6 text-xl block bg-teal-400 py-0 rounded-full'>
                x
              </span>
            </button>
          </div>

          <div className='relative p-6 flex-auto'>
            {choice === 1 ? (
              <NewStudentsModal />
            ) : choice === 2 ? (
              <NewLogs />
            ) : (
              <NewComments student={student} log={log}/>
            )}
          </div>
          <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
            <button
              className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
              type='button'
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
