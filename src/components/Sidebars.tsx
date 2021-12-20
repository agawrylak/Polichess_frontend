import React, { useEffect } from "react";
import SettingsSidebar from "./SettingsSidebar";
import StatisticsSidebar from "./StatisticsSidebar";
import LoginSidebar from "./LoginSidebar";
import RegisterSidebar from "./RegisterSidebar";
import { useAnimation } from "framer-motion";
import {
  AnimatedObject,
  AnimationAction,
  doAnimations,
} from "../utils/AnimationUtils";
import useAsyncEffect from "use-async-effect";
import { useAnimationStore } from "../stores/AnimationStore";
import AccountSidebar from "./AccountSidebar";
import HistorySidebar from "./HistorySidebar";

const Sidebars = () => {
  const loginAnimation = useAnimation();
  const registerAnimation = useAnimation();
  const statisticsAnimation = useAnimation();
  const settingsAnimation = useAnimation();
  const historyAnimation = useAnimation();
  const accountAnimation = useAnimation();

  const loginState = useAnimationStore((state) => state.loginState);
  const registerState = useAnimationStore((state) => state.registerState);
  const settingsState = useAnimationStore((state) => state.settingsState);
  const statisticsState = useAnimationStore((state) => state.statisticsState);
  const historyState = useAnimationStore((state) => state.historyState);
  const accountState = useAnimationStore((state) => state.accountState);

  const loginAction = useAnimationStore((state) => state.loginAction);
  const registerAction = useAnimationStore((state) => state.registerAction);
  const settingsAction = useAnimationStore((state) => state.settingsAction);
  const statisticsAction = useAnimationStore((state) => state.statisticsAction);
  const historyAction = useAnimationStore((state) => state.historyAction);
  const accountAction = useAnimationStore((state) => state.accountAction);

  const {
    setLoginAction,
    setRegisterAction,
    setSettingsAction,
    setStatisticsAction,
    setHistoryAction,
    setAccountAction,
  } = useAnimationStore();

  useAsyncEffect(async () => {
    if (
      loginAction == AnimationAction.DO_NOTHING &&
      registerAction == AnimationAction.DO_NOTHING &&
      settingsAction == AnimationAction.DO_NOTHING &&
      statisticsAction == AnimationAction.DO_NOTHING &&
      historyAction == AnimationAction.DO_NOTHING &&
      accountAction == AnimationAction.DO_NOTHING
    ) {
      return;
    }
    const animatedLogin: AnimatedObject = {
      sidebar: {
        name: "Login",
        placementId: 2,
        childOf: "Settings",
        state: loginState,
      },
      animation: {
        action: loginAction,
        animation: loginAnimation,
        orientation: "vertical",
      },
    };

    const animatedRegister: AnimatedObject = {
      sidebar: {
        name: "Register",
        placementId: 2,
        childOf: "Settings",
        state: registerState,
      },
      animation: {
        action: registerAction,
        animation: registerAnimation,
        orientation: "vertical",
      },
    };

    const animatedSettings: AnimatedObject = {
      sidebar: {
        name: "Settings",
        placementId: 1,
        childOf: "",
        state: settingsState,
      },
      animation: {
        action: settingsAction,
        animation: settingsAnimation,
        orientation: "horizontal",
      },
    };

    const animatedStatistics: AnimatedObject = {
      sidebar: {
        name: "Statistics",
        placementId: 1,
        childOf: "",
        state: statisticsState,
      },
      animation: {
        action: statisticsAction,
        animation: statisticsAnimation,
        orientation: "horizontal",
      },
    };

    const animatedHistory: AnimatedObject = {
      sidebar: {
        name: "History",
        placementId: 1,
        childOf: "",
        state: historyState,
      },
      animation: {
        action: historyAction,
        animation: historyAnimation,
        orientation: "horizontal",
      },
    };

    const animatedAccount: AnimatedObject = {
      sidebar: {
        name: "Account",
        placementId: 2,
        childOf: "Settings",
        state: accountState,
      },
      animation: {
        action: accountAction,
        animation: accountAnimation,
        orientation: "vertical",
      },
    };

    const animatedObjects = [
      animatedLogin,
      animatedRegister,
      animatedSettings,
      animatedStatistics,
      animatedHistory,
      animatedAccount,
    ];

    await doAnimations(animatedObjects);

    setLoginAction(AnimationAction.DO_NOTHING);
    setRegisterAction(AnimationAction.DO_NOTHING);
    setStatisticsAction(AnimationAction.DO_NOTHING);
    setSettingsAction(AnimationAction.DO_NOTHING);
    setHistoryAction(AnimationAction.DO_NOTHING);
    setAccountAction(AnimationAction.DO_NOTHING);
  }, [
    loginAction,
    registerAction,
    statisticsAction,
    settingsAction,
    historyAction,
    accountAction,
  ]);

  return (
    <div className="w-screen md:w-96 flex flex-col flex-grow items-stretch z-10">
      <span className="hidden md:block text-5xl font-bold">PoliChess</span>
      <div className="z-20  relative">
        <SettingsSidebar animation={settingsAnimation} />
        <StatisticsSidebar animation={statisticsAnimation} />
        <HistorySidebar animation={historyAnimation} />
      </div>
      <div className="z-0  relative ">
        <LoginSidebar animation={loginAnimation} />
        <RegisterSidebar animation={registerAnimation} />
        <AccountSidebar animation={accountAnimation} />
      </div>
    </div>
  );
};

export default Sidebars;
