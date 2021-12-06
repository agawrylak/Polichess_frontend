import React, { useState } from "react";
import {
  SidebarState,
  useAnimationStore,
  useSettingsStore,
  useStore,
} from "../../stores/store";
import axios from "axios";
// @ts-ignore
import Chessground from "react-chessground";
import "react-chessground/dist/styles/chessground.css";
import { GameOutcomeMessage } from "../../shared/board.interface";
import WinnerModal from "./WinnerModal";
import Popup from "reactjs-popup";

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
  const { setMove, setLastMove, resetGame } = useStore();
  const chess = useStore((state) => state.chess);
  const lastMove = useStore((state) => state.lastMove);
  const { nextSidebarState } = useAnimationStore();
  const statisticsState = useAnimationStore((state) => state.statisticsState);
  let [maxWidth, setMaxWidth] = useState(getMaxWidth());
  const [open, setOpen] = useState(false);
  const [gameOutcomeMessage, setGameOutcomeMessage] = useState(
    GameOutcomeMessage.IN_PROGRESS
  );
  const { getOptionValue } = useSettingsStore();
  const closeModal = () => {
    setOpen(false);
    resetGame();
  };

  function handleMatchOutcome() {
    if (chess.in_checkmate()) {
      const winner = chess.turn() == "w" ? "b" : "w";
      const player = getOptionValue("Play as");
      console.log(winner + " " + player);
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
      color: "white",
    };
  };

  function handleAIMove() {
    let possibleMoves = chess.moves();
    let aiMove: string;
    let apiUrl = "https://quiet-gorge-99239.herokuapp.com/calculate_move";
    axios
      .post(apiUrl, {
        fen: chess.fen(),
        difficulty: getOptionValue("Difficulty"),
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
        handleMatchOutcome();
      })
      .catch(function (error: any) {
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
    <div className="mr-4 mb-4 static">
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
      />
      <Popup open={open} closeOnDocumentClick onClose={closeModal} modal>
        <WinnerModal outcome={gameOutcomeMessage} />
      </Popup>
    </div>
  );
}

export default Chessboard;
