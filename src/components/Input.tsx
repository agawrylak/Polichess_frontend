import React from "react";

interface InputProps {
  inputName: string;
  inputType: string;
  onChange: any;
}

const Input = ({ inputName, inputType, onChange }: InputProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 p-2">
      <span className="text-black font-black font-header uppercase">
        {inputName}
      </span>
      <input
        className="bg-background mr-2 ml-2"
        type={inputType}
        name={inputName}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

Input.defaultProps = {
  inputType: "text",
};
export default Input;
