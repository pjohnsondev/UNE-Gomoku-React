import { PLAYER } from "../constants"


export type Game = {
    id: number,
    boardSize: number,
    winner: string,
    date: string,
    moves: number[]
}

export type Player = {
    playercolor: PLAYER
}
