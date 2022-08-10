import { useState } from "react"
import { Button } from "semantic-ui-react"
import Input from "../components/Input"
import Message from "../components/Message"
import users from "../data/dummyUserData.json" 
// import styles from './Login.module.css'

export default function SignUp(){
    const [username, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] =  useState('')

    const signUp = () => {
        const user = users.find((u) => u.username === username)
        if(user){
            setError(`Username ${username} is already taken`)
            return
        } else if(password !== confirmPassword) { 
            setError("Passwords do not match")
            return
        } else if (!password || !confirmPassword){
            setError("Password cannot be empty")
            return
        } else {
            setError("Signup Successfull")
            return
        }
    }

    return(
        <form className={"login"} onSubmit={(e) => {
            e.preventDefault() 
            signUp()
            }}> 
            {error && <Message variant="warning" message={error}/>}
            <Input 
                name="username"
                placeholder="Username"
                onChange={(e) => {
                    setUser(e.target.value)
                }}
            />
            <Input 
                name="password"
                placeholder="Password"
                type="password"
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            />
            <Input 
                name="confirm password"
                placeholder="Confirm Password"
                type="password"
                onChange={(e) => {
                    setConfirmPassword(e.target.value)
                }}
            />
            <Button primary type="submit">Sign In</Button>
        </form>    
    )
} 
