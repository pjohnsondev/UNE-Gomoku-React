import games from "../data/gameDetail.json"
import GameItem from "../components/GameItem"
import styles from "./History.module.css"

export default function History(){

    return(
        <div className={styles.container}>
            {games.length === 0 && <p>Fetching Games History</p>}
            {games.map(({ id, winner, date } ) => (
                <GameItem key={id} id={id} winner={winner} date={date} />
            ))}
        </div>
    )
}




