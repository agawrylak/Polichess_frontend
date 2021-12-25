import React from "react";
import { AnimationDefinition } from "framer-motion/types/render/utils/animation";
import { SidebarState } from "../utils/AnimationUtils";
import { motion } from "framer-motion";
import Header from "./Header";

//TODO: TYPES HERE
interface SidebarProps {
  setState: any;
  setAction: any;
  initialDisplay: string;
  showIcon: boolean;
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
  showIcon,
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
      className="w-screen md:w-96 min-h-full flex flex-col flex-grow items-stretch z-10"
    >
      <div className="font-monospaced text-lg text-center">
        <Header name={name} setAction={setAction} showIcon={showIcon} />
        <div>
          <div className="bg-primary ">
            <div className="pt-2">{content}</div>
          </div>
        </div>
        <div className="bg-primary">{footer}</div>
      </div>
    </motion.div>
  );
};

Sidebar.defaultProps = {
  initialDisplay: "none",
  setAction: () => {},
  showIcon: false,
};

export default Sidebar;
