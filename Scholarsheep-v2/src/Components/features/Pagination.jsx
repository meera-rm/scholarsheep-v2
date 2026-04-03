// https://levelup.gitconnected.com/a-simple-guide-to-pagination-in-react-facd6f785bd0

import React from 'react';

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <nav>
      <ul className='flex justify-center '>
        <li className='page-item'>
          <button className='page-link px-4 py-4' onClick={prevPage} href='#'>
            Previous
          </button>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item ${currentPage === pgNumber ? 'active' : ''} `}
          >
            <button
              onClick={() => setCurrentPage(pgNumber)}
              className='page-link px-4 py-4 '
              href='#'
            >
              {pgNumber}
            </button>
          </li>
        ))}
        <li className='page-item'>
          <button className='page-link px-4 py-4' onClick={nextPage}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
