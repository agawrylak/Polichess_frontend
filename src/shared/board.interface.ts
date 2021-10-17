
export interface  move {
    id: number;
    pieceName: string;
    previousPosition: string;
    nextPosition: string;

}

export interface moveProps {
    moves: move[];
}

export interface piece {
    pieceName: string;
    color: string;
    link? : any;
}


export const allChessPieces : piece[] = [
    {
        "pieceName" : "k",
        "color" : "w",
        "link" : require('./assets/chess-pieces/wK.png')
    },
    {
        "pieceName" : "q",
        "color" : "w",
        "link" : require('./assets/chess-pieces/wQ.png')
    },
    {
        "pieceName" : "r",
        "color" : "w",
        "link" : require('./assets/chess-pieces/wR.png')
    },
    {
        "pieceName" : "n",
        "color" : "w",
        "link" : require('./assets/chess-pieces/wN.png')
    },
    {
        "pieceName" : "b",
        "color" : "w",
        "link" : require('./assets/chess-pieces/wB.png')
    },
    {
        "pieceName" : "p",
        "color" : "w",
        "link" : require('./assets/chess-pieces/wP.png')
    },
    {
        "pieceName" : "k",
        "color" : "b",
        "link" : require('./assets/chess-pieces/bK.png')
    },
    {
        "pieceName" : "q",
        "color" : "b",
        "link" : require('./assets/chess-pieces/bQ.png')
    },
    {
        "pieceName" : "r",
        "color" : "b",
        "link" : require('./assets/chess-pieces/bR.png')
    },
    {
        "pieceName" : "n",
        "color" : "b",
        "link" : require('./assets/chess-pieces/bN.png')
    },
    {
        "pieceName" : "b",
        "color" : "b",
        "link" : require('./assets/chess-pieces/bN.png')
    },
    {
        "pieceName" : "p",
        "color" : "b",
        "link" : require('./assets/chess-pieces/bP.png')
    }
]