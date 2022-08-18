import games from "../data/gameDetail.json"
import GameItem from "../components/GameItem"
import styles from "./History.module.css"
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context";

export default function History(){
    const { user } = useContext(UserContext)
    // const [ gamesHistory ] = useContext<Record<string, number[]>>()

    if(!user) return <Navigate to='/login'/>
    return(
        <div className={styles.container}>
            {games.length === 0 && <p>Fetching Games History</p>}
            {games.map(({ id, winner, date } ) => (
                <GameItem key={id} id={id} winner={winner} date={date} />
            ))}
        </div>
    )
}




