import { Square } from "chess.js";

export enum GameOutcomeMessage {
  WIN = "YOU HAVE WON",
  LOSE = "YOU HAVE LOST",
  FIFTY_MOVE = "GAME ENDED BY FIFTY MOVE RULE",
  THREEFOLD_REPETITION = "GAME ENDED BY THREEFOLD REPETITION",
  STALEMATE = "GAME ENDED BY STALEMATE",
  INSUFFICIENT_MATERIAL = "GAME ENDED BECAUSE OF INSUFFICIENT MATERIAL",
  IN_PROGRESS = "THIS MODAL IS NOT SUPPOSED TO BE VISIBLE",
}

export interface piece {
  pieceName: string;
  color: string;
  link?: any;
}
export interface OnDropMove {
  sourceSquare: Square;
  targetSquare: Square;
}

export const allChessPieces: piece[] = [
  {
    pieceName: "k",
    color: "w",
    link: require("./assets/chess-pieces/wK.png"),
  },
  {
    pieceName: "q",
    color: "w",
    link: require("./assets/chess-pieces/wQ.png"),
  },
  {
    pieceName: "r",
    color: "w",
    link: require("./assets/chess-pieces/wR.png"),
  },
  {
    pieceName: "n",
    color: "w",
    link: require("./assets/chess-pieces/wN.png"),
  },
  {
    pieceName: "b",
    color: "w",
    link: require("./assets/chess-pieces/wB.png"),
  },
  {
    pieceName: "p",
    color: "w",
    link: require("./assets/chess-pieces/wP.png"),
  },
  {
    pieceName: "k",
    color: "b",
    link: require("./assets/chess-pieces/bK.png"),
  },
  {
    pieceName: "q",
    color: "b",
    link: require("./assets/chess-pieces/bQ.png"),
  },
  {
    pieceName: "r",
    color: "b",
    link: require("./assets/chess-pieces/bR.png"),
  },
  {
    pieceName: "n",
    color: "b",
    link: require("./assets/chess-pieces/bN.png"),
  },
  {
    pieceName: "b",
    color: "b",
    link: require("./assets/chess-pieces/bN.png"),
  },
  {
    pieceName: "p",
    color: "b",
    link: require("./assets/chess-pieces/bP.png"),
  },
];
