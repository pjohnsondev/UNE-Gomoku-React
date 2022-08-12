import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../context"
import style from "./Header.module.css"

export default function Header(){
  const navigate = useNavigate()
  const { user, logout} = useContext(UserContext)

  const getActions = () => {
    if(user){
      return(
        <>
        <button className={style.action} onClick={() => navigate('/games')}>
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


  return(
      <header className={style.header}>
        <div className={style.container}>
          <Link to="/">Gomoku</Link>
          <span></span>
          <div className={style.actions}>
            {getActions()}
          </div>
        </div>
      </header>
    
  )
}