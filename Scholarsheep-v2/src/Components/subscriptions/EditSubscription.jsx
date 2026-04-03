import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const API = process.env.REACT_APP_API_URL;

const EditSubscriptions = ({
  editing,
  setEditing,
  email,
  name,
  setName,
  setEmail,
  id,
  setId,
  emailUpdated,
  setEmailUpdated,
}) => {
 
  

  const [showModal, setShowModal] = useState(true);
  const [currentEmail, setCurrentEmail] = useState(email);
  const [currentName, setCurrentName] = useState(name);
  const [is_subscribed, setIsSubscribed] = useState(true);
  const [isverified, setIsVerified] = useState(true);
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

  const isValidEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return !emailRegex.test(email);
  };

  //add the current email
  // const handleModalSubmit = () => {
  //   if (isValidEmail(currentEmail)) {
  //     setShowModal(false);
  //   } else {
  //     // Handle invalid email in the modal
  //     setError('Invalid email. Please enter a valid email address.');
  //     notify('error');
  //   }
  // };
  // //if the user wants to edit their email

  const handleUpdatedSubmit = async (event) => {
    event.preventDefault();

    if (!isValidEmail(event.target.value)) {
      setError('Invalid email -Please enter a valid email address');
    } else {
      setIsVerified(true);
      setError(null);
    }
    const updatedSubscription = {
      email: currentEmail,
      fullname: currentName,
      is_subscribed:true,
      is_verified: isverified,
     

    };

    if (
      updatedSubscription.fullName === '' ||
      updatedSubscription.email === ''
    ) {
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
      const res = await axios.put(
        `${API}/api/subscriptions/update/:${id}`,
        updatedSubscription
      );
      let data = res.data.payload
      console.log('updatedData=', data);
      if (res.status === 'success') {
        notify('success');
      }
    } catch (err) {
      setError(err);
      console.log(err);
    }
    setEmail('');
 
  };

  return (
    <div>
      <form onSubmit={handleUpdatedSubmit}>
        <div className='emailSubscriptionForm__label'>
          <input
            className='emailSubscriptionForm__name'
            type='text'
            placeholder='Your name'
            value={currentName}
            onChange={(event) => setCurrentName(event.target.value)}
          />
          <input
            className='emailSubscriptionForm__email'
            type='email'
            placeholder='email'
            value={currentEmail}
            onChange={(event) => setCurrentEmail(event.target.value)}
          />
        </div>

        <div className='emailSubscriptionForm__buttongroup'>
          <button className='emailSubscriptionForm__button'>Edit</button>
          <Link to={`/subscriptions`}>
          <button className='emailSubscriptionForm__button'>Cancel</button>
          </Link>
        </div>
      </form>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default EditSubscriptions;

<Link
style={{ margin: '0 auto', textAlign: 'center' }}
to={`/books`}
>
<button className=' px-5  py-3 rounded bg-teal-500'>
  Cancel{' '}
</button>
</Link>