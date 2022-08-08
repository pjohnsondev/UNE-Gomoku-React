import { useState } from "react"
import { Button } from "semantic-ui-react"
import Input from "../components/Input"
import Message from "../components/Message"
import users from "../data/dummyUserData.json"  

export default function Login() {
    const [username, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [credentialsInvalid, setCredentialsInvalid] =  useState(false )

    const login = () => {
        const user = users.find((u) => u.username === username && u.password === password)
        if(!user){
            setCredentialsInvalid(true)
        } else { 
            console.log("Login successful")
        }

    }

    return(
        <form className="login" onSubmit={(e) => {
            e.preventDefault() 
            login()
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