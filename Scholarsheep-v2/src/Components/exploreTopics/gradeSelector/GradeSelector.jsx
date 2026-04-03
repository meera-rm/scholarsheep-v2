import { React, useState, useEffect } from 'react';
import axios from 'axios';
import './GradeSelector.scss';

const options = [
  'All Grades',
  'Kindergarten',
  '1st Grade',
  '2nd Grade',
  '3rd Grade',
  '4th Grade',
  '5th Grade',
];

const GradeSelector = ({ gradeLevel, setGradeLevel }) => {

  const [isOpen, setIsOpen] = useState(false);
 
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setGradeLevel(option);
    setIsOpen(false);
  };

  return (

    <div className='gradeSelector'>
    
      <div className='gradeSelector__container'>
      
        <p>Select Grade:</p>
        <div className='gradeSelector__option'>
          <div onClick={toggleDropdown}>{gradeLevel}</div>
          {isOpen && (
            <ul className='gradeSelector__option-select'>
              {options.map((option) => (
                <li onClick={() => handleOptionClick(option)} key={option}>
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      
      </div>
    </div>
  
  );
};
export default GradeSelector;
