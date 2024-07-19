import React, { act } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import axios from "axios"
import { logout } from "../../store/Slice.js"
import {  useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

function Home() {

    const active = useSelector((state) => state.status)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {

            if(active) {
                const res = await axios.post("/api/v1/users/logout")
            
                if(!res) {
                    throw new Error("Logout API error !!")
                }
                
                dispatch(logout())
                navigate("/")
            }

        } catch (error) {
            throw new Error("Something went wrong !!", error.message)
        }
    }

    const sidebarItems = [
        {
            title: "Login",
            slug: "/login",
            status: !active
        },
        {
            title: "Sign Up",
            slug: "/register",
            status: !active
        },

        {
            title: "Dashboard",
            slug: "/dashboard",
            status: active
        },

        {
            title: "Incomes",
            slug: "/income",
            status: active
        },
        {
            title: "Expenses",
            slug: "/expense",
            status: active
        }
    ]

    return (
        <div className="flex-col bg-red-400 w-[20em] min-h-[60em]">
           
            <div>
                {active ? (
                     <div className="flex">
                     <img src="" alt="Spend-ex" />
                         <div className="flex-col">
                             <h1>FUllName</h1>
                             <h2>username</h2>
                         </div>
                     </div>
                    ) : null
                    }

                    {
                          sidebarItems.map((item) => (
                            item.status ? (
                                <Link to={item.slug}>
                                    <div key={item.slug} className="flex-col cursor-pointer">
                                        <h1>
                                            {item.title}
                                        </h1>
                                    </div>
                                </Link>
                           ) : null
                        )
                    )
                    }

                    {
                        active && (
                            <div>
                                <button onClick={handleLogout}>
                                    Sign Out
                                </button>
                            </div>
                        )
                    }
                
            </div>
        </div>
    )

}


export default Home