import React from "react";
import { motion } from "framer-motion";
import { AnimationDefinition } from "framer-motion/types/render/utils/animation";
import { SidebarState, useAnimationStore } from "../../stores/store";

const LoginSidebar = (props: any) => {
  const { setLoginState } = useAnimationStore();

  const variants = {
    hidden: { display: "none" },
  };

  function onComplete(definition: AnimationDefinition | any) {
    if (definition.display == "none") {
      setLoginState(SidebarState.HIDDEN);
    } else if (definition.display == "block") {
      setLoginState(SidebarState.VISIBLE);
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
      <div className="font-monospaced md:pl-2 text-lg text-center">
        <div className="flex bg-secondary">
          <div className="flex-1 font-header uppercase text-white p-1 ml-[13px]">
            <span>Login</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginSidebar;
