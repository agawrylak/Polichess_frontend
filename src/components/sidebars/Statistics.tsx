import React from "react";
import { allChessPieces } from "../../shared/board.interface";
import { Move } from "chess.js";
import { useSettingsStore } from "../../stores/SettingsStore";
import { useAnimationStore } from "../../stores/AnimationStore";
import { useChessStore } from "../../stores/ChessStore";
import Sidebar from "../Sidebar";
import { TextButton } from "../Buttons";
import { faCog } from "@fortawesome/free-solid-svg-icons";

function Statistics(props: any) {
  const { resetGame, setAiFirst } = useChessStore();
  const { setStatisticsState, setSettingsAction } = useAnimationStore();
  const { getDifficulty, getOptionValue } = useSettingsStore();
  const playerColor = getOptionValue("Play as");

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
      name={getDifficulty() + " bot"}
      animation={props.animation}
      content={<Content />}
      footer={<Footer onClick={onClickSurrender} />}
      setState={setStatisticsState}
      setAction={setSettingsAction}
      icon={faCog}
    />
  );
}

const Content = () => {
  const { getHistory } = useChessStore();
  return (
    <div className="bg-primary text-left p-0 pt-2 pb-2 font-bold ">
      <div className="max-h-96 overflow-y-auto flex grid grid-cols-2 gap-0 ">
        <div className="col-span-2 grid grid-cols-2 ml-2 mr-2">
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
  const { setChess, setAiFirst, resetLastMove } = useChessStore();
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
        "hover:bg-secondary w-full text-center " + getColorForOddRow(index)
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

export default Statistics;
