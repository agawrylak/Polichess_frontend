import { ChessInstance } from "chess.js";
import create from "zustand";
import { Option } from "../shared/settings.interface";
import produce from "immer";
const chessReq: any = require("chess.js");
const chessLogic: ChessInstance = new chessReq();
//test win
//chessLogic.load("8/8/8/8/8/2k5/q5QQ/4K3 w - - 0 2");

export enum SidebarState {
  VISIBLE = "VISIBLE",
  HIDDEN = "HIDDEN",
  VISIBLE_TO_HIDDEN = "VISIBLE TO HIDDEN",
  HIDDEN_TO_VISIBLE = "HIDDEN TO VISIBLE",
}

export const useSettingsStore = create<any>((set, get) => ({
  options: [
    { label: "Difficulty", value: 3 },
    { label: "Show moves", value: true },
    { label: "Language", value: "en_us" },
    { label: "Play as", value: "w" },
  ],
  setOption: (label: string, newValue: any) => {
    set(
      produce((state: any) => {
        const option = state.options.find(
          (option: Option) => option.label == label
        );
        option.value = newValue;
      })
    );
  },
  getOptionValue: (label: string) => {
    return get().options.find((option: Option) => option.label == label).value;
  },
  getDifficulty: () => {
    const difficulty = get().options.find(
      (option: Option) => option.label == "Difficulty"
    ).value;
    switch (difficulty) {
      case 1: {
        return "Easy";
      }
      case 2: {
        return "Medium";
      }
      case 3: {
        return "Hard";
      }
    }
    return "Unknown";
  },
}));
export const useStore = create<any>((set, get) => ({
  chess: chessLogic,
  lastMove: [],
  winner: "",
  getHistory: () => {
    return get().chess.history({ verbose: true });
  },
  setMove: (move: any) => {
    set((state: any) => {
      state.chess.move(move);
      state.isSettingsSidebarVisible = false;
      state.isLoginSidebarVisible = false;
      state.isRegisterSidebarVisible = false;
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
}));

export const useAnimationStore = create<any>((set, get) => ({
  loginState: SidebarState.HIDDEN,
  registerState: SidebarState.HIDDEN,
  settingsState: SidebarState.VISIBLE,
  statisticsState: SidebarState.HIDDEN,
  nextSidebarState: () => {
    set((state: any) => {
      if (state.settingsState == SidebarState.HIDDEN) {
        state.settingsState = SidebarState.HIDDEN_TO_VISIBLE;
        state.statisticsState = SidebarState.VISIBLE_TO_HIDDEN;
      } else if (state.statisticsState == SidebarState.HIDDEN) {
        state.statisticsState = SidebarState.HIDDEN_TO_VISIBLE;
        state.settingsState = SidebarState.VISIBLE_TO_HIDDEN;
      }
    });
  },
  nextLoginState: () => {
    set((state: any) => {
      if (state.loginState == SidebarState.VISIBLE) {
        state.loginState = SidebarState.VISIBLE_TO_HIDDEN;
      } else if (state.loginState == SidebarState.HIDDEN) {
        state.loginState = SidebarState.HIDDEN_TO_VISIBLE;
      }
    });
  },
  nextRegisterState: () => {
    set((state: any) => {
      if (state.registerState == SidebarState.VISIBLE) {
        state.registerState = SidebarState.VISIBLE_TO_HIDDEN;
      } else if (state.registerState == SidebarState.HIDDEN) {
        state.registerState = SidebarState.HIDDEN_TO_VISIBLE;
      }
    });
  },
  setLoginState: (newValue: SidebarState) => {
    set((state: any) => {
      state.loginState = newValue;
    });
  },
  setRegisterState: (newValue: SidebarState) => {
    set((state: any) => {
      state.registerState = newValue;
    });
  },
  setSettingsState: (newValue: SidebarState) => {
    set((state: any) => {
      state.settingsState = newValue;
    });
  },
  setStatisticsState: (newValue: SidebarState) => {
    set((state: any) => {
      state.statisticsState = newValue;
    });
  },
}));
