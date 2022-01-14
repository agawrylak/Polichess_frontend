import React from "react";
import { AnimationAction } from "../utils/AnimationUtils";
import { getTranslation } from "../utils/DictionaryUtils";
import { IconButton } from "./Buttons";
import { useSettingsStore } from "../stores/SettingsStore";
import { TranslatedText } from "./TranslatedText";

const Header = ({
  name,
  setAction,
  icon,
}: {
  name: string;
  setAction: any;
  icon: any | null;
}) => {
  function setSidebarAction() {
    setAction(AnimationAction.SHOW);
  }

  return (
    <div className="block text-xl	font-header uppercase text-white p-1 bg-secondary text-center shadow-primary">
      <TranslatedText text={name} />
      {icon ? <IconButton setAction={setSidebarAction} icon={icon} /> : null}
    </div>
  );
};

export default Header;
