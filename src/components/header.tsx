import { Link, useNavigate } from "react-router-dom"
import style from "./Header.module.css"

export default function Header(){
  const navigate = useNavigate()

  return(
    
      <header className={style.header}>
        <div className={style.container}>
          <Link to="/">Gomoku</Link>
          <span></span>
          <div className={style.actions}>
            <button className={style.action} onClick={() => navigate('login')}>
              Login
            </button>
            <button className={style.action} onClick={() => navigate('signup')}>
              Sign up
            </button>
            <button className={style.action} onClick={() => navigate(`game-history`)}>
              Sign up
            </button>
          </div>
        </div>
      </header>
    
  )
}