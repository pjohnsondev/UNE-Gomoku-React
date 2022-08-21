import { useReducer, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { GAMESTATUS } from "../constants"
import { TileSelectionType, PLAYER } from "../constants"
import Tile from "./Tile"
import  styles  from "./GameBoard.module.css"

type gameBoardProps = {
    gameStatus: GAMESTATUS
    gameChoice: number
    player: PLAYER
    changeStatus: (state: number[]) => void
    changePlayer: () => void
}

type TileSelection = {
    type: TileSelectionType
    payload: number
}

function tileSelectionReducer(state: number[], action: TileSelection){
    const { type, payload } = action
    switch(type) {
        case TileSelectionType.SELECT:
            return [...state, payload]
        default:
            return state
    }
}

export default function GameBoard (props: gameBoardProps){
    const { gameStatus, gameChoice, player, changeStatus, changePlayer } = props
    const [state, dispatch] = useReducer(tileSelectionReducer, [])

    if(gameStatus === GAMESTATUS.COMPLETE){
        return <Navigate to='/login'/>
    }

    // will return true if game is won and will change game status to complete
    function didWin(){
        // get state array
        //get the player who placed the recent stone

        // if player is white loop through odd index of state arrayBuffer
            // check if there is a win
        // else if player is black loop through even index of array and 0
 
        const win = true
            if (win) return changeStatus(state)
            
    }

    return(
        <div 
            className={styles.tiles} 
            style={{ gridTemplateColumns: `repeat(${gameChoice}, 1fr)` }}
        >
            {[...Array((gameChoice*gameChoice))].map((_,index) => (
                <Tile 
                    key={`tile-${index}`} 
                    id={index} 
                    onSelect={() => {
                        dispatch({type: TileSelectionType.SELECT, payload: index})
                        didWin()
                        changePlayer()
                    }} 
                    status={gameStatus}
                    hasStone = {PLAYER.NONE}
                />
            ))}
        </div>
    )
}