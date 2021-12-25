import React, { useEffect, useState } from "react";

import { useAnimationStore } from "../../stores/AnimationStore";
import { useSettingsStore } from "../../stores/SettingsStore";
import { AnimationAction, SidebarState } from "../../utils/AnimationUtils";
import { API } from "../../api/API";
import { useChessStore } from "../../stores/ChessStore";
import format from "date-fns/format";
import { parseISO } from "date-fns";
import Sidebar from "../Sidebar";

const History = (props: any) => {
  const { setHistoryState, setSettingsAction } = useAnimationStore();
  const historyState = useAnimationStore((state) => state.historyState);
  const token = useSettingsStore((state) => state.token);
  const [gameHistory, setGameHistory] = useState([]);

  useEffect(() => {
    const isVisible = historyState == SidebarState.VISIBLE;
    if (token != "" && isVisible) {
      API.getUserGames(token).then((response) => {
        setGameHistory(response.data);
      });
    }
  }, [historyState]);

  return (
    <Sidebar
      name={"History"}
      animation={props.animation}
      content={<Content gameHistory={gameHistory} />}
      footer={<Footer />}
      setState={setHistoryState}
      setAction={setSettingsAction}
      showIcon={true}
    />
  );
};

const Content = ({ gameHistory }: any) => {
  return (
    <div className="flex flex-col bg-primary text-center p-0 pt-2 font-bold text-center ">
      {gameHistory.length != 0 ? (
        <MatchHistory gameHistory={gameHistory} />
      ) : (
        <span className="pb-4">You do not have any match history yet.</span>
      )}
    </div>
  );
};

const Footer = () => {
  return null;
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
    fetchGameHistory(id);
  }

  function fetchGameHistory(id: string) {
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
      <div className="block pb-2 text-center ">
        <div>
          <span className="pr-2">
            {"Time:"}
            {props.match.date
              ? format(parseISO(props.match.date), "yyyy-MM-dd HH:mm")
              : "Date unknown"}
          </span>
        </div>
        <div>
          <span>
            Winner: {props.match.winner ? props.match.winner : "Winner unknown"}
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
export default History;
