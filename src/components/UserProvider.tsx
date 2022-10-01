import { useState } from "react"
import { User, Credentials } from "../types"
import { UserContext } from "../context"
import { PLAYER } from "../constants"
import { useLocalStorage } from "../hooks"
import { post, setToken } from "../utils/http"

type UserProviderProps = { 
    children: React.ReactNode
}

export default function UserProvider ( { children }: UserProviderProps){
    const [user, setUser] = useLocalStorage<User | undefined>('user', undefined)
    const [player, setPlayer ] = useState<PLAYER | undefined >(undefined)

    if(user){
        setToken(user.token)
    }

    const login = async (username: string, password: string) => {
        try {
            const user = await post<Credentials, User>('/auth/login', {
                username,
                password
            })
            setUser(user)
            setToken(user.token)
            return true
        } catch (error) {
            if(error instanceof Error){
                return error.message
            }
            return "Unable to login at this time"
        }
    }

    const register = async (username: string, password: string) => {
        try {
            const user = await post<Credentials, User>('/auth/register', {
                username,
                password
            })
            setUser(user)
            setToken(user.token)
            return true
        } catch (error) {
            if(error instanceof Error){
                return error.message
            }
            return "Unable to login at this time"
        }
    }

    const logout = () => {
        setUser(undefined)
        setToken('')
    }
    const changeColor = (playercolor: PLAYER) => setPlayer(playercolor)
    const clearColor = () => setPlayer(undefined)

    return (
        <UserContext.Provider value={{ user, login, logout, register, player, changeColor, clearColor }}>
            {children}
        </UserContext.Provider>
    )
} 