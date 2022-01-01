import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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
    <div className="absolute right-0 top-1">
      <button
        onClick={setAction}
        className="mr-2 content-center justify-center align-middle"
      >
        <FontAwesomeIcon
          className="float-right text-white"
          icon={icon}
          size="lg"
        />
      </button>
    </div>
  );
};

export const LoadingButton = ({ onClick, text, isLoading }: any) => {
  const Icon = () => {
    return (
      <FontAwesomeIcon
        className="animate-spin	text-white"
        icon={faSpinner}
        size="lg"
      />
    );
  };
  const Text = () => {
    return <span>{text}</span>;
  };
  const buttonContent = isLoading ? <Icon /> : <Text />;

  return (
    <button
      onClick={onClick}
      className="w-1/2 font-header uppercase text-white p-1 m-2 bg-secondary"
    >
      {buttonContent}
    </button>
  );
};
