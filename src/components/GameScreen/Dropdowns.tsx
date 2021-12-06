import React, { useState } from "react";
import {
  DropdownListProps,
  DropdownProps,
  Option,
  OptionProps,
} from "../../shared/settings.interface";
import { useSettingsStore } from "../../stores/store";
import { useAnimation } from "framer-motion";
import { motion } from "framer-motion";
import {
  hideVerticalMenuDropdown,
  showVerticalMenuDropdown,
} from "../../utils/AnimationUtils";

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
      hideVerticalMenuDropdown(animation);
    } else {
      showVerticalMenuDropdown(animation);
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
export default Dropdowns;
