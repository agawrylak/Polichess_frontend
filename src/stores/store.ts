import { ChessInstance } from "chess.js";
import create from "zustand";

const chessReq: any = require("chess.js");
const chessLogic: ChessInstance = new chessReq();

export const useStore = create<any>((set, get) => ({
  chess: chessLogic,
  lastMove: [],
  playerColor: "w",
  getHistory: () => {
    return get().chess.history({ verbose: true });
  },
  setMove: (move: any) => {
    set((state: any) => {
      state.chess.move(move);
    });
  },
  undoMove: () => {
    set((state: any) => {
      if (state.chess.turn() != state.playerColor) {
        state.chess.undo();
        state.lastMove = [];
      } else {
        state.chess.undo();
        state.chess.undo();
        state.lastMove = [];
      }
    });
  },
  resetGame: () => {
    set((state: any) => {
      state.chess.reset();
      state.lastMove = [];
    });
  },
  setLastMove: (from: any, to: any) => {
    set((state: any) => {
      state.lastMove = [from, to];
    });
  },
}));
