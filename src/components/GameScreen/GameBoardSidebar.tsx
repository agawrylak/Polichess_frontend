import React from 'react';
import {allChessPieces} from "../../shared/board.interface";
import {Move} from "chess.js";


function GameBoardSidebar(props: any) {

    return (
        <div className="w-screen md:w-96 min-h-full flex flex-col flex-grow items-stretch">
            <div className="font-monospaced md:pl-2 text-lg text-center">
                <div className="flex bg-secondary">
                    <div className="flex-1 font-header uppercase text-white p-1">
                        <span>Easy bot</span>
                    </div>
                </div>
                <div className="bg-primary text-left p-0 pt-2 pb-2 font-bold ">
                    <div className="max-h-96 overflow-y-auto flex grid grid-cols-2 gap-0 ">
                        <div className="col-span-2 grid grid-cols-2">
                            <div className={'mx-auto w-full h-5 bg-white mb-2'}> </div>
                            <div className={'mx-auto w-full h-5 bg-black mb-2'}> </div>
                        </div>
                        {MoveHistory(props.history)}

                    </div>
                    <div className="flex grid grid-cols-2 gap-0 mt-2">
                        <div className="flex flex-grow flex-wrap justify-center justify-items-start">
                            {LostPieces(getCapturedPieces(props.history, 'b'))}
                        </div>
                        <div className="flex flex-grow flex-wrap justify-center justify-items-start	">
                            {LostPieces(getCapturedPieces(props.history, 'w'))}
                        </div>
                    </div>
                </div>
                <div className="flex bg-primary">
                    <button onClick={props.resetGame} className="flex-1 font-header uppercase text-white p-1 m-2 ml-20 mr-20 bg-secondary">
                        <span>Surrender</span>
                    </button>
                </div>

            </div>
        </div>
    );

}

const MoveHistory = (history : any[]) => {
    return history.map((move : any, index : number) => (
            <span className={"w-full text-center " + getColorForOddRow(index)}>
                <span >
                    {move.piece + move.from + " → " + move.piece + move.to}
                </span>
            </span>
    ))

}

const LostPieces = (lostPieces: any[]) => {
    return lostPieces.map((piece: any) => (
        <div>
            <img width="40" height="40" src={getImageForChessPiece(piece).default}/>
        </div>
    ))

}

const getColorForOddRow = (moveId: number) => {
    let number = moveId +1;
    const isOdd = number % 2 === 1
    if(isOdd){
        number += 1
    }
    const isRowOdd = (number / 2) % 2 === 0
    return  isRowOdd ? " bg-primary2 " : " bg-primary "
}

function getCapturedPieces(history: any[], color:string) {
    let capturedPieces: any[] = [];
    history.forEach((move) => {
        if('captured' in move && move.color == color){
            const capturedPiece = {
                color: getCapturedColor(move),
                pieceName: move.captured
            }
            capturedPieces.push(capturedPiece)
        }
    })
    console.log(capturedPieces)
    return capturedPieces;
}

function getCapturedColor(move: Move){
    return (move.color == 'b') ? 'w' : 'b';
}

const getImageForChessPiece = (piece: any) => {

    return allChessPieces?.find( (chessPiece: any ) => chessPiece.pieceName == piece.pieceName && chessPiece.color == piece.color)?.link;
}





export default GameBoardSidebar;