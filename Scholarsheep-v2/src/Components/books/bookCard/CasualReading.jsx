import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import Toggle from '../Toggle.jsx';
import { Link } from 'react-router-dom';
// import BookLoader from '../../loader/BookLoader';
// import EmptyView from '../../emptyView/EmptyView';
// import BooksList from './BooksList';
import SearchAndFilter from './SearchAndFilter';
// const API = process.env.REACT_APP_API_URL;

const CasualReading = () => {
  // const [bookData, setBookData] = useState([]);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState('CR');

  // useEffect(() => {
  //   setLoading(true);
  //   //httpService.
  //    axios.get(`${API}/api/books`)
  //     .then((response) => {
  //       console.log(response.data.payload)
  //       setBookData(response.data.payload);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(false);
  //     });
  // }, []);

  // if (error) {
  //     return <>{error.message}</>;
  // } else if (loading) {
  //     return (
  //     <div className='flex justify-center items-center mb-40  mt-40'>
  //         <div> Loading ....
  //               <BookLoader/>
  //         </div>
  //    </div>
  //     )
  // } else {
  return (
    //rendering the data
    <div>
      <div className='text-center text-teal-700 text-xl font-bold mb-10 mt-10'>
        Casual Reading Books
        <div className='text-right'>
          <Link to={`/books/new`}>
            <button className='mr-20 btn bg-indigo-500 px-4 py-4 rounded text-white  font-georgia hover:bg-indigo-400 '>
              Add Books{' '}
            </button>
          </Link>
        </div>
      </div>
      {/* <BooksList/> */}
      <SearchAndFilter reading={reading} />
      {/* {!loading && bookData.length===0 &&<EmptyView styleKey='bold' message='Page Not Found' />} */}
    </div>
  );
};
// }
export default CasualReading;
