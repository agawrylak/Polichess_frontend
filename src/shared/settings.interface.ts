export interface DropdownProps {
  label: string;
  options: Option[];
}

export interface Option {
  label: string;
  value: any;
}

const aiSettings: DropdownProps = {
  label: "Difficulty",
  options: [
    { label: "Easy", value: 1 },
    { label: "Medium", value: 2 },
    { label: "Hard", value: 3 },
  ],
};

const showMovesSettings: DropdownProps = {
  label: "Last moves",
  options: [
    { label: "Enabled", value: true },
    { label: "Disabled", value: false },
  ],
};

const languageSettings: DropdownProps = {
  label: "Language",
  options: [
    { label: "Polski", value: "pl_pl" },
    { label: "English", value: "en_us" },
  ],
};

const playerColorSettings: DropdownProps = {
  label: "Play as",
  options: [
    { label: "White", value: "w" },
    { label: "Black", value: "b" },
  ],
};

export const settings: DropdownProps[] = [
  playerColorSettings,
  languageSettings,
  aiSettings,
  showMovesSettings,
];
