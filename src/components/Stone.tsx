// class Stone {
//     element: HTMLDivElement
//     player: PLAYER
 
//     constructor() {
//         this.player = PLAYER.NONE
//         this.element = document.createElement('div')
//         this.element.classList.add('stone')
//         this.element.classList.add(this.player.toLocaleLowerCase())
//     }
// }
import { PLAYER } from "../constants"
import styles from "./Stone.module.css"


type StoneProps = {
    player: PLAYER
}

export default function Stone(props: StoneProps){
    const { player } = props

    const getClassName = () => {
        const className = styles.stone
        switch(player){
            case PLAYER.WHITE:
                return `${className} ${styles.white}`
            case PLAYER.BLACK:
                return `${className} ${styles.black}`
            case PLAYER.NONE:
                return `${className} ${styles.none}`
        }
    }
    return(
        <div className={getClassName()}></div>
    )
}