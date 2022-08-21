import { useContext, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context";
import { GAMESTATUS, PLAYER} from "../constants";
import styles from "./Game.module.css"
import { useLocalStorage } from "../hooks";
import GameBoard from "../components/GameBoard";


const completeGame = (id: number, boardSize: string, winner: PLAYER, date: Date, moves: number[]) => {
    return(
        {
            id: id,
            boardSize: boardSize,
            winner: winner,
            date: date,
            moves: moves
        }
    )
}

export default function Game(){
    const { gameChoice } = useParams()
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const {player= PLAYER.BLACK, changeColor } = useContext(UserContext)
    const [moves, setMoves] = useState<number[]>([])
    

    const [localGames, saveGame] = useLocalStorage<object>(
        'games',
        {}
    )
    const [gameStatus, changeGameStatus] = useLocalStorage<object>(
        'game status',
        []
    )
    const gameNumber = Object.keys(localGames).length + 1

    if(!user) return <Navigate to='/login'/>
    if(!gameChoice) return null

    function switchPlayer(){
        switch(player){
            case(PLAYER.BLACK):
                return PLAYER.WHITE
            default:
                return PLAYER.BLACK
        }
    }

    const handleExitClick = () => {
            if(!player) return <Navigate to='/login'/>
            const date = new Date()
            const completedGame = completeGame(gameNumber, gameChoice, player, date, moves)
            saveGame({...localGames, [`${gameNumber}`]: completedGame})
    }

    const renderBoard = () => {
        return <GameBoard 
                gameStatus={gameStatus} 
                gameChoice = {parseInt(gameChoice)} 
                player={player}
                changeStatus={(state: number[]) => {
                    changeGameStatus({"current status": GAMESTATUS.COMPLETE})
                    setMoves(state)         
                }
                }
                changePlayer={() => switchPlayer()}
            />
    }

    return (
            <div className={styles.container}>
                <h2 className={styles.message}>
                    Current Player: {player?.charAt(0).toUpperCase()}{player?.slice(1).toLowerCase()}
                </h2>
                {renderBoard()}
                <div className={styles.controls}>
                    <button className={styles.button} onClick={handleExitClick}>press here</button>
                    <button className={styles.button} onClick={() => navigate(`/`)}>Or here</button>
                </div>
            </div>
    )
}
