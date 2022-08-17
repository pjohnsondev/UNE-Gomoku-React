// class Tile {
//     id: number
//     player: PLAYER
//     stone: Stone
//     gameBoard: GameBoard
//     element: HTMLDivElement

//     constructor(id: number, gameBoard: GameBoard, hasStone: boolean = false){ 
//         this.id = id
//         this.gameBoard = gameBoard
//         this.player = PLAYER.NONE
//         this.stone = new Stone
//         this.element = document.createElement('div')
//         this.element.classList.add('tile')
//         this.element.setAttribute("id", id.toString())
//         this.element.append(this.stone.element)
//         this.element.addEventListener('click', () => {
//             this.handleClick()
//         })
//     }

    
//     StonesNS(tile: Tile){
//         let count = 1

//         console.log(gameSize)
//         // Check Nth line for required number of matching stones
//         let tileId = tile.id - gameSize
//         while(count < 6 && tileId >= 1 
//                 && tileId >= (tile.id - gameSize*5) 
//                 && document.getElementById(tileId.toString())?.classList.contains(tile.player.toLowerCase())) {
//             count++
//             if(count > 4) {
//                 return true
//             }
//             tileId = tileId-gameSize
//         }
//         tileId = tile.id + gameSize
//         while(count < 6 
//                 && tileId <= Math.pow(gameSize, 2) 
//                 && tileId <= (tile.id + gameSize*5) 
//                 && document.getElementById(tileId.toString())?.classList.contains(tile.player.toLowerCase())) {
//             count ++
//             if(count > 4) {
//                 return true
//             }
//             tileId = tileId+gameSize
//         }
        
//     }
    
//     // Check the Sth line for required number of matching stones
//     StonesEW(tile: Tile){
//         let count = 1
//         // Check West line for required number of matching tiles
//         let tileId = tile.id - 1
//         while(count < 6 
//                 && tileId%gameSize >= 0 
//                 && document.getElementById(tileId.toString())?.classList.contains(tile.player.toLowerCase())) {
//             count ++
//             if(count > 4) {
//                 return true
//             }
//             tileId = tileId-1
//         }
//         // Check East line for mathcing tiles
//         tileId = tile.id + 1
//         while(count < 6 
//                 && tileId%gameSize >= 0 
//                 && document.getElementById(tileId.toString())?.classList.contains(tile.player.toLowerCase())) {
//             count++
//             if(count > 4) {
//                 return true
//             }
//             tileId = tileId+1
//         }
//     }
    
//     StonesNESW(tile: Tile){
//         let count = 1

//         // Check NE line for required number of matching stones
//         let tileId = tile.id - gameSize + 1
//         while(count < 6 
//                 && tileId <= Math.pow(gameSize, 2)
//                 && (tileId%gameSize!=0 || (tileId - gameSize)%gameSize == 0)
//                 && document.getElementById(tileId.toString())?.classList.contains(tile.player.toLowerCase())) {
//             count ++
//             if(count > 4) {
//                 return true
//             }
//             tileId = tileId - gameSize + 1
//         }
//         // Check SW line for required number of matching stones
//         tileId = tile.id + gameSize - 1
//         while(count < 6 
//                 && tileId >=0
//                 && tileId <= Math.pow(gameSize, 2)
//                 && tileId%gameSize!=0
//                 && document.getElementById(tileId.toString())?.classList.contains(tile.player.toLowerCase())){
//             count ++
//             if(count > 4) {
//                 return true
//             }
//             tileId = tileId + gameSize - 1
//         }
//     }
    
//     stonesNWSE(tile: Tile){
//         let count = 1
       
