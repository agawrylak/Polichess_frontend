import React from "react";
import { Settings } from "react-feather";
import { useAnimationStore, useStore } from "../../stores/store";

function SettingsButton() {
  const { nextSidebarState } = useAnimationStore();

  return (
    <button onClick={nextSidebarState} className="mr-2">
      <Settings color="white" />
    </button>
  );
}

export default SettingsButton;
