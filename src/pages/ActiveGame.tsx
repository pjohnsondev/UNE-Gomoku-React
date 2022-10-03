import { useContext, useEffect, useState, useCallback } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context";
import { GAMESTATUS, PLAYER, API_HOST} from "../constants";
import styles from "./Game.module.css"
import { GameBoard } from "../components";
import { del, get, post, put } from "../utils/http";
import { ActiveGame } from "../types";
import { delteActiveGame } from "../utils/apiCalls";


export default function ActiveGamePage(){
    const navigate = useNavigate()
    const { user, logout } = useContext(UserContext)
    const [activeGame, setActiveGame ] = useState<ActiveGame>()
    const { gameId } = useParams()
    const {player=PLAYER.BLACK,} = useContext(UserContext)
    const [board, clearBoard] = useState(true)
    const [gameStatus, changeGameStatus] = useState<GAMESTATUS>(GAMESTATUS.ACTIVE)
    
    const getActiveGame = useCallback(async () => {
        try {
            const result = await get<ActiveGame>(`${API_HOST}/active/${gameId}`)
            setActiveGame(result)
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

    function switchPlayer(){
        switch(player){
            case(PLAYER.BLACK):
                return PLAYER.WHITE
            default:
                return PLAYER.BLACK
        }
    }


    // TODO: Add delete in database to exit
    const handleExitClick = async () => {
            if(gameStatus === GAMESTATUS.COMPLETE) {
                await del(`${API_HOST}/active/${gameId}`)
                await post(`${API_HOST}/game`, {
                    ...activeGame
                })
                navigate(`/games`);
            } else {
                await delteActiveGame(activeGame._id)
                let path = `/`; 
                navigate(path);
            }
    }

    const handleClick = async (id: number) => {
        if(gameStatus === GAMESTATUS.COMPLETE || gameStatus === GAMESTATUS.DRAW){
            return
        } else {
            activeGame.moves.push(id)
            const updatedGame = await put(`${API_HOST}/active/${gameId}`, {
                ...activeGame
            })
            setActiveGame((updatedGame as ActiveGame))
            let winner = (updatedGame as ActiveGame).winner;
            if(winner === "black" || winner === "white" ){
                changeGameStatus(GAMESTATUS.COMPLETE)
            } else if(winner === "draw" ){
                changeGameStatus(GAMESTATUS.DRAW)
            }
        }     
    }
    
    const renderBoard = () => {
        if(board){
            if(gameStatus === GAMESTATUS.ACTIVE){
                return <GameBoard 
                _id = {activeGame._id}
                gameStatus = {gameStatus}
                boardSize = {boardSize} 
                player={player}
                boardClear={(boolean: boolean) => {
                    clearBoard(boolean)
                }}
                changePlayer={() => switchPlayer()}
                onClick={handleClick}            
                />
            } else {
                return <GameBoard
                _id = {activeGame._id} 
                gameStatus={gameStatus} 
                boardSize = {boardSize} 
                player={player}
                boardClear={(boolean: boolean) => {
                    clearBoard(boolean)
                }}
                changePlayer={() => switchPlayer()}
                onClick={handleClick}    
                />
            }
        } else {
            return <GameBoard
                _id = {activeGame._id} 
                gameStatus={gameStatus} 
                boardSize = {boardSize} 
                player={player}
                boardClear={(boolean: boolean) => {
                    clearBoard(boolean)
                }}
                changePlayer={() => switchPlayer()}
                reset = {true}
                onClick={handleClick}    
            />
        }
    }

    const checkWinner = () => {
        switch(activeGame.winner){
            case "black":
                return "Black"
            case "white":
                return "White"
            case "draw":
                return "Draw"
        }
    }

    const renderH2 = () => {
        if(gameStatus === GAMESTATUS.ACTIVE){
            return(
                <h2 className={styles.message}>
                    Current Player: {player?.charAt(0).toUpperCase()}{player?.slice(1).toLowerCase()}
                </h2>
            )
        } else if(gameStatus === GAMESTATUS.COMPLETE){
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
    
    const refresh = async () => {
        if(gameStatus === GAMESTATUS.COMPLETE || gameStatus === GAMESTATUS.DRAW){
            return
        } else {
            activeGame.moves = []
            await put(`${API_HOST}/active/${activeGame._id}`, {
                ...activeGame
            })
            clearBoard(false)
        }
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
