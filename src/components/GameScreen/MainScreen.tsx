import * as React from "react";
import { useState } from "react";
import { GameOutcomeMessage } from "../../shared/board.interface";
import Popup from "reactjs-popup";
import WinnerModal from "./WinnerModal";
import { useStore } from "../../stores/store";
import Chessboard from "./Chessboard";

export const MainScreen = () => {
  const [open, setOpen] = useState(false);
  const [gameOutcomeMessage, setGameOutcomeMessage] = useState(
    GameOutcomeMessage.IN_PROGRESS
  );
  const chess = useStore((state) => state.chess);
  const closeModal = () => setOpen(false);

  function getWinner() {
    if (chess.in_checkmate()) {
      return chess.turn();
    } else return null;
  }

  function handleMatchOutcome() {
    if (chess.game_over()) {
      const winner = getWinner();
      if (winner != null) {
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

  return (
    <div className="z-30">
      <Chessboard />
      <Popup open={open} closeOnDocumentClick onClose={closeModal} modal>
        <WinnerModal outcome={gameOutcomeMessage} />
      </Popup>
    </div>
  );
};