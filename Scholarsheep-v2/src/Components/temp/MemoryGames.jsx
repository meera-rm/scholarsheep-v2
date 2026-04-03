import React, {useState, useEffect} from 'react';
// import './MemoryGame.css';
// import { shuffleCards } from "./ShuffleCards";
// import Card from './Card';
import cover from './images/cover.png';

const MemoryGames=()=>{

    // const board = ["🤖", "👽", "👻", "🤡", "🐧", "🦚", "😄", "🚀"];

    const board = [
      {
        country: "France",
        image: require(`./images/franceflag.png`),
        // image:'🤖',
      },
      {
        country: "Germany",
        //  image: '👽',
        image: require(`./images/germanyflag.png`),
        
      },
      {
        country: "Mali",
        //  image: "👻",
        image: require(`./images/maliflag.png`),
      
      },
      {
        
        country: "PapaNewGuinea",
        //  image: "🤡",
        image: require(`./images/papanewguineaflag.png`),
        
      },
      {
        country: "Laos",
        //  image: "🐧",
        image: require(`./images/laosflag.png`),
        
      },
      {
        country: "india",
        //  image:  "🦚",
          image: require(`./images/indiaflag.png`),
        
      },
      {
        country: "brazil",
        // image:  "😄",
        image: require(`./images/brazilflag.png`),
        
      },
      {
        country: "sweden",
        // image:  "🚀",
        image:require(`./images/swedenflag.png`),
        
      }
    ]
   
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



    //shuffle the cards and set them to the boardData
    const shuffle = () => {
        const concatedCards = board?.concat(...board)
        const shuffledCards= shuffleCards(concatedCards)
        const randomlyShuffledCards = shuffledCards.map((card) => ({ ...card, id: Math.random() }))
        setBoardData(randomlyShuffledCards);
     }

   
  
    const createCards = () =>{
      //shuffle the array of cards
      shuffle();
      setGameOver(false);
      //set flippedCards & matchedCards to empty list
      setFlippedCards([]);
      setMatchedCards([]);
      //set moves to zero.
      setTurns(0);
    };


    const updateActiveCards = (i) => {
       //check if the card is already flipped
      if (!flippedCards.includes(i)) {
        //check if flippedCards contains only 1 data
        if (flippedCards.length === 1) {
          //check the first value of the flippedCards array
          const firstIdx = flippedCards[0];
          //check the current value of the flippedCards array
          const secondIdx = i;
         //if the first value is equal to the current value
          if (boardData[firstIdx].country === boardData[secondIdx].country) {
            //set matchedCards to the index of the first and current value
            setMatchedCards((prev) => [...prev, firstIdx, secondIdx]);
          }
          //if the first value is not equal to the current value add it to the flippedCards array
          setFlippedCards([...flippedCards, i]);
        } //if flippedCards contains is equal to 2  data
        else if (flippedCards.length === 2) {
          //assign current index to flippedCards.
          setFlippedCards([i]);
        } else {//If flippedCards is empt
          //append current index to the list.
          setFlippedCards([...flippedCards, i]);
        }
         //increment moves by 1 when a card is clicked
        setTurns((prev) => prev + 1);
      }
    };

    useEffect(() => {
      if (matchedCards.length === 16) {
        setGameOver(true);
      }
    }, [turns]);
  
    useEffect(() => {
        //mount the component and call createCards function
      createCards();
    }, []);
  
  

    return(
        <div className="container">
          <div className="wrapper">
          <div className="turns">
            <p>{`Moves - ${turns}`}</p>
          </div>
       
          <div className="board">
        
            {boardData?.map((data, i) => {
          // add CSS class to the card by checking flippedCards contains index , similarly check for matchedCards also contains index and add this class to card div.
              const flipped = flippedCards.includes(i) ? true : false;
              const matched = matchedCards.includes(i) ? true : false;
              
                return (
                  <div
                  onClick={() => {
                    updateActiveCards(i);
                  }}
                  key={i}
                  
                  className={`card  ${flipped || matched ? "active" : ""} ${ 
                  
                    matched ? "matched" : ""
                  }
                  //  ${gameOver ? "gameover" : ""}
                  `}
                >
                <div className="memoryCardGrid__item" data-ribbon={data.country}>
                  <img className="card-front" src={data.image} alt='country map'/>
                  </div>
                  {/* <div className="card-back"></div> */}
                  <img className="card-back" src={cover} alt='scholarsheep logo'/>
                </div>
              );
            })}
          </div> 
          <div className="reset">
            {/* <p>{`GameOver - ${gameOver}`}</p> */}
            <button onClick={() => createCards()} className="reset-btn">
              Reset
            </button>
          </div>
      </div>
      </div>
    ) 
}
export default MemoryGames;

