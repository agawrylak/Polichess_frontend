import React from "react";
import { getTranslation } from "../utils/DictionaryUtils";
import { useSettingsStore } from "../stores/SettingsStore";

export const TranslatedText = ({
  text,
  untranslatedText,
}: {
  text: string;
  untranslatedText: string;
}) => {
  const { getOptionValue } = useSettingsStore();
  const language = getOptionValue("Language");
  return <span>{getTranslation(text, language) + untranslatedText}</span>;
};
TranslatedText.defaultProps = {
  untranslatedText: "",
};
