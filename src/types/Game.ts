import { PLAYER } from "../constants"

export type Game = {
    id: number,
    boardSize: number,
    winner: PLAYER,
    date: Date, 
    moves: number[],
}
