import { createContext } from "react";
import { User } from "../types";
import { PLAYER } from "../constants"

type UserContextType = {
    user?: User 
    player?: PLAYER
    login: (username: string, password: string) => Promise<true | string>
    register: (username: string, password: string) => Promise<true | string>
    logout: () => void
    changeColor: (playercolor: PLAYER) => void
    clearColor: () => void
}

const UserContext = createContext<UserContextType>({} as UserContextType)
export default UserContext  