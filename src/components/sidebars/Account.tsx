import React from "react";
import { useAnimationStore } from "../../stores/AnimationStore";
import { useSettingsStore } from "../../stores/SettingsStore";
import { AnimationAction } from "../../utils/AnimationUtils";
import Sidebar from "../Sidebar";
import { TextButton } from "../Buttons";

const Account = (props: any) => {
  const { setAccountState, setAccountAction } = useAnimationStore();

  return (
    <Sidebar
      name={"Account"}
      animation={props.animation}
      content={<Content />}
      footer={<Footer />}
      setState={setAccountState}
      setAction={setAccountAction}
    />
  );
};

const Footer = () => {
  return (
    <div className="flex bg-primary">
      <LogoutButton />
      <HistoryButton />
    </div>
  );
};

const LogoutButton = () => {
  const { setUser, setToken } = useSettingsStore();
  const { setAccountAction } = useAnimationStore();

  function onClick() {
    setUser("");
    setToken("");
    setAccountAction(AnimationAction.HIDE);
  }

  return <TextButton onClick={onClick} text={"Logout"} />;
};

const HistoryButton = () => {
  const { setHistoryAction } = useAnimationStore();

  function onClick() {
    setHistoryAction(AnimationAction.SHOW);
  }

  return <TextButton onClick={onClick} text={"History"} />;
};

const Content = () => {
  const username = useSettingsStore((state) => state.user);
  if (username == "") {
    return null;
  } else {
    return <span>You are logged in as: {username}</span>;
  }
};

export default Account;
