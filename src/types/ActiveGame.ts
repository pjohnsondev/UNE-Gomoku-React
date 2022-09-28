export type ActiveGame = {
    _id: string,
    gameId: number,
    boardSize: number,
    date: Date, 
    moves: number[],
    userId: string
}