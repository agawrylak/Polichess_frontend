import React from "react";

const Logo = ({ isMobile }: { isMobile: boolean }) => {
  const css = isMobile ? "md:hidden w-screen " : "hidden md:block ";
  return <span className={css + "text-5xl font-bold pb-1"}>PoliChess</span>;
};

export default Logo;
