import React, { useEffect, useState } from "react";
import "react-chessground/dist/styles/chessground.css";
import { GameOutcomeMessage } from "../../shared/board.interface";
import WinnerModal from "./WinnerModal";
import Popup from "reactjs-popup";
import { API } from "../../api/API";
import useAsyncEffect from "use-async-effect";
import { useChessStore } from "../../stores/ChessStore";
import { useAnimationStore } from "../../stores/AnimationStore";
import { useSettingsStore } from "../../stores/SettingsStore";
import { AnimationAction, SidebarState } from "../../utils/AnimationUtils";
// @ts-ignore
import Chessground from "react-chessground";

const getMaxWidth = () => {
  let maxSize = 2000;
  if (window.innerWidth < maxSize) {
    if (window.innerWidth < 768) {
      maxSize = window.innerWidth;
    } else {
      maxSize = window.innerWidth - 50;
    }
  }
  if (window.innerHeight < maxSize) {
    if (window.innerHeight < 768) {
      maxSize = window.innerHeight;
    } else {
      maxSize = window.innerHeight - 50;
    }
  }
  return maxSize;
};

function Chessboard() {
  const chess = useChessStore((state) => state.chess);
  let lastMove = useChessStore((state) => state.lastMove);
  const { setMove, setLastMove, resetGame } = useChessStore();
  const aiFirst = useChessStore((state) => state.aiFirst);
  const { setAiFirst } = useChessStore();
  const { setStatisticsAction } = useAnimationStore();
  const statisticsState = useAnimationStore((state) => state.statisticsState);
  const { getOptionValue } = useSettingsStore();
  const playerColor = getOptionValue("Play as");
  const isLastMoveVisible = getOptionValue("Last moves");
  let [maxWidth, setMaxWidth] = useState(getMaxWidth());
  const [open, setOpen] = useState(false);
  const [orientation, setOrientation] = useState("white");
  const [gameOutcomeMessage, setGameOutcomeMessage] = useState(
    GameOutcomeMessage.IN_PROGRESS
  );
  const [isChecked, setChecked] = useState(false);

  const getLastMoveValue = () => {
    if (isLastMoveVisible == "false") {
      return [];
    } else return lastMove;
  };

  const closeModal = () => {
    setOpen(false);
    resetGame();
  };

  useAsyncEffect(() => {
    handleColorChange();
  }, [playerColor]);

  useEffect(() => {
    if (aiFirst) {
      handleAIMove();
      setAiFirst(false);
    }
  }, [aiFirst]);

  useEffect(() => {
    handleCheck();
  }, [lastMove]);

  function handleColorChange() {
    if (playerColor == "w") {
      resetGame();
      setOrientation("white");
    } else if (playerColor == "b") {
      resetGame();
      setOrientation("black");
      setAiFirst(true);
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
      color: orientation,
    };
  };

  function handleCheck() {
    if (chess.in_check()) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }

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
        handleCheck();
        handleMatchOutcome();
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  const onMove = (from: any, to: any) => {
    if (statisticsState == SidebarState.HIDDEN) {
      setStatisticsAction(AnimationAction.SHOW);
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
    handleCheck();
    handleAIMove();
    handleMatchOutcome();
  };
  const contentStyle = {
    background: "#d4d9bf",
    border: "solid",
    borderColor: "#538373",
  };
  const overlayStyle = { background: "rgba(0,0,0,0.5)" };
  const arrowStyle = { color: "#d4d9bf" };

  return (
    <div className="mr-4 mt-4 md:mb-4 static z-30 shadow-primary">
      <Chessground
        width={maxWidth}
        height={maxWidth}
        fen={getFen()}
        onMove={onMove}
        turnColor={turnColor()}
        movable={calcMovable()}
        lastMove={getLastMoveValue()}
        check={isChecked}
        premovable={{ enabled: false }}
        coordinates={false}
        orientation={orientation}
      />
      <Popup
        open={open}
        {...{
          contentStyle,
          overlayStyle,
          arrowStyle,
        }}
        closeOnDocumentClick
        onClose={closeModal}
        modal
      >
        <WinnerModal closeModal={closeModal} outcome={gameOutcomeMessage} />
      </Popup>
    </div>
  );
}

export default Chessboard;
