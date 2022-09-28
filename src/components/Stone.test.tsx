import { screen, render, fireEvent } from "@testing-library/react";
import { PLAYER } from "../constants";
import Stone from "./Stone";


const StonePropsWithMove = {
    player: PLAYER.BLACK,
    move: 3
}

const StonePropsWithoutMove = {
    player: PLAYER.WHITE
}

const noStone = {
    player: PLAYER.NONE
}



describe("Stone component", () => {
    it("Should render a stone that has a class of black or white and a move-number if passed OR no stone", () => {
        // Test with no move passed

        // Test with a move passed
        render(
            <Stone {...StonePropsWithMove} />
        );
        const move = screen.getByText(StonePropsWithMove.move)
        expect(move).toBeInTheDocument()

        // Test that no Stone is rendered
        render(
            <Stone {...noStone} />
        );
        expect(move).toBeInTheDocument()



    })
})