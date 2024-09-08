import { useState, useEffect, useRef } from "react";
import ResultModal from "./ResultModal";

function Gameboard() {

    const [gameBoard, setGameBoard] = useState([[0,0,0,0], [0,0,0,0], [0,0,0,0],[0,0,0,0]])
    const [score, setScore] = useState(0);
    const [fullBoard, setFullBoard] = useState(0);
    const [win, setWin] = useState(false);
    const dialog = useRef();
  
    useEffect(() => {
      },[gameBoard]);

      //new board
    function addNewValue(board) {
        var newBoard = [...board];
        var row = Math.floor(Math.random()*(4));
        var col = Math.floor(Math.random()*(4));
        var newValue = 2;
        if(newBoard[row][col]===0){
            newBoard[row][col] = newValue;
            //setGameBoard(board);
            console.log('new value added');
            console.log(newBoard);
            return newBoard;
        }else{
            addNewValue(newBoard);
        }
        
    }
    function equalsCheck(oldBoard, newBoard){
        for(var i=0; i<oldBoard.length-1; i++){
            for(var j=0; j<oldBoard.length-1; j++){
                if(oldBoard[i][j]!==newBoard[i][j]){
                    return false;
                }
            }
        }
        return true;
    }

    function transpose(board){
       return board[0].map((col, i) => board.map(row => row[i]));
    } 
    //TODO!
    function possibleMoves(){
       var board = [...gameBoard];
       var newBoard = board.map((row) => row.filter(0));
       if(newBoard.length!==0){
            return true;
       }
    }
    //TODO modal för vinst
    function move(row) {
        var counter = 0
        row = row.filter(x => x !== 0)
        var length = row.length-1;
        while(counter < length){
            if(row[counter]===row[counter+1]){
                row[counter]+=row[counter];
                
                setScore(score+row[counter]);
                row.splice(counter+1,1);
                length--;   
                if(row[counter]===2048){
                    setWin(true);
                    dialog.current.open();
                } 
            }
            counter++;
        }
        row = Array.from({...row,length:4}, (v,i) => v ?? 0 )
        return row;
    }

    function moveLeft(){
        var board = [...gameBoard];
        var newBoard = board.map((row) => move(row));
        
        if(!equalsCheck(board,newBoard)){
           newBoard = addNewValue(newBoard);
        }
        console.log(newBoard);
        setGameBoard(newBoard);
       /*  if(win){
            dialog.current.open();
        } */
    }

    function moveRight() {
        var board = [...gameBoard];
        var newBoard = board.map((row) => move(row.reverse()).reverse());
        
        if(!equalsCheck(board,newBoard)){
            newBoard = addNewValue(newBoard);
        }
        console.log(newBoard);
        setGameBoard(newBoard);
    }

    function moveUp(){
        var board=[...gameBoard];
        var transposedBoard = transpose(board);
        var movedNumbers = transposedBoard.map((row) => move(row));
        var transposedNumbers = transpose(movedNumbers);
        
        if(!equalsCheck(board,transposedNumbers)){
            transposedNumbers = addNewValue(transposedNumbers);
        }
        console.log(transposedNumbers);
        setGameBoard(transposedNumbers);
        
    }

    function moveDown(){
        var board=[...gameBoard];
        var transposedBoard = transpose(board);
        var movedNumbers = transposedBoard.map((row) => move(row.reverse()).reverse());
        var transposedNumbers = transpose(movedNumbers);
        
        if(!equalsCheck(board,transposedNumbers)){
            transposedNumbers=addNewValue(transposedNumbers);
        }
        console.log(transposedNumbers);
        setGameBoard(transposedNumbers);
    }

    function newGame(){
        setGameBoard([[0,0,0,0], [0,0,0,0], [0,4,2,0],[0,0,0,0]]);
    }

    function tileColor(value){
        if(value===0){
            return "tile"
        }
        return "tile n"+value;
    }

    return (
        <>
        <ResultModal ref={dialog} onReset={newGame}/>
        <div className="game-area">
            <div className="score"><p>Score: {score}</p></div>
    <div className="gameboard">
        {gameBoard.map((row) => (
            row.map((value) => (
                <div className={`
                    ${ tileColor(value) }
                `} >{value}</div>
            ))
        ))}
        </div>
        <div className="button-bar">
        <button onClick={moveLeft}>Move Left</button>
        <button onClick={moveRight}>Move Right</button>
        <button onClick={moveUp}>Move Up</button>
        <button onClick={moveDown}>Move Down</button>
        <button onClick={newGame}>New Game</button>
        </div>
    
    </div>
    </>
  );
}

export default Gameboard;
