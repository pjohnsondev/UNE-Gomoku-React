import style from "./home.module.css"
import React, {useState} from "react" 
import { CSSTransition } from "react-transition-group"

const smallestBoard = 5
const LargestBoard = 19
export const gameSizes = [...Array(LargestBoard - smallestBoard + 1).keys()].map( (index) => index + smallestBoard)

export default function Home(props: any) {
    const [open, setOpen] = useState(false)
    
    function GameSize(props: any){
      return(
        <CSSTransition in={open === true } unmountOnExit timeout={500}> 
        <li className={style['game-size']} key={props.gameSize}>
          <a href="#">
            <span>{props.gameSize}x{props.gameSize}</span>
            {props.children}
          </a>
        </li>
        </CSSTransition>
      )
    }

    function GameSizes(){
      return (
        <ul className={style['game-sizes']} onClick={() => setOpen(!open)}> 
        <span>Select Game Size</span>
        {gameSizes.map((size) => (
          <GameSize gameSize = {size}/> 
        ))}
      </ul>
      )
    }

    return (
      <GameSizes/>
    )
  }
