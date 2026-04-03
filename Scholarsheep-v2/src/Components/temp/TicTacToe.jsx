import {useState} from 'react';

const TicTacToe=()=>{

    return(
        <div className='grid grid-cols-1 space-evenly md:grid-cols-2 '>
            <p>TicTacToe</p>
           
        </div>
    )
}
export default TicTacToe;




//   <!-- <div class="screen"> -->
//   <div id="symbol" class="display">
//     <p>Pick your symbol</p>
//     <button type="button" id="option-x" class="choose">X</button>
//     <button type="button" id="option-o" class="choose">O</button>
//   </div>
//   <!-- <div id="against" class="display hidden">
//     <p>Pick your opponent</p>
//     <button type="button" id="human" class="choose">Player</button>
//     <button type="button" id="cpu" class="choose">Computer</button>
//   </div>-->
//   <!-- </div> -->
//   <div class="grid-container display">
//     <div class="grid-1 cell" id="cell1" data-cell-index="1"></div>
//     <div class="grid-2 cell" id="cell2" data-cell-index="2"></div>
//     <div class="grid-3 cell" id="cell3" data-cell-index="3"></div>
//     <div class="grid-4 cell" id="cell4" data-cell-index="4"></div>
//     <div class="grid-5 cell" id="cell5" data-cell-index="5"></div>
//     <div class="grid-6 cell" id="cell6" data-cell-index="6"></div>
//     <div class="grid-7 cell" id="cell7" data-cell-index="7"></div>
//     <div class="grid-8 cell" id="cell8" data-cell-index="9"></div>
//     <div class="grid-9 cell" id="cell9" data-cell-index="9"></div>
//   </div>
//   <div id="reload">
//     <br>
//     <br>
//     <button id="reload_button" onClick="reset()">Restart Game</button>
//   </div>



// * {
//     padding: 0;
//     margin: 0;
//     box-sizing: border-box;
//   }
//   html {
//     font-size: 62.5%;
//   }
  
//   html,
//   body,
//   .grid-container {
//     height: 100%;
//     margin: 40px auto;
//   }
  
//   .grid-container {
//     display: grid;
//     grid-template-columns: repeat(3, 1fr);
//     grid-template-rows: repeat(3, 1fr);
//     gap: 1% 1%;
//     max-width: 600px;
//     max-height: 600px;
//     padding: 15px;
//   }
//   .grid-0 {
//     grid-area: 1 / 1 / 2 / 2;
//   }
  
//   .grid-1 {
//     grid-area: 1 / 1 / 2 / 2;
//   }
  
//   .grid-2 {
//     grid-area: 1 / 2 / 2 / 3;
//   }
  
//   .grid-3 {
//     grid-area: 1 / 3 / 2 / 4;
//   }
  
//   .grid-4 {
//     grid-area: 2 / 1 / 3 / 2;
//   }
  
//   .grid-5 {
//     grid-area: 2 / 2 / 3 / 3;
//   }
  
//   .grid-6 {
//     grid-area: 2 / 3 / 3 / 4;
//   }
  
//   .grid-7 {
//     grid-area: 3 / 1 / 4 / 2;
//   }
  
//   .grid-8 {
//     grid-area: 3 / 2 / 4 / 3;
//   }
  
//   .grid-9 {
//     grid-area: 3 / 3 / 4 / 4;
//   }
//   .grid-0,
//   .grid-1,
//   .grid-2,
//   .grid-3,
//   .grid-4,
//   .grid-5,
//   .grid-6,
//   .grid-7,
//   .grid-8,
//   .grid-9 {
//     border: 2px solid black;
//     max-width: 200px;
//     max-height: 200px;
//     background: lightgray;
//   }
  
//   @media screen and min-width(900px) {
//     .grid-container {
//       width: 100%;
//       height: 100%;
//     }
//     .grid-0,
//     .grid-1,
//     .grid-2,
//     .grid-3,
//     .grid-4,
//     .grid-5,
//     .grid-6,
//     .grid-7,
//     .grid-8,
//     .grid-9 {
//       width: 100%;
//       height: 100%;
//     }
//   }
//   /* For presentation only, no need to copy the code below */
//   /* .grid-container * {
//     border: 2px solid black;
//     position: relative;
//   }
  
