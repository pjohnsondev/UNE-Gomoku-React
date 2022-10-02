import { ActiveGame } from '../types'
import { del, post } from './http'


export const delteActiveGame = async (id: string) => {
    await del(`/active/${id}`)
}

export const postCompletedGame = async (game: ActiveGame) => {
    await post(`/game`, {
        ...game
    })
}