import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { AnimationDefinition } from "framer-motion/types/render/utils/animation";
import ErrorMessage from "./ErrorMessage";
import { API } from "../api/API";
import { AxiosResponse } from "axios";
import { useAnimationStore } from "../stores/AnimationStore";
import { SidebarState } from "../utils/AnimationUtils";

const RegisterSidebar = (props: any) => {
  const animation = props.animation;
  const { setRegisterState } = useAnimationStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  function onClickRegister() {
    setErrorMessage("");
    API.register(username, password, email)
      .then((response: AxiosResponse<any>) => {
        setErrorMessage("Registered successfully"); //TODO: FIX THIS
        console.log(response);
      })
      .catch((error: any) => {
        console.log(error);
        setErrorMessage("Register failed");
      });
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
      <div className="font-monospaced text-lg text-center bg-primary">
        <div className="flex bg-secondary">
          <div className="flex-1 font-header uppercase text-white p-1 ">
            <span>Register</span>
          </div>
        </div>
        <div className="flex flex-col bg-primary text-center p-0 pt-2 font-bold text-center ">
          <ErrorMessage errorMessage={errorMessage} />
          <div className="grid grid-cols-1 gap-1 ">
            <span className="text-black font-black font-header uppercase">
              Email:
            </span>
            <input
              className="ml-28 mr-28 bg-background border-solid border-opacity-100 rounded-none border-2 border-secondary"
              type="email"
              name="name"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="text-black font-black font-header uppercase">
              Name:
            </span>
            <input
              className="ml-28 mr-28 bg-background border-solid border-opacity-100 rounded-none border-2 border-secondary"
              type="text"
              name="name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className="text-black font-black font-header uppercase">
              Password:
            </span>
            <input
              className="ml-28 mr-28 bg-background border-solid border-opacity-100 rounded-none border-2 border-secondary"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={onClickRegister}
          className="w-40 font-header uppercase text-white m-2 p-1 bg-secondary"
        >
          <span>Submit</span>
        </button>
      </div>
    </motion.div>
  );
};

export default RegisterSidebar;
