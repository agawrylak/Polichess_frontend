import React, { useEffect, useState } from "react";

import { AnimationDefinition } from "framer-motion/types/render/utils/animation";
import { motion } from "framer-motion";
import SettingsButton from "./SettingsButton";
import { useAnimationStore } from "../stores/AnimationStore";
import { useSettingsStore } from "../stores/SettingsStore";
import { AnimationAction, SidebarState } from "../utils/AnimationUtils";
import { API } from "../api/API";
import { useChessStore } from "../stores/ChessStore";
import format from "date-fns/format";
import { parseISO } from "date-fns";

const HistorySidebar = (props: any) => {
  const animation = props.animation;
  const { setHistoryState, setSettingsAction } = useAnimationStore();
  const user = useSettingsStore((state) => state.user);
  const token = useSettingsStore((state) => state.token);
  const [gameHistory, setGameHistory] = useState([]);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    if (token != "" && isVisible) {
      API.getUserGames(token).then((response) => {
        console.log(response.data);
        setGameHistory(response.data);
      });
    }
  }, [isVisible]);

  function onComplete(definition: AnimationDefinition | any) {
    if (definition.display == "none") {
      setHistoryState(SidebarState.HIDDEN);
      setVisible(false);
    } else if (definition.display == "block") {
      setHistoryState(SidebarState.VISIBLE);
      setVisible(true);
    }
  }

  const variants = {
    hidden: { display: "none" },
  };

  function isLoggedIn() {
    return user != "";
  }

  function setAction() {
    //TODO: CHANGE STATE TO ACTION RETARD
    setSettingsAction(AnimationAction.SHOW);
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={animation}
      onAnimationComplete={(definition) => {
        onComplete(definition);
      }}
      className="w-screen md:w-96 min-h-full flex flex-col flex-grow items-stretch z-10"
    >
      <div className="font-monospaced text-lg text-center">
        <div className="flex bg-secondary">
          <div className="ml-10  flex-1 font-header uppercase text-white p-1">
            <span className="">History</span>
          </div>
          <SettingsButton setState={setAction} />
        </div>
        <div className="flex flex-col bg-primary text-center p-0 pt-2 font-bold text-center ">
          <MatchHistory gameHistory={gameHistory} />
        </div>
      </div>
    </motion.div>
  );
};

const MatchHistory = ({ gameHistory }: any) => {
  return (
    <div>
      {gameHistory.map((match: any) => {
        return <Match match={match} />;
      })}
    </div>
  );
};

const Match = (props: any) => {
  const chess = useChessStore((state) => state.chess);
  const token = useSettingsStore((state) => state.token);
  const { setChess } = useChessStore();
  const { setStatisticsAction } = useAnimationStore();
  function onClick() {
    const id = props.match._id;
    API.getGameHistoryById(token, id).then((response: any) => {
      const history = response.data.moves;
      chess.reset();
      for (let i = 0; i < history.length; i++) {
        chess.move({ from: history[i].from, to: history[i].to });
      }
      setChess(chess);
      setStatisticsAction(AnimationAction.SHOW);
    });
  }
  return (
    <div>
      <div className="block pb-2 text-center">
        <div>
          <span className="pr-2">
            {props.match.date
              ? format(parseISO(props.match.date), "yyyy-MM-dd HH:mm")
              : "Date unknown"}
          </span>
        </div>
        <div>
          <span>
            {props.match.winner ? props.match.winner : "Winner unknown"}
          </span>
        </div>
      </div>
      <div>
        <button onClick={onClick}>
          <div className="bg-background border-solid border-opacity-100 rounded-none border-2 border-secondary w-32 mb-1">
            LOAD
          </div>
        </button>
      </div>
    </div>
  );
};
export default HistorySidebar;
