import React from 'react';

import './SearchBar.scss';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className='searchBar'>
      <input
        className='searchBar__input'
        type='text'
        placeholder='Search by name'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
