import React, { useState } from 'react';
import Board from './Board';
import { calculateWinner } from '../helpers';

const styles = {
    width: '200px',
    margin: '20px auto'
}
const Game= () => {
    const[board, setBoard] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const[xIsNext, setXisNext] = useState(true);
    const winner = calculateWinner(board[stepNumber]);

    const handleClick = i => {
       const timeInHistory = board.slice(0, stepNumber + 1);
       const current = timeInHistory[stepNumber];
       const squares = [...current];

       if(winner || squares[i]) return;
       squares[i] = xIsNext ? 'X' : 'O';
       setBoard([...timeInHistory, squares]);
       setStepNumber(timeInHistory.length);
       setXisNext(!xIsNext);
    }
    const jumpTo = step => {
        setStepNumber(step);
        setXisNext(step % 2 === 0)
    }
    const renderMoves = () => (
       board.map((_step, move) => {
           const destination = move ? `Go to move#${move}`: 'Go to start';
           return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}> {destination}</button>
            </li>
           )
       })
    )
    return (
        <>
        <Board squares={board[stepNumber]} onClick={handleClick} />
        <div styles={styles}>
           <p>{winner ? 'Winner: ' + winner: 'Next Player:' + (xIsNext ? 'X': 'O')}</p>
           {renderMoves()}
        </div>
        </>
    )
}

export default Game;