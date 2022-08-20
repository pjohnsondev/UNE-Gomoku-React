import { Game } from "../types";
import GameItem from "../components/GameItem"
import styles from "./History.module.css"
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context";
import { useLocalStorage } from "../hooks";


export default function History(){
    const { user } = useContext(UserContext)
    const [ gamesHistory ] = useLocalStorage<Record<string, number[]>>('games', {})

    if(!user) return <Navigate to='/login'/>

    const historyExists = () => {
        if(Object.entries(gamesHistory).length === 0){
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
            Object.keys(gamesHistory).map((value) => {
                const indexGame = gamesHistory[value]
                const formattedDate = new Date(indexGame.date.toLocaleString('en=AU'))
                return(
                    <GameItem key={indexGame.id} id={indexGame.id} winner={indexGame.winner} date={formattedDate} />
                )
                })
        )
    }

    return <div className={styles.container}>{historyExists()}</div>
}




