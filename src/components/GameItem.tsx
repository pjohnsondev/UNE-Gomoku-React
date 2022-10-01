import { useNavigate } from "react-router-dom"
import styles from "./GameItem.module.css"

type GameProps = {
    _id: string,
    gameId: number,
    winner: string,
    date: Date,
}

export default function GameItem(props: GameProps){
    const { gameId, winner, date, _id } = props
    const navigate = useNavigate()
    const newDate = new Date(date).toLocaleString('en-AU')

    return(
        <div className={styles.gameInfo}>
            <span>Game #{gameId} @{newDate} Winner:{winner}</span>
            <button className={styles.button} onClick={() => navigate(`/game-log/${_id}`)}>
                View game log
            </button>
        </div>
    )
    
   
}