import React, { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useNavigate,  } from "react-router-dom"


function Register() {
    
    const [error, setError] = useState('')
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const formData = new FormData()

    const handleRegister = async (data) => {
        console.log(data)
        formData.append("fullName", data.fullName)
        formData.append("username", data.username)
        formData.append("email", data.email)
        formData.append("avatar", data.avatar[0])
        formData.append("password", data.password)

        try {

            if(!formData){
                setError("Enter data completely !!")
                throw new Error("Enter data completely !!")
            }
    
            const response = await axios.post("/api/v1/users/register", formData)
            if(!response) {
                setError("Server error while processing request")
                throw new Error("Server error while processing request")
            }
            alert("🔥 🔥 Succesfully Registered 🔥 🔥")
            navigate('/login')

        } catch (error) {
            setError(error.message)
            throw new Error(error.message)
        }


    }
    
    return (
        <div className="flex justify-center min-h-[60em] w-[80em] bg-[url('https://imam-us.org/wp-content/uploads/2021/06/WSID-Investing-in-the-Stock-Market-WSG.jpg')]">
            <form onSubmit={handleSubmit(handleRegister)} className="bg-slate-200 w-[40em] h-[50em] mt-[10em]">
            
            <div className="flex justify-center mt-[8em]">
                <div className="flex-col">
                    <h1 className="font-bold text-3xl">Sign Up</h1>
                    {error && <h2 className="text-red-600">{error}</h2>}
                </div>
            </div>

            <div className="mt-[4em]">

                <div className="flex justify-center items-center mb-[1em]">
                <label className="mr-2">Enter your Full-Name</label>
                    <input placeholder="Full-Name" type="text" {
                        ...register("fullName", {
                            required: true
                        })
                    } 
                    className="h-[3em] w-[20em] rounded-xl border-slate-300 border-2"
                    />
                </div>

                <div className="flex justify-center items-center mb-[1em]">
                    <label className="mr-6">Set your Username</label>
                    <input placeholder="Enter your username" type="text" {
                        ...register("username" , {
                            required: true
                        })
                    } 
                    className=" h-[3em] w-[20em] rounded-xl border-slate-300 border-2"
                    />
                </div>

                <div className="flex justify-center items-center mb-[1em]">
                    <label className="mr-12">Set your e-mail</label>
                    <input placeholder="Enter your email" type="email" {
                        ...register("email" , {
                            required: true
                        })
                    } 
                    className=" h-[3em] w-[20em] rounded-xl border-slate-300 border-2"
                    />
                </div>

                <div className="flex justify-center items-center mb-[1em]">
                    <label className="mr-14">Choose your avatar</label>
                    <input type="file" accept="image/*" {
                        ...register("avatar" , {
                            required: true
                        })
                    } 
                    />
                </div>

                <div className="flex justify-center items-center mt-[1em]">
                    <label className="mr-6">Set your password</label>
                    <input placeholder="Enter your password" type="password" {
                        ...register("password" , {
                            required: true
                        })
                    }
                    className=" h-[3em] w-[20em] rounded-xl border-slate-300 border-2"                    />
                </div>

            </div>

            <div className="flex justify-center mt-[4em]">
                <button className="bg-blue-500 w-[9em] rounded-xl hover:bg-blue-400 h-[2em]" type="submit">
                    Register
                </button>
            </div>

        </form>

        </div>
    )
}

export default Register