import React from "react";

const Message = (props: { message: string }) => {
  if (props.message === "") {
    return null;
  } else {
    return <span>{props.message}</span>;
  }
};

export default Message;
