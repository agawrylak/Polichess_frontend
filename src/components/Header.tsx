import React from "react";
import { AnimationAction } from "../utils/AnimationUtils";
import { IconButton } from "./Buttons";

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
    <div className="block font-header uppercase text-white p-1 bg-secondary text-center">
      <div>
        <span className={"text-center"}>{name}</span>
      </div>
      {icon ? <IconButton setAction={setSidebarAction} icon={icon} /> : null}
    </div>
  );
};

export default Header;
