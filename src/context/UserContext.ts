import { createContext } from "react";
import { User } from "../types";
import { PLAYER } from "../constants"

type UserContextType = {
    user?: User 
    player?: PLAYER
    login: (username: string) => void
    logout: () => void
    changeColor: (playercolor: PLAYER) => void
}

const UserContext = createContext<UserContextType>({} as UserContextType)
export default UserContext 