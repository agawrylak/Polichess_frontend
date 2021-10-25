import * as React from "react";
import { useEffect, useState } from "react";
import Chessboard from "chessboardjsx";
import { GameOutcomeMessage, OnDropMove } from "../../shared/board.interface";
import Popup from "reactjs-popup";
import GameOutcomeModal from "./GameOutcomeModal";

export const GameBoard = (props: any) => {
  let maxWidth = 900;
  const [open, setOpen] = useState(false);
  const [gameOutcomeMessage, setGameOutcomeMessage] = useState(
    GameOutcomeMessage.IN_PROGRESS
  );

  const closeModal = () => setOpen(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  function handleMatchOutcome() {
    if (props.chessLogic.isGameOver()) {
      const winner = props.chessLogic.getWinner();
      if (winner != null) {
        console.log(winner);

        if (winner == "a") {
          setGameOutcomeMessage(GameOutcomeMessage.LOSE);
        } else if (winner == "b") {
          setGameOutcomeMessage(GameOutcomeMessage.WIN);
        }
      } else {
        setGameOutcomeMessage(GameOutcomeMessage.DRAW);
      }
      setOpen(true);
    }
  }

  function handlePlayerMove(onDropMove: OnDropMove) {
    const move = props.chessLogic.move({
      from: onDropMove.sourceSquare,
      to: onDropMove.targetSquare,
      promotion: "q",
    });
    const isMoveInvalid: boolean = move === null;
    if (isMoveInvalid) return false;
    props.updateFen();
    return true;
  }

  const onDrop = (onDropMove: OnDropMove) => {
    if (!handlePlayerMove(onDropMove)) return;
    handleAIMove();
    handleMatchOutcome();
  };

  function handleAIMove() {
    let possibleMoves = props.chessLogic.getValidMoves();
    let randomIndex = Math.floor(Math.random() * possibleMoves.length); //here call backend

    setTimeout(() => {
      props.chessLogic.move(possibleMoves[randomIndex]);
      props.updateFen();
    }, 200);
  }

  const handleResize = () => {
    if (window.innerWidth < maxWidth) {
      maxWidth = window.innerWidth;
    }
  };

  return (
    <div>
      <Popup open={open} closeOnDocumentClick onClose={closeModal} modal>
        <GameOutcomeModal outcome={gameOutcomeMessage} />
      </Popup>
      <Chessboard
        onDrop={onDrop}
        calcWidth={(size) =>
          size.screenWidth > maxWidth && size.screenHeight > maxWidth
            ? maxWidth
            : Math.min(size.screenWidth, size.screenHeight)
        }
        position={props.fen}
      />
    </div>
  );
};
