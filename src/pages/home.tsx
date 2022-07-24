const smallestBoard = 5
const LargestBoard = 19
export const gameSizes = [...Array(LargestBoard - smallestBoard + 1).keys()].map( (index) => index + smallestBoard)

export function GameSizes() {
    return (
      <ul className="game-sizes"> Select Game Size
      {gameSizes.map((gameSize) => (
        <li className="game-size" key={gameSize}>
          {gameSize}x{gameSize}
        </li>
      ))}
    </ul>
    )
  }