import React, {useState} from 'react';
import {GameBoard} from "./GameBoard";
import GameBoardSidebar from "./GameBoardSidebar";
import {ChessLogic} from "../../game/ChessLogic"

function GameScreen() {

    const [chessLogic, setChessLogic] = useState(new ChessLogic());
    const [fen, setFen] = useState(chessLogic.getFen());
    const [history, setHistory] = useState(chessLogic.getHistory());

    function updateFen() {
        setFen(chessLogic.getFen());
        setHistory(chessLogic.getHistory());
    }

    function resetGame() {
        setFen(chessLogic.resetGame());
        setHistory(chessLogic.getHistory());
    }


    return (
        <div className = "container justify-center items-center h-screen md:m-auto md:flex md:flex-row md:flex-wrap md:flex-grow" >
            <div className = "flex flex-row flex-wrap">
                <GameBoard chessLogic={chessLogic} fen = {fen} updateFen = {updateFen} />
                <GameBoardSidebar resetGame = {resetGame} chessLogic={chessLogic} history={history}/>
            </div>
        </div>
    );
}

export default GameScreen;