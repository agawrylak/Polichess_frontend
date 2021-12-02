import * as React from "react";
import { useEffect, useState } from "react";
import Chessboard from "chessboardjsx";
import { GameOutcomeMessage, OnDropMove } from "../../shared/board.interface";
import Popup from "reactjs-popup";
import GameOutcomeModal from "./GameOutcomeModal";
import { useStore } from "../../stores/store";
import axios from "axios";

export const GameBoard = () => {
  let maxWidth = 900;
  const [open, setOpen] = useState(false);
  const [gameOutcomeMessage, setGameOutcomeMessage] = useState(
    GameOutcomeMessage.IN_PROGRESS
  );
  const { setMove } = useStore();
  const chess = useStore((state) => state.chess);

  const closeModal = () => setOpen(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  function getWinner() {
    if (chess.in_checkmate()) {
      return chess.turn();
    } else return null;
  }

  function handleMatchOutcome() {
    if (chess.game_over()) {
      const winner = getWinner();
      if (winner != null) {
        console.log(winner);

        if (winner == "w") {
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

  function handleAIMove() {
    let possibleMoves = chess.moves();
    let aiMove: string;
    let apiUrl = "https://quiet-gorge-99239.herokuapp.com/calculate_move";
    axios
      .post(apiUrl, {
        fen: chess.fen(),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response: any) {
        aiMove = response.data;
        setMove({
          from: aiMove.substr(0, 2),
          to: aiMove.substr(2, 2),
          promotion: "q",
        });
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }

  function handlePlayerMove(onDropMove: OnDropMove) {
    const move = setMove({
      from: onDropMove.sourceSquare,
      to: onDropMove.targetSquare,
      promotion: "q",
    });
    const isMoveInvalid: boolean = move === null;
    if (isMoveInvalid) return false;
    return true;
  }

  const onDrop = (onDropMove: OnDropMove) => {
    if (!handlePlayerMove(onDropMove)) return;
    handleAIMove();
    handleMatchOutcome();
  };

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
        position={chess.fen()}
      />
    </div>
  );
};
