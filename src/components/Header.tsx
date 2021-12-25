import React from "react";
import { AnimationAction } from "../utils/AnimationUtils";
import { IconButton } from "./Buttons";

const Header = ({
  name,
  setAction,
  showIcon,
}: {
  name: string;
  setAction: any;
  showIcon: boolean;
}) => {
  function setSidebarAction() {
    setAction(AnimationAction.SHOW);
  }

  return (
    <div className="flex bg-secondary">
      <div
        className={
          (showIcon ? "ml-10" : null) +
          "flex-1 font-header uppercase text-white p-1"
        }
      >
        <span>{name}</span>
      </div>
      {showIcon ? <IconButton setAction={setSidebarAction} /> : null}
    </div>
  );
};

export default Header;
