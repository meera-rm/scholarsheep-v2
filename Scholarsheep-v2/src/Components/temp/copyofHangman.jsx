// import axios from "axios";
// import { useEffect,useState } from "react";

// const HangMan=()=>{
//     const firstRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i',
//     'o', 'p' ]
//     const secondRow =[ 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
//     const thirdRow=['z', 'x', 'c', 'v', 'b', 'n', 'm'];

//    const [randomWord, setRandomWord]=useState(['different', 'ambiguous']);
//    const [myLivesLeft, setMyLivesLeft]=useState(10);
//    const [selectedLetter, setSelectedLetter] = useState('');
//    const [guesses,setGuesses]=useState([])

//      useEffect(()=>{
       
// // const options = {
// //     method: 'GET',
// //     url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
// //     params: {count: '2'},
// //     headers: {
// //       'X-RapidAPI-Key': '3d96f61a44mshef59cc06ccf7b17p1fd74ejsn2494fde4f842',
// //       'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
// //     }
// //   };
          
//     //       axios.request(options).then(function (response) {
//     //           console.log(response.data);
//     //           setRandomWord(response.data)
            
//     //       }).catch(function (error) {
//     //           console.error(error);
//     //       });
      
//       },[])
    
//       const reviewsHandler = (e) => {
//         console.log(e.target.id,e.target.value)
//        setSelectedLetter(e.target.id);
//        setGuesses([...guesses,selectedLetter]); 
//    };
  
//     const firstRowKeyboardButton = firstRow.map((letter,index) =>
//                 <button className='mr-0  bg-teal-500 border border-black-400 px-4 py-2'
//                 key={letter}
//                 id={letter}
//                 value={letter}
//                 onClick={(e)=>reviewsHandler(e)}>{letter}</button>
//                 // onClick={() => setSelectedValue(letter)}>{letter}</button>
//     )

//     const secondRowKeyboardButton = secondRow.map((letter,index) =>
//          <button className=' mr-0 bg-teal-500 border border-black-400 px-4 py-2 '  key={letter}
//          id={letter}
//          value={letter}
//          onClick={(e)=>reviewsHandler(e)}>{letter}</button>
//         //  onClick={() => setSelectedLetter(letter)}>{letter}</button>
//         )
//    const thirdRowKeyboardButton = thirdRow.map((letter,index) =>
//    <button className=' mr-0 bg-teal-500 border border-black-400 px-4 py-2 ' 
//    key={letter}
//    id={letter}
//    value={letter}
//    onClick={(e)=>reviewsHandler(e)}>{letter}</button>
// //    onClick={() => setSelectedLetter(letter)}>{letter}</button>
// //    setGuesses([...guesses, selectedValue]);
// )

// const playGame=()=>{

// alert('playgame')

// }

//  const lengthOfRandomWord=randomWord[Math.floor(Math.random() * 2)].length

//     return(
//     <section >
//       <div className="text-center mb-4">
//          <h1>Hangman</h1>
//          <p>Use the alphabet below to guess the word, or click hint to get a clue. </p>
//      </div>
//     <div className="text-center ">
//         <p className='font-bold text-decoration-4 space-between  mt-12 mb-12'>{'-'.repeat(lengthOfRandomWord)}</p>
//         <p>Guess:{guesses}</p>
//       <div  className="text-center ">
//         <div  className="mr-0 rounded-full  px-4 py-2">
//            {firstRowKeyboardButton}
//         </div>
//         <div className="mr-0 rounded-full px-4 py-2 ml-5">
//         {secondRowKeyboardButton}
//         </div>
//         <div className="mr-0 rounded-full px-4 py-2 ml-10">
//            {thirdRowKeyboardButton}  
//         </div>  
//      </div>
    
//     <div id="hold"></div>
//     <p></p>
//     <p>Last Selected value: {selectedLetter}</p>

//     <p className='text-center'>Lives Left:{myLivesLeft}</p>
//     <p id="clue">Clue -</p>  
//     <div className="text-center">
//       <button >Hint</button>
//       <button onClick={playGame}>Play again</button>
//     </div>
//     </div>

//     </section>
//     )
// }

// export default HangMan;
//above tried to convert it to




// import React, { useState } from 'react';

// const Hangman = () => {
//   const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
//   const categories = []; // Array of topics
//   const [chosenCategory, setChosenCategory] = useState(''); // Selected category
//   const [word, setWord] = useState(''); // Selected word
//   const [guesses, setGuesses] = useState([]); // Stored guesses
//   const [lives, setLives] = useState(0); // Lives
//   const [counter, setCounter] = useState(0); // Count correct guesses
//   const [space, setSpace] = useState(0); // Number of spaces in word '-'
//   const [hint, setHint] = useState(''); // Word hint

//   const handleResetClick = () => {
//   }
//   // Handle button click
//   const handleClick = (guess) => {
//     setGuesses((prevGuesses) => [...prevGuesses, guess]);
//     for (let i = 0; i < word.length; i++) {
//       if (word[i] === guess) {
//         setCounter((prevCounter) => prevCounter + 1);
//       }
//     }
//     const j = word.indexOf(guess);
//     if (j === -1) {
//       setLives((prevLives) => prevLives - 1);
     
