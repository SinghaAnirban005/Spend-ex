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
        <div className="flex justify-center min-h-[60em] w-[80em] bg-[url('https://as1.ftcdn.net/v2/jpg/04/30/08/18/1000_F_430081855_QEVpMDhdx2GEKXcbKxUnLjzvwrYhsar8.jpg')]">
            <form onSubmit={handleSubmit(handleRegister)}>
            <div className="flex-col">
                <h1>Sign Up</h1>
                {error && <h2 className="text-red-600">{error}</h2>}
            </div>

            <div>
                <div>
                <label>Enter your Full-Name</label>
                    <input placeholder="Full-Name" type="text" {
                        ...register("fullName", {
                            required: true
                        })
                    } />
                </div>

                <div>
                    <label>Set your Username</label>
                    <input placeholder="Enter your username" type="text" {
                        ...register("username" , {
                            required: true
                        })
                    } />
                </div>

                <div>
                    <label>Set your e-mail</label>
                    <input placeholder="Enter your email" type="email" {
                        ...register("email" , {
                            required: true
                        })
                    } />
                </div>

                <div>
                    <label>Choose your avatar</label>
                    <input type="file" accept="image/*" {
                        ...register("avatar" , {
                            required: true
                        })
                    } />
                </div>

                <div>
                    <label>Set your password</label>
                    <input placeholder="Enter your password" type="password" {
                        ...register("password" , {
                            required: true
                        })
                    } />
                </div>

            </div>

            <div>
                <button className="bg-blue-500" type="submit">
                    Register
                </button>
            </div>
        </form>
        </div>
    )
}

export default Register