import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const API = process.env.REACT_APP_API_URL;

const UnsubscriptionModal = ({
  setShowModal,
  unsubscribe,
  setUnsubscribe,

}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();

  const notify = (message) => {
    if (message === 'success') {
      toast('🦄 Wow so easy!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      toast.error(
        '🦄 , Oops !! something went wrong... we could not subscribe you',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        }
      );
    }
    setTimeout(() => {
      setStatus(null);
      // navigate('/')
    }, 2000);
  };
  const handleUnsubscribe =  () => {
    
    try {
      // Send a request to your server to unsubscribe the user
      const res =  axios.delete(`${API}/api/subscriptions/unsubscribe/${email}`);
      const resData = res.data;
      const resStatus = res.status;

      if (resStatus === 'success') {
        // Handle a successful unsubscribe
        setStatus('UNSUBSCRIBED'); // You can set your own status for unsubscribed state
        // Additional actions or notifications can be added here
        setEmail('')
        notify('success');
        navigate('/');
      } else {
        // Handle an unsuccessful unsubscribe
        setError('Unsubscribe failed');
        // Additional error handling can be added here
      
      }
    } catch (error) {
      // Handle any errors that occur during the unsubscribe process
      setError('Unsubscribe failed');
      // Additional error handling can be added here
    }
  };

  return (
    <div className='flex justify-stretch overflow-x-hidden fixed z-20 inset-4 outline-none focus:outline-none translate-x-10 -translate-y-30'>
      <div className='relative  w-auto my-5 mx-auto max-w-3xl'>
        <div className='mt-20 border-0 w-full rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none '>
          <div className='flex items-start justify-between mt-2 p-5 border-b border-solid border-gray-300 rounded-t '>
            <h3 className='text-3xl text-center font=semibold'>UNSUBSCRIBE</h3>
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
            {unsubscribe && (
              <div className='items-center'>
                Are you sure you want to unsubscribe ?
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                  className='border p-2 mt-3'
                />
              </div>
            )}
          </div>
          <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
            <button
              className='text-red-500 background-transparent  font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
              type='button'
              onClick={handleUnsubscribe}
            >
              Confirm
            </button>
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

export default UnsubscriptionModal;
