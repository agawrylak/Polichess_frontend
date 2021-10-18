// @flow
import * as React from 'react';
import Chessboard from "chessboardjsx";
import {Square} from "chess.js";
import {useEffect} from "react";



interface OnDropMove {
    sourceSquare : Square;
    targetSquare : Square;
}
export const GameBoard = (props : any) => {

    let maxWidth = 900;

    const onDrop = (onDropMove : OnDropMove) => {
        const move = props.chessLogic.move({
            from: onDropMove.sourceSquare,
            to: onDropMove.targetSquare,
            promotion: "q"
        });

        if (move === null) return;

        let possibleMoves = props.chessLogic.getValidMoves();
        let randomIndex = Math.floor(Math.random() * possibleMoves.length);
        props.chessLogic.move(possibleMoves[randomIndex]);
        props.updateFen();
    }

    const handleResize = () => {
        if(window.innerWidth < maxWidth){
            maxWidth = window.innerWidth;
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })

    return (
        <div>
            <Chessboard
                onDrop={onDrop}
                calcWidth={
                (size) =>
                size.screenWidth > maxWidth &&
                size.screenHeight > maxWidth ? maxWidth : Math.min(size.screenWidth, size.screenHeight)}
                position={props.fen}/>
        </div>
    );
}