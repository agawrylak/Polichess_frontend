import React from "react";
import { faChessPawn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactComponent as LogoSVG } from "../shared/assets/logo4.svg";

const Logo = ({ isMobile }: { isMobile: boolean }) => {
  const css = isMobile ? "md:hidden w-screen " : "hidden md:block ";
  return (
    <div>
      <span className={css + "text-logo text-5xl font-bold pb-1"}>
        Poli
        <FontAwesomeIcon
          className="text-logo text-3xl pb-1"
          icon={faChessPawn}
        />
        Chess
      </span>
    </div>
  );
};

export default Logo;
