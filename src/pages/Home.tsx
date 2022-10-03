// Assignment 2/gomoku-react/node_modules/postcss-initial change from _ to ~

import { useNavigate } from "react-router-dom"
import styles from "./Home.module.css"
import {useState, useCallback, useEffect, useContext } from "react" 
import { UserContext } from "../context";
import { Button } from 'semantic-ui-react'
import { get, post} from '../utils/http'
import { ActiveGame, Game } from "../types";
import { API_HOST, PLAYER } from "../constants";

const smallestBoard = 5
const LargestBoard = 19
export const gameSizes = [...Array(LargestBoard - smallestBoard + 1).keys()].map( (index) => index + smallestBoard)

export default function Home(props: any) {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(false)
  const { user, logout } = useContext(UserContext)
 

  const [ gamesHistory, setHistory ] = useState<Game[]>([])

  const fetchGamesHistory = useCallback(async () => {
      try {
          const fetchedGames = await get<Game[]>(
              `${API_HOST}/game`
          )
          setHistory(fetchedGames)            
      } catch (err) {
          console.log((err as Error).message)
          logout()
          navigate('/')
      }
  }, [logout, navigate])

  useEffect(() => {
      if(!user) return
      fetchGamesHistory()
  }, [fetchGamesHistory, user])





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
      <Button primary onClick={ async () => {
        let gameId = gamesHistory.length+1
        try {
          await post(`${API_HOST}/active`, {
            gameId: gameId,
            boardSize: gameChoice,
            winner: PLAYER.NONE,
            date: new Date(),
            moves: [],
            userId: user?._id
          }).then((res) => {
            navigate(`/game/${(res as ActiveGame)._id}`)
          })
        } catch (err) {
          console.log((err as Error).message)
        }
        }}>{buttonText}</Button>
    </>

  )
  }