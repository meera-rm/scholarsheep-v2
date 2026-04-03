import { React, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import words from './../db/words.json';
import DisplayCardList from './DisplayCardList';
import PersonalDictionary from './temp/PersonalDictionary';
import httpService from '../../httpService';
import './AddVocabForm.scss';

import { Link } from 'react-router-dom';

const grades = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const API = process.env.REACT_APP_API_URL;

const AddVocabForm = (props) => {
  // console.log('in addvocabfprn', words);
  const { showCards, setShowCards, customClickHandler } = props;
  const navigate = useNavigate();

  const [inputWord, setInputWord] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('option1');
  const [userId, setUserId] = useState('');

  // const onInputChange = (event) => {
  //    const { name, value } = event.target;
  //   console.log(name,value)
  //   if (name === 'newWord') {
  //     setInputWord(prev => name);
  //   } else if (name === 'grade') {
  //     setSelectedGrade(event.target.value);
  //   }else {
  //     setUserId(value)
  //   }

  // };

  return (
    <>
      <div>
        <div className='flex flex-col mt-10 mb-4 md:w-full'>
          <label
            className='mb-2 uppercase  font-normal text-lg  text-left'
            htmlFor='newWord'
          >
            Word:
            <input
              className='border py-2 px-3 '
              id='newWord'
              type='text'
              name='newWord'
              value={inputWord}
              autoComplete='off'
              onChange={(e) => {
                setInputWord(e.target.value);
              }}
              placeholder='Add a word ...'
              required
            />
          </label>
        </div>

        <div className='flex flex-col mb-4 md:w-full'>
          <label
            className='mb-2 uppercase text-left font-normal text-lg '
            htmlFor='grade'
          >
            Grade:
            <select
              className='selectGrade'
              size='1'
              type='text'
              name='grade'
              id='grade'
              value={selectedGrade}
              onChange={(e) => {
                setSelectedGrade(e.target.value);
              }}
              required
            >
              <option key='none' value='none'>
                --Select child's grade--
              </option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className='flex justify-center ml-10 space-x-10 '>
          <button
            className=' my-12 px-5 py-3 rounded bg-teal-500  whitespace-nowrap'
            onClick={() => customClickHandler(inputWord,selectedGrade)}
          >
            Add Word
          </button>

          <Link to={`/vocabulary`}>
            <button
              className='mr-10 px-5  py-3 rounded my-12 bg-teal-500 '
              style={{ display: showCards ? 'block' : 'none' }}
            >
              Cancel{' '}
            </button>
          </Link>
        </div>

        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </div>
    </>
  );
};
export default AddVocabForm;












