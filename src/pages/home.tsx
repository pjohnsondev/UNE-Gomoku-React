// Assignment 2/gomoku-react/node_modules/postcss-initial change from _ to ~

import { useNavigate } from "react-router-dom"
import styles from "./Home.module.css"
import React, {useState} from "react" 
import { Button } from 'semantic-ui-react'
import { get, post} from '../utils/http'

const smallestBoard = 5
const LargestBoard = 19
export const gameSizes = [...Array(LargestBoard - smallestBoard + 1).keys()].map( (index) => index + smallestBoard)

export default function Home(props: any) {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(false)

  const buttonText = "Start"
  let gameChoice = 5

  
  function GameSize(props: any){
    return(
      <li className={styles['game-size']} key={props.gameSize} onClick={() => selected? setSelected(!selected) : gameChoice = props.gameSize}>
          <span>{props.gameSize}x{props.gameSize}</span>
      </li>
    )
  }

  function GameSizes(){
    return (
      <div /*onClick={() => setOpen(!open)}*/>
        <ul className={styles['game-sizes']}> 
          <span>Select Game Size</span>
          {gameSizes.map((size) => (
            <GameSize gameSize = {size} key={size} /> 
          ))}
        </ul>
      </div>
    )
  }

  return (
    <>
      <GameSizes/>
      <Button primary onClick={() => navigate(`/game/${gameChoice}`)}>{buttonText}</Button>
    </>

  )
  }