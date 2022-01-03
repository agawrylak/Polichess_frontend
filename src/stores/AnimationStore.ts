import create from "zustand";
import { AnimationAction, SidebarState } from "../utils/AnimationUtils";

export const useAnimationStore = create<any>((set) => ({
  loginState: SidebarState.HIDDEN,
  registerState: SidebarState.HIDDEN,
  settingsState: SidebarState.HIDDEN,
  statisticsState: SidebarState.HIDDEN,
  historyState: SidebarState.HIDDEN,
  accountState: SidebarState.HIDDEN,
  loginAction: AnimationAction.DO_NOTHING,
  registerAction: AnimationAction.DO_NOTHING,
  settingsAction: AnimationAction.SHOW,
  statisticsAction: AnimationAction.DO_NOTHING,
  historyAction: AnimationAction.DO_NOTHING,
  accountAction: AnimationAction.DO_NOTHING,
  setHistoryState: (newValue: SidebarState) => {
    set((state: any) => {
      state.historyState = newValue;
    });
  },
  setHistoryAction: (newValue: AnimationAction) => {
    set((state: any) => {
      state.historyAction = newValue;
    });
  },
  setLoginState: (newValue: SidebarState) => {
    set((state: any) => {
      state.loginState = newValue;
    });
  },
  setLoginAction: (newValue: AnimationAction) => {
    set((state: any) => {
      state.loginAction = newValue;
    });
  },
  setRegisterState: (newValue: SidebarState) => {
    set((state: any) => {
      state.registerState = newValue;
    });
  },
  setRegisterAction: (newValue: AnimationAction) => {
    set((state: any) => {
      state.registerAction = newValue;
    });
  },
  setSettingsState: (newValue: SidebarState) => {
    set((state: any) => {
      state.settingsState = newValue;
    });
  },
  setSettingsAction: (newValue: AnimationAction) => {
    set((state: any) => {
      state.settingsAction = newValue;
    });
  },
  setStatisticsState: (newValue: SidebarState) => {
    set((state: any) => {
      state.statisticsState = newValue;
    });
  },
  setStatisticsAction: (newValue: AnimationAction) => {
    set((state: any) => {
      state.statisticsAction = newValue;
    });
  },
  setAccountState: (newValue: SidebarState) => {
    set((state: any) => {
      state.accountState = newValue;
    });
  },
  setAccountAction: (newValue: AnimationAction) => {
    set((state: any) => {
      state.accountAction = newValue;
    });
  },
}));
