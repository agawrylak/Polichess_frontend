import React from "react";
import { GameBoard } from "./GameBoard";
import GameBoardSidebar from "./GameBoardSidebar";

function GameScreen() {
  return (
    <div className="container justify-center items-center h-screen md:m-auto md:flex md:flex-row md:flex-wrap md:flex-grow">
      <div className="flex flex-row flex-wrap">
        <GameBoard />
        <GameBoardSidebar />
      </div>
    </div>
  );
}

export default GameScreen;
