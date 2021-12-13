import React, { useState } from "react";
import { motion } from "framer-motion";
import SettingsButton from "./SettingsButton";
import {
  SidebarState,
  useAnimationStore,
  useSettingsStore,
} from "../stores/store";
import { AnimationDefinition } from "framer-motion/types/render/utils/animation";
import Dropdowns from "./Dropdowns";
import { settings } from "../shared/settings.interface";
import LoginStatus from "./LoginStatus";

function SettingsSidebar(props: any) {
  const animation = props.animation;
  const { setSettingsState } = useAnimationStore();
  const user = useSettingsStore((state) => state.user);

  function onComplete(definition: AnimationDefinition | any) {
    if (definition.display == "none") {
      setSettingsState(SidebarState.HIDDEN);
    } else if (definition.display == "block") {
      setSettingsState(SidebarState.VISIBLE);
    }
  }

  const variants = {
    hidden: { display: "block" },
  };

  function isLoggedIn() {
    return user != "";
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={animation}
      onAnimationComplete={(definition) => {
        onComplete(definition);
      }}
      className="w-screen md:w-96 min-h-full flex flex-col flex-grow items-stretch z-10"
    >
      <div className="font-monospaced text-lg text-center">
        <div className="flex bg-secondary">
          <div className="ml-10  flex-1 font-header uppercase text-white p-1">
            <span className="">Settings</span>
          </div>
          <SettingsButton />
        </div>
        <div>
          <div className="bg-primary ">
            <div>
              <LoginStatus />
            </div>
            <div className="pt-2">
              <Dropdowns dropdownPropsList={settings} />
            </div>
          </div>
          {isLoggedIn() ? <LogoutButton /> : <SignButtons />}
        </div>
      </div>
    </motion.div>
  );
}

const SignButtons = () => {
  const { nextLoginState, nextRegisterState } = useAnimationStore();

  return (
    <div className="flex bg-primary">
      <button
        onClick={nextLoginState}
        className="flex-1 font-header uppercase text-white p-1 m-2 bg-secondary"
      >
        <span>Login</span>
      </button>
      <button
        onClick={nextRegisterState}
        className="flex-1 font-header uppercase text-white p-1 m-2 bg-secondary"
      >
        <span>Register</span>
      </button>
    </div>
  );
};

const LogoutButton = () => {
  const { setLoginState } = useAnimationStore();
  const { setUser, setToken } = useSettingsStore();

  function onClickLogout() {
    setLoginState(SidebarState.VISIBLE_TO_HIDDEN);
    setUser("");
    setToken("");
  }

  return (
    <div className="flex bg-primary">
      <button
        onClick={onClickLogout}
        className="flex-1 font-header uppercase text-white p-1 m-2 bg-secondary"
      >
        <span>Logout</span>
      </button>
    </div>
  );
};

export default SettingsSidebar;
