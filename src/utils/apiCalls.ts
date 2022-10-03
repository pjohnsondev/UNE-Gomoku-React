import { API_HOST } from '../constants'
import { ActiveGame } from '../types'
import { del, post, put, get } from './http'

// Game Calls

export const getGameById = async (id: string ) => {
    let JsonResponse
    await get(`${API_HOST}/game/${id}`).then((response) => {
        JsonResponse = (response as ActiveGame)
    })
    return JsonResponse
}

export const postCompletedGame = async (game: ActiveGame) => {
    await post(`${API_HOST}/game`, {
        ...game
    })
}


// activeGame calls

export const getActiveGameById =async (id: string | undefined) => {
    let JsonResponse
    await get(`${API_HOST}/active/${id}`).then((response) => {
        JsonResponse = (response as ActiveGame)
    })
    return JsonResponse
}

export const delteActiveGame = async (id: string) => {
    await del(`${API_HOST}/active/${id}`)
}

export const updateActiveGame = async (game: ActiveGame) => {
    let JsonResponse
    await put(`${API_HOST}/active/${game._id}`, {
        ...game
    }).then((response) => {
        JsonResponse = (response as ActiveGame)
    })
    return JsonResponse
}