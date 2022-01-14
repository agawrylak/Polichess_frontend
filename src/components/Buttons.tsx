import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { TranslatedText } from "./TranslatedText";
import { motion, useAnimation } from "framer-motion";

export const TextButton = ({ onClick, text }: any) => {
  const animation = useAnimation();
  function handleClick() {
    animateButton();
    onClick();
  }
  async function animateButton() {
    await animation.start({
      scale: 0.98,
    });
    await animation.start({
      scale: 1,
    });
  }
  return (
    <motion.button
      className={`flex-1 font-header uppercase text-white p-1 m-2 bg-secondary shadow-primary rounded`}
      onClick={handleClick}
      animate={animation}
    >
      <TranslatedText text={text} />
    </motion.button>
  );
};

export const IconButton = ({ setAction, icon }: any) => {
  return (
    <div className="shadow shadow-black absolute right-0 top-1">
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
  const animation = useAnimation();
  function handleClick() {
    animateButton();
    onClick();
  }
  async function animateButton() {
    await animation.start({
      scale: 0.98,
    });
    await animation.start({
      scale: 1,
    });
  }
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
    return <TranslatedText text={text} />;
  };
  const buttonContent = isLoading ? <Icon /> : <Text />;

  return (
    <motion.button
      onClick={handleClick}
      className="w-1/2 font-header uppercase text-white p-1 m-2 bg-secondary shadow-primary rounded"
      animate={animation}
    >
      {buttonContent}
    </motion.button>
  );
};
