import { useContext, useState } from "react";
import { Navigate, useParams  } from "react-router-dom";
import { UserContext } from "../context";
import { PLAYER } from "../constants";
import games from "../data/gameLog.json"
import Tile from "../components/Tile";



export default function Game(){
    const { gameSize } = useParams()
    const { user } = useContext(UserContext)
    const {player, changeColor } = useContext(UserContext)
    const game = Object.keys(games).length + 1

    if(!user) return <Navigate to='/login'/>
    if(!player){
        changeColor(PLAYER.BLACK)
    }
    // setColor(PLAYER.BLACK)
    // changeColor(color)
    return(
            <>
                { <Tile  id={game}/>}
            </>


    )
    
}