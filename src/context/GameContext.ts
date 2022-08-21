import { createContext } from "react";
import { Game } from "../types";

type GameContextType = {
    currentGame: Game 
    setId: (id: number) => void,
    setBoardSize: (boardsize: number) => void,
    setWinner: (winner: string) => void,
    setDate: (date: string) => void,
    setMoves: (moves: number[]) => void
    reset: () => void
}

const GameContext = createContext<GameContextType>({} as GameContextType)
export default GameContext