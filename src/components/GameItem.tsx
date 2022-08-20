import { useNavigate } from "react-router-dom"
import styles from "./GameItem.module.css"

type GameProps = {
    id: number,
    winner: string,
    date: Date,
}

export default function GameItem(props: GameProps){
    const { id, winner, date } = props
    const navigate = useNavigate()
    const newDate = new Date(date).toLocaleString('en-AU')

    return(
        <div className={styles.gameInfo}>
            <span>Game #{id} @{newDate} Winner:{winner}</span>
            <button className={styles.button} onClick={() => navigate(`/game-log/${id}`)}>
                View game log
            </button>
        </div>
    )
    
   
}
// export{}