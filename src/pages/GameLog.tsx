import { useCallback, useContext, useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import styles from "./Game.module.css"
import { Tile } from "../components"
import { API_HOST, GAMESTATUS, PLAYER } from "../constants";
import { Game } from "../types";
import { get } from "../utils/http";
 

export default function GameLog(){
    const navigate = useNavigate()
    const { user, logout } = useContext(UserContext)
    const { id } = useParams()
    const [ gameDetails, setGameDetails ] = useState<Game>() 
    
    const getGame = useCallback(async () => {
        try {
            const result = await get<Game>(`${API_HOST}/game/${id}`)
            setGameDetails(result)
        } catch (err) {
            console.log((err as Error).message)
            logout()
            navigate("/")    
        }
    }, [id, logout, navigate])

    useEffect(() => {
        if(!user) return
        getGame()
    },[getGame, user])


    if(!user) return <Navigate to='/login' replace/>
    if(!gameDetails) return null


    const player = gameDetails.winner
    const gameChoice = gameDetails.boardSize
    const moves = gameDetails.moves

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
                        style={{ gridTemplateColumns: `repeat(${(gameChoice)}, 1fr)` }}
                    >
                        {[...Array(((gameChoice)*(gameChoice)))].map((_,index) => (
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

