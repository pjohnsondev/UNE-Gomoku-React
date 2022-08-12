import { useContext } from "react";
import { Navigate, useParams  } from "react-router-dom";
import { UserContext } from "../context";
import games from "../data/gameLog.json"


export default function Game(){
    const { gameSize } = useParams()
    const { user } = useContext(UserContext)
    const game = Object.keys(games).length + 1

    if(!user) return <Navigate to='/login'/>
    return(
        <div>{gameSize}</div>
    )
    
}