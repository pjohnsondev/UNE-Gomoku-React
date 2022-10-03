export enum PLAYER {
    NONE = "NONE",
    WHITE = "WHITE",
    BLACK = "BLACK",
    DRAW = "DRAW"
}

export enum TileSelectionType {
    SELECT = "SELECT",
    CLEAR = "CLEAR",
    INITIALIZE = "INITIALIZE"
}

export enum GAMESTATUS {
    ACTIVE = "ACTIVE",
    COMPLETE = "COMPLETE",
    DRAW = "DRAW"
}

export const API_HOST = process.env.REACT_APP_API_HOST || ''