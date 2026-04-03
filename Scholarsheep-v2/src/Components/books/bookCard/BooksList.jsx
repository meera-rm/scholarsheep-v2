import React, {useEffect, useState} from "react";
import SearchBar from "./SearchBar";
import EmptyView from "../../emptyView/EmptyView";
import BookCard from './BookCard';
import './BooksList.scss';
import axios from 'axios';
const API = process.env.REACT_APP_API_URL;

const BooksList = () => {
    const [book, setBook] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // fetch all student data
    useEffect(() => {
        // httpService
        axios.get(`${API}/api/books`)
        //    .then((response) => console.log(response.data.payload))
          .then((response) => {
            setBook(response.data.payload);
            setLoading(true);
          })
          .catch((error) => {
            console.error('catch', error);
            setLoading(true);
            setError(error);
          });
      }, []);


    //   function search(bookData) {
    //     // eslint-disable-next-line
    //     return bookData.filter((book) => {
    //       console.log(book);
    //       if (book.reading_level === filterParam) {
    //         return searchParam.some((newBook) => {
    //           return (
    //             book[newBook].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
    //           );
    //         });
    //       } else if (filterParam === 'All') {
    //         return searchParam.some((newBook) => {
    //           return (
    //             book[newBook].toLowerCase().indexOf(query.toLowerCase()) > -1
    //           );
    //         });
    //       }
    //     });
    //   }
    


    let filteredBookList   = book;

    // if there is a search term
    if(searchTerm){
      // make searchterm all lowercase
      let searchTermLowerCase = searchTerm.toLowerCase();

      // filter the list of students to only include those who have the search term in their name
      filteredBookList = book.filter(book => {
        const bookTitle= `${book.book_title} `;
        const fullBookTitleLowerCase = bookTitle.toLowerCase();
        return fullBookTitleLowerCase.includes(searchTermLowerCase);
      })
    }

    return (
        <div className="booksList">
             <div className='searchBar'>
        <input
           className='searchBar__input'
           type='text'
           placeholder='Search by casual reading'
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
         
    {/* {search(data).length === 0 ? (
          <EmptyView message='No books found.' />
        ) : (
          <div className='grid grid-cols-1 space-evenly md:grid-cols-2 lg:grid-cols-3'>
            {search(data)
              .slice(0, paginate)
              .map((book) => (
                <div key={book.book_id}>
                  <BookCard book={book} />
                </div>
              ))}
          </div>
        )} */}
           {filteredBookList.map(book => {
            return (<BookCard book={book} />)
          })} 
          {/* {loading && <div>Loading...</div>} */}
          {!loading && filteredBookList.length === 0 && <EmptyView styleKey="bold" message="No books Found"/>}
        </div>
    )
}

export default BooksList;