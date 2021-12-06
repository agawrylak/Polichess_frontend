import * as React from "react";
import { useState } from "react";
import { GameOutcomeMessage } from "../../shared/board.interface";
import Popup from "reactjs-popup";
import WinnerModal from "./WinnerModal";
import { useStore } from "../../stores/store";
import Chessboard from "./Chessboard";

export const MainScreen = () => {
  return (
    <div className="z-30">
      <Chessboard />
    </div>
  );
};
