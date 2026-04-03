import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import './BookCard.scss';

const BookCard = ({ book }) => {
  const {
    book_id,
    book_picture,
    book_title,
    book_author,
    // isbn_number,
    // publication,
    // reading_level,
  } = book;
console.log(book_id, book_picture, book_title, book_author)
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
     <div className='bookCard'> 
        {/* <div  style={{border:'2px solid red',width:'300px',margin:'20px 30px'}}>  */}
        <Link className='text-center' to={`/books/` + book_id} key={book_id}>
           
        {/* <div
        className={`bookCard ${expanded ? 'expanded' : 'bookCard'}`}
        onClick={handleExpand}
      > */}
        <img
          className='bookCard__image'
          width='150px'
          height='150px'
           src={book_picture}
          // src='https://dummyimage.com/150x150/c2c2c2/00'
          alt=''
        />
        <div className='bookCard__textcontent'> 
            <h2 className='bookCard__title'>BOOK TITLE:{''} {`${book_title}`}</h2>
            <h2 className='bookCard__title'>AUTHOR:{''} {`${book_author}`}</h2>
        </div>
        {/* <div className='bookCard__textcontent'> 
        <h2 className='bookCard_title'>{`${book_author}`}</h2>
        </div> */}
        {/* <div
          className={`bookCard__text ${expanded ? 'expanded' : ''}`}
          onClick={handleExpand}
        > */}
          {/* <div className='bookCard__textcontent'> 
            <h2 className='bookCard__title'>{`${book_title.toUpperCase()}`}</h2>
           
            <ol className='bookCard__summary'>
            <li className='bookCard__summary-list'>
                Id: <span>{`${book_id}`} </span>
              </li>
              <li className='bookCard__summary-list'>
                Reading Level: 
                <span>{`${reading_level}`}
                    </span> 
              </li>
              <li className='bookCard__summary-list'>
                {' '}
                Book Author: 
                <span>{`${book_author}`}
                    </span>
              </li>
             
              <li className='bookCard__summary-list'>
                ISBN : 
                <span>{`${isbn_number}`}</span>
              </li>
              <li className='bookCard__summary-list'>
                {' '}
                Publication: 
                <span>{`${publication}`}</span> 
              </li>
            </ol> 
          </div>*/}
           {/* </div>  */}
        {/*   <svg
            className={`bookCard__chevron ${expanded ? 'expanded' : ''}`}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 100 35'
            width='30'
          >
            <path
              d='M5 30L50 5l45 25'
              fill='none'
              stroke='#000'
              strokeWidth='5'
            />
          </svg> */}
      
      {/* </div> */}
        </Link> 
      {/* </div> */}
     
     </div>
  );
};
export default BookCard;


