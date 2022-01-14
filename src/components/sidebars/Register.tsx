import React, { useState } from "react";
import Message from "../Message";
import { API } from "../../api/API";
import { AxiosResponse } from "axios";
import { useAnimationStore } from "../../stores/AnimationStore";
import Sidebar from "../Sidebar";
import { LoadingButton } from "../Buttons";
import Input from "../Input";

const Register = (props: any) => {
  const { setRegisterState } = useAnimationStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  function onClick() {
    setMessage("");
    setLoading(true);
    API.register(username, password, email)
      .then((response: AxiosResponse<any>) => {
        setMessage("Registered successfully");
        setLoading(false);
      })
      .catch((error: any) => {
        console.log(error);
        setMessage("Register failed");
        setLoading(false);
      });
  }

  return (
    <Sidebar
      name={"Register"}
      animation={props.animation}
      content={
        <Content
          setUsername={setUsername}
          setPassword={setPassword}
          setEmail={setEmail}
          message={message}
          setMessage={setMessage}
        />
      }
      footer={<Footer onClick={onClick} isLoading={isLoading} />}
      setState={setRegisterState}
    />
  );
};

const Content = ({
  setUsername,
  setPassword,
  setEmail,
  message,
  setMessage,
}: {
  setUsername: any;
  setPassword: any;
  setEmail: any;
  message: string;
  setMessage: any;
}) => {
  return (
    <div className="flex flex-col bg-primary text-center p-0 pt-2 font-bold text-center ">
      <Message message={message} />
      <div className="grid grid-cols-1">
        <Input
          inputName={"Email"}
          inputType={"email"}
          onChange={setEmail}
          regex={"123"}
          setMessage={setMessage}
        />
        <Input
          inputName={"Name"}
          onChange={setUsername}
          regex={"123"}
          setMessage={setMessage}
        />
        <Input
          inputName={"Password"}
          inputType={"password"}
          onChange={setPassword}
          regex={"123"}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
};

const Footer = ({
  onClick,
  isLoading,
}: {
  onClick: any;
  isLoading: boolean;
}) => {
  return (
    <div className="flex-1 items-stretch	grow shrink-0	">
      <LoadingButton onClick={onClick} text={"Submit"} isLoading={isLoading} />
    </div>
  );
};

export default Register;
