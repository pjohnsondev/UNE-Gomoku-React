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
    const {player=PLAYER.BLACK, clearColor } = useContext(UserContext)
    const [moves, setMoves] = useState<number[]>([])
    const [board, clearBoard] = useState(true)
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
            if(gameStatus["current status"] === GAMESTATUS.COMPLETE) {
                const date = new Date()
                const completedGame = completeGame(gameNumber, gameChoice, player, date, moves)
                clearColor()
                changeGameStatus({"current status": GAMESTATUS.ACTIVE})
                saveGame({...localGames, [`${gameNumber}`]: completedGame})
                let path = `/games`; 
                navigate(path);
            } else {
                let path = `/`; 
                navigate(path);
            }
    }

    // Attempted to clear board but was unable to.
    const renderBoard = () => {
        if(board){
            if(gameStatus["current status"] === GAMESTATUS.ACTIVE){
                return <GameBoard 
                gameStatus={gameStatus} 
                gameChoice = {parseInt(gameChoice)} 
                player={player}
                changeStatus={(state: number[], status: GAMESTATUS) => {
                    changeGameStatus({"current status": status})
                    setMoves(state)
                }}
                boardClear={(boolean: boolean) => {
                    clearBoard(boolean)
                }}
                changePlayer={() => switchPlayer()}            
                />
            } else {
                return <GameBoard 
                gameStatus={gameStatus["current status"]} 
                gameChoice = {parseInt(gameChoice)} 
                player={player}
                changeStatus={(state: number[], status: GAMESTATUS) => {
                    changeGameStatus({"current status": status})
                    setMoves(state)
                }}
                boardClear={(boolean: boolean) => {
                    clearBoard(boolean)
                }}
                changePlayer={() => switchPlayer()}
                />
            }
        } else {
            return <GameBoard 
                gameStatus={gameStatus} 
                gameChoice = {parseInt(gameChoice)} 
                player={player}
                changeStatus={(state: number[], status: GAMESTATUS) => {
                    changeGameStatus({"current status": status})
                    setMoves(state)

                }}
                boardClear={(boolean: boolean) => {
                    clearBoard(boolean)
                }}
                changePlayer={() => switchPlayer()}
                reset = {true}
            />
        }
    }

    const checkWinner = () => {
        if(player === PLAYER.WHITE){
            return "Black"
        } else {
            return "White"
        }
    }

    const renderH2 = () => {
        if(gameStatus["current status"] === GAMESTATUS.ACTIVE){
            return(
                <h2 className={styles.message}>
                    Current Player: {player?.charAt(0).toUpperCase()}{player?.slice(1).toLowerCase()}
                </h2>
            )
        } else if(gameStatus["current status"] === GAMESTATUS.COMPLETE){
            return(
            <h2 className={styles.message}>
                Winner is: {checkWinner()}
            </h2>
            )
        } else {
            <h2 className={styles.message}>
                Its a Draw!
            </h2>
        }
    }

    const refresh = () => {
        clearBoard(false)
    }

    return (
            <div className={styles.container}>
                {renderH2()}
                {renderBoard()}
                <div className={styles.controls}>
                    <button className={styles.button} onClick={refresh}>Restart</button>
                    <button className={styles.button} onClick={handleExitClick}>Leave</button>
                </div>
            </div>
    )
}
