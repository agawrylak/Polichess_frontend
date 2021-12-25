import React, { useState } from "react";
import ErrorMessage from "../ErrorMessage";
import { API } from "../../api/API";
import { AxiosResponse } from "axios";
import { useAnimationStore } from "../../stores/AnimationStore";
import Sidebar from "../Sidebar";
import { TextButton } from "../Buttons";

const Register = (props: any) => {
  const { setRegisterState } = useAnimationStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function onClick() {
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
    <Sidebar
      name={"Register"}
      animation={props.animation}
      content={
        <Content
          setUsername={setUsername}
          setPassword={setPassword}
          setEmail={setEmail}
          errorMessage={errorMessage}
        />
      }
      footer={<Footer onClick={onClick} />}
      setState={setRegisterState}
    />
  );
};

const Content = ({
  setUsername,
  setPassword,
  setEmail,
  errorMessage, //TODO: CHANGE THIS NAME
}: {
  setUsername: any;
  setPassword: any;
  setEmail: any;
  errorMessage: string;
}) => {
  return (
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
  );
};

const Footer = ({ onClick }: { onClick: any }) => {
  return (
    <div className="flex bg-primary pl-20 pr-20">
      <TextButton onClick={onClick} text={"Register"} />
    </div>
  );
};

export default Register;
