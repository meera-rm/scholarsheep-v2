import { React, useState, useEffect } from 'react';
import axios from 'axios';
import words from '../db/words.json';
import './FlashCard.scss';
import FlashCardList from './FlashCardList';
// import httpService from '../../httpService';

const API = process.env.REACT_APP_API_URL;

const options = [
  'AllGrades',
  'Kindergarten',
  'Grade1',
  'Grade2',
  'Grade3',
  'Grade4',
  'Grade5',
];

const FlashCard = () => {
  const [wordData, setWordData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('AllGrades');

  useEffect(() => {
    //httpService. 
      axios.get(`${API}/api/dictionary`)
      // .then((response) => console.log(response.data))
      .then((response) => setWordData(response.data.payload))
      .catch((e) => console.log('catch', e));
  }, []);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    console.log('option', option);
    let grade = '';
    switch (option) {
     
      case 'Kindergarten':
        grade = 'K';
        break;
      case 'Grade1':
        grade = '1';
        break;
      case 'Grade2':
        grade = '2';
        break;
      case 'Grade3':
        grade = '3';
        break;
      case 'Grade4':
        grade = '4';
        break;
      case 'Grade5':
        grade = '5';
        break;
      default:
        grade = 'AllGrades';
        break;
    }
    console.log('grade=',grade);
    
    setSelectedGrade(grade);
    setIsOpen(false);
  };
 
  return (
    <div>
      <div className='flashCard'>
        <h1 className='flashCard__title'>FlashCards</h1>
      </div>
      <div className='flashCard__container'>
        {/* <div className='flashCard__toggleGradeSelector'>All Grades
         */}
        <p>Select Grade:</p>
        <div className='flashCard__gradeSelector'>
          <div onClick={toggleDropdown}>
            {selectedGrade ? selectedGrade : 'AllGrades'}
          </div>
          {isOpen && (
            <ul className='flashCard__gradeSelector-options'>
              {options.map((option) => (
                <li onClick={() => handleOptionClick(option)} key={option}>
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* </div> */}
      </div>
    
       {wordData && wordData.length > 0 && (
        <FlashCardList wordData={wordData} selectedGrade={selectedGrade} />
      )}
    </div>
    //  </div>
  );
};
export default FlashCard;








// https://codepen.io/mattgreenberg/pen/ggOpOr
// https://github.com/BLepers/1-click-flashcards
