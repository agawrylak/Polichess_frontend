import React, { useState } from "react";
import {
  DropdownListProps,
  DropdownProps,
  Option,
  OptionProps,
} from "../../shared/settings.interface";
import { useSettingsStore } from "../../stores/store";
const Dropdowns = ({
  dropdownPropsList,
}: {
  dropdownPropsList: DropdownProps[];
}) => {
  return (
    <div>
      {dropdownPropsList.map((dropdownProps) => {
        return <Dropdown props={dropdownProps} />;
      })}
    </div>
  );
};
const Dropdown = ({ props }: { props: DropdownProps }) => {
  const [open, setOpen] = useState(false);
  function openDropdown() {
    setOpen(!open);
  }

  return (
    <div className="text-center font-bold">
      <button
        onClick={openDropdown}
        className="flex-1 w-40 font-header uppercase text-white m-1 p-1 bg-secondary"
      >
        <span>{props.label}</span>
      </button>
      {open ? (
        <DropdownList options={props.options} dropdownLabel={props.label} />
      ) : null}
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
    <div className="">
      <button onClick={onClickSetOption}>
        <div className={isSelected ? "font-bold " : "font-normal"}>
          <span className="">{option.label}</span>
        </div>
      </button>
    </div>
  );
};
export default Dropdowns;
