import React from 'react';

import './Slider.scss';
// import sliderBooks from './sliderBooks'
const sliderBooks =[
    'https://m.media-amazon.com/images/I/91FRe2hWifL._AC_UY436_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/61iXnnCiNJL._AC_UY436_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/51q+XNdCkVS._SX327_BO1,204,203,200_.jpg',
    'https://m.media-amazon.com/images/I/81b48nn+UGL._AC_UY436_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/61iXnnCiNJL._AC_UY436_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/71y4OToRqlL._AC_UY436_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/51PEVzD26zL._AC_UY436_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/61rSMJLrg9L._AC_UY436_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/A1oo05UBpNL._AC_UY436_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/81cxI8OVIlL._AC_UY436_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/91FRe2hWifL._AC_UY436_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/91FRe2hWifL._AC_UY436_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/91FRe2hWifL._AC_UY436_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/91FRe2hWifL._AC_UY436_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/91FRe2hWifL._AC_UY436_FMwebp_QL65_.jpg',
    ]

const Slider = ()=> {
  
    return (
     <div className="pt-10 flex items-center flex-col text-center">
        <h1 className="books-title">Books list </h1>
        <div className="slider">
          <div className="slide-track"> 
            {sliderBooks.map((sliderBook, index) => {
              return (
                <div className='image' key={index}>
                  <img src={sliderBook} alt="imageforslider" />
                </div>
              );
            })}
          </div>
        </div> 
      </div>
    );
  }

  export default Slider;
  