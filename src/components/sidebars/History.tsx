import React, { useEffect, useState } from "react";

import { useAnimationStore } from "../../stores/AnimationStore";
import { useSettingsStore } from "../../stores/SettingsStore";
import { AnimationAction, SidebarState } from "../../utils/AnimationUtils";
import { API } from "../../api/API";
import { useChessStore } from "../../stores/ChessStore";
import format from "date-fns/format";
import { parseISO } from "date-fns";
import Sidebar from "../Sidebar";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const History = (props: any) => {
  const { setHistoryState, setSettingsAction } = useAnimationStore();
  const historyState = useAnimationStore((state) => state.historyState);
  const token = useSettingsStore((state) => state.token);
  const [gameHistory, setGameHistory] = useState([]);
  const [isLoadingFinished, setLoadingFinished] = useState(false);

  useEffect(() => {
    setGameHistory([]);
    setLoadingFinished(false);

    const isVisible = historyState == SidebarState.VISIBLE;
    if (token != "" && isVisible) {
      API.getUserGames(token).then((response) => {
        setGameHistory(response.data);
        setLoadingFinished(true);
      });
    }
  }, [historyState]);

  return (
    <Sidebar
      name={"History"}
      animation={props.animation}
      content={
        <Content
          gameHistory={gameHistory}
          isLoadingFinished={isLoadingFinished}
        />
      }
      footer={<Footer />}
      setState={setHistoryState}
      setAction={setSettingsAction}
      icon={faCog}
    />
  );
};

const Content = ({ gameHistory, isLoadingFinished }: any) => {
  return (
    <div className="flex flex-col bg-primary text-center text-center ">
      {gameHistory.length != 0 && isLoadingFinished ? (
        <MatchHistory gameHistory={gameHistory} />
      ) : (
        <HistoryMessage isLoadingFinished={isLoadingFinished} />
      )}
    </div>
  );
};

const HistoryMessage = ({
  isLoadingFinished,
}: {
  isLoadingFinished: boolean;
}) => {
  const EmptyHistoryMessage = () => {
    return <span className="pb-4">You do not have any match history yet.</span>;
  };

  const LoadingMessage = () => {
    return <span className="pb-4">Loading...</span>;
  };

  if (isLoadingFinished) {
    return <EmptyHistoryMessage />;
  } else {
    return <LoadingMessage />;
  }
};

const Footer = () => {
  return null;
};

const MatchHistory = ({ gameHistory }: any) => {
  return (
    <div>
      <div className="grid grid-cols-5 gap-1 text-center font-bold ">
        <span className="col-span-2">{"DATA"}</span>
        <span className="col-span-2">WINNER</span>
        <span className="col-span-1">{""}</span>
      </div>
      <div>
        {gameHistory.map((match: any) => {
          return <Match match={match} />;
        })}
      </div>
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
    <div className={"p-1"}>
      <div className="grid grid-cols-5 gap-1 pb-2 text-center ">
        <span className="col-span-2">
          {props.match.date
            ? format(parseISO(props.match.date), "yyyy-MM-dd HH:mm")
            : "Unknown"}
        </span>
        <span className="col-span-2">
          {props.match.winner ? props.match.winner : "Unknown"}
        </span>
        <button
          onClick={onClick}
          className="mr-1 font-header uppercase text-white bg-secondary"
        >
          <span>{"Load"}</span>
        </button>
      </div>
    </div>
  );
};
export default History;
