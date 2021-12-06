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
      animate={props.animation}
      onAnimationComplete={(definition) => {
        onComplete(definition);
      }}
      className="mt-6"
    >
      <div className="font-monospaced text-lg text-center bg-primary">
        <div className="flex bg-secondary">
          <div className="flex-1 font-header uppercase text-white p-1 ">
            <span>Register</span>
          </div>
        </div>
        <div className="flex flex-col bg-primary text-center p-0 pt-2 font-bold text-center ">
          <div className="grid grid-cols-1 gap-1 ">
            <span className="text-black font-black font-header uppercase">
              Email:
            </span>
            <input
              className="ml-28 mr-28 bg-background border-solid border-opacity-100 rounded-none border-2 border-secondary"
              type="email"
              name="name"
            />
            <span className="text-black font-black font-header uppercase">
              Name:
            </span>
            <input
              className="ml-28 mr-28 bg-background border-solid border-opacity-100 rounded-none border-2 border-secondary"
              type="text"
              name="name"
            />
            <span className="text-black font-black font-header uppercase">
              Password:
            </span>
            <input
              className="ml-28 mr-28 bg-background border-solid border-opacity-100 rounded-none border-2 border-secondary"
              type="password"
              name="password"
            />
          </div>
        </div>
        <button className="w-40 font-header uppercase text-white m-2 p-1 bg-secondary">
          <span>Submit</span>
        </button>
      </div>
    </motion.div>
  );
};

export default RegisterSidebar;
