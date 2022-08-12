import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "semantic-ui-react"
import { Input, Message } from "../components"
import { UserContext  } from "../context"
import users from "../data/dummyUserData.json"  

export default function Login() {
    const { login } = useContext(UserContext)
    const Navigate = useNavigate()
    const [username, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [credentialsInvalid, setCredentialsInvalid] =  useState(false )

    const handleLogin = () => {
        const user = users.find(
            (u) => u.username === username && u.password === password
        )
        if(!user){
            setCredentialsInvalid(true)
        } else { 
            login(username)
            Navigate("/")
        }

    }

    return(
        <form className="login" onSubmit={(e) => {
            e.preventDefault() 
            handleLogin()
            }}> 
            {credentialsInvalid && <Message variant="error" message="Invalid username or password"/>}
            <Input 
                name="username"
                placeholder="Username"
                onChange={(e) => {
                    setUser(e.target.value)
                    setCredentialsInvalid(false) 
                }}
            />
            <Input 
                name="password"
                placeholder="Password"
                type="password"
                onChange={(e) => {
                    setPassword(e.target.value)
                    setCredentialsInvalid(false)
                }}
            />
            <Button primary type="submit">Sign In</Button>
        </form>    
    )
}