import React from "react";
import { TranslatedText } from "./TranslatedText";

interface InputProps {
  inputName: string;
  inputType: string;
  onChange: any;
  regex: string;
  setMessage: any;
}

const Input = ({
  inputName,
  inputType,
  onChange,
  regex,
  setMessage,
}: InputProps) => {
  function handleChange(value: string) {
    if (!value.match(regex)) {
      setMessage("oops");
    }
    onChange(value);
  }

  return (
    <div className="grid grid-cols-2 gap-2 p-2">
      <span className="text-black font-black font-header uppercase">
        <TranslatedText text={inputName} />
      </span>
      <input
        className="bg-option mr-2 ml-2 shadow-secondary"
        type={inputType}
        name={inputName}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

Input.defaultProps = {
  inputType: "text",
  regex: "",
  setMessage: () => {},
};
export default Input;

function withRegex(
  Component: any,
  regex: string,
  invalidMessage: string,
  setMessage: any
) {
  function setInvalidMessage() {
    setMessage(invalidMessage);
  }
  return <Component regex={regex} setMessage={setInvalidMessage} />;
}

export const NameInput = ({ onChange, setMessage }: any) => {
  const input = <Input inputName={"Name"} onChange={onChange} />;
  return withRegex(
    input,
    "123",
    "Name length has to be at least 3!",
    setMessage
  );
};

export const EmailInput = ({ onChange, setMessage }: any) => {
  const invalidMessage = "Email has at least 3 characters and contains @";
  function setInvalidMessage() {
    setMessage(invalidMessage);
  }
  const input = (
    <Input inputName={"Email"} onChange={onChange} setMessage={setMessage} />
  );
  return withRegex(input, "123", "", setMessage);
};

export const PasswordInput = ({ onChange, setMessage }: any) => {
  const input = (
    <Input inputName={"Password"} onChange={onChange} setMessage={setMessage} />
  );
  return withRegex(input, "123", "", setMessage);
};
