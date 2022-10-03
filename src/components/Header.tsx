import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GAMESTATUS } from "../constants"
import { UserContext } from "../context"
import { useLocalStorage } from "../hooks"
import style from "./Header.module.css"

export default function Header(){
  const navigate = useNavigate()
  const { user, logout} = useContext(UserContext)
  const {clearColor } = useContext(UserContext)
  const [gameStatus, changeGameStatus] = useLocalStorage<object>(
    'game status',
    []
)

  const getActions = () => {
    if(user){
      return(
        <>
        <button className={style.action} onClick={() => {navigate('/games')}}>
          Previous Games
        </button>
        <button className={style.action} onClick={() => {logout(); navigate("/")}}>
          Log Out
        </button>
        </>
      )

    } else {
      return(
        <>
        <button className={style.action} onClick={() => navigate('login')}>
          Login
        </button>
        <button className={style.action} onClick={() => navigate('signup')}>
          Sign up
        </button>
        </>
      )
    }
  }

  const clearObjects = () => {
    clearColor()
    if(gameStatus){
      changeGameStatus({"current status": GAMESTATUS.ACTIVE})
    }
  }


  return(
      <header className={style.header}>
        <div className={style.container}>
          <div onClick={clearObjects}>
            <Link to="/" >Gomoku</Link>
          </div>
          <span></span>
          <div className={style.actions}>
            {getActions()}
          </div>
        </div>
      </header>
    
  )
}