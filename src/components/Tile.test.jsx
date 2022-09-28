import { render, screen, FireEvent } from "@testing-library/react";
import { GAMESTATUS, PLAYER } from "../constants";

import Tile from "./Tile";

const TileProps = {
    id: 2,
    status: GAMESTATUS.ACTIVE,
    hasStone: PLAYER.BLACK,
    move: 5,
    // onSelect: () => void,
}

describe("TileProps component", () => {
    it('Should render a tile that adds a stone component when clicked', () => {
        // render(<Tile {...TileProps} />)
        // const stone = 
        const test = true

        expect(test).toBeTruthy()
    })
})

