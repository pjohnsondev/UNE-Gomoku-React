// import { Controls } from "./controls.js"

// let gameSize: number

// enum PLAYER{
//     WHITE = "WHITE",
//     BLACK = "BLACK",
//     NONE = "NONE"
// }

// enum GAMESTATUS{
//     ACTIVE = "ACTIVE",
//     COMPLETE = "COMPLETE"
// }

// //set starting player
// let currentPlayer = "black"


// class Row {
//     id: number 
//     tiles: Tile[]
//     element: HTMLDivElement

//     constructor(id: number, gameSize: number, gameBoard: GameBoard){
//         this.id = id
//         this.tiles = Array.from({length: gameSize}).map((_, index) => {
//             const tileId = gameSize * id + index +1
//             return new Tile(tileId, gameBoard)
//         })
//         this.element = document.createElement('div')
//         this.element.classList.add('row')
//         this.element.append(...this.tiles.map((tile) => tile.element))
//     }
// }

// export class GameBoard{
//     rows: Row[]
//     status: GAMESTATUS
//     controls: Controls
//     element: HTMLDivElement
    

//     constructor(gamesize: number, controls: Controls){
//         gameSize = gamesize
//         this.status = GAMESTATUS.ACTIVE
//         this.rows = Array.from({length: gamesize}).map((_, index) => {
//             return new Row(index, gamesize, this)
//         })
//         this.controls = controls
//         this.element = document.createElement('div')
//         this.element.classList.add("game-board")
//         this.element.append(...this.rows.map((row => row.element)))
//     }
// }


// export function createGameBoard(gameSize: number, controls: Controls){
//     const gameBoard = new GameBoard(gameSize, controls)
//     document.getElementById('main')?.append(gameBoard.element)
// }

export{}