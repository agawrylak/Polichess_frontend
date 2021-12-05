export interface DropdownProps {
  label: string;
  options: Option[];
}

export interface Option {
  label: string;
  value: any;
}

export interface OptionProps {
  dropdownLabel: string;
  option: Option;
}

export interface DropdownListProps {
  options: Option[];
  dropdownLabel: string;
}

const aiOptions: Option[] = [
  { label: "Easy", value: 1 },
  { label: "Medium", value: 2 },
  { label: "Hard", value: 3 },
];

const aiSettings: DropdownProps = {
  label: "Difficulty",
  options: aiOptions,
};

const showMovesOptions: Option[] = [
  { label: "Enabled", value: true },
  { label: "Disabled", value: false },
];

const showMovesSettings: DropdownProps = {
  label: "Show moves",
  options: showMovesOptions,
};

const languageOptions: Option[] = [
  { label: "Polski", value: "pl_pl" },
  { label: "English", value: "en_us" },
];

const languageSettings: DropdownProps = {
  label: "Language",
  options: languageOptions,
};

const playerColorOptions: Option[] = [
  { label: "White", value: "w" },
  { label: "Black", value: "b" },
];

const playerColorSettings: DropdownProps = {
  label: "Play as",
  options: playerColorOptions,
};

export const settings: DropdownProps[] = [
  playerColorSettings,
  languageSettings,
  aiSettings,
  showMovesSettings,
];
