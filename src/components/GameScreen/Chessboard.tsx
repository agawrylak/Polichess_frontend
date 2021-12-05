import React, { useEffect, useState } from "react";
import { useStore } from "../../stores/store";
import axios from "axios";
// @ts-ignore
import Chessground from "react-chessground";
import "react-chessground/dist/styles/chessground.css";

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
  const { setMove, setLastMove } = useStore();
  const chess = useStore((state) => state.chess);
  const lastMove = useStore((state) => state.lastMove);
  let [maxWidth, setMaxWidth] = useState(getMaxWidth());
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

  const onMove = (from: any, to: any) => {
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
    </div>
  );
}

export default Chessboard;
