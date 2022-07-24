import './App.css';
import React,{ useEffect, useState} from 'react';
import SquareComponent from './components/SquareComponent';

const initialState = ["","","","","","","","",""]

function App() {
  
  const [gameState, updateGameState] = useState(initialState);
  const [player,updatePlayer] = useState(true);

  const clearGame = () =>{
    updateGameState(initialState)
  }

  const onSquareClicked = (index) => {
    let strings = Array.from(gameState);
    strings[index] = player? "X":"O";
    updatePlayer(!player)
    updateGameState(strings)
  }

  const checkWinner = () => {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for(let i=0;i<lines.length;i++){
      const [a,b,c]=lines[i];
      if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        return gameState[a];
      }
    }
    if(gameState.indexOf("")===-1)
        return "DRAW"
    return null;
  }

  useEffect(()=>{
    let winner = checkWinner();
    if(winner){
      if(winner==="DRAW"){
          setTimeout(function(){  
          alert(`Match Drawn! Play again to break the stalemate`);
          clearGame()}, 400);
      }
      else{
          setTimeout(function(){  
          alert(`Wohoo! ${winner} has won the game!`);
          clearGame()}, 400);
      }
    }
  },[gameState])

  return (
    <div className="App">
      <p className="App-title">
        TicTacToe
      </p>
      <div className="row jc-center">
        <SquareComponent className='b-bottom-right' state={gameState[0]} onClick={()=>onSquareClicked(0)}/>
        <SquareComponent className='b-bottom-right' state={gameState[1]} onClick={()=>onSquareClicked(1)}/>
        <SquareComponent className='b-bottom' state={gameState[2]} onClick={()=>onSquareClicked(2)}/>
      </div>
      <div className="row jc-center">
        <SquareComponent className='b-bottom-right' state={gameState[3]} onClick={()=>onSquareClicked(3)}/>
        <SquareComponent className='b-bottom-right' state={gameState[4]} onClick={()=>onSquareClicked(4)}/>
        <SquareComponent className='b-bottom' state={gameState[5]} onClick={()=>onSquareClicked(5)}/>
      </div>
      <div className="row jc-center">
        <SquareComponent className='b-right' state={gameState[6]} onClick={()=>onSquareClicked(6)}/>
        <SquareComponent className='b-right' state={gameState[7]} onClick={()=>onSquareClicked(7)}/>
        <SquareComponent state={gameState[8]} onClick={()=>onSquareClicked(8)}/>
      </div>
      <button className="reset-button" onClick={()=> clearGame()}>Reset Game</button>
    </div>
  );
}

export default App;
