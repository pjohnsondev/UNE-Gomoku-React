import { useReducer, useEffect, useState } from "react"
import { GAMESTATUS } from "../constants"
import { TileSelectionType, PLAYER } from "../constants"
import Tile from "./Tile"
import  styles  from "./GameBoard.module.css"
import { stat } from "fs"

type gameBoardProps = {
    gameStatus: GAMESTATUS
    gameChoice: number
    player: PLAYER
    changeStatus: (state: number[], status: GAMESTATUS) => void
    changePlayer: () => void
    boardClear: (boolean: boolean) => void
    reset?: boolean
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
        case TileSelectionType.CLEAR:
            return state = []
        default:
            return state
    }
}

export default function GameBoard (props: gameBoardProps){
    const { gameStatus, gameChoice, player, changeStatus, changePlayer, boardClear, reset} = props
    const [state, dispatch] = useReducer(tileSelectionReducer, [])

    function StonesNS(index: number, moves: number[]){
        let count = 1
        // Check Nth line for required number of matching stones
        let tileId = index - gameChoice
        while(count < 6 && tileId >= 1 && moves.includes(tileId)) {
            count++
            if(count > 4) {
                return true
            }
            tileId = tileId-gameChoice
        }
        tileId = index + gameChoice
        while(count < 6 
                && tileId <= Math.pow(gameChoice, 2) 
                && tileId <= (index + gameChoice*5)
                && moves.includes(tileId))  {
            count ++
            if(count > 4) {
                return true
            }
            tileId = tileId+gameChoice
        }
    }

    function StonesEW(index: number, moves: number[]){
        let count = 1
        const modVal = gameChoice -1
        // Check West line for required number of matching tiles
        let tileId = index - 1
        while(count < 6 
                && tileId%modVal >= 0 
                && moves.includes(tileId)) {
            count ++
            if(count > 4) {
                return true
            }
            tileId = tileId-1
        }
        // Check East line for mathcing tiles
        tileId = index + 1
        while(count < 6 
                && tileId%modVal >= 0 
                && moves.includes(tileId)) {
            count++
            if(count > 4) {
                return true
            }
            tileId = tileId+1
        }
    }

    function StonesNESW(index: number, moves: number[]){
        let count = 1
        const modVal = gameChoice
        // Check NE line for required number of matching stones
        let tileId = index - gameChoice + 1
        while(count < 6 
                && tileId <= Math.pow(gameChoice, 2)
                && (tileId%modVal !==0 || (tileId - gameChoice)%modVal === 0)
                && moves.includes(tileId)) {
            count ++
            if(count > 4) {
                return true
            }
            tileId = tileId - gameChoice + 1
        }
        // Check SW line for required number of matching stones
        tileId = index + gameChoice - 1
        count = 1
        while(count < 6 
                && tileId >=0
                && tileId <= Math.pow(gameChoice, 2)
                && moves.includes(tileId)){
            count ++
            if(count > 4) {
                return true
            }
            tileId = tileId + gameChoice - 1
        }
    }

    function stonesNWSE(index: number, moves: number[]){
        let count = 1
       
        // Check the SE line for required number of matching stones
        let tileId = index + gameChoice + 1
        while(count < 6 
                && tileId <= Math.pow(gameChoice, 2)
                && tileId%gameChoice !== 0 
                && moves.includes(tileId)) {
            count ++
            if(count > 4) {
                return true
            }
            tileId = tileId + gameChoice + 1
        }
        //Check NW Line for required number of matching stones
        tileId = index - gameChoice - 1
        while(count < 6 
                && tileId >=0
                && tileId%gameChoice!==0 
                && moves.includes(tileId)){
            count ++
            if(count > 4) {
                return true
            }
            tileId = tileId - gameChoice - 1
        }
    }

    // will return true if game is won and will change game status to complete
    function didWin(index: number) {
        if(state.length < 4) return
        // get state array
        const movesArray = state
        //get the player who placed the recent stone
        const currentPlayer = player

        // if player is white loop through odd index of state array
        if(currentPlayer === PLAYER.WHITE){
            let whiteArray = []
            for(let i=1; i <= movesArray.length; i = i+2){
                whiteArray.push(movesArray[i])
            }
            // check if there is a win
            if(
                StonesNS(index, whiteArray) || 
                StonesEW(index, whiteArray) ||
                StonesNESW(index, whiteArray) ||
                stonesNWSE(index, whiteArray)
                ){
                    changeStatus(state, GAMESTATUS.COMPLETE)
            }
        } else {
            // if player is black loop through even index of state array
            let blackArray = []
            for(let i=0; i <= movesArray.length; i = i+2){
                blackArray.push(movesArray[i])
            }
            // check if there is a win
            if(
                StonesNS(index, blackArray) || 
                StonesEW(index, blackArray) ||
                StonesNESW(index, blackArray) ||
                stonesNWSE(index, blackArray)
                ){
                changeStatus(state, GAMESTATUS.COMPLETE)
            }
            // else if player is black loop through even index of array and 0
        } 
        
        if(movesArray.length + 1 === Math.pow(gameChoice, 2)){
            changeStatus(state, GAMESTATUS.DRAW)
        }
    }

    const renderTiles = () => {
        if(!reset){
            if(gameStatus=== GAMESTATUS.ACTIVE){
                return(
                    [...Array((gameChoice*gameChoice))].map((_,index) => (
                    <Tile 
                        key={`tile-${index}`} 
                        id={index} 
                        onSelect={() => {
                            dispatch({type: TileSelectionType.SELECT, payload: index})
                            didWin(index)
                            changePlayer()
                        }} 
                        status={gameStatus}
                        hasStone = {PLAYER.NONE}
                    />
                ))
                )
            } 
            // if game is complete then freeze board
            else {
                return(
                    [...Array((gameChoice*gameChoice))].map((_,index) => (
                    <Tile 
                        key={`tile-${index}`} 
                        id={index} 
                        onSelect={() => {
                            dispatch({type: TileSelectionType.SELECT, payload: index})
                            didWin(index)
                            changePlayer()
                        }} 
                        status={gameStatus}
                        hasStone = {PLAYER.NONE}
                    />
                ))
                )
            }
        } else {
            //clear the state from the reducer and clear stones from board
            if(state.length !== 0) dispatch({type: TileSelectionType.CLEAR, payload: 0})
            boardClear(true)

        }
        
    }

    return(
        <div 
            className={styles.tiles} 
            style={{ gridTemplateColumns: `repeat(${gameChoice}, 1fr)` }}
        >
            {renderTiles()}
        </div>

    )
}