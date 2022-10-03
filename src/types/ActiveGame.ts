export type ActiveGame = {
    _id: string, 
    gameId: number,
    boardSize: number,
    winner: string, 
    date: Date, 
    moves: number[],
    userId: string
}