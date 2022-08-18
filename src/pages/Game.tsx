// Possibly store details as array instead of object if necessary and while loop !== typofe string

import { useContext, useReducer, useState } from "react";
import { Navigate, useParams  } from "react-router-dom";
import { UserContext } from "../context";
import { PLAYER, TileSelectionType  } from "../constants";
import games from "../data/gameLog.json"
import Tile from "../components/Tile";
import styles from "./Game.module.css"
import { Game } from "../types";
import { useLocalStorage } from "../hooks";

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

function completeGame(){

}

const game1 = {
    id: 2,
    boardSize: 9,
    winner: "Black",
    date: "17 August 2022",
    moves: [4,1,9,10,3]
}



export default function GameBoard(){
    const { gameChoice } = useParams()
    const { user } = useContext(UserContext)
    const {player, changeColor } = useContext(UserContext)
    const game = Object.keys(games).length + 1
    const [localGames, saveGame] = useLocalStorage<Record<string, number[]>>(
        'games',
        {}
    )
    const selectedTiles = localGames[`Game-${game}`] || []
    const [state, dispatch] = useReducer(tileSelectionReducer, selectedTiles)
    // const[completedGame, completeGame] = 

    if(!user) return <Navigate to='/login'/>
    if(!player){
        changeColor(PLAYER.BLACK)
    }
    if(!gameChoice) return null


    const handleExitClick = () => {
            saveGame({...localGames, [`Game-${game}`]: state})
    
        /////////////////////////////////////////////////////////////////////
        // Need to find a way to pass entire game object to local storage////
        /////////////////////////////////////////////////////////////////////

    }


    return(
            <div className={styles.container}>
                <h2 className={styles.message}>
                    Current Player: {player?.charAt(0).toUpperCase()}{player?.slice(1).toLowerCase()}
                </h2>
                <div className={styles.gameBoard}>
                    <div 
                        className={styles.tiles} 
                        style={{ gridTemplateColumns: `repeat(${parseInt(gameChoice)}, 1fr)` }}
                    >
                        {[...Array((parseInt(gameChoice)*parseInt(gameChoice)))].map((_,index) => (
                            <Tile 
                                key={`tile-${index}`} 
                                id={index} 
                                onSelect={() => 
                                    dispatch({type: TileSelectionType.SELECT, payload: index})} 
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.controls}>
                    <button className={styles.button} onClick={handleExitClick}>press here</button>
                    <button className={styles.button}>Or here</button>
                </div>
            </div>
    )
}