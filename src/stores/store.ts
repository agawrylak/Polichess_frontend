import { ChessInstance } from "chess.js";
import create from "zustand";

const chessReq: any = require("chess.js");
const chessLogic: ChessInstance = new chessReq();

export const useStore = create<any>((set, get) => ({
  chess: chessLogic,
  getHistory: () => {
    return get().chess.history({ verbose: true });
  },
  setMove: (move: any) => {
    set((state: any) => {
      state.chess.move(move);
    });
  },
  resetGame: () => {
    set((state: any) => {
      state.chess.reset();
    });
  },
}));
