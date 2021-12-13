import React from "react";

const ErrorMessage = (props: { errorMessage: string }) => {
  if (props.errorMessage === "") {
    return null;
  } else {
    return <span>{props.errorMessage}</span>;
  }
};

export default ErrorMessage;