//   .grid-container *:after {
//     content: attr(class);
//     position: absolute;
//     top: 0;
//     left: 0;
//   } */
  
//   .hidden {
//     display: none;
//   }
  
//   .display {
//     margin: 0 auto;
//   }
  
//   /* .screen{
//     display: flex
//     flex-direction:column;
//   } */
  
//   #symbol,
//   #against {
//     display: block;
//     flex-direction: row;
//     margin: 0 auto;
//     max-width: 300px;
//     max-height: 200px;
  
//     padding: 0px 20px 20px 20px;
//   }
  
//   #symbol > p,
//   #against > p {
//     font-size: 3rem;
//     flex-direction: row;
//     text-align: center;
//     padding-bottom: 15px;
//   }
  
//   #option-x,
//   #option-o {
//     margin-left: 45px;
//     display: inline-flex;
//     /* flex-direction:row; */
//     padding: 2rem;
//     font-size: 3rem;
//     border: 1px solid black;
//   }
//   #cpu,
//   #human {
//     margin-left: 25px;
//     display: inline-flex;
//     /* flex-direction:row; */
//     padding: 1rem;
//     font-size: 2rem;
//     border: 1px solid black;
//   }
//   .cell {
//     cursor: pointer;
//     color: #333;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     font-size: 70px;
//   }
//   .player-two {
//     color: #933;
//   }
//   .player-one {
//     color: #333;
//   }
  
//   .locked {
//     cursor: not-allowed;
//   }
  
//   #reload_button {
//     width: 40%;
//     margin-left: 30%;
//     margin-right: 30%;
//     height: 30%;
//     font-size: medium;
//   }
  

// let win = false;
// let cpu = true;
// let player = "";
// let enemy = "";
// let boxNum = 0;
// let tie = false;

// let currTurn;

// let editBoard = false;

// let unselected = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// let taken = [0, 0, 0, 0, 0, 0, 0, 0, 0];

// let winLines = [
//   [
//     [1, 2],
//     [4, 8],
//     [3, 6]
//   ],
//   [
//     [0, 2],
//     [4, 7]
//   ],
//   [
//     [0, 1],
//     [4, 6],
//     [5, 8]
//   ],
//   [
//     [4, 5],
//     [0, 6]
//   ],
//   [
//     [3, 5],
//     [0, 8],
//     [2, 6],
//     [1, 7]
//   ],
//   [
//     [3, 4],
//     [2, 8]
//   ],
//   [
//     [7, 8],
//     [2, 4],
//     [0, 3]
//   ],
//   [
//     [6, 8],
//     [1, 4]
//   ],
//   [
//     [6, 7],
//     [0, 4],
//     [2, 5]
//   ]
// ];

// document.addEventListener("DOMContentLoaded", function () {
//   const playerX = document.getElementById("option-x");
//   const playerO = document.getElementById("option-o");
//   //const human = document.getElementById("human");
//   // const computer = document.getElementById("cpu");

//   unselected = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//   taken = [0, 0, 0, 0, 0, 0, 0, 0, 0];
//   playerX.addEventListener("click", function () {
//     player = "X";
//     enemy = "O";
//     console.log(player, enemy);
//     let elem = document.getElementById("symbol");
//     elem.innerHTML = "You have chosen X";
//     elem.style.fontSize = "medium";
//     editBoard = true;
//     let move = Math.floor(Math.random() * 10);
//     console.log("Move to go first", move);
//     if (move % 2 != 0) {
//       currTurn = enemy;
//       elem.innerHTML = "You have chosen X. You will move second";
//       enemyMove();
//     } else {
//       currTurn = player;
//       elem.innerHTML =
//         "You have chosen X. You will move first. Make your move!";
//     }
//   });

//   playerO.addEventListener("click", function () {
//     player = "O";
//     enemy = "X";
//     console.log(player, enemy);
//     let elem = document.getElementById("symbol");
//     elem.innerHTML = "You have chosen O";
//     elem.style.fontSize = "medium";
//     editBoard = true;
//     let move = Math.floor(Math.random() * 10);
//     console.log("Move to go first", move);
//     if (move % 2 != 0) {
//       currTurn = enemy;
//       elem.innerHTML = "You have chosen O. You will move second";
//       enemyMove();
//     } else {
//       currTurn = player;
//       elem.innerHTML =
//         "You have chosen O. You will move first. Make your move!";
//     }
//   });

