import style from "./home.module.css"
import React, {useState} from "react" 
import { CSSTransition } from "react-transition-group"
import { Button } from 'semantic-ui-react'

const smallestBoard = 5
const LargestBoard = 19
export const gameSizes = [...Array(LargestBoard - smallestBoard + 1).keys()].map( (index) => index + smallestBoard)

export default function Home(props: any) {
    const [open, setOpen] = useState(true)
    const [selected, setSelected] = useState(false)
    const buttonText = "Start"
    let gameChoice: number

    function renderBoard(props: number){
      return(
        console.log(props)
      )
    }
    
    function GameSize(props: any){
      return(
        <CSSTransition in={open === true } unmountOnExit timeout={500}> 
        <li className={style['game-size']} key={props.gameSize} onClick={() => selected? setSelected(!selected) : gameChoice = props.gameSize}>
          <a href="#">
            <span>{props.gameSize}x{props.gameSize}</span>
          </a>
        </li>
        </CSSTransition>
      )
    }

    function GameSizes(){
      return (
        <div /*onClick={() => setOpen(!open)}*/>
          <ul className={style['game-sizes']}> 
            <span>Select Game Size</span>
            {gameSizes.map((size) => (
              <GameSize gameSize = {size} key={size}/> 
            ))}
          </ul>
        </div>
      )
    }

    return (
      <>
        <GameSizes/>
        <Button primary onClick={() => renderBoard(gameChoice)}>{buttonText}</Button>
      </>

    )
  }