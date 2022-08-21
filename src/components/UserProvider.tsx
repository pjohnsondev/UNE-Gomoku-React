import { useState } from "react"
import { User } from "../types"
import { UserContext } from "../context"
import { PLAYER } from "../constants"

type UserProviderProps = { 
    children: React.ReactNode
}

export default function UserProvider ( { children }: UserProviderProps){
    const [user, setUser] = useState<User | undefined>(undefined)
    const [player, setPlayer ] = useState<PLAYER >()

    const login = (username: string) => setUser({ username })  
    const logout = () => setUser(undefined)
    const changeColor = (playercolor: PLAYER) => setPlayer(playercolor)

    return (
        <UserContext.Provider value={{ user, login, logout, player, changeColor }}>
            {children}
        </UserContext.Provider>
    )
} 