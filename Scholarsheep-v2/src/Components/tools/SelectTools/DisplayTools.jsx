import { React, useState } from 'react';

import LearningTools from '../LearnTools/LearningTools';
import Note from '../../../Pages/Notes/Note';
import './DisplayTools.scss';

const DisplayTools = () => {
  const [active, setActive] = useState('learningtools');

  return (
    <div className='toolChoice'>
      <div className='toolChoice__selection'>
        <button
          className={
            active === 'learningtools'
              ? 'toolChoice__button toolChoice__button-active'
              : 'toolChoice__button'
          }
          value='learningtools'
          onClick={(e) => setActive(e.currentTarget.value)}
        >
          <span className={`inline-block px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
            active === 'learningtools'
              ? 'bg-teal-500 text-white shadow-md'
              : 'bg-transparent text-gray-600 border border-gray-200 hover:text-teal-500'
          }`}>
            Word Tools
          </span>
        </button>
        <button
          className={
            active === 'notes'
              ? 'toolChoice__button toolChoice__button-active'
              : 'toolChoice__button'
          }
          value='notes'
          onClick={(e) => setActive(e.currentTarget.value)}
        >
          <span className={`inline-block px-5 py-2 rounded-xl text-sm font-semibold transition-all pointer-events-none ${
            active === 'notes'
              ? 'bg-teal-500 text-white shadow-md'
              : 'bg-transparent text-gray-600 border border-gray-200 hover:text-teal-500'
          }`}>
            Notes App
          </span>
        </button>
      </div>

      {active === 'learningtools' && <LearningTools />}
      {active === 'notes' && <Note />}

    </div>
  );
};

export default DisplayTools;
