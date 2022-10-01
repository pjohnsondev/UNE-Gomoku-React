import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "semantic-ui-react"
import Input from "../components/Input"
import Message from "../components/Message"
import { UserContext } from "../context"

export default function SignUp(){
    const { register } = useContext(UserContext)
    const Navigate = useNavigate()
    const [username, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] =  useState('')

    const signUp = async () => {
        setError('')

        if(password !== confirmPassword ) {
            setError("Passwords do not match")
            return
        }

        const result = await register(username, password)
        if(result === true){
            Navigate('/')
        } else {
            setError(result)
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
