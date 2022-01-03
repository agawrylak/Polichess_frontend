import create from "zustand";
import { ChessInstance } from "chess.js";

const chessReq: any = require("chess.js");
const chessLogic: ChessInstance = new chessReq();

//test win
//chessLogic.load("k7/8/8/8/8/8/2QQ4/2K5 w - - 0 1");

export const useChessStore = create<any>((set, get) => ({
  chess: chessLogic,
  lastMove: [],
  winner: "",
  aiFirst: false,
  isGameFinished: false,
  setGameEnded: (newValue: boolean) => {
    set((state: any) => {
      state.isGameFinished = newValue;
    });
  },
  getHistory: () => {
    return get().chess.history({ verbose: true });
  },
  setAiFirst: (newValue: boolean) => {
    set((state: any) => {
      state.aiFirst = newValue;
    });
  },
  setMove: (move: any) => {
    set((state: any) => {
      state.chess.move(move, { sloppy: true });
      state.isSettingsSidebarVisible = false;
      state.isLoginSidebarVisible = false;
      state.isRegisterSidebarVisible = false;
    });
  },
  undoMove: (playerColor: string) => {
    set((state: any) => {
      if (state.chess.turn() != playerColor) {
        state.chess.undo();
        state.lastMove = [];
      } else {
        state.chess.undo();
        state.chess.undo();
        state.lastMove = [];
      }
    });
  },
  setLastMove: (from: any, to: any) => {
    set((state: any) => {
      state.lastMove = [from, to];
    });
  },
  resetGame: () => {
    set((state: any) => {
      state.chess.reset();
      state.lastMove = [];
    });
  },
  resetLastMove: () => {
    set((state: any) => {
      state.lastMove = [];
    });
  },
  setFen: (newValue: string) => {
    set((state: any) => {
      state.chess.load(newValue);
    });
  },
  setChess: (newValue: any) => {
    set((state: any) => {
      state.chess = newValue;
    });
  },
}));
