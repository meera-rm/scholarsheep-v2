import React from 'react';
import './UpcomingBooks.scss';

const UpcomingBooks = () => {
  return (
    <div className='articleList'>
      <div className='articleList__bgtext'> </div>
      <div className='articleList__article'>
        <div className='articleList__number'>1 </div>
        <span className='articleList__title'>
          <a href='https://www.penguinrandomhouse.com/books/678822/the-stern-chase-by-john-flanagan/'>
            The Stern Chase By John Flanagan
          </a>
        </span>
      </div>
      <div className='articleList__line'></div>

      <div className='articleList__article'>
        <div className='articleList__number'>2</div>{' '}
        <span className='articleList__title'>
          <a href='https://www.penguinrandomhouse.com/books/617804/superpowered-by-renee-jain-and-dr-shefali-tsabary/'>
            Superpowered By Renee Jain and Dr. Shefali Tsabary
          </a>
        </span>
      </div>
      <div className='articleList__line'></div>

      <div className='articleList__article'>
        <div className='articleList__number'>3</div>{' '}
        <span className='articleList__title'>
          <a href='https://www.penguinrandomhouse.com/books/669207/the-last-kids-on-earth-thrilling-tales-from-the-tree-house-by-max-brallier-illustrated-by-douglas-holgate-jay-cooper-anoosha-syed-lorena-alvarez-christopher-mitten-and-xavier-bonet/'>
            The Last Kids on Earth: Thrilling Tales from the Tree House By Max
            Brallier
          </a>
        </span>
      </div>
      <div className='articleList__line'></div>

       <div className='articleList__article'>
        <div className='articleList__number'>4</div>{' '}
        <span className='articleList__title'>
          <a href='https://www.penguinrandomhouse.com/books/692751/theres-a-ghost-in-this-house-by-oliver-jeffers/'>
            There's a Ghost In This House By Oliver Jeffers
          </a>
        </span>
      </div>
      <div className='articleList__line'></div>

      <div className='articleList__article'>
        <div className='articleList__number'>5</div>
        <span className='articleList__title'>
          <a href='https://www.penguinrandomhouse.com/books/668144/map-of-flames-the-forgotten-five-book-1-by-lisa-mcmann/'>
            Map of Flames (The Forgotten Five, Book 1) By Lisa McMann
          </a>
        </span>
      </div>
      <div className='articleList__line'></div>
    </div>
  );
};
export default UpcomingBooks;
