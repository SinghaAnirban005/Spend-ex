import React, { useEffect, useState } from "react";
import axios from "axios"
import { useSelector } from "react-redux";

function Greetings() {

    const active = useSelector((state) => state.status)

    useEffect(() => {
        ;(async () => {
            const user = await axios.get("/api/v1/users/current-user")
    
            if(!user) {
                setError("User not found ☠️ ☠️")
                throw new Error("User not found")
            }
    
            setUser(user.data.data)
    
        })()
    }, [])

    const [error, setError] = useState('')
    const [user, setUser] = useState('')

    return (
        <div className="flex bg-[url('https://as1.ftcdn.net/v2/jpg/04/30/08/18/1000_F_430081855_QEVpMDhdx2GEKXcbKxUnLjzvwrYhsar8.jpg')] min-h-[60em] w-[80em] justify-center items-center">
            <h1>
                {active ? <h1 className="text-yellow-800 font-bold text-4xl">
                    Welcome to Spend-Ex {user.fullName}
                </h1> : <h1 className="text-yellow-800 font-bold text-4xl">Login or register yourself to Spend-Ex</h1>}
            </h1>

            {
             error && 
             <h1>
                {error}
             </h1>
            }

        </div>
    )
}

export default Greetings