import React from "react";
import { useEffect, useState } from "react";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { userRecents, clearRecents } from "../../store/Slice.js"

function Recent() {

    const apiUrl = import.meta.env.VITE_API_URL;    
    // let [recent, setRecent] = useState([])
 
    const dispatch = useDispatch()
    const updatedRecents = useSelector((state) => state.recents)
    

    useEffect(() => {
        ;(async () => {

            dispatch(clearRecents())
            const response = await axios.get(`${apiUrl}/users/recent-history`)
            
            if(!response) {
                throw new Error("Failed to fetch response")
            }

            console.log(response)

            dispatch(userRecents(response.data.data))
          
        })()
    }, [])
    
    return (
        <ul className="h-[24em] w-[20em] overflow-scroll">
          {updatedRecents.filter((_, index) => index != 0).slice().reverse().map((item, index) => (
            <li key={index} className="flex-col">
              <div className="flex justify-between bg-slate-300 h-[4em] m-2 rounded-xl items-center p-4">
                <h1>{item.title}</h1>
                <h2>${item.amount}</h2>
              </div>
            </li>
          ))}
        </ul>
      );
        
    
}

export default Recent

