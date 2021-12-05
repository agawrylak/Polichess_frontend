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

  const variants = {
    hidden: { display: "block" },
  };

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

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={animation}
      onAnimationComplete={(definition) => {
        onComplete(definition);
      }}
      className="w-screen md:w-96 flex flex-col flex-grow items-stretch z-10"
    >
      <div className="font-monospaced md:pl-2 text-lg text-center">
        <div className="flex bg-secondary">
          <div className="flex-1 font-header uppercase text-white p-1 ml-[13px]">
            <span>Settings</span>
          </div>
          <SettingsButton />
        </div>
        <div>
          <div className="bg-primary ">
            <div className="pt-2">
              <Dropdowns dropdownPropsList={settings} />
            </div>
            <button
              onClick={onClickOpenAuthors}
              className="flex-1 w-40 font-header uppercase text-white p-1 m-2 bg-secondary"
            >
              <span>Authors</span>
            </button>
            {openAuthors ? (
              <div>Made by: Artur Gawrylak, Kamil Głasek, Igor Gospodaryk</div>
            ) : null}
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