//     }
//   };

//   // Create alphabet buttons
//   const alphabetButtons = () => {
//     return alphabet.map((letter) => (
//       <button
//         key={letter}
//         className="btn btn-blue-500"
//         onClick={() => handleClick(letter)}
//       >
//         {letter}
//       </button>
//     ));
//   };

//   // Render the word with spaces for unguessed letters
//   const renderWord = () => {
//     return word.split('').map((letter, index) => (
//       <span key={index}>{guesses.includes(letter) ? letter : '-'}</span>
//     ));
//   };

//   return (
//     <div className="wrapper">
//       <h1 className="text-2xl font-bold">Hangman</h1>
//       <h2 className="text-xl font-bold">Vanilla JavaScript Hangman Game</h2>
//       <p className="text-base font-normal">
//         Use the alphabet below to guess the word, or click hint to get a clue.
//       </p>
//       <div className="flex flex-wrap">{alphabetButtons()}</div>
//       <p className="text-lg font-bold">{renderWord()}</p>
//       <p className="text-base font-normal">Lives: {lives}</p>
//       {/* {/* <button className="btn btn-blue-500" onClick={() => handleHintClick()      */}
//         <button className="btn btn-blue-500" onClick={() => handleResetClick()}> 
//         Play again
//       </button>
//     </div>
//   );
// };

// export default Hangman;

//my js code converted
import React, { useState, useEffect } from "react";

const Hangman = () => {
  const [alphabet, setAlphabet] = useState(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z']);
  const [word, setWord] = useState("");
  const [geusses, setGeusses] = useState([]);
  const [lives, setLives] = useState(10);
  const [counter, setCounter] = useState(0);
  const [space, setSpace] = useState(0);
  const [numberOfWrong,setNumberOFWrong]=useState(0);
  const [guessed,setGuessed]=useState( new Set()) ;

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

    const j = word.indexOf(geuss);
    if (j === -1) {
      setLives((prevLives) => prevLives - 1);
      comments();
    } else {
      comments();
    }
  };

  const buttons = () => {
    const buttonElements = alphabet.map((letter) => {
      return (
        <button key={letter} value={letter} onClick={() => check(letter)} 
        disabled={guessed.has(letter)}
        className="bg-teal-500 hover:bg-teal-400 text-gray-800 font-bold py-2 px-4 inline-block text-center border-2 border-bg-black">
          {letter}
        </button>
      );
    });

    return <div className="flex justify-around">{buttonElements}</div>;
  };

  const result = () => {
    const wordElements = word.split("").map((letter, index) => {
      if (letter === "-") {
        setSpace((prevSpace) => prevSpace + 1);
        return <span key={index} className="guess">-</span>;
      } else {
        return (
          <span key={index} className="guess font-bold mr-2">
            _
          </span>
        );
      }
    });

    setGeusses(wordElements);
  };

  const comments = () => {
    if (lives < 1) {
      return "Game Over";
    } else if (counter + space === geusses.length) {
      return "You Win!";
    } else {
      return `You have ${lives} lives`;
    }

  };

  useEffect(() => {
    setWord("ambiguous");
    result();
    comments();
}, []);

const play = () => {
  setWord("ambiguous");
  result();
  comments();
};

return (
  <div className="flex flex-col items-center justify-center h-screen">
    <div className="text-6xl font-bold mt-6 mb-6">{geusses}</div>
    <div>{buttons()}</div>
    <div className="text-4xl font-bold mt-4">{comments()}</div>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4" onClick={() => play()}>
      Play
    </button>
  </div>
);
};

export default Hangman;






// const Button = ({children}) => {
//   return (
//     <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full">
//       {children}
//     </button>
//   );
// };





// const ButtonGrid = () => {
//   return (
//     <div className="grid grid-cols-10 grid-rows-1">
//         fir
//       <Button className="col-start-1 row-start-1">Button 1</Button>
//       {/* <Button className="col-start-2 row-start-1">Button 2</Button>
//       <Button className="col-start-3 row-start-1">Button 3</Button>
//       <Button className="col-start-4 row-start-1">Button 4</Button>
//       <Button className="col-start-5 row-start-1">Button 5</Button>
//       <Button className="col-start-6 row-start-1">Button 6</Button>
//       <Button className="col-start-7 row-start-1">Button 7</Button>
//       <Button className="col-start-8 row-start-1">Button 8</Button>
//       <Button className="col-start-9 row-start-1">Button 9</Button>
//       <Button className="col-start-10 row-start-1">Button 10</Button> */}
//     </div>
//   );
// };


// export default ButtonGrid;


// https://jamescole.info/design/drum-machine/
// https://github.com/jamescoledesign/drum-machine-v2/blob/main/src/components/Pad.js/




// websites fo rui design

// https://stackblitz.com/edit/react-rock-paper-scissors?file=src%2FApp.
//https://github.com/Pavan-Kiran-Chidirala/reactrpsappjs/blob/main/src/components/RpsPage/index.js
//https://aviyel.com/post/1203/building-a-rock-paper-scissor-lizard-and-spoke-game-in-react
//https://rock-paper-scissor-spock-game.netlify.app/