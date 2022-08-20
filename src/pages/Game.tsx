import { useContext, useReducer } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context";
import { GAMESTATUS, PLAYER, TileSelectionType  } from "../constants";
import Tile from "../components/Tile";
import styles from "./Game.module.css"
import { useLocalStorage } from "../hooks";

type TileSelection = {
    type: TileSelectionType
    payload: number
}


function tileSelectionReducer(state: number[], action: TileSelection){
    const { type, payload } = action
    switch(type) {
        case TileSelectionType.SELECT:
            return [...state, payload]
        default:
            return state
    }
}

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

export default function GameBoard(){
    const { gameChoice } = useParams()
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const {player= PLAYER.BLACK, changeColor } = useContext(UserContext)
    const [localGames, saveGame] = useLocalStorage<object>(
        'games',
        {}
    )
    const gameStatus = GAMESTATUS.ACTIVE
    const gameNumber = Object.keys(localGames).length + 1
    const [state, dispatch] = useReducer(tileSelectionReducer, [])

    if(!user) return <Navigate to='/login'/>
    if(!gameChoice) return null


    const handleExitClick = () => {
            if(!player) return <Navigate to='/login'/>
            const date = new Date()
            const completedGame = completeGame(gameNumber, gameChoice, player, date, state)
            saveGame({...localGames, [`${gameNumber}`]: completedGame})
    }


    return (
            <div className={styles.container}>
                <h2 className={styles.message}>
                    Current Player: {player?.charAt(0).toUpperCase()}{player?.slice(1).toLowerCase()}
                </h2>
                <div className={styles.gameBoard}>
                    <div 
                        className={styles.tiles} 
                        style={{ gridTemplateColumns: `repeat(${parseInt(gameChoice)}, 1fr)` }}
                    >
                        {[...Array((parseInt(gameChoice)*parseInt(gameChoice)))].map((_,index) => (
                            <Tile 
                                key={`tile-${index}`} 
                                id={index} 
                                onSelect={() => 
                                    dispatch({type: TileSelectionType.SELECT, payload: index})} 
                                status={gameStatus}
                                hasStone = {PLAYER.NONE}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.controls}>
                    <button className={styles.button} onClick={handleExitClick}>press here</button>
                    <button className={styles.button} onClick={() => navigate(`/`)}>Or here</button>
                </div>
            </div>
    )
}
