import { useContext } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import { useLocalStorage } from "../hooks";
import styles from "./Game.module.css"
import { Tile } from "../components"
import { GAMESTATUS, PLAYER } from "../constants";

export default function GameLog(){
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const { id } = useParams()
    const [ gamesHistory ] = useLocalStorage<Record<string, number[]>>('games', {})
    const gameDetails = () => {
        for(const game in gamesHistory){
            if(game === id){
                return gamesHistory[parseInt(game)]
            }
        }
    }
    const player = gameDetails().winner
    const gameChoice = gameDetails().boardSize
    const moves = gameDetails().moves

    if(!user) return <Navigate to='/login'/>

    const checkStone = (index: number) => {
        if(moves.includes(index)){
            if(moves.indexOf(index)%2 === 0 || moves.indexOf(index) === 0){
                return PLAYER.BLACK
            } else {
                return PLAYER.WHITE
            }          
        } else {
            return PLAYER.NONE
        }
    }

    const checkMove = (index: number) => {
        if(moves.includes(index)){
                return moves.indexOf(index) + 1
        }
    }


    return(
        <div className={styles.container}>
                <h2 className={styles.message}>
                    Winner: {player?.charAt(0).toUpperCase()}{player?.slice(1).toLowerCase()}
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
                                onSelect={() => null }
                                status = {GAMESTATUS.COMPLETE}
                                hasStone = {checkStone(index)}
                                move = {checkMove(index)}

                            />
                        ))}
                    </div>
                </div>
                <div className={styles.controls}>
                    <button className={styles.button} onClick={() => navigate(`/games`)}>Back</button>
                </div> 


            </div>
    )
    }