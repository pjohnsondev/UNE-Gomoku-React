import { useContext, useEffect, useState, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import { get } from "../utils/http";
import { Game } from "../types";
import GameItem from "../components/GameItem" 
import styles from "./History.module.css"
import { API_HOST } from "../constants";


export default function History(){
    const { user, logout } = useContext(UserContext)
    const navigate = useNavigate()
    const [ gamesHistory, setHistory ] = useState<Game[]>([])

    const fetchGamesHistory = useCallback(async () => {
        try {
            const fetchedGames = await get<Game[]>(
                `${API_HOST}/game`
            )
            setHistory(fetchedGames)            
        } catch (err) {
            console.log((err as Error).message)
            logout()
            navigate('/')
        }
    }, [logout, navigate])
  
    useEffect(() => {
        if(!user) return
        fetchGamesHistory()
    }, [fetchGamesHistory, user])

    const historyExists = () => {
        if(!user) return <Navigate to='/login'/>
        if(gamesHistory.length === 0){
            return (
                <>
                <h3 className={styles.message}>
                    <div>Hi {user.username}, you currently have no games history.</div>
                    <div>Play some games and come back here to re-live your success!</div>
                </h3>
                </>
            )
        }
        return (
            gamesHistory.map((indexGame) => {
                const formattedDate = new Date(indexGame.date.toLocaleString('en=AU'))
                return(
                    <GameItem key={indexGame._id} _id={indexGame._id} gameId={indexGame.gameId} winner={indexGame.winner} date={formattedDate} />
                )
                })
        )
    }

    return <div className={styles.container}>{historyExists()}</div>
}




