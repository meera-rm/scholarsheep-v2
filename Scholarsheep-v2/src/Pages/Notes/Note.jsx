import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import './Note.scss';
import noteicon from './noteicon.png';

const Note = () => {
  return (
  
    <div className='notes'>
      <h1 className='notes__title'>Notes app</h1>

     
     <Link to='/notes'>
        <div className='notes__container'>
          <div className='notes__image'>
            <img src={noteicon} alt=''   />
          </div>
          <div className='notes__text'>
            <div>Take Notes to</div>
            <div>help you search organize, easy access and editing , media integration and portability.</div> 
            </div>
          
        </div>
      </Link>

       {/* <Link to=''>
        <div className='notes__container'>
          <div className='notes__image'>
            <img src={tremble} alt=''  />
          </div>
          <div className='notes__text'>
            {/*  <h2>Daily Tracker</h2>
            <h4>Reading every day helps build confidence</h4>
          </div>
        </div>
      </Link> 

     <Link to=''>
        <div className='notes__container'>
          <div className='notes__image'>
            <img src={tremble} alt='' />
          </div>
          <div className='notes__text'>
             {/* <h2>Reading Buddies</h2>
            <h4>find a buddy to Read with.</h4> 
          </div>
        </div>
      </Link>  */}
    </div>
  );
};

export default Note;





