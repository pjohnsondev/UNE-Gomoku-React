import { useParams } from "react-router-dom";
import games from "../data/gameDetail.json"

export default function GameLog(){
    const { gameID } = useParams()
    if(!gameID) return null

    const game = games.find((g) => g.id === parseInt(gameID))
    if(!game) return null
    return(
        <div> {game.boardSize} </div>
    )
}
export{}