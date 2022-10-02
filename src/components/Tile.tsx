import { useState, useContext } from "react"
import { PLAYER, GAMESTATUS } from "../constants"
import { UserContext } from "../context"
import Stone from "./Stone"
import styles from "./Tile.module.css"

type TileProps = {
    id: number
    status: GAMESTATUS
    hasStone: PLAYER
    move?: number
    onSelect: () => void
}

export default function Tile(props: TileProps) {
    const { id, onSelect, status, hasStone, move} = props
    const { player, changeColor } = useContext(UserContext)
    const [ stone, setStone ] = useState(hasStone)

    const getClassNames = () => {
        if(stone === PLAYER.NONE){
            return <Stone player={PLAYER.NONE} move={move}></Stone>
        } else {
            switch(stone){
                case PLAYER.BLACK:
                    return <Stone player={PLAYER.BLACK} move={move}/>
                case PLAYER.WHITE:
                    return <Stone player={PLAYER.WHITE} move={move}/>
            }
        }
    }

    // TODO: Only call onSelect() if there is not a stone already on the tile
    const handleClick = () => {
        if(status === GAMESTATUS.COMPLETE || status === GAMESTATUS.DRAW) return
        if(player === PLAYER.WHITE){
            if(stone === PLAYER.NONE){
                setStone(player)
                onSelect()
                changeColor(PLAYER.BLACK)
            }
        } else {
            if(stone === PLAYER.NONE){
                setStone(PLAYER.BLACK)
                onSelect()
                changeColor(PLAYER.WHITE)
            }
        }
    }

    return <div id={id.toString()} className={styles.tile} onClick={handleClick}>{getClassNames()}</div>
}