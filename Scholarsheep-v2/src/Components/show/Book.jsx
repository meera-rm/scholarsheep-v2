import React from 'react';


const Book = ({ log, books }) => {
    console.log('From Book', log,books);
    const bookTitle = books.filter((book) => {
      return log.books_id === book.book_id})[0];
    return(
       <div>
        {bookTitle.book_title}
       </div>
    );
  };

  export default Book;
