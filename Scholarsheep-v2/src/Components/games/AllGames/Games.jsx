import React from 'react';
import { Link } from 'react-router-dom';
import './Games.scss';

const Games = () => {
  return (
    <div className='mt-10 text-2xl'>
      <div className='grid grid-cols-1 space-between lg:grid-cols-2 gap-4'>
        <Link to='/games/rps' className='rpscolor' >
          <div className='rpscontent' >Rock Paper Scissors</div>
          </Link>
          <Link to='/games/guessword' className='rpscolor'> 
            <div className='guessword'>Guess The Word</div>
          </Link>
           <Link to='/games/paint'  className='rpscolor'>
            <div className='paintapp'>Paint App</div>
          </Link> 
          <Link to='/games/memorygame'  className='rspcolor'>
            <div className='memorygame'>Memorygame</div>
          </Link>
           {/* <Link to='/games/tictactoe' className='rpscolor'>
            <div className='tictactoe'>TicTacToe</div>
          </Link>
          <Link to='/games/etchsketch'  className='rpscolor'>
            <div className='etchsketch'>Etch-A-sketch</div> */}
          {/* </Link> */}
        
      </div>
    </div>
  );
};
export default Games;
