import { useContext, useEffect, useReducer, useState, useCallback } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context";
import { GAMESTATUS, PLAYER, TileSelectionType} from "../constants";
import styles from "./Game.module.css"
import { useLocalStorage } from "../hooks";
import { GameBoard } from "../components";
import { get, post, put, del } from "../utils/http";
import { ActiveGame, Game } from "../types";


const completeGame = (completedGame: ActiveGame, winner: PLAYER) => {
    return(
        {...completeGame, winner}
    )
}

type TileSelection = {
    type: TileSelectionType.SELECT | TileSelectionType.CLEAR
    payload: number
} | {
    type: TileSelectionType.INITIALIZE
    payload: number[]
}

function tileSelectionReducer(activeMoves: number[], action: TileSelection){
    const { type, payload } = action
    switch(type) {
        case TileSelectionType.INITIALIZE:
            return  payload
        case TileSelectionType.SELECT:
            return [...activeMoves, payload]
        case TileSelectionType.CLEAR:
            return activeMoves = []
        default:
            return activeMoves
    }
}


export default function GamePage(){
    const [activeMoves, dispatch] = useReducer(tileSelectionReducer, [])
    const navigate = useNavigate()
    const { user, logout } = useContext(UserContext)
    const [activeGame, setActiveGame ] = useState<ActiveGame>()
    const { gameId } = useParams()
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

    //////////////////
   
    
    const getActiveGame = useCallback(async () => {
        try {
            const result = await get<ActiveGame>(`/active/${gameId}`)
            setActiveGame(result)
            dispatch({
                type: TileSelectionType.INITIALIZE,
                payload: result.moves
            })
        } catch (err) {
            console.log((err as Error).message)
            logout()
            navigate("/")
        }
    }, [gameId, logout, navigate])

    useEffect(() => {
        if(!user) return
        getActiveGame()
    },[getActiveGame, user])


    if(!user) return <Navigate to="/login" />
    if(!activeGame) return null

    const { boardSize } = activeGame


    //////////////////////


    if(!user) return <Navigate to='/login'/>



    if(!boardSize) return null

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
                const completedGame = completeGame(activeGame, player)
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
                _id = {activeGame._id}
                gameStatus={gameStatus} 
                boardSize = {boardSize} 
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
                _id = {activeGame._id} 
                gameStatus={gameStatus["current status"]} 
                boardSize = {boardSize} 
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
                _id = {activeGame._id} 
                gameStatus={gameStatus} 
                boardSize = {boardSize} 
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
