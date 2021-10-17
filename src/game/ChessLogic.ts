import {ChessInstance, Move, ShortMove} from 'chess.js'



interface PossibleMoves {
    square: string;
}

export class ChessLogic{
    chessReq:any = require('chess.js');
    chess:ChessInstance;


    constructor(){
        this.chess = new this.chessReq();
    }

    getFen() {
        return this.chess.fen();
    }

    move(move : ShortMove): Move | null {
        return this.chess.move(move)
    }

    getValidMoves(possibleMoves : PossibleMoves) : string[]{
        return this.chess.moves(possibleMoves)
    }

    resetGame(): string {
        this.chess.reset();
        return this.getFen();
    }


    getHistory() {
        return this.chess.history({ verbose: true });
    }
}