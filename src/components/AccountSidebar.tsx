import React from "react";
import { motion } from "framer-motion";
import { useAnimationStore } from "../stores/AnimationStore";
import { useSettingsStore } from "../stores/SettingsStore";
import { AnimationDefinition } from "framer-motion/types/render/utils/animation";
import { AnimationAction, SidebarState } from "../utils/AnimationUtils";
import LoginStatus from "./LoginStatus";

const AccountSidebar = (props: any) => {
  const { setAccountState, setAccountAction } = useAnimationStore();

  const variants = {
    hidden: { display: "none" },
  };

  function onComplete(definition: AnimationDefinition | any) {
    if (definition.display == "none") {
      setAccountState(SidebarState.HIDDEN);
    } else if (definition.display == "block") {
      setAccountState(SidebarState.VISIBLE);
    }
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={props.animation}
      onAnimationComplete={(definition) => {
        onComplete(definition);
      }}
      className="mt-6"
    >
      <div className="font-monospaced text-lg text-center bg-primary">
        <div className="flex bg-secondary">
          <div className="flex-1 font-header uppercase text-white p-1 ">
            <span>Account</span>
          </div>
        </div>
        <div className="p-2">
          <LoginStatus />
        </div>
      </div>
      <div className="flex bg-primary">
        <LogoutButton />
        <HistoryButton />
      </div>
    </motion.div>
  );
};

const LogoutButton = () => {
  const { setUser, setToken } = useSettingsStore();
  const { setAccountAction } = useAnimationStore();

  function onClick() {
    setUser("");
    setToken("");
    setAccountAction(AnimationAction.HIDE);
  }

  return (
    <button
      onClick={onClick}
      className="flex-1 font-header uppercase text-white p-1 m-2 bg-secondary"
    >
      <span>Logout</span>
    </button>
  );
};

const HistoryButton = () => {
  const { setHistoryAction } = useAnimationStore();

  function onClick() {
    setHistoryAction(AnimationAction.SHOW);
  }

  return (
    <button
      onClick={onClick}
      className="flex-1 font-header uppercase text-white p-1 m-2 bg-secondary"
    >
      <span>History</span>
    </button>
  );
};
export default AccountSidebar;
