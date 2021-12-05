import React from "react";
import { motion, useAnimation } from "framer-motion";
import { SidebarState, useAnimationStore, useStore } from "../../stores/store";
import { AnimationDefinition } from "framer-motion/types/render/utils/animation";

const RegisterSidebar = (props: any) => {
  const animation = props.animation;
  const { setRegisterState } = useAnimationStore();

  const variants = {
    hidden: { display: "none" },
  };

  function onComplete(definition: AnimationDefinition | any) {
    if (definition.display == "none") {
      setRegisterState(SidebarState.HIDDEN);
    } else if (definition.display == "block") {
      setRegisterState(SidebarState.VISIBLE);
    }
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={animation}
      onAnimationComplete={(definition) => {
        onComplete(definition);
      }}
      className="mt-6"
    >
      <div className="font-monospaced md:pl-2 text-lg text-center">
        <div className="flex bg-secondary">
          <div className="flex-1 font-header uppercase text-white p-1 ml-[13px]">
            <span>Register</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RegisterSidebar;
