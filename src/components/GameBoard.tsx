import { useReducer } from "react"
import { GAMESTATUS } from "../constants"
import { TileSelectionType, PLAYER } from "../constants"
import Tile from "./Tile"
import  styles  from "./GameBoard.module.css"

type gameBoardProps = {
    _id: string,
    gameStatus: GAMESTATUS
    boardSize: number
    player: PLAYER
    changePlayer: () => void
    boardClear: (boolean: boolean) => void
    onClick: (id: number) => void
    reset?: boolean
}

type TileSelection = {
    type: TileSelectionType.SELECT | TileSelectionType.CLEAR
    payload: number
} | {
    type: TileSelectionType.INITIALIZE
    payload: number[]
}

function tileSelectionReducer(activeMoves: number[], action: TileSelection){
    const { type, payload } = action
    switch(type) {
        case TileSelectionType.INITIALIZE:
            return  payload
        case TileSelectionType.SELECT:
            return [...activeMoves, payload]
        case TileSelectionType.CLEAR:
            return activeMoves = []
        default:
            return activeMoves
    }
}



export default function GameBoard (props: gameBoardProps){
    const [activeMoves, dispatch] = useReducer(tileSelectionReducer, [])
    const { boardSize, gameStatus, changePlayer, boardClear, reset, onClick} = props

    
    const renderTiles = () => {
        if(!reset){
            if(gameStatus === GAMESTATUS.ACTIVE){
                return(
                    [...Array((boardSize*boardSize))].map((_,index) => (
                    <Tile 
                        key={`tile-${index}`} 
                        id={index}
                        status={gameStatus}
                        hasStone = {PLAYER.NONE}
                        onSelect={() => {
                            dispatch({type: TileSelectionType.SELECT, payload: index})
                            changePlayer()
                            onClick(index)
                        }} 
                    />
                ))
                )
            } 
            // if game is complete then freeze board
            else {
                return(
                    [...Array((boardSize*boardSize))].map((_,index) => (
                    <Tile 
                        key={`tile-${index}`} 
                        id={index} 
                        status={gameStatus}
                        hasStone = {PLAYER.NONE}
                        onSelect={() => {
                            dispatch({type: TileSelectionType.SELECT, payload: index})
                            changePlayer()
                            onClick(index)
                        }} 
                    />
                ))
                )
            }
        } else {
            //clear the activeMoves from the reducer and clear stones from board
            if(activeMoves.length !== 0) dispatch({type: TileSelectionType.CLEAR, payload: 0})
            boardClear(true)

        }
        
    }

    return(
        <div 
            className={styles.tiles} 
            style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}
        >
            {renderTiles()}
        </div>

    )
}