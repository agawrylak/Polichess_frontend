import React, { useEffect, useState } from "react";
import { allChessPieces } from "../../shared/board.interface";
import { Move } from "chess.js";
import { useSettingsStore } from "../../stores/SettingsStore";
import { useAnimationStore } from "../../stores/AnimationStore";
import { useChessStore } from "../../stores/ChessStore";
import Sidebar from "../Sidebar";
import { TextButton } from "../Buttons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import React_2, { motion } from "framer-motion/dist/framer-motion";

function Statistics(props: any) {
  const { resetGame, setAiFirst } = useChessStore();
  const { setStatisticsState, setSettingsAction } = useAnimationStore();
  const { getDifficulty, getOptionValue } = useSettingsStore();
  const playerColor = getOptionValue("Play as");
  const sidebarName = getDifficulty() + " AI";

  function onClickSurrender() {
    resetGame();
    if (playerColor == "b") {
      setAiFirst(true);
    } else if (playerColor == "w") {
      setAiFirst(false);
    }
  }

  return (
    <Sidebar
      name={sidebarName}
      animation={props.animation}
      content={<Content />}
      footer={<Footer onClickSurrender={onClickSurrender} />}
      setState={setStatisticsState}
      setAction={setSettingsAction}
      icon={faCog}
    />
  );
}

const Content = () => {
  const { getHistory } = useChessStore();
  const historySize = getHistory().length;

  const rowSize = () => {
    if (historySize == 0) {
      return 0;
    } else {
      return historySize % 2 == 0
        ? historySize / 2 + 1
        : (historySize + 1) / 2 + 1;
    }
  };

  function getHeight(i: number) {
    let result = 10 + i * 28;
    if (result > 80) {
      result -= 12;
    }
    return result + "px";
  }

  function getOverflow(i: number) {
    let result = 10 + i * 28;
    if (result > 80) {
      result -= 12;
    }
    if (result > 380) {
      return "scroll";
    } else {
      return "hidden";
    }
  }

  const variants = {
    grow: (i: number) => ({
      height: getHeight(i),
      "overflow-y": getOverflow(i),
    }),
  };
  const SideLabel = (props: any) => {
    if (props.size > 0) {
      return <span className={"text-center"}>{props.text}</span>;
    } else {
      return null;
    }
  };
  return (
    <div className="bg-primary text-left font-bold">
      <motion.div
        custom={rowSize()}
        animate="grow"
        variants={variants}
        transition={{ ease: "easeInOut" }}
        className="max-h-96 grid grid-cols-2 gap-0 auto-rows-min"
      >
        <SideLabel text={"White"} size={historySize} />
        <SideLabel text={"Black"} size={historySize} />

        {MoveHistory(getHistory())}
      </motion.div>
      <div className="flex grid grid-cols-2 gap-0 mt-2">
        <div className="flex flex-grow flex-wrap justify-center justify-items-start">
          {LostPieces(getCapturedPieces(getHistory(), "b"))}
        </div>
        <div className="flex flex-grow flex-wrap justify-center justify-items-start	">
          {LostPieces(getCapturedPieces(getHistory(), "w"))}
        </div>
      </div>
    </div>
  );
};

const Footer = ({ onClickSurrender }: any) => {
  const { undoMove } = useChessStore();
  const { getOptionValue } = useSettingsStore();
  const playerColor = getOptionValue("Play as");

  function onClickUndo() {
    undoMove(playerColor);
  }

  return (
    <div className="flex bg-primary">
      <TextButton onClick={onClickSurrender} text={"Surrender"} />
      <TextButton onClick={onClickUndo} text={"Undo"} />
    </div>
  );
};

const MoveHistory = (history: any[]) => {
  const chess = useChessStore((state) => state.chess);
  const { setChess, setAiFirst } = useChessStore();
  function onClick(event: any) {
    const id = event.currentTarget.value;
    chess.reset();
    for (let i = 0; i <= id; i++) {
      const move = history[i];
      chess.move({ from: move.from, to: move.to });
    }
    setChess(chess);
    if (id % 2 == 0) {
      setAiFirst(true);
    }
  }
  return history.map((move: any, index: number) => (
    //TODO: CSS DOES NOT WORK ON BUTTON
    <button
      onClick={onClick}
      value={index}
      className={
        "hover:bg-hover h-px-28 w-full text-center" + getColorForOddRow(index)
      }
    >
      {(move.piece != "p" ? move.piece : "").toUpperCase() +
        move.from +
        " → " +
        (move.piece != "p" ? move.piece : "").toUpperCase() +
        move.to}
    </button>
  ));
};

const LostPieces = (lostPieces: any[]) => {
  return lostPieces.map((piece: any) => (
    <div>
      <img width="40" height="40" src={getImageForChessPiece(piece).default} />
    </div>
  ));
};

const getColorForOddRow = (moveId: number) => {
  let number = moveId + 1;
  const isOdd = number % 2 === 1;
  if (isOdd) {
    number += 1;
  }
  const isRowOdd = (number / 2) % 2 === 0;
  return isRowOdd ? " bg-highlight " : " bg-primary ";
};

function getCapturedPieces(history: any[], color: string) {
  let capturedPieces: any[] = [];
  history.forEach((move) => {
    if ("captured" in move && move.color == color) {
      const capturedPiece = {
        color: getCapturedColor(move),
        pieceName: move.captured,
      };
      capturedPieces.push(capturedPiece);
    }
  });
  return capturedPieces;
}

function getCapturedColor(move: Move) {
  return move.color == "b" ? "w" : "b";
}

const getImageForChessPiece = (piece: any) => {
  return allChessPieces?.find(
    (chessPiece: any) =>
      chessPiece.pieceName == piece.pieceName && chessPiece.color == piece.color
  )?.link;
};

export default Statistics;
