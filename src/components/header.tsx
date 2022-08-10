import style from "./Header.module.css"

export default function Header(){
    return(
      
        <header className={style.header}>
          <div className={style.container}>
            <span>Gomoku</span>
            <div className={style.actions}>
              <button className={style.action}>Login</button>
              <button className={style.action}>Sign up</button>
            </div>
          </div>
        </header>
      
    )
}