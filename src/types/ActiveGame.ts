import { PLAYER } from "../constants"

export type ActiveGame = {
    _id: string, 
    gameId: number,
    boardSize: number,
    winner: PLAYER, 
    date: Date, 
    moves: number[],
    userId: string
}