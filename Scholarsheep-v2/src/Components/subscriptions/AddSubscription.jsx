import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const API = process.env.REACT_APP_API_URL;

const AddSubscription = ({
  editing,
  setEditing,
  error,
  setError,
  status,
  setStatus,
}) => {
  const [is_subscribed, setIsSubscribed] = useState(false);
  const [is_verified, setIsVerified] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
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

  const handleEmail = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleName = (event) => {
    const { value } = event.target;
    setFullName(value);
  };

  const isValidEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return !emailRegex.test(email);
  };

  //when subscribing the user for the first time
  const handleSubmit = async(event) => {
    event.preventDefault();

    if (!isValidEmail(event.target.value)) {
      setError('Invalid email -Please enter a valid email address');
    } else {
      setIsSubscribed(true)
      setIsVerified(true)
      setError(null);
    }

    const newSubscription = {
      fullName: fullName,
      email: email,
      is_subscribed: is_subscribed, //setIsSubscribed(!is_subscribed),
      is_verified:is_verified //setIsVerified(!is_verified),
    };

    if (newSubscription.fullName === '' || newSubscription.email === '') {
      return toast.error('Please make sure to fill out all fields.', {
        position: 'top-right',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
      });
    }

    try {
     
      // const res = httpService.post(
        const res = await axios.post(`${API}/api/subscriptions `,newSubscription );
     

      console.log(res.data,res.status);

      if (res.status === 'success') {
        setStatus('SUCCESS');
        notify('success');
      }
    } catch (err) {
      setError(err);
      setStatus('ERROR');
      console.log(err);
      // notify("error");
    }
    setEmail('');
    setFullName('');
  };

  return (
    <div>
      
      {status === null && (
        <form onSubmit={handleSubmit}>
          <div className='emailSubscriptionForm__label'>
            <input
              className='emailSubscriptionForm__name'
              type='text'
              placeholder='Your name'
              value={fullName}
              onChange={handleName}
            />

            <input
              className='emailSubscriptionForm__email'
              type='email'
              placeholder='Your email'
              value={email}
              onChange={handleEmail}
            />
          </div>
          
          <div className='emailSubscriptionForm__buttongroup'>
          <button className='emailSubscriptionForm__button'>Subscribe!</button>
          <button className='emailSubscriptionForm__button'>Cancel</button>
          </div>
        </form>
      )}

      {status === 'SUCCESS' && (
        <div className='emailSubscriptionForm__success'>
          <div>
            Welcome aboard{fullName ? `, ${fullName}` : ''}{' '}
            <span role='img' aria-label='Ship'>
              🚢
            </span>
          </div>
          <div>Please check your inbox to confirm the subscription!</div>
          <button
            className='emailSubscriptionForm__statusButton'
            onClick={() => setStatus(null)}
          >
            Go back
          </button>
        </div>
      )}
      {status === 'ERROR' && (
        <div className='emailSubscriptionForm__error'>
          <div>Oops, something went wrong...</div>
          <div>
            Please,{' '}
            <button
              className='emailSubscriptionForm__statusButton'
              onClick={() => setStatus(null)}
            >
              TRY AGAIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSubscription;
