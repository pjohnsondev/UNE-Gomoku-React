import { Game } from "../types";
import GameItem from "../components/GameItem"
import styles from "./History.module.css"
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context";
import { useLocalStorage } from "../hooks";
import http from "../utils/http";


export default function History(){
    const { user } = useContext(UserContext)
    const [ gamesHistory, setHistory ] = useState<Game[]>([])

    // if(!user) return <Navigate to='/login'/>

    const fetchGamesHistory = async () => {
        const fetchedGames = await http<Game[]>(
            "/movies"
        )
        setHistory(fetchedGames)
    }

    useEffect(() => {
        fetchGamesHistory()
    }, [])

    const historyExists = () => {
        if(Object.entries(gamesHistory).length === 0){
            return (
                <>
                <h3 className={styles.message}>
                    <div>Hi {}, you currently have no games history.</div>
                    <div>Play some games and come back here to re-live your success!</div>
                </h3>
                </>
            )
        }
        return (
            gamesHistory.map((indexGame) => {
                const formattedDate = new Date(indexGame.date.toLocaleString('en=AU'))
                return(
                    <GameItem key={indexGame._id} _id={indexGame._id} winner={indexGame.winner} date={formattedDate} />
                )
                })
        )
    }

    return <div className={styles.container}>{historyExists()}</div>
}




