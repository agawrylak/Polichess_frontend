import React, { useEffect, useState } from "react";
import { allChessPieces } from "../../shared/board.interface";
import { Move } from "chess.js";
import {
  SidebarState,
  useAnimationStore,
  useSettingsStore,
  useStore,
} from "../../stores/store";
import { motion } from "framer-motion";
import SettingsButton from "./SettingsButton";
import { AnimationDefinition } from "framer-motion/types/render/utils/animation";

function StatisticsSidebar(props: any) {
  const { resetGame, getHistory, undoMove } = useStore();
  const { setStatisticsState } = useAnimationStore();
  const { getDifficulty } = useSettingsStore();
  const animation = props.animation;

  const variants = {
    hidden: { display: "none" },
  };

  function onComplete(definition: AnimationDefinition | any) {
    if (definition.display == "none") {
      setStatisticsState(SidebarState.HIDDEN);
    } else if (definition.display == "block") {
      setStatisticsState(SidebarState.VISIBLE);
    }
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={animation}
      onAnimationComplete={(definition) => {
        onComplete(definition);
      }}
      className="w-screen md:w-96 min-h-full flex flex-col flex-grow items-stretch"
    >
      <div className="font-monospaced md:pl-2 text-lg text-center">
        <div className="flex bg-secondary">
          <div className="flex-1 font-header uppercase text-white p-1">
            <span>{getDifficulty()} bot</span>
          </div>
          <SettingsButton />
        </div>
        <div className="bg-primary text-left p-0 pt-2 pb-2 font-bold ">
          <div className="max-h-96 overflow-y-auto flex grid grid-cols-2 gap-0 ">
            <div className="col-span-2 grid grid-cols-2">
              <div className={"mx-auto w-full h-6 bg-white mb-2 text-center"} />
              <div className={"mx-auto w-full h-6 bg-black mb-2 text-center"}>
                {" "}
              </div>
            </div>
            {MoveHistory(getHistory())}
          </div>
          <div className="flex grid grid-cols-2 gap-0 mt-2">
            <div className="flex flex-grow flex-wrap justify-center justify-items-start">
              {LostPieces(getCapturedPieces(getHistory(), "b"))}
            </div>
            <div className="flex flex-grow flex-wrap justify-center justify-items-start	">
              {LostPieces(getCapturedPieces(getHistory(), "w"))}
            </div>
          </div>
        </div>
        <div className="flex bg-primary">
          <button
            onClick={resetGame}
            className="flex-1 font-header uppercase text-white p-1 m-2 bg-secondary"
          >
            <span>Surrender</span>
          </button>
          <button
            onClick={undoMove}
            className="flex-1 font-header uppercase text-white p-1 m-2 bg-secondary"
          >
            <span>Undo</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const MoveHistory = (history: any[]) => {
  return history.map((move: any, index: number) => (
    <span className={"w-full text-center " + getColorForOddRow(index)}>
      <span>{move.piece + move.from + " → " + move.piece + move.to}</span>
    </span>
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
  return isRowOdd ? " bg-primary2 " : " bg-primary ";
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

export default StatisticsSidebar;
