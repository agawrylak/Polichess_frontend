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
        <span>Do you want to save the game?</span>
        <div className="flex p-1">
          <button
            className="flex-1 font-header uppercase text-white p-1 m-2 bg-secondary"
            onClick={onClickYes}
          >
            YES
          </button>
          <button
            className="flex-1 font-header uppercase text-white p-1 m-2 bg-secondary"
            onClick={onClickNo}
          >
            NO
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-primary ">
      <span className="font-header uppercase text-3xl font-black">
        {props.outcome}
      </span>
      {token != "" ? <SaveGameHistory /> : null}
    </div>
  );
};

export default WinnerModal;
