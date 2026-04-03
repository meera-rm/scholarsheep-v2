import { Link } from 'react-router-dom';
// import { React, useState, useEffect } from 'react';

// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import React from 'react';
import errorpage from './page404.jpg';
import errormonster from './monster.jpg';
const PageNotFound = () => {
  // const [show, setShow] = useState(false);

  // const handleClose = (fromModal) => setShow(false);

  // useEffect(() => {
  //   setShow(true);
  // }, []);

  return (
    <div>
      {/* {show ? (
        <div>
          <Modal
            show={show}
            onHide={() => handleClose({ msg: 'Cross Icon Clicked!' })}
          >
            <Modal.Header closeButton></Modal.Header>

            <Modal.Body>
              <div className='text-center flex justify-center items-center'>
                <h1 className='text-red-400 text-center text-sm '>404</h1>
                <h3>Sorry ,We could not find the Page</h3>
                <p className='text-base'>
                  <Link style={{ color: 'black' }} to='/'>
                    Go Home
                  </Link>
                </p>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant='danger'
                onClick={() => handleClose({ msg: 'Modal Closed!' })}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : null} */}
      <div className='flex justify-center'>
        <img
          src={errormonster}
          alt='errorpage'
          className='w-2/6 h-96 object-center'
        />
       
      </div>
      <p className='mt-4 text-black flex justify-center'>
                  <Link to='/' className='bg-teal-500 text-center w-28 p-2'>
                    Go Home
                  </Link>
                </p>
      {/* <a href='https://www.freepik.com/free-vector/404-error-with-person-looking-concept-illustration_20824298.htm#query=404%20found&position=2&from_view=keyword'>
        Image by storyset on Freepik person looking
      </a> */}
     
      {/* <a href='https://www.freepik.com/free-vector/404-error-background-flat-style_1825297.htm#query=404%20error-bakcground-flat-style&position=45&from_view=search&track=sph'>
        Freepik darkgreenpage404{' '}
      </a>
      <a href='https://storyset.com/web'>Web illustrations by Storyset</a> */}
    </div>
  );
};
export default PageNotFound;
