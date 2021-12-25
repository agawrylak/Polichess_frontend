import React from "react";
import { Settings } from "react-feather";

export const TextButton = ({ onClick, text }: any) => {
  return (
    <button
      onClick={onClick}
      className="flex-1 font-header uppercase text-white p-1 m-2 bg-secondary"
    >
      <span>{text}</span>
    </button>
  );
};

export const IconButton = ({ setAction, icon }: any) => {
  return (
    <button onClick={setAction} className="mr-2">
      <Settings color="white" />
    </button>
  );
};

export const LoadingButton = ({ setAction, icon, loading }: any) => {
  return (
    <button onClick={setAction} className="mr-2">
      <Settings color="white" />
    </button>
  );
};
