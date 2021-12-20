import React from "react";
import { Settings } from "react-feather";

function SettingsButton(props: any) {
  return (
    <button onClick={props.setState} className="mr-2">
      <Settings color="white" />
    </button>
  );
}

export default SettingsButton;
