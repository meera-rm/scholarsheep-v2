import React, {useState, useEffect} from 'react';
import './MemoryGame.css';
import cover from './images/cover.png';
import franceflag from './images/franceflag.png';
import germanyflag from './images/germanyflag.png';
import maliflag from './images/maliflag.png';
import papanewguineaflag from './images/papanewguineaflag.png';
import laosflag from './images/laosflag.png';
import indiaflag from './images/indiaflag.png';
import brazilflag from './images/brazilflag.png';
import swedenflag from './images/swedenflag.png';

const MemoryGame=()=>{

    const board = [
      { country: "France", image: franceflag },
      { country: "Germany", image: germanyflag },
      { country: "Mali", image: maliflag },
      { country: "PapaNewGuinea", image: papanewguineaflag },
      { country: "Laos", image: laosflag },
      { country: "India", image: indiaflag },
      { country: "Brazil", image: brazilflag },
      { country: "Sweden", image: swedenflag },
    ];

  const [boardData, setBoardData] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const shuffleCards = (board)=> {
    for (let i = board.length; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);
      const currentIndex = i - 1;
        [board[currentIndex],board[randomIndex] ] = [ board[randomIndex],board[currentIndex]];
    }
    return board
  }

 const shuffle = () => {
      const concatedCards = board?.concat(...board)
      const shuffledCards= shuffleCards(concatedCards)
      const randomlyShuffledCards = shuffledCards.map((card) => ({ ...card, id: Math.random() }))
      setBoardData(randomlyShuffledCards);
}

const createCards = () =>{
    shuffle();
    setGameOver(false);
    setFlippedCards([]);
    setMatchedCards([]);
    setTurns(0);
};

const updateActiveCards = (i) => {
    if (!flippedCards.includes(i)) {
       if (flippedCards.length === 1) {
        const firstIdx = flippedCards[0];
        const secondIdx = i;
        if (boardData[firstIdx].country === boardData[secondIdx].country) {
          setMatchedCards((prev) => [...prev, firstIdx, secondIdx]);
        }
         setFlippedCards([...flippedCards, i]);
       }
      else if (flippedCards.length === 2) {
        setFlippedCards([i]);
      } else {
        setFlippedCards([...flippedCards, i]);
      }
      setTurns((prev) => prev + 1);
    }
  };

useEffect(() => {
    if (matchedCards.length === 16) {
      setGameOver(true);
    }
  }, [turns]);

useEffect(() => {
   createCards();
  }, []);

  return (
    <div className="memoryGame_container">
      <div className="memoryGame_wrapper">
          <div className="turns">
            <h5>{`Moves - ${turns}`}</h5>
          </div>

           <div className="board ">
             {boardData?.map((data, i) => {
              const flipped = flippedCards.includes(i) ? true : false;
               const matched = matchedCards.includes(i) ? true : false;

                return (
                  <div
                  onClick={() => {
                    updateActiveCards(i);
                  }}
                   key={data.id || i}
                  className={`memoryGameCard ${flipped || matched ? "active" : ""} ${
                    matched ? "matched" : ""
                  }`}>
                 <div className='memoryGameCard-front'>
                      <div className="memoryGameRibbon memoryGameLeft"
                      data-ribbon={data.country} style={{"--d":"0px","--c":"#14b8a6","--f":"25px"}}>
                     </div>
                      <img src={data.image} alt='country map'/>
                 </div>
                  <img className='memoryGameCard-back' src={cover} alt='scholarsheep logo'/>

                </div>
               );
             })}
          </div>
          <div className="reset">
            <button onClick={() => createCards()} className="reset-btn">
              Reset
            </button>
          </div>

          {gameOver && (
            <div className="text-center mt-4">
              <h3 className="text-xl font-bold text-teal-600">You matched all cards in {turns} moves!</h3>
            </div>
          )}
      </div>
    </div>
  )
}
export default MemoryGame;
