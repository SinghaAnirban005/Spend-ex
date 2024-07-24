import React from "react";
import { useEffect, useState } from "react";
import axios from "axios"

function Recent() {

    const [recent, setRecent] = useState([])

    useEffect(() => {
        ;(async () => {
            const response = await axios.get("/api/v1/users/recent-history")
            
            if(!response) {
                throw new Error("Failed to fetch response")
            }


            console.log(response)

            setRecent(response.data.data)
        })()
    }, [])

    return (
        
            <ul className="h-[24em]  w-[20em]">
                {
                    recent.map((item) => (
                        <li className="flex-col">
                            <div className="flex justify-between bg-slate-300 h-[4em] m-2 rounded-lg items-center p-4">
                            
                                <h1>{item.title}</h1>
                            
                                <h2>${item.amount}</h2>
                           
                            </div>
                        </li>
                    ))
                }
               
            </ul>
        
    )
}

export default Recent