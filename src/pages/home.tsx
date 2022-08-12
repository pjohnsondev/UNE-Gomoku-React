// Assignment 2/gomoku-react/node_modules/postcss-initial change from _ to ~

import { useNavigate } from "react-router-dom"
import styles from "./Home.module.css"
import React, {useState} from "react" 
import { CSSTransition } from "react-transition-group"
import { Button } from 'semantic-ui-react'

const smallestBoard = 5
const LargestBoard = 19
export const gameSizes = [...Array(LargestBoard - smallestBoard + 1).keys()].map( (index) => index + smallestBoard)

export default function Home(props: any) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)
  const [selected, setSelected] = useState(false)
  const buttonText = "Start"
  let gameChoice: number
  
  function GameSize(props: any){
    return(
      <CSSTransition in={open === true } unmountOnExit timeout={500}> 
      <li className={styles['game-size']} key={props.gameSize} onClick={() => selected? setSelected(!selected) : gameChoice = props.gameSize}>
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
        <ul className={styles['game-sizes']}> 
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

      {/* create param equal to selected game size */}
      <Button primary onClick={() => navigate(`/game/${gameChoice}`)}>{buttonText}</Button>
    </>

  )
  }
