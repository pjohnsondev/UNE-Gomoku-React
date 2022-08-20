import { PLAYER } from "../constants"

export type Game = {
    id: number,
    boardSize: number,
    winner: PLAYER,
    date: Date,
    moves: number[],
    // setId: (id: number) => void,
    // setBoardSize: (boardsize: number) => void,
    // setWinner: (winner: string) => void,
    // setDate: (date: string) => void,
    // setMoves: (moves: number[]) => void
}
