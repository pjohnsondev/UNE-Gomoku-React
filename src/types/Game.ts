import { PLAYER } from "../constants"

export type Game = {
    _id: string
    GameId: number,
    boardSize: number,
    winner: PLAYER,
    date: Date, 
    moves: number[],
    userId: string
}
