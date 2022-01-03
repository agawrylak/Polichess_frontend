import create from "zustand";
import { Option } from "../shared/settings.interface";

export const useSettingsStore = create<any>((set, get) => ({
  token: "",
  user: "",
  options: [
    { label: "Difficulty", value: 3 },
    { label: "Show moves", value: true },
    { label: "Language", value: "en_us" },
    { label: "Play as", value: "w" },
  ],
  setToken: (newValue: any) => {
    set((state: any) => {
      state.token = newValue;
    });
  },
  setUser: (newValue: any) => {
    set((state: any) => {
      state.user = newValue;
    });
  },
  setOption: (label: string, newValue: any) => {
    set((state: any) => {
      const option = state.options.find(
        (option: Option) => option.label == label
      );
      option.value = newValue;
    });
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
