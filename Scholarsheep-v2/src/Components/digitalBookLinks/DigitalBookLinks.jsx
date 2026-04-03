import React from 'react';
import './DigitalBookLinks.scss'

import WilBooksLink from './WilBooksLink';
import LovingToReadLink from './LovingToReadLink';
import GetEpicLink from './GetEpicLink';
// import { ExternalLink } from 'react-external-link';

const DigitalBookLinks = () => (
  <div>
 <div className="gradedReadersList">
  <div className="gradedReadersList__title">
     Free Online Graded Reading Level Books
  </div>
  <div className="gradedReadersList__container">
     <WilBooksLink/>
     <LovingToReadLink/>
     <GetEpicLink/>
  </div>
</div>

  </div>
);

export default DigitalBookLinks;

// https://www.easyteacherworksheets.com/langarts/analogies.html