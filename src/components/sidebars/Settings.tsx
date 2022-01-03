import React from "react";
import { useAnimationStore } from "../../stores/AnimationStore";
import { useSettingsStore } from "../../stores/SettingsStore";
import { AnimationAction, SidebarState } from "../../utils/AnimationUtils";
import Sidebar from "../Sidebar";
import { TextButton } from "../Buttons";
import { DropdownProps, settings } from "../../shared/settings.interface";
import { faChess } from "@fortawesome/free-solid-svg-icons";

function Settings(props: any) {
  const { setSettingsState, setStatisticsAction } = useAnimationStore();

  return (
    <Sidebar
      name={"Settings"}
      animation={props.animation}
      content={<Content />}
      footer={<Footer />}
      setAction={setStatisticsAction}
      setState={setSettingsState}
      icon={faChess}
    />
  );
}

const Footer = () => {
  const loginState = useAnimationStore((state) => state.loginState);
  const registerState = useAnimationStore((state) => state.registerState);
  const accountState = useAnimationStore((state) => state.accountState);
  const { setLoginAction, setRegisterAction, setAccountAction } =
    useAnimationStore();
  const token = useSettingsStore((state) => state.token);

  function onClickLogin() {
    if (loginState == SidebarState.VISIBLE) {
      setLoginAction(AnimationAction.HIDE);
    } else if (loginState == SidebarState.HIDDEN) {
      setLoginAction(AnimationAction.SHOW);
    }
  }

  function onClickRegister() {
    if (registerState == SidebarState.VISIBLE) {
      setRegisterAction(AnimationAction.HIDE);
    } else if (registerState == SidebarState.HIDDEN) {
      setRegisterAction(AnimationAction.SHOW);
    }
  }

  function onClickAccount() {
    if (accountState == SidebarState.VISIBLE) {
      setAccountAction(AnimationAction.HIDE);
    } else if (accountState == SidebarState.HIDDEN) {
      setAccountAction(AnimationAction.SHOW);
    }
  }

  if (token == "") {
    return (
      <div className="flex bg-primary">
        <TextButton onClick={onClickLogin} text={"Login"} />
        <TextButton onClick={onClickRegister} text={"Register"} />
      </div>
    );
  } else {
    return (
      <div className="flex bg-primary pl-20 pr-20">
        <TextButton onClick={onClickAccount} text={"Account"} />
      </div>
    );
  }
};

const Content = () => {
  return (
    <div className="bg-primary">
      {settings.map((setting) => {
        return <Select label={setting.label} options={setting.options} />;
      })}
    </div>
  );
};
const Select = ({ label, options }: DropdownProps) => {
  const { setOption } = useSettingsStore();

  function onChange(event: any) {
    setOption(label, event.target.value);
  }

  return (
    <div className="flex grid grid-cols-2 text-center font-bold p-2">
      <span
        className={"bg-primary text-black font-black font-header uppercase"}
      >
        {label}
      </span>
      <select
        className="mr-2 ml-2 bg-background"
        name={label}
        onChange={onChange}
      >
        {options.map((option: any) => {
          return <option label={option.label} value={option.value} />;
        })}
      </select>
    </div>
  );
};

export default Settings;
