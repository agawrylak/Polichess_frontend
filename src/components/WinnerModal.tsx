import React from "react";
import { useSettingsStore } from "../stores/SettingsStore";
import { API } from "../api/API";
import { GameOutcomeMessage } from "../shared/board.interface";
import { useChessStore } from "../stores/ChessStore";

const WinnerModal = (props: any) => {
  const token = useSettingsStore((state) => state.token);
  const { getHistory } = useChessStore();
  const { getOptionValue } = useSettingsStore();
  const playerColor = getOptionValue("Play as");

  function onClickYes() {
    API.saveGameHistory(token, getHistory(), getWinner()).then((response) => {
      console.log(response);
      props.closeModal();
    });
  }

  function onClickNo() {
    props.closeModal();
  }

  function getWinner() {
    if (props.outcome == GameOutcomeMessage.WIN) {
      const color = playerColor == "w" ? "White" : "Black";
      return color + " won (player)";
    } else if (props.outcome == GameOutcomeMessage.LOSE) {
      const color = playerColor == "w" ? "Black" : "White";
      return color + " won (AI)";
    } else {
      return "Draw";
    }
  }
  const SaveGameHistory = () => {
    return (
      <div>
        Do you want to save?
        <button onClick={onClickYes}>YES</button>
        <button>NO</button>
      </div>
    );
  };

  return (
    <div className="p-4">
      {props.outcome}
      {token != "" ? <SaveGameHistory /> : null}
    </div>
  );
};

export default WinnerModal;
