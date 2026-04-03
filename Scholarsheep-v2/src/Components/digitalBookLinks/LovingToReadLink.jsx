import React from 'react';
import { ExternalLink } from 'react-external-link';
import './LovingToRead.scss';
const LovingToReadLink = () => (
  <div>
    <ExternalLink href='https://loving2read.com/reading/leveled-books/'>
    <div className='readersListItem'>
      <h3 className='loving'>LovingToRead</h3>
       <img  className='lovingtoread'
        src='https://loving2read.s3.amazonaws.com/static/images/blake.png'
          alt=''
        />
         {/* <div className='curved-text'>
  
        
        <span class="L">L</span>
        <span class="o">o</span>
        <span class="v">v</span>
        <span class="i">i</span>
        <span class="n">n</span>
        <span class="g">g</span>
        <span class="T">T</span>
        <span class="o">o</span>
        <span class="R">R</span>
        <span class="e">e</span>
        <span class="a">a</span>
        <span class="d">d</span>
        
    </div> */}
      </div>
    </ExternalLink>
  </div>
);

export default LovingToReadLink;
 // src='https://loving2read.s3.amazonaws.com/static/images/blake.png'
//  src='https://loving2read.s3.amazonaws.com/static/images/bookicon.png'