import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { randomWord } from './word';

const GuessWord = () => {
  const [alphabet] = useState([
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ]);

  const [word, setWord] = useState(randomWord());
  const [geusses, setGeusses] = useState([]);
  const [lives, setLives] = useState(10);
  const [counter, setCounter] = useState(0);
  const [space, setSpace] = useState(0);
  const [wrongWords, setWrongWords] = useState([]);
  const [guessed, setGuessed] = useState(new Set());
  const [nWrong, setNWrong] = useState(0);
const [gameEnded, setGameEnded] = useState(false);

useEffect(() => {
  if (counter + space === word.length) {
    setGameEnded(true);
  } else if (nWrong === 10 && lives === 0) {
    setGameEnded(true);
  }
}, [counter, space, nWrong, lives, word.length]);


  const check = (geuss) => {
    for (let i = 0; i < word.length; i++) {
      if (word[i] === geuss) {
        setGeusses((prevGeusses) => {
          return [
            ...prevGeusses.slice(0, i),
            geuss,
            ...prevGeusses.slice(i + 1),
          ];
        });
        setCounter((prevCounter) => prevCounter + 1);
      }
    }

    setGuessed((prevGuessed) => {
      const newGuessed = new Set(prevGuessed);
      newGuessed.add(geuss);
      return newGuessed;
    });

    const j = word.indexOf(geuss);

    if (j === -1) {
      setLives((prevLives) => prevLives - 1);
      setNWrong((prevNWrong) => prevNWrong + 1);
      setWrongWords((prevWrongWords) => [...prevWrongWords, geuss]);
      //   comments();
    }
    // else {
    //   comments();
    // }
  };

  const buttons = () => {
    const buttonElements = alphabet.map((letter) => {
      return (
        <button
          key={letter}
          value={letter}
          onClick={() => check(letter)}
          disabled={guessed.has(letter)}
          className='text-l font-bold  bg-teal-500 hover:bg-teal-400 mr-1 w-6 h-6 botder-1 border-bg-black-100 mb-1 disabled:bg-gray-300'
        >
          {letter}
        </button>
      );
    });

    return <div>{buttonElements}</div>;
  };

  const result = () => {
    const wordElements = word.split('').map((letter, index) => {
      if (letter === '-') {
        setSpace((prevSpace) => prevSpace + 1);
        return (
          <span key={`${letter}-${index}`} className='guess'>
            -
          </span>
        );
      } else {
        return (
          <span key={`${letter}-${index}`} className='guess font-bold mr-2'>
            _
          </span>
        );
      }
    });

    setGeusses(wordElements);
  };

  const comments = () => {
    if (gameEnded) {
            if (counter + space === word.length) {
              return <p className='text-xl font-normal mt-4 mb-4'>You Win!</p>;
            } else if (nWrong === 10 && lives === 0) {
              return (
                <div>
                  <p className='text-xl font-normal mt-4 mb-4'>You Lose</p>
                  <p className='text-2xl font-semibold'>Correct Word is: {word}</p>
                </div>
              );
            }
          } else {
            return <div className='text-xl font-normal mt-4'>You have {lives} lives left</div>;
          }
    let message = '';
    if (lives > 0) {
      message = `You have ${lives} lives left`;
    }
    return message;
  };

  const reset = () => {
   
    setWord(randomWord());
    setLives(10);
    setNWrong(0);
    setGeusses([]);
    setCounter(0);
    setGuessed(new Set());
    setWrongWords([]);
  };

  const play = () => {
    reset();
    result();
    comments();
  };
  const wordsmissed = wrongWords.map((word) => <li>{word},</li>);

  return (
    <div className='m-auto text-center border-2 my-5 bg-cyan-50 max-w-5xl'>
      <h1 className='text-teal-700'>GUESS THE WORD</h1>
      <div className='text-6xl font-normal mt-6 mb-6'>{geusses}</div>

      <div className='mt-6 mb-6 text-xl'>
        {' '}
        Count of Wrong Letters : {nWrong}
      </div>
      <div className='col-start-4 flex justify-center text-xl mt-6 mb-6'>
        {' '}
        Chosen Wrong Letters :{' '}
        {<ul className='flex justiy-center'>{wordsmissed}</ul>}
      </div>

      <div className='text-xl font-normal mt-4'>{comments()}</div>

      {/* {counter + space === geusses.length ? (
        <p className='text-xl font-normal mt-4 mb-4'> You Win!</p>
      ) : nWrong === 10 && lives === 0 ? (
        <div>
          <p className='text-xl font-normal mt-4 mb-4'>You Lose</p>
          <p className='text-2xl font-semibold'>Correct Word is: {word}</p>
        </div>
      ) : ( */}
        <div className='grid sm:grid-cols-7 mt-4 mb-4 '>
          <div className='col-start-4 mx-auto'>{buttons()}</div>
        </div>
      {/* )} */}
      <div className='p-20'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4 mr-10'
          onClick={() => play()}
        >
          Play{' '}
        </button>
        {/* <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4 mr-10'
          onClick={() => reset()}
        >
          Reset
        </button> */}
      </div>
    </div>
  );
};

export default GuessWord;

