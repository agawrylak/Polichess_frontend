import React, { useState } from "react";
import { API } from "../../api/API";
import { AxiosResponse } from "axios";
import Message from "../Message";
import { useAnimationStore } from "../../stores/AnimationStore";
import { useSettingsStore } from "../../stores/SettingsStore";
import { AnimationAction } from "../../utils/AnimationUtils";
import Sidebar from "../Sidebar";
import { LoadingButton } from "../Buttons";
import Input from "../Input";

const Login = (props: any) => {
  const { setLoginState, setAccountAction } = useAnimationStore();
  const { setUser, setToken } = useSettingsStore();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  function onClick() {
    setErrorMessage("");
    setLoading(true);
    API.login(username, password)
      .then((response: AxiosResponse<any>) => {
        setLoading(false);
        setUser(response.data.username);
        setToken(response.data.accessToken);
        setAccountAction(AnimationAction.SHOW);
      })
      .catch((error: any) => {
        console.log(error);
        setErrorMessage("Login failed");
        setLoading(false);
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
      footer={<Footer onClick={onClick} isLoading={isLoading} />}
      setState={setLoginState}
    />
  );
};

const Content = ({ errorMessage, setUsername, setPassword }: any) => {
  return (
    <div>
      <Message message={errorMessage} />
      <div>
        <Input inputName={"Name"} onChange={setUsername} />
        <Input
          inputName={"Password"}
          inputType={"password"}
          onChange={setPassword}
        />
      </div>
    </div>
  );
};
const Footer = ({ onClick, isLoading }: any) => {
  return (
    <div className="flex-2 ">
      <LoadingButton onClick={onClick} text={"Submit"} isLoading={isLoading} />
    </div>
  );
};

export default Login;
