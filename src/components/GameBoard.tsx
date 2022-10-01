import { useContext, useReducer, useEffect, useCallback, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { GAMESTATUS } from "../constants"
import { TileSelectionType, PLAYER } from "../constants"
import Tile from "./Tile"
import  styles  from "./GameBoard.module.css"
import { ActiveGame } from "../types"
import { UserContext } from "../context"
import { get, post, put, del } from "../utils/http"
import Stone from "./Stone"

type gameBoardProps = {
    _id: string,
    gameStatus: GAMESTATUS
    boardSize: number
    player: PLAYER
    changeStatus: (activeMoves: number[], status: GAMESTATUS) => void
    changePlayer: () => void
    boardClear: (boolean: boolean) => void
    reset?: boolean
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



export default function GameBoard (props: gameBoardProps){
    const { user, logout } = useContext(UserContext)
    const [activeGame, setActiveGame ] = useState<ActiveGame>()
    const [activeMoves, dispatch] = useReducer(tileSelectionReducer, [])
    const { _id, boardSize, gameStatus, player, changeStatus, changePlayer, boardClear, reset} = props
    const navigate = useNavigate();

    ////////////////////////////

    const getActiveGame = useCallback(async () => {
        try {
            const result = await get<ActiveGame>(`/active/${_id}`)
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
    }, [_id, logout, navigate])

    useEffect(() => {
        if(!user) return
        getActiveGame()
    },[getActiveGame, user])


    if(!user) return <Navigate to="/login" />
    if(!activeGame) return null


    ////////////////////////////
    

    function StonesNS(index: number, moves: number[]){
        let count = 1
        // Check Nth line for required number of matching stones
        let tileId = index - boardSize
        while(count < 6 && tileId >= 1 && moves.includes(tileId)) {
            count++
            if(count > 4) {
                return true
            }
            tileId = tileId-boardSize
        }
        tileId = index + boardSize
        while(count < 6 
                && tileId <= Math.pow(boardSize, 2) 
                && tileId <= (index + boardSize*5)
                && moves.includes(tileId))  {
            count ++
            if(count > 4) {
                return true
            }
            tileId = tileId+boardSize
        }
    }

    function StonesEW(index: number, moves: number[]){
        let count = 1
        const modVal = boardSize -1
        // Check West line for required number of matching tiles
        let tileId = index - 1
        while(count < 6 
                && tileId%modVal >= 0 
                && moves.includes(tileId)) {
            count ++
            if(count > 4) {
                return true
            }
            tileId = tileId-1
        }
        // Check East line for mathcing tiles
        tileId = index + 1
        while(count < 6 
                && tileId%modVal >= 0 
                && moves.includes(tileId)) {
            count++
            if(count > 4) {
                return true
            }
            tileId = tileId+1
        }
    }

    function StonesNESW(index: number, moves: number[]){
        let count = 1
        const modVal = boardSize

        // Check NE line for required number of matching stones
        let tileId = index - boardSize + 1
        while(count < 6 
                && tileId <= Math.pow(boardSize, 2)
                && (tileId%modVal !==0)
                && moves.includes(tileId)) {
            count ++
            if(count > 4) {
                return true
            }
            tileId = tileId - boardSize + 1
        }
        // Check SW line for required number of matching stones
        tileId = index + boardSize - 1
        count = 1
        while(count < 6 
                && tileId >=0
                && (tileId+1)%modVal !==0
                && tileId <= Math.pow(boardSize, 2)
                && moves.includes(tileId)){
            count ++
            if(count > 4) {
                return true
            }
            tileId = tileId + boardSize - 1
        }
    }

    function stonesNWSE(index: number, moves: number[]){
        let count = 1
       
        // Check the SE line for required number of matching stones
        let tileId = index + boardSize + 1
        while(count < 6 
                && tileId <= Math.pow(boardSize, 2)
                && tileId%boardSize !== 0 
                && moves.includes(tileId)) {
            count ++
            if(count > 4) {
                return true
            }
            tileId = tileId + boardSize + 1
        }
        //Check NW Line for required number of matching stones
        tileId = index - boardSize - 1
        while(count < 6 
                && tileId >=0
                && tileId%boardSize!==0 
                && moves.includes(tileId)){
            count ++
            if(count > 4) {
                return true
            }
            tileId = tileId - boardSize - 1
        }
    }

    // will return true if game is won and will change game status to complete
    function didWin(index: number) {
        if(activeMoves.length < 4) return
        // get activeMoves array
        const movesArray = activeMoves
        //get the player who placed the recent stone
        const currentPlayer = player

        // if player is white loop through odd index of activeMoves array
        if(currentPlayer === PLAYER.WHITE){
            let whiteArray = []
            for(let i=1; i <= movesArray.length; i = i+2){
                whiteArray.push(movesArray[i])
            }
            // check if there is a win
            if(
                StonesNS(index, whiteArray) || 
                StonesEW(index, whiteArray) ||
                StonesNESW(index, whiteArray) ||
                stonesNWSE(index, whiteArray)
                ){
                    changeStatus(activeMoves, GAMESTATUS.COMPLETE)
            }
        } else {
            // if player is black loop through even index of activeMoves array
            let blackArray = []
            for(let i=0; i <= movesArray.length; i = i+2){
                blackArray.push(movesArray[i])
            }
            // check if there is a win
            if(
                StonesNS(index, blackArray) || 
                StonesEW(index, blackArray) ||
                StonesNESW(index, blackArray) ||
                stonesNWSE(index, blackArray)
                ){
                changeStatus(activeMoves, GAMESTATUS.COMPLETE)
            }
            // else if player is black loop through even index of array and 0
        } 
        
        if(movesArray.length + 1 === Math.pow(boardSize, 2)){
            changeStatus(activeMoves, GAMESTATUS.DRAW)
        }
    }

    function onTileClick(index: number, status: GAMESTATUS, player: PLAYER){
        // if(status === GAMESTATUS.COMPLETE) return
        // if(player === PLAYER.WHITE){
        //     if(stone === PLAYER.NONE){
        //         setStone(player)
        //         onSelect()
        //     }
        //     changeColor(PLAYER.BLACK)
        // } else {
        //     if(stone === PLAYER.NONE)
        //         setStone(PLAYER.BLACK)
        //         onSelect()
        //     changeColor(PLAYER.WHITE)
        // }
        console.log(index)
    }

    
    const renderTiles = () => {
        if(!reset){
            if(gameStatus=== GAMESTATUS.ACTIVE){
                return(
                    [...Array((boardSize*boardSize))].map((_,index) => (
                    <Tile 
                        key={`tile-${index}`} 
                        id={index}
                        onSelect={() => {
                            dispatch({type: TileSelectionType.SELECT, payload: index})
                            didWin(index)
                            changePlayer()
                            onTileClick(index , gameStatus, player)
                        }} 
                        status={gameStatus}
                        hasStone = {PLAYER.NONE}
                    />
                ))
                )
            } 
            // if game is complete then freeze board
            else {
                return(
                    [...Array((boardSize*boardSize))].map((_,index) => (
                    <Tile 
                        key={`tile-${index}`} 
                        id={index} 
                        onSelect={() => {
                            dispatch({type: TileSelectionType.SELECT, payload: index})
                            didWin(index)
                            changePlayer()
                        }} 
                        
                        status={gameStatus}
                        hasStone = {PLAYER.NONE}
                    />
                ))
                )
            }
        } else {
            //clear the activeMoves from the reducer and clear stones from board
            if(activeMoves.length !== 0) dispatch({type: TileSelectionType.CLEAR, payload: 0})
            boardClear(true)

        }
        
    }

    return(
        <div 
            className={styles.tiles} 
            style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}
        >
            {renderTiles()}
        </div>

    )
}