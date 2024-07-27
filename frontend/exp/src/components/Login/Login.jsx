import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import axios from "axios"
import {login, avatarURL, getUser} from "../../store/Slice.js"
import { useNavigate } from "react-router-dom"


function Login() {
   
    const apiUrl = import.meta.env.VITE_API_URL;
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const handleLogin = async (data) => {
        try {
            if(!data) {
                setError("Please enter data")
                throw new Error("Please enter data !!")
            }
            
            const res = await axios.post(`${apiUrl}/users/login`, data)

            if(!res) {

                setError("Error while handling request in backend")
                throw new Error("Error while handling request in backend")

            }

            dispatch(login())
            const userData = await axios.get(`${apiUrl}/users/current-user`)
            dispatch(avatarURL(userData.data.data.avatar))
            dispatch(getUser(userData.data.data))

            navigate("/")

        } catch (error) {
            setError(error.message)
            throw error
        }
    }
    
    return (
        <div className="flex justify-center min-h-[60em] w-[80em] bg-[url('https://imam-us.org/wp-content/uploads/2021/06/WSID-Investing-in-the-Stock-Market-WSG.jpg')]">
            <form onSubmit={handleSubmit(handleLogin)} className="mt-[10em] rounded-2xl border-none bg-slate-200 w-[40em] h-[50em]">
            <div className="flex justify-center mt-[12em] ">
                <h1 className="font-bold text-3xl">
                    Login
                </h1>
            </div>

            <div className="flex font-lg justify-center">
                    {error && <h2 className="text-red-600">{error}</h2>}
            </div>

            <div className="flex-col mt-[4em]">
                <div className="flex justify-center items-center">
                    <label className="mr-3">Enter your e-mail</label>
                    <input placeholder="E-Mail" type="email" {
                        ...register("email" , {
                            required: true
                        })
                    }
                    className="ml-3 h-[3em] w-[20em] rounded-xl border-slate-300 border-2"
                    />
                </div>

                <div className="flex justify-center mt-[2em] items-center">
                    <label>Enter your Password</label>
                    <input placeholder="Password" type="password" {
                        ...register("password" , {
                            required: true
                        })
                    } 
                    className="ml-2 h-[3em] w-[20em] rounded-xl border-slate-300 border-2"
                    />
                </div>

            </div>

            <div className="flex justify-center mt-[4em]">
                <button className="bg-blue-500 w-[9em] rounded-xl hover:bg-blue-400 h-[2em]" type="submit">
                    Login
                </button>
            </div>
        </form>
        </div>
    )
}

export default Login