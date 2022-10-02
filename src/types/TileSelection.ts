import { TileSelectionType } from "../constants";

export type TileSelection = {
    type: TileSelectionType.SELECT
    payload: number
} | {
    type: TileSelectionType.INITIALIZE
    payload: number[]
}