//         // Check the SE line for required number of matching stones
//         let tileId = tile.id + gameSize + 1
//         while(count < 6 
//                 && tileId <= Math.pow(gameSize, 2)
//                 && tile.id%gameSize!=0 
//                 && document.getElementById(tileId.toString())?.classList.contains(tile.player.toLowerCase())) {
//             count ++
//             if(count > 4) {
//                 return true
//             }
//             tileId = tileId + gameSize + 1
//         }
//         //Check NW Line for required number of matching stones
//         tileId = tile.id - gameSize - 1
//         while(count < 6 
//                 && tileId >=0
//                 && tileId%gameSize!=0 
//                 && document.getElementById(tileId.toString())?.classList.contains(tile.player.toLowerCase())){
//             count ++
//             if(count > 4) {
//                 return true
//             }
//             tileId = tileId - gameSize - 1
//         }
//     }
    
//     didWin(tile: Tile){
//         if(this.StonesNS(tile) || this.StonesNESW(tile) || this.StonesEW(tile) || this.stonesNWSE(tile) ){
//             this.gameBoard.status = GAMESTATUS.COMPLETE
//             this.gameBoard.controls.message.element.innerHTML = currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1) + " Wins! Reset Board to Play Again"
    
//         }
//     }
    
//     // Check that there are tiles available to continue play and call draw if not
//     isDraw(tile: Tile){
//         let emptyTiles = Math.pow(gameSize, 2)

//         // Check map for tiles not allocated to a player
//         this.gameBoard.rows.map((row) => row.tiles.map((tile) => {
//             Array.from(tile.element.classList).map((value) => {
//                if(value == "white" || value == "black"){
//                 emptyTiles--
//                }
//             })}
//         ))
//         // Call draw if there are no more empty tiles
//         if(emptyTiles <= 0){
//             this.gameBoard.controls.message.element.innerHTML = "It's a Draw! Reset the Board to Play Again"
//             this.gameBoard.status = GAMESTATUS.COMPLETE
//         }
//     }

//     // Add stone if tile if free and game is active and check for win/draw
//     handleClick(){
//         if (this.player !== "NONE" || this.gameBoard.status == GAMESTATUS.COMPLETE) return
//         currentPlayer == "white" ? this.player = PLAYER.WHITE : this.player = PLAYER.BLACK
//         this.element.children[0].classList.remove("none")
//         this.element.children[0].classList.add(this.player.toLocaleLowerCase())
//         this.element.classList.add(this.player.toLocaleLowerCase())
//         this.didWin(this)
//         this.isDraw(this)
//         if(this.gameBoard.status == GAMESTATUS.ACTIVE){
//             currentPlayer === "black" ? currentPlayer = "white" : currentPlayer = "black"
//             this.gameBoard.controls.message.element.innerHTML = currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1) + " to Move"
//         }
//     }
// }
import { useState, useContext } from "react"
import { PLAYER } from "../constants"
import { UserContext } from "../context"
import Stone from "./Stone"
import styles from "./Tile.module.css"

type TileProps = {
    id: number
    onSelect: () => void
}

export default function Tile(props: TileProps) {
    const { id, onSelect} = props
    const { player, changeColor } = useContext(UserContext)
    const [ stone, setStone ] = useState(PLAYER.NONE)

    const getClassNames = () => {
        if(stone === PLAYER.NONE){
            return <Stone player={PLAYER.NONE}/>
        } else {
            switch(stone){
                case PLAYER.BLACK:
                    return <Stone player={PLAYER.BLACK}/>
                case PLAYER.WHITE:
                    return <Stone player={PLAYER.WHITE}/>
            }
        }
    }

    const handleClick = () => {
        if(player === PLAYER.WHITE){
            if(stone === PLAYER.NONE){
                setStone(player)
                onSelect()
                
            }
            changeColor(PLAYER.BLACK)
        } else {
            if(stone === PLAYER.NONE)
                setStone(PLAYER.BLACK)
                onSelect()
            changeColor(PLAYER.WHITE)
        }
    }
    
    return <div id={id.toString()} className={styles.tile} onClick={handleClick}>{getClassNames()}</div>
}