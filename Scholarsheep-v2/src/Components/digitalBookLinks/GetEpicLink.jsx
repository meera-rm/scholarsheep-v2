import React from 'react';
import { ExternalLink } from 'react-external-link';
import './Common.scss';

const GetEpicLink = () => (
  <div>
    <ExternalLink href='https://www.getepic.com/app/read/68918'>
      <div className='readersListItem'>
        <img
          src='https://www.getepic.com/assets/epic-logo-blue-solid.svg'
          alt=''
        />
      </div>
    </ExternalLink>
  </div>
);

export default GetEpicLink;
