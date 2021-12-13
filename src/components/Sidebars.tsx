import React, { useEffect } from "react";
import SettingsSidebar from "./SettingsSidebar";
import StatisticsSidebar from "./StatisticsSidebar";
import LoginSidebar from "./LoginSidebar";
import RegisterSidebar from "./RegisterSidebar";
import { useAnimation } from "framer-motion";
import { SidebarState, useAnimationStore } from "../stores/store";
import {
  hideHorizontalMenu,
  hideVerticalMenu,
  showHorizontalMenu,
  showVerticalMenu,
} from "../utils/AnimationUtils";
import useAsyncEffect from "use-async-effect";

const Sidebars = () => {
  const loginAnimation = useAnimation();
  const registerAnimation = useAnimation();
  const statisticsAnimation = useAnimation();
  const settingsAnimation = useAnimation();

  const loginState = useAnimationStore((state) => state.loginState);
  const registerState = useAnimationStore((state) => state.registerState);
  const settingsState = useAnimationStore((state) => state.settingsState);
  const statisticsState = useAnimationStore((state) => state.statisticsState);

  useAsyncEffect(async () => {
    if (
      settingsState == SidebarState.HIDDEN_TO_VISIBLE &&
      statisticsState == SidebarState.VISIBLE_TO_HIDDEN
    ) {
      await hideHorizontalMenu(statisticsAnimation);
      await showHorizontalMenu(settingsAnimation);
    } else if (
      statisticsState == SidebarState.HIDDEN_TO_VISIBLE &&
      settingsState == SidebarState.VISIBLE_TO_HIDDEN
    ) {
      if (loginState == SidebarState.VISIBLE) {
        await hideVerticalMenu(loginAnimation);
      }
      if (registerState == SidebarState.VISIBLE) {
        await hideVerticalMenu(registerAnimation);
      }

      await hideHorizontalMenu(settingsAnimation);
      await showHorizontalMenu(statisticsAnimation);
    }

    if (loginState == SidebarState.HIDDEN_TO_VISIBLE) {
      if (registerState == SidebarState.VISIBLE) {
        await hideVerticalMenu(registerAnimation);
        await showVerticalMenu(loginAnimation);
        return;
      } else if (registerState == SidebarState.HIDDEN) {
        await showVerticalMenu(loginAnimation);
      }
    }
    if (registerState == SidebarState.HIDDEN_TO_VISIBLE) {
      if (loginState == SidebarState.VISIBLE) {
        await hideVerticalMenu(loginAnimation);
        await showVerticalMenu(registerAnimation);
        return;
      } else if (loginState == SidebarState.HIDDEN) {
        await showVerticalMenu(registerAnimation);
      }
    }
    if (loginState == SidebarState.VISIBLE_TO_HIDDEN) {
      if (registerState == SidebarState.HIDDEN) {
        await hideVerticalMenu(loginAnimation);
      }
    }
    if (registerState == SidebarState.VISIBLE_TO_HIDDEN) {
      if (loginState == SidebarState.HIDDEN) {
        await hideVerticalMenu(registerAnimation);
      }
    }
  }, [loginState, registerState, statisticsState, settingsState]);

  return (
    <div className="w-screen md:w-96 flex flex-col flex-grow items-stretch z-10">
      <div className="z-20  relative">
        <SettingsSidebar animation={settingsAnimation} />
        <StatisticsSidebar animation={statisticsAnimation} />
      </div>
      <div className="z-0  relative ">
        <LoginSidebar animation={loginAnimation} />
        <RegisterSidebar animation={registerAnimation} />
      </div>
    </div>
  );
};

export default Sidebars;
