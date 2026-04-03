import { React, useState } from 'react';
// import axios from 'axios';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import dict from './dict.png';
// import { FaSearch } from 'react-icons/fa';
// import { FcSpeaker } from 'react-icons/fc';

const Dictionary = () => {
  const [searchWord, setSearchWord] = useState('');

  return (
    <div>
      <h1 className='text-center mt-8 text-teal-500'>Dictionary</h1>
      <img
        style={{
          textAlign: 'center',
          width: '80px',
          height: '80px',
          margin: '0 auto 30px  auto',
        }}
        src={dict}
        alt=''
      />

      <p className='text-center'>Word to search Dictionary</p>
      <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
      <p className='text-center'>Searching meaning of {`${searchWord}`}</p>
      <SearchResult searchWord={searchWord} setSearchWord={setSearchWord} />
    </div>
  );
};
export default Dictionary;
