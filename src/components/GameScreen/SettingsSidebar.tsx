import React, { useState } from "react";
import { motion } from "framer-motion";
import SettingsButton from "./SettingsButton";
import { SidebarState, useAnimationStore } from "../../stores/store";
import { AnimationDefinition } from "framer-motion/types/render/utils/animation";
import Dropdowns from "./Dropdowns";
import { settings } from "../../shared/settings.interface";

function SettingsSidebar(props: any) {
  const animation = props.animation;
  const [openAuthors, setOpenAuthors] = useState(false);
  const { nextLoginState, nextRegisterState, setSettingsState } =
    useAnimationStore();

  function onComplete(definition: AnimationDefinition | any) {
    if (definition.display == "none") {
      setSettingsState(SidebarState.HIDDEN);
    } else if (definition.display == "block") {
      setSettingsState(SidebarState.VISIBLE);
    }
  }

  function onClickOpenAuthors() {
    setOpenAuthors(!openAuthors);
  }

  const variants = {
    hidden: { display: "block" },
  };

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
            <div className="pt-2">
              <Dropdowns dropdownPropsList={settings} />
            </div>
          </div>
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
        </div>
      </div>
    </motion.div>
  );
}
export default SettingsSidebar;