//   for (var i = 1; i < 10; i++) {
//     let id = "cell" + i.toString();
//     document.getElementById(id).addEventListener("click", clickCell);
//   }
// });

// function swapTurn() {
//   if (currTurn === player) {
//     currTurn = enemy;
//   } else {
//     currTurn = player;
//   }
// }

// function enemyMove() {
//   if (win) {
//     editBoard = false;
//     winHandler(player);
//   } else {
//     tie = checkTies();
//     if (tie) {
//       editBoard = false;
//       tieHandler();
//     } else if (currTurn === enemy) {
//       let indx = returnRandomCell();
//       if (indx != null) {
//         let id = "cell" + indx.toString();
//         let cellForEnem = document.getElementById(id);
//         markTaken(indx, enemy);
//         displaySymbol(cellForEnem, enemy, indx);
//       }
//     }
//   }
// }

// function clickCell(clickedCellEvent) {
//   if (editBoard && currTurn === player) {
//     // cellEventis the argument for the function
//     clickedCellEvent.preventDefault();
//     const clickedCell = clickedCellEvent.target;
//     const cellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));
//     if (unselected.indexOf(cellIndex) != -1) {
//       unselected.splice(unselected.indexOf(cellIndex), 1);
//       markTaken(cellIndex, player);

//       if (!win && clickedCell.innerHTML === "") {
//         displaySymbol(clickedCell, player, cellIndex);
//         enemyMove();
//       }
//     }
//   }
// }

// function winHandler(playerWon) {
//   if (playerWon === player) {
//     document.getElementById("symbol").innerHTML =
//       "You have beat the CPU! <br><br> Click restart game at the bottom of the page to play again";
//   } else {
//     document.getElementById("symbol").innerHTML =
//       "You have lost to the CPU. <br> <br> Try again. Click restart game at the bottom of the page to play again";
//   }
// }

// function tieHandler() {
//   document.getElementById("symbol").innerHTML =
//     "You have tied with the CPU. <br><br> Click restart game at the bottom of the page to play again";
// }

// function returnRandomCell() {
//   if (editBoard) {
//     let index = Math.floor(Math.random() * unselected.length);
//     let value = unselected[index];
//     unselected.splice(index, 1);
//     return value;
//   }
// }

// function markTaken(cellNum, player) {
//   if (editBoard) {
//     let sub = cellNum - 1;
//     if (player === enemy) {
//       taken[sub] = -1;
//     } else {
//       taken[sub] = 1;
//     }
//   }
// }

// function displaySymbol(element, symbol, num) {
//   if (editBoard) {
//     element.innerHTML = symbol;
//     element.style.fontSize = "medium";
//     if (symbol === player) {
//       element.classList.add(".player-one");
//     } else if (symbol === enemy) {
//       element.classList.add(".player-two");
//     }
//     element.classList.add(".locked");

//     win = checkWinner(num - 1);

//     console.log("move", num, "taken", taken, unselected, "unselected");

//     if (win === true) {
//       editBoard = false;
//       if (symbol === enemy) {
//         winHandler(enemy);
//       } else {
//         winHandler(player);
//       }
//     } else {
//       tie = checkTies();
//       if (tie === true) {
//         editBoard = false;
//         tieHandler();
//       }
//       swapTurn();
//     }
//   }
// }

// function checkTies() {
//   for (var i = 0; i < taken.length; i++) {
//     if (taken[i] === 0) {
//       return false;
//     }
//   }
//   return true;
// }

// function checkWinner(lastMove) {
//   if (editBoard) {
//     let currMove = taken[lastMove];
//     for (var i = 0; i < winLines[lastMove].length; i++) {
//       let winLine = winLines[lastMove][i];
//       var mark1 = taken[winLine[0]];
//       var mark2 = taken[winLine[1]];
//       if (currMove === mark1 && currMove === mark2) {
//         return true;
//       }
//     }
//     return false;
//   }
// }
