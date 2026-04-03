import { React, useState, useEffect } from 'react';
import axios from 'axios';

import './AutoMenuSelector.scss';

const AutoMenuSelector = ({topic, setTopic,selectedIndex,setSelectedIndex}) => {

  // const [selectedIndex, setSelectedIndex] = useState(0);
  const navItems = ['All Topics','English', 'Social Studies', 'Science','Math'];
//  onst timeInterval = 3000; c

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setSelectedIndex((prevIndex) =>
  //     prevIndex=== navItems.length - 1 ? 0 : prevIndex + 1);
  //   }, timeInterval);
  //   return () => clearInterval(intervalId);
  // }, [ navItems.length, timeInterval]);

  const handlePrevClick = () => {
  //  setSelectedIndex(selectedIndex === 0 ? navItems.length - 1 : selectedIndex - 1); 
  setSelectedIndex((prevIndex) =>
  prevIndex === 0 ? navItems.length - 1 : prevIndex - 1
);
  };

  const handleNextClick = () => {
  
    setSelectedIndex((prevIndex) =>
    prevIndex === navItems.length - 1 ? 0 : prevIndex + 1
  );

  };


  const handleSetTopicClick = (e) => {
    console.log(e.target.id)
   
    if(e.target.id==='All Topics'){
      setTopic('')
    }else{
    const lowerCaseTopic= e.target.id.toLowerCase();
   
    setTopic(lowerCaseTopic);
    }
  };


  return (
    <div className='menuSelector'>
    <div className='menuSelector__container'>
      {/* <div className='menuSelector__arrow' onClick={handlePrevClick}>
        {'<'}
      </div> */}
      <div className='menuSelector__menuItems'>
        {navItems.map((item,index) => (
          
          <div
            key={index}
            className={selectedIndex === index ? 'menuSelector__selectedItem': 'menuSelector__item'}
            id={item} 
             onClick={ handleSetTopicClick}
          >
            {item}
          </div>
        ))}
      </div>
      {/* <div className='menuSelector__arrow' onClick={handleNextClick}>
        {'>'}
      </div> */}
      </div>
     
    
  </div>
  );
};
export default AutoMenuSelector;









