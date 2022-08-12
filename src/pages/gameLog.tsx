import { useParams } from "react-router-dom";
import games from "../data/gameDetail.json"

export default function GameLog(){
    const { id } = useParams()
    if(!id) return null

    const game = games.find((g) => g.id === parseInt(id))
    if(!game) return <div>fail</div>
    return(
        <div> {game.boardSize} fail</div>
    )
}
export{}