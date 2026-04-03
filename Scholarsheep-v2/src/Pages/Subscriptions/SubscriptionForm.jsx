import React, { useState } from 'react';
import axios from 'axios';
import './SubscriptionForm.scss';
import logoImage from '../../Components/asset/sheeplogo.png';
import { useNavigate } from 'react-router-dom';
import UnsubscriptionModal from '../../Components/subscriptions/UnsubscriptionModal';
import AddSubscription from '../../Components/subscriptions/AddSubscription';
import EditSubscription from '../../Components/subscriptions/EditSubscription';
import EditEmailModal from '../../Components/subscriptions/EditEmailModal';

import { ToastContainer, toast } from 'react-toastify';
const API = process.env.REACT_APP_API_URL;

const SubscriptionForm = () => {

  const navigate = useNavigate();

  const [editing,setEditing] = useState(false)
  const [unsubscribe, setUnsubscribe] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [edit, setEdit] = useState(false);
 


  // const notify = (message) => {
  //   if (message === 'success') {
  //     toast('🦄 Wow so easy!', {
  //       position: 'top-right',
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: 'light',
  //     });
  //   } else {
  //     toast.error(
  //       '🦄 , Oops !! something went wrong... we could not subscribe you',
  //       {
  //         position: 'top-right',
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: 'light',
  //       }
  //     );
  //   }
  //   setTimeout(() => {
  //     setStatus(null);
  //     // navigate('/')
  //   }, 2000);
  // };


  // const toggleEditMode = () => {
  //   setEditMode(!editMode); // Step 2: Toggle edit mode
  //   setNewEmail(email); // Step 2: Initialize new email with the current email
  // };

  // //if the user wants to edit their email
  // const handleEditSubmit = async (event) => {
  //   event.preventDefault();

  //   if (!isValidEmail(event.target.value)) {
  //     setError('Invalid email -Please enter a valid email address');
  //   } else {
  //     setError(null);
  //   }
  //   const updatedSubscription = {
  //     fullName: fullName,
  //     email: newEmail, // Step 5: Use the new email
  //   };

  //   if (updatedSubscription.fullName === '' || updatedSubscription.email === '') {
  //     return toast.error('Please make sure to fill out all fields.', {
  //       position: 'top-right',
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       pauseOnFocusLoss: false,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   }

  //   try {
  //     const res = await axios.post(
  //       `${API}/api/subscriptions/`,
  //       updatedSubscription
  //     );
  //     const json = await res.json();

  //     console.log(res.data);
  //     if (json.status === 'success') {
  //       setStatus('SUCCESS');
  //       notify('success');
  //       setEditMode(false); // Step 5: Exit edit mode after successful update
  //     }
  //   } catch (err) {
  //     setError(err);
  //     setStatus('ERROR');
  //     console.log(err);
  //   }
  //   setEmail('');
  //   setFullName('');
  // };

  // const isValidEmail = () => {
  //   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  //   return !emailRegex.test(email);
  // };

  return (
    <div className='emailSubscriptionForm '>
      <img
        src={logoImage}
        className='emailSubscriptionForm__image'
        alt='logo'
      />

      <div className='emailSubscriptionForm__newsletter'>Email Newsletter</div>
      <div className='emailSubscriptionForm__header'>
        Be the first to get notified about our new services.
      </div>
      <div className='emailSubscriptionForm__content'>
        Tools to help your children become leaders. Subscribe to
        {/* <!--     <a href='www' className='emailSubscriptionForm__content-link'> --> */}
        {''} our newsletter for updates- in your inbox. 🎁
      </div>
      <h2>Add Subscription</h2> 
      {/* <h2>{editing ? 'Edit Subscription' : 'Add Subscription'}</h2> */}
      
     {/* {editing ? (
						<>
            <EditEmailModal
               edit={true}
               setEdit={setEdit}
               setEditModal={setEditModal}
               editing={editing}
               setEditing={setEditing}/>

							 // <EditSubscription
              //   // email={email}
              //   // setEmail={setEmail}
              //   // fullName={fullName}
              //   // setFullName={setFullName}
              //   editing={editing}
              //   setEditing={setEditing}
							// />  
						</>
					) : (
					    <>*/}
							<AddSubscription 
                // email={email}
                // setEmail={setEmail}
                // fullName={fullName}
                // setFullName={setFullName}
                editing={editing}
                setEditing={setEditing}
                error={error}
                status={null}
                setError={setError}
                setStatus={setStatus}
              />
						{/* </>
           
					)} */}
          

          
      
     
{/* 
      {editMode && ( // Step 3: Conditionally render the edit form
        <form onSubmit={handleEditSubmit}>
          <div className='emailSubscriptionForm__label'>
      
            <input
              className='emailSubscriptionForm__email'
              type='email'
              placeholder='New email' // Step 4: Input for new email
              value={newEmail} // Step 4: Use the new email state
              onChange={(event) => setNewEmail(event.target.value)} // Step 4: Update the new email state
            />
          </div>
          <button className='emailSubscriptionForm__button'>Save</button>
        </form>
      )}

           
          {status === null &&(
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
          <button className='emailSubscriptionForm__button'>Subscribe!</button>
        </form>
      )}
      
      {status === 'SUCCESS'&& (
        <div className='emailSubscriptionForm__success'>
          <div>
            Welcome aboard{fullName ? `, ${fullName}` : ''}{' '}
            <span role='img' aria-label='Ship'>
              🚢
            </span>
          </div>
          <div>Please check your inbox to confirm the subscription!</div>
          <button  className='emailSubscriptionForm__statusButton' onClick={() => setStatus(null)}>Go back</button>
        </div>
      )}
      {status === 'ERROR' && (
        <div className='emailSubscriptionForm__error'>
          <div>Oops, something went wrong...</div>
          <div>
            Please, <button className='emailSubscriptionForm__statusButton' onClick={() => setStatus(null)}>TRY AGAIN</button>
          </div>
        </div>
      )} */}
     
     <div className='emailSubscriptionForm__editModalButtons'>
     {/* <button
        className='emailSubscriptionForm__editsubscribe'
        onClick={() => setEditModal(true) }
      >
        Edit
      </button> */}
      <button
        className='emailSubscriptionForm__unsubscribe'
        onClick={() => setShowModal(true) }
      >
        Unsubscribe
      </button>
      </div>

      {/* {editModal && (
        <EditEmailModal
         edit={true}
         setEdit={setEdit}
          setEditModal={setEditModal}
        />
      )} */}
      {showModal && (
        <UnsubscriptionModal
          setShowModal={setShowModal}
          unsubscribe={true}
          setUnsubscribe={ setUnsubscribe }
        // fullName={fullName}   
          // email={email}
        />
      )}

      
    
      <div className='emailSubscriptionForm__smallText'>
        <i>
          Free
          <span className='emailSubscriptionForm__smallText-link'>
            Education for all
          </span>
          .Trusted by parents and teachers
        </i>
      </div>
      <ToastContainer />
    </div>
  );
};
 export default SubscriptionForm;







