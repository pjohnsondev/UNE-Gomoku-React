import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "semantic-ui-react"
import { Input, Message } from "../components"
import { UserContext  } from "../context"

export default function Login() {
    const { login } = useContext(UserContext)
    const Navigate = useNavigate()
    const [username, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setError ] = useState('')

    const handleLogin = async () => {
        setError('')
        const result = await login(username, password)
        if(result === true){
            Navigate('/')
        } else {
            setError(result)
        } 
    }

    return(
        <form className="login" onSubmit={(e) => {
            e.preventDefault() 
            handleLogin()
            }}> 
            {errorMessage && <Message variant="error" message={errorMessage}/>}
            <Input 
                name="username"
                placeholder="Username"
                onChange={(e) => {
                    setUser(e.target.value)
                    setError('') 
                }}
            />
            <Input 
                name="password"
                placeholder="Password"
                type="password"
                onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                }}
            />
            <Button primary type="submit">Sign In</Button>
        </form>    
    )
}