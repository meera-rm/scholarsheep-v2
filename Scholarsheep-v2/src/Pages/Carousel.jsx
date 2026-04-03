import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineVerticalRight, AiOutlineVerticalLeft } from 'react-icons/ai';

import img8 from '../Components/asset/imagine8copy.jpg';
import r10 from '../Components/asset/read10.jpeg';
import r11 from '../Components/asset/read11.jpeg';
import r13 from '../Components/asset/read13.jpeg';
import r14 from '../Components/asset/read14.jpeg';
import r15 from '../Components/asset/read15.jpeg';
import r16 from '../Components/asset/read16.webp';
import r17 from '../Components/asset/childread.png';
const featuredProducts = [r10, r17, r13, img8, r11, r14, r15, r16];

let count = 0;
let slideInterval;
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRef = useRef();

  const removeAnimation = () => {
    slideRef.current.classList.remove('fade-anim');
  };

  useEffect(() => {
    slideRef.current.addEventListener('animationend', removeAnimation);
    slideRef.current.addEventListener('mouseenter', pauseSlider);
    slideRef.current.addEventListener('mouseleave', startSlider);

    startSlider();
    return () => {
      pauseSlider();
    };
    // eslint-disable-next-line
  }, []);

  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleOnNextClick();
    }, 10000);
  };

  const pauseSlider = () => {
    clearInterval(slideInterval);
  };

  const handleOnNextClick = () => {
    count = (count + 1) % featuredProducts.length;
    setCurrentIndex(count);
    slideRef.current.classList.add('fade-anim');
  };
  const handleOnPrevClick = () => {
    const productsLength = featuredProducts.length;
    count = (currentIndex + productsLength - 1) % productsLength;
    setCurrentIndex(count);
    slideRef.current.classList.add('fade-anim');
  };

  return (
    <div className='max-w-screen-xl m-auto'>
      <div ref={slideRef} className='w-full select-none relative'>
        <div className='aspect-w-full aspect-h-auto  '>
          <img
            width='700'
            height='600'
            className='text-center '
            src={featuredProducts[currentIndex]}
            alt=''
          />
        </div>

        <div className='absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center'>
          <button
            id='rightbutton'
            aria-label='Aria Name'
            className='bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition'
            onClick={handleOnPrevClick}
          >
            <AiOutlineVerticalRight size={30} />
          </button>
          <button
            id='leftbutton'
            aria-label='Aria Name'
            className='bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition'
            onClick={handleOnNextClick}
          >
            <AiOutlineVerticalLeft size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Carousel;
