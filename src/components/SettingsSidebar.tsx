import React from "react";
import { motion } from "framer-motion";
import SettingsButton from "./SettingsButton";
import { AnimationDefinition } from "framer-motion/types/render/utils/animation";
import Dropdowns from "./Dropdowns";
import { settings } from "../shared/settings.interface";
import { useAnimationStore } from "../stores/AnimationStore";
import { useSettingsStore } from "../stores/SettingsStore";
import { AnimationAction, SidebarState } from "../utils/AnimationUtils";

function SettingsSidebar(props: any) {
  const animation = props.animation;
  const { setSettingsState, setStatisticsAction } = useAnimationStore();

  function onComplete(definition: AnimationDefinition | any) {
    if (definition.display == "none") {
      setSettingsState(SidebarState.HIDDEN);
    } else if (definition.display == "block") {
      setSettingsState(SidebarState.VISIBLE);
    }
  }

  const variants = {
    hidden: { display: "none" },
  };

  function onClickSettings() {
    setStatisticsAction(AnimationAction.SHOW);
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
          <SettingsButton setState={onClickSettings} />
        </div>
        <div>
          <div className="bg-primary ">
            <div className="pt-2">
              <Dropdowns dropdownPropsList={settings} />
            </div>
          </div>
          <SignButtons />
        </div>
      </div>
    </motion.div>
  );
}

const SignButtons = () => {
  const loginState = useAnimationStore((state) => state.loginState);
  const registerState = useAnimationStore((state) => state.registerState);
  const accountState = useAnimationStore((state) => state.accountState);
  const { setLoginAction, setRegisterAction, setAccountAction } =
    useAnimationStore();
  const user = useSettingsStore((state) => state.user);
  const token = useSettingsStore((state) => state.token);

  function isLoggedIn() {
    return user != "";
  }

  function onClickLogin() {
    if (loginState == SidebarState.VISIBLE) {
      setLoginAction(AnimationAction.HIDE);
    } else if (loginState == SidebarState.HIDDEN) {
      setLoginAction(AnimationAction.SHOW);
    }
  }

  function onClickRegister() {
    if (registerState == SidebarState.VISIBLE) {
      setRegisterAction(AnimationAction.HIDE);
    } else if (registerState == SidebarState.HIDDEN) {
      setRegisterAction(AnimationAction.SHOW);
    }
  }

  function onClickAccount() {
    if (accountState == SidebarState.VISIBLE) {
      setAccountAction(AnimationAction.HIDE);
    } else if (accountState == SidebarState.HIDDEN) {
      setAccountAction(AnimationAction.SHOW);
    }
  }
  if (token == "") {
    return (
      <div className="flex bg-primary">
        <button
          onClick={onClickLogin}
          className="flex-1 font-header uppercase text-white p-1 m-2 bg-secondary"
        >
          <span>Login</span>
        </button>
        <button
          onClick={onClickRegister}
          className="flex-1 font-header uppercase text-white p-1 m-2 bg-secondary"
        >
          <span>Register</span>
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex bg-primary pl-20 pr-20">
        <button
          onClick={onClickAccount}
          className="flex-1 font-header uppercase text-white p-1 m-2 bg-secondary "
        >
          <span>Account</span>
        </button>
      </div>
    );
  }
};

export default SettingsSidebar;
