import { useState } from "react"
import { User } from "../types"
import { UserContext } from "../context"
import { PLAYER } from "../constants"

type UserProviderProps = { 
    children: React.ReactNode
}

export default function UserProvider ( { children }: UserProviderProps){
    const [user, setUser] = useState<User | undefined>(undefined)
    const [player, setPlayer ] = useState<PLAYER | undefined >(undefined)

    const login = (username: string) => setUser({ username })  
    const logout = () => {setUser(undefined)}
    const changeColor = (playercolor: PLAYER) => setPlayer(playercolor)
    const clearColor = () => setPlayer(undefined)

    return (
        <UserContext.Provider value={{ user, login, logout, player, changeColor, clearColor }}>
            {children}
        </UserContext.Provider>
    )
} 