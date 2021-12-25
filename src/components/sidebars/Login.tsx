import React, { useState } from "react";
import { API } from "../../api/API";
import { AxiosResponse } from "axios";
import ErrorMessage from "../ErrorMessage";
import { useAnimationStore } from "../../stores/AnimationStore";
import { useSettingsStore } from "../../stores/SettingsStore";
import { AnimationAction, SidebarState } from "../../utils/AnimationUtils";
import Sidebar from "../Sidebar";
import { TextButton } from "../Buttons";

const Login = (props: any) => {
  const { setLoginState, setAccountAction } = useAnimationStore();
  const { setUser, setToken } = useSettingsStore();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonText, setButtonText] = useState("Login");

  function onClick() {
    setErrorMessage("");
    setButtonText("...");
    API.login(username, password)
      .then((response: AxiosResponse<any>) => {
        setButtonText("Login");
        setUser(response.data.username);
        setToken(response.data.accessToken);
        setAccountAction(AnimationAction.SHOW);
      })
      .catch((error: any) => {
        console.log(error);
        setErrorMessage("Login failed");
      });
  }

  return (
    <Sidebar
      name={"Login"}
      animation={props.animation}
      content={
        <Content
          setUsername={setUsername}
          setPassword={setPassword}
          errorMessage={errorMessage}
        />
      }
      footer={<Footer onClick={onClick} text={buttonText} />}
      setState={setLoginState}
    />
  );
};

const Content = ({ errorMessage, setUsername, setPassword }: any) => {
  return (
    <div>
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
  );
};
const Footer = ({ onClick, text }: any) => {
  return (
    <div className="flex bg-primary pl-20 pr-20">
      <TextButton onClick={onClick} text={text} />
    </div>
  );
};

export default Login;
