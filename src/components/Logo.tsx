import React from "react";
import { ReactComponent as LogoSVG } from "../shared/assets/logo.svg";

const Logo = ({ isMobile }: { isMobile: boolean }) => {
  const css = isMobile ? "md:hidden w-screen " : "hidden md:block ";
  return (
    <div className={`${css} mt-5`}>
      <LogoSVG className={"block mx-auto w-3/5 mb-2"} />
    </div>
  );
};

export default Logo;
