import React from "react";
import { AnimationDefinition } from "framer-motion/types/render/utils/animation";
import { SidebarState } from "../utils/AnimationUtils";
import { motion } from "framer-motion";
import Header from "./Header";
import { useSettingsStore } from "../stores/SettingsStore";

//TODO: TYPES HERE
interface SidebarProps {
  setState: any;
  setAction: any;
  initialDisplay: string;
  icon: any | null;
  animation: any;
  name: string;
  content: any;
  footer: any;
}

const Sidebar = ({
  name,
  content,
  footer,
  initialDisplay,
  icon,
  animation,
  setState,
  setAction,
}: SidebarProps) => {
  const variants = {
    initial: { display: initialDisplay },
  };
  function onComplete(definition: AnimationDefinition | any, setState: any) {
    if (definition.display == "none") {
      setState(SidebarState.HIDDEN);
    } else if (definition.display == "block") {
      setState(SidebarState.VISIBLE);
    }
  }

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate={animation}
      onAnimationComplete={(definition) => {
        onComplete(definition, setState);
      }}
      className="min-h-full shadow-primary"
    >
      <div className="font-monospaced text-lg text-center">
        <Header name={name} setAction={setAction} icon={icon} />
        <div>
          <div className="bg-primary">
            <div className="pt-2">{content}</div>
          </div>
        </div>
        <div className="bg-primary basis-1/2 flex-initial justify-center items-center">
          {footer}
        </div>
      </div>
    </motion.div>
  );
};

Sidebar.defaultProps = {
  initialDisplay: "none",
  setAction: () => {},
  icon: null,
};

export default Sidebar;
