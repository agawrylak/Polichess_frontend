import React, { useState } from "react";
import { motion } from "framer-motion";
import { AnimationDefinition } from "framer-motion/types/render/utils/animation";
import {
  SidebarState,
  useAnimationStore,
  useSettingsStore,
} from "../stores/store";
import { API } from "../api/API";
import { AxiosResponse } from "axios";
import ErrorMessage from "./ErrorMessage";

const LoginSidebar = (props: any) => {
  const { setLoginState } = useAnimationStore();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser, setToken } = useSettingsStore();

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

  function onClickLogin() {
    setErrorMessage("");
    API.login(username, password)
      .then((response: AxiosResponse<any>) => {
        setUser(response.data.username);
        setToken(response.data.accessToken);
        setLoginState(SidebarState.VISIBLE_TO_HIDDEN);
      })
      .catch((error: any) => {
        console.log(error);
        setErrorMessage("Login failed");
      });
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
            <span>Login</span>
          </div>
        </div>
        <div className="flex flex-col bg-primary text-center p-0 pt-2 font-bold text-center ">
          <ErrorMessage errorMessage={errorMessage} />
          <div className="grid grid-cols-1 gap-1 ">
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
          onClick={onClickLogin}
          className="w-40 font-header uppercase text-white m-2 p-1 bg-secondary"
        >
          <span>Submit</span>
        </button>
      </div>
    </motion.div>
  );
};

export default LoginSidebar;
