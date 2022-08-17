import { useContext, useReducer, useState } from "react";
import { Navigate, useParams  } from "react-router-dom";
import { UserContext } from "../context";
import { PLAYER, TileSelectionType  } from "../constants";
import games from "../data/gameLog.json"
import Tile from "../components/Tile";
import styles from "./Game.module.css"

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

export default function Game(){
    const { gameChoice } = useParams()
    const [state, dispatch] = useReducer(tileSelectionReducer, [])
    const { user } = useContext(UserContext)
    const {player, changeColor } = useContext(UserContext)
    const game = Object.keys(games).length + 1

    if(!user) return <Navigate to='/login'/>
    if(!player){
        changeColor(PLAYER.BLACK)
    }
    if(!gameChoice) return null

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
                    <button className={styles.button}>press here</button>
                    <button className={styles.button}>Or here</button>
                </div>
            </div>
    )
}