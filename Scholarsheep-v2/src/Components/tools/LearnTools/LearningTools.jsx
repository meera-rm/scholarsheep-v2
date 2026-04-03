import { React, useState } from 'react';
import { Link } from 'react-router-dom';

import './LearningTools.scss';
import words from '../db/words.json';
import tremble from './tremble.png';
import dictionary from './dictionary.png';
import vocabimg from './vocabimg.png';

const LearningTools = ({tools}) => {

   const [vocabWords, setVocabWords] = useState(words);

  // console.log('inflashcards', vocabWords);

  return (
    <div className='learningTools'>
      <h1 className='learningTools__title'>
        Learning Tools for Enhanced Vocabulary
      </h1>

      <Link to='/dictionary'>
      <div className='learningTools__container'>
        <div className='learningTools__image'>
          <img src={dictionary} alt='' style={{ width: '80%' }} />
        </div>
        <div className='learningTools__text'>
          <h2>Dictionary Lookup</h2>
          <h4>Definition of a word from a dictionary</h4>
        </div>
      </div>
    </Link>

    <Link to='/vocabulary' state={{ vocabWords: vocabWords }}>
    <div className='learningTools__container'>
      <div className='learningTools__image'>
        <img src={tremble} alt='' />
      </div>
      <div className='learningTools__text'>
        <h2>Personal Dictionary </h2>
        <h4>Add words to make your personal dictionary</h4>
      </div>
    </div>
  </Link>
  
    <Link to='/flashcard'>
        <div className='learningTools__container'>
          <div className='learningTools__image'>
            <img src={vocabimg} alt='' style={{height:'350px'}} />
          </div>
          <div className='learningTools__text'>
            <h2>Vocabulary Words</h2>
            <h4>Practice words from personal dictionary with flashcards</h4>
          </div>
        </div>
      </Link>
      
    </div>
  );
};

export default LearningTools;


