import React from "react";
import { useSettingsStore } from "../stores/SettingsStore";

const LoginStatus = () => {
  const username = useSettingsStore((state) => state.user);
  if (username == "") {
    return null;
  } else {
    return <span>You are logged in as: {username}</span>;
  }
};

export default LoginStatus;
