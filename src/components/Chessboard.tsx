import React, { useEffect, useState } from "react";
import {
  SidebarState,
  useAnimationStore,
  useSettingsStore,
  useStore,
} from "../stores/store";
// @ts-ignore
import Chessground from "react-chessground";
import "react-chessground/dist/styles/chessground.css";
import { GameOutcomeMessage } from "../shared/board.interface";
import WinnerModal from "./WinnerModal";
import Popup from "reactjs-popup";
import { API } from "../api/API";

const getMaxWidth = () => {
  let maxSize = 900;
  if (window.innerWidth < maxSize) {
    maxSize = window.innerWidth - 20;
  }
  if (window.innerHeight < maxSize) {
    maxSize = window.innerHeight - 20;
  }
  return maxSize;
};

function Chessboard() {
  const chess = useStore((state) => state.chess);
  const lastMove = useStore((state) => state.lastMove);
  const { setMove, setLastMove, resetGame } = useStore();
  const { nextSidebarState } = useAnimationStore();
  const statisticsState = useAnimationStore((state) => state.statisticsState);
  let [maxWidth, setMaxWidth] = useState(getMaxWidth());
  const [open, setOpen] = useState(false);
  const [gameOutcomeMessage, setGameOutcomeMessage] = useState(
    GameOutcomeMessage.IN_PROGRESS
  );
  const { getOptionValue } = useSettingsStore();
  const playerColor = getOptionValue("Play as");
  const { setFen } = useStore();
  const options = useStore((state) => state.options);
  const closeModal = () => {
    setOpen(false);
    resetGame();
  };

  useEffect(() => {
    handleColorChange();
  }, [playerColor]);

  function handleColorChange() {
    if (playerColor == "w") {
      resetGame();
    } else if (playerColor == "b") {
      resetGame();
      handleAIMove();
    }
  }

  function handleMatchOutcome() {
    if (chess.in_checkmate()) {
      const winner = chess.turn() == "w" ? "b" : "w";
      const player = getOptionValue("Play as");
      if (winner == player) {
        setGameOutcomeMessage(GameOutcomeMessage.WIN);
      } else {
        setGameOutcomeMessage(GameOutcomeMessage.LOSE);
      }
      setOpen(true);
    } else if (chess.in_threefold_repetition()) {
      setGameOutcomeMessage(GameOutcomeMessage.THREEFOLD_REPETITION);
      setOpen(true);
    } else if (chess.in_stalemate()) {
      setGameOutcomeMessage(GameOutcomeMessage.STALEMATE);
      setOpen(true);
    } else if (chess.insufficient_material()) {
      setGameOutcomeMessage(GameOutcomeMessage.INSUFFICIENT_MATERIAL);
      setOpen(true);
    } else if (chess.in_draw()) {
      setGameOutcomeMessage(GameOutcomeMessage.FIFTY_MOVE);
      setOpen(true);
    }
  }

  const getFen = () => {
    return chess.fen();
  };

  const turnColor = () => {
    return chess.turn() === "w" ? "white" : "black";
  };

  const calcMovable = () => {
    const dests = new Map();
    chess.SQUARES.forEach((s: any) => {
      const ms = chess.moves({ square: s, verbose: true });
      if (ms.length)
        dests.set(
          s,
          ms.map((m: any) => m.to)
        );
    });
    return {
      free: false,
      dests,
      color: playerColor == "w" ? "white" : "black",
    };
  };

  function handleAIMove() {
    const fen = chess.fen();
    const difficulty = getOptionValue("Difficulty");
    API.aiMove(fen, difficulty)
      .then((response: any) => {
        let aiMove = response.data;

        setMove({
          from: aiMove.substr(0, 2),
          to: aiMove.substr(2, 2),
          promotion: "q",
        });
        handleMatchOutcome();
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  const onMove = (from: any, to: any) => {
    if (statisticsState == SidebarState.HIDDEN) {
      nextSidebarState();
    }
    const moves = chess.moves({ verbose: true });
    for (let i = 0, len = moves.length; i < len; i++) {
      if (moves[i].flags.indexOf("p") !== -1 && moves[i].from === from) {
        return;
      }
    }
    if (setMove({ from, to, promotion: "q" })) {
    }
    setLastMove(from, to);

    handleAIMove();
    handleMatchOutcome();
  };

  return (
    <div className="mr-4 mb-4 static z-30">
      <Chessground
        width={maxWidth}
        height={maxWidth}
        fen={getFen()}
        onMove={onMove}
        style={{ margin: "auto" }}
        turnColor={turnColor()}
        movable={calcMovable()}
        lastMove={lastMove}
        premovable={{ enabled: false }}
        coordinates={false}
        orientation={playerColor == "w" ? "white" : "black"}
      />
      <Popup open={open} closeOnDocumentClick onClose={closeModal} modal>
        <WinnerModal outcome={gameOutcomeMessage} />
      </Popup>
    </div>
  );
}

export default Chessboard;
