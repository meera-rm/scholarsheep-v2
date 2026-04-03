
const AlphabetButtons = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const rows = [];
    let currentRow = [];
    
    for (let i = 0; i < alphabet.length; i++) {
      currentRow.push(alphabet[i]);
      if ((i + 1) % 7 === 0) {
        rows.push(currentRow);
        currentRow = [];
      }
    }
    
    // Add any remaining letters to the last row
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }
    
    return (
      <div className="grid grid-cols-7 gap-4 text-center">
        {rows.map((row, index) => (
          <div key={index} className="col-span-7">
            {row.map((letter, index) => (
              <button key={index} className="px-4 py-2 m-1 rounded-full bg-blue-500 text-white">
                {letter}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  export default AlphabetButtons;
//   import React, { useState } from "react";
// import { randomWord } from "./words";

// import "./Hangman.css";

// import img0 from "./images/0.jpg";
// import img1 from "./images/1.jpg";
// import img2 from "./images/2.jpg";
// import img3 from "./images/3.jpg";
// import img4 from "./images/4.jpg";
// import img5 from "./images/5.jpg";
// import img6 from "./images/6.jpg";

// const Hangman = (props) => {
//   // initialize state variables with the useState hook
//   const [nWrong, setNWrong] = useState(0);
//   const [guessed, setGuessed] = useState(new Set());
//   const [answer, setAnswer] = useState(randomWord());

//   // reset the game and put things in default
//   const resetGame = () => {
//     setNWrong(0);
//     setGuessed(new Set());
//     setAnswer(randomWord());
//   };

//   /** guessedWord: show current-state of word:
//     if guessed letters are {a,p,e}, show "app_e" for "apple"
//   */
//   const guessedWord = () => {
//     return answer
//       .split("")
//       .map((ltr) => (guessed.has(ltr) ? ltr : "_"));
//   };

//   /** handleGuest: handle a guessed letter:
//     - add to guessed letters
//     - if not in answer, increase number-wrong guesses
//   */
//   const handleGuess = (evt) => {
//     let ltr = evt.target.value;

//     setGuessed((st) => st.add(ltr));
//     setNWrong((st) => st + (answer.includes(ltr) ? 0 : 1));
//   };

//   /** generateButtons: return array of letter buttons to render */
//   const generateButtons = () => {
//     return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, index) => (
//       <button
//         key={index}
//         value={ltr}
//         onClick={handleGuess}
//         disabled={guessed.has(ltr)}
//         className="w-20 h-20 text-xl font-bold rounded-full bg-gray-300 hover:bg-gray-400"
//       >
//         {ltr}
//       </button>
//     ));
//   };

//   const { images, maxWrong } = props;

//   let alternateText = `${nWrong} wrong guesses`;

//   return (
//     <div className="Hangman grid grid-cols-4 gap-4 p-4">
//       <div className="col-span-4 md:col-span-3 lg:col-span-2 xl:col-span-1">
//         <h1 className="text-4xl font-bold text-center">Hangman</h1>
      
//           <p className="text-xl font-bold text-center">Number Wrong: {nWrong}</p>
//         </div>
//         {answer === guessedWord().join("") ? (
//           <div className="col-span-4 md:col-span-3 lg:col-span-2 xl:col-span-1">
//             <p className="text-4xl font-bold text-center">You WIN!</p>
//           </div>
//         ) : nWrong === maxWrong ? (
//           <div className="col-span-4 md:col-span-3 lg:col-span-2 xl:col-span-1">
//             <p className="text-4xl font-bold text-center">YOU LOSE</p>
//             <p className="text-xl font-bold text-center">
//               Correct Word is: {answer}
//             </p>
//           </div>
//         ) : (
//           <>
//             <div className="col-span-4 md:col-span-3 lg:col-span-2 xl:col-span-1">
//               <p className="text-4xl font-bold text-center">{guessedWord()}</p>
//             </div>
//             <div className="col-span-4 md:col-span-3 lg:col-span-2 xl:col-span-1 grid grid-cols-7 gap-4">
//               {buttons()}
//             </div>
//           </>
//         )}
//         <div className="col-span-4 md:col-span-3 lg:col-span-2 xl:col-span-1">
//           <button
//             id="reset"
//             onClick={resetGame}
//             className="w-full h-20 text-xl font-bold rounded-full bg-gray-300 hover:bg-gray-400"
//           >
//             Reset Game
//           </button>
//         </div>
//       </div>
//     );
//   };
  
//   export default Hangman;
  


//my js code converted

//the latest hangman
// import React, { useState, useEffect } from "react";
// import AlphabetButtons from "./AlphabetButtons";
// const Hangman = () => {
//   const [alphabet, setAlphabet] = useState(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
//     'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
//     't', 'u', 'v', 'w', 'x', 'y', 'z']);
//    const firstRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i',
//     'o', 'p' ]
//     const secondRow =[ 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
//     const thirdRow=['z', 'x', 'c', 'v', 'b', 'n', 'm'];
//   const [word, setWord] = useState("");
//   const [geusses, setGeusses] = useState([]);
//   const [lives, setLives] = useState(10);
//   const [counter, setCounter] = useState(0);
//   const [space, setSpace] = useState(0);
 
//   const [guessed,setGuessed]=useState( new Set()) ;

//   const check = (geuss) => {
//     for (let i = 0; i < word.length; i++) {
//       if (word[i] === geuss) {
//         setGeusses((prevGeusses) => {
//           return [
//             ...prevGeusses.slice(0, i),
//             geuss,
//             ...prevGeusses.slice(i + 1),
//           ];
//         });
//         setCounter((prevCounter) => prevCounter + 1);
//       }
//     }

//     const j = word.indexOf(geuss);
//     if (j === -1) {
//       setLives((prevLives) => prevLives - 1);
//       comments();
//     } else {
//       comments();
//     }
//   };

//   const buttons = () => {
//     const buttonElements = alphabet.map((letter) => {
//       return (
//         <button key={letter} value={letter} onClick={() => check(letter)} 
//         disabled={guessed.has(letter)}
//         className=" text-xl font-bold rounded-full bg-gray-300 hover:bg-gray-400">
//           {letter}
//         </button>
//       );
//     });

//     return <div >{buttonElements}</div>;
//   };

//   const result= () => {
//     const wordElements = word.split("").map((letter, index) => {
//       if (letter === "-") {
//         setSpace((prevSpace) => prevSpace + 1);
//         return <span key={index} className="guess">-</span>;
//       } else {
//         return (
//           <span key={index} className="guess font-bold mr-2">
//             _
//           </span>
//         );
//       }
//     });

//     setGeusses(wordElements);
//   };

//   const comments = () => {
//     if (lives < 1) {
//       return "Game Over";
//     } else if (counter + space === geusses.length) {
//       return "You Win!";
//     } else {
//       return `You have ${lives} lives`;
//     }

//   };

//   useEffect(() => {
//     setWord("ambiguous");
//     result();
//     comments();
// }, []);

// const play = () => {
//   setWord("ambiguous");
//   result();
//   comments();
// };

// return (
//   <div className="text-center ">
//     <div className="text-6xl font-bold mt-6 mb-6">{geusses}</div>
//    <div>{counter}</div>
//    <div className=" contianeer m-0 grid grid-cols-7 gap-4 text-center">{buttons()}</div>
   
//     <div className="text-4xl font-bold mt-4">{comments()}</div>
//     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4" onClick={() => play()}>
//       Play

//     </button>
//   </div>
// );
// };

