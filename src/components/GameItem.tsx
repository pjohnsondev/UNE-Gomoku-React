import { useNavigate } from "react-router-dom"
import styles from "./GameItem.module.css"

type GameProps = {
    id: number,
    winner: string,
    date: string,
}

export default function GameItem(props: GameProps){
    const { id, winner, date } = props
    const navigate = useNavigate()

    return(
        <div className={styles.gameInfo}>
            <span>Game #{id} @{date} Winner:{winner}</span>
            <button className={styles.button} onClick={() => navigate(`game-log/${id}`)}>
                View game log
            </button>
        </div>
    )
    

}
// export{}