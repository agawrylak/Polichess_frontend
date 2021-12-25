import React, { useState } from "react";
import {
  DropdownListProps,
  DropdownProps,
  Option,
  OptionProps,
  settings,
} from "../../shared/settings.interface";
import { useAnimationStore } from "../../stores/AnimationStore";
import { useSettingsStore } from "../../stores/SettingsStore";
import {
  AnimationAction,
  hideDropdown,
  showDropdown,
  SidebarState,
} from "../../utils/AnimationUtils";
import Sidebar from "../Sidebar";
import { motion, useAnimation } from "framer-motion";
import { TextButton } from "../Buttons";

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
      showIcon={true}
    />
  );
}
const Content = () => {
  return (
    <div className="bg-primary ">
      <div className="pt-2">
        <Dropdowns dropdownPropsList={settings} />
      </div>
    </div>
  );
};
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
const Dropdowns = ({
  dropdownPropsList,
}: {
  dropdownPropsList: DropdownProps[];
}) => {
  return (
    <div className="flex grid grid-cols-2 text-center font-bold">
      {dropdownPropsList.map((dropdownProps) => {
        return <Dropdown props={dropdownProps} />;
      })}
    </div>
  );
};
const Dropdown = ({ props }: { props: DropdownProps }) => {
  const [open, setOpen] = useState(true);
  const animation = useAnimation();
  async function openDropdown() {
    setOpen(!open);
    if (open) {
      await hideDropdown(animation);
    } else {
      await showDropdown(animation);
    }
  }
  const variants = {
    hidden: { display: "block" },
  };

  return (
    <div>
      <div>
        <button
          onClick={openDropdown}
          className="w-40 bg-primary text-black font-black font-header uppercase"
        >
          <span>{props.label}</span>
        </button>
        <motion.div
          variants={variants}
          initial="hidden"
          animate={animation}
          className="flex-wrap"
        >
          <DropdownList options={props.options} dropdownLabel={props.label} />
        </motion.div>
      </div>
    </div>
  );
};

const DropdownList = ({ options, dropdownLabel }: DropdownListProps) => {
  return (
    <div>
      {options.map((option: Option) => {
        return <ListItem option={option} dropdownLabel={dropdownLabel} />;
      })}
    </div>
  );
};

const ListItem = ({ option, dropdownLabel }: OptionProps) => {
  const { setOption, getOptionValue } = useSettingsStore();
  const isSelected = option.value == getOptionValue(dropdownLabel);
  function onClickSetOption(): any {
    setOption(dropdownLabel, option.value);
  }

  return (
    <div>
      <button onClick={onClickSetOption}>
        <div className="bg-background border-solid border-opacity-100 rounded-none border-2 border-secondary w-32 mb-1">
          <span className={isSelected ? "font-bold " : "font-normal"}>
            {option.label}
          </span>
        </div>
      </button>
    </div>
  );
};
export default Settings;
