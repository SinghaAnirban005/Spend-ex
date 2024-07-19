import React from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import axios from "axios"
import {login} from "../../store/Slice.js"
import { useNavigate } from "react-router-dom"

function Login() {
   
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async (data) => {
        try {
            if(!data) {
                setError("Please enter data")
                throw new Error("Please enter data !!")
            }
            
            const res = await axios.post("/api/v1/users/login", data)

            if(!res) {

                setError("Error while handling request in backend")
                throw new Error("Error while handling request in backend")

            }

            dispatch(login())
            navigate("/")

        } catch (error) {
            
        }
    }
    
    return (
        <form onSubmit={handleSubmit(handleLogin)} className="min-h-[60em]">
            <div>
                <h1>Login</h1>
            </div>

            <div>
                <div>
                    <label>Enter your e-mail</label>
                    <input placeholder="E-Mail" type="email" {
                        ...register("email" , {
                            required: true
                        })
                    } />
                </div>

                <div>
                    <label>Enter your Password</label>
                    <input placeholder="Password" type="password" {
                        ...register("password" , {
                            required: true
                        })
                    } />
                </div>

            </div>

            <div>
                <button className="bg-blue-500" type="submit">
                    Login
                </button>
            </div>
        </form>
    )
}

export default Login