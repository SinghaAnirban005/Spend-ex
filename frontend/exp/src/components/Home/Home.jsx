import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import axios from "axios"
import { logout } from "../../store/Slice.js"
import {  useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

function Home() {

    const [userData, setData] = useState({})
    const active = useSelector((state) => state.status)
    const dispatch = useDispatch()
    const navigate = useNavigate()
   
    useEffect(() => {
        ;(
            async() => {
                const user = await axios.get("/api/v1/users/current-user")
                if(!user){
                    throw new Error("User not found !!")
                }

                console.log(user)
        
                setData(user.data.data)
            }
        )()
    }, [])

   
    const handleLogout = async () => {
        try {

            if(active) {
                const res = await axios.post("/api/v1/users/logout")
            
                if(!res) {
                    throw new Error("Logout API error !! ")
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
            icon: "https://www.inventicons.com/uploads/iconset/2359/wm/512/Login-Credentials-66.png",
            status: !active
        },
        {
            title: "Sign Up",
            slug: "/register",
            icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn2xtOsxUkULZdXTc_De9JRJdVjit0tWMe5w&s",
            status: !active
        },

        {
            title: "Dashboard",
            slug: "/dashboard",
            icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs63u_ATBg8gHUakEi8L8O1F_Vgum6FErUiw&s",
            status: active
        },

        {
            title: "Incomes",
            slug: "/income",
            icon: "https://static.vecteezy.com/system/resources/previews/005/332/919/original/income-icon-design-symbol-payment-dollar-coin-money-free-vector.jpg",
            status: active
        },
        {
            title: "Expenses",
            slug: "/expense",
            icon: "https://static.vecteezy.com/system/resources/previews/030/926/575/original/reduce-expense-icon-symbol-design-illustration-vector.jpg",
            status: active
        }
    ]

    return (
        <div className="flex-col bg-yellow-500 w-[20em] min-h-[60em]">
           
            <div className="pt-[5em] bg-yellow-500 h-[60em] bg-lime-400">
                {active ? (
                     <div className="flex justify-center mb-[10em]">
                        <div className="flex-col ">
                            <div className="flex justify-center bg-yellow-400 rounded-3xl h-[6em] items-center">
                                <img src={userData.avatar} alt="Spend-ex" className="cursor-pointer h-20 w-20 rounded-3xl" />
                            </div>
                        
                            
                                <h1 className="font-bold text-lg">{userData.fullName}</h1>
                                <h2 className="text-center text-md">{userData.username}</h2>
                         
                        
                        </div>
                     </div>   
                    ) : null
                    }

                    {
                          sidebarItems.map((item) => (
                            item.status ? (
                                <div className="flex justify-center hover:">
                                <Link to={item.slug}>
                                    <div key={item.slug} className="flex cursor-pointer my-4 items-center">
                                        <img src={item.icon} alt="icon" className="h-6 w-6 mr-2 rounded-lg" />
                                        <h1 className="text-lg opacity-100 hover:opacity-30">
                                            {item.title}
                                        </h1>
                                    </div>
                                </Link>
                                </div>
                           ) : null
                        )
                    )
                    }

                    {
                        active && (
                            <footer className="flex justify-center mt-[20em] items-center opacity-50 hover:opacity-100">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_9kJjX_ZaIFdanRsLeKYkaVkdmWJWH0uoCg&s" alt="btn" className="h-6 w-6 rounded-lg mr-2" />
                                <button onClick={handleLogout}>
                                   <span className="text-lg">Sign Out</span>
                                </button>
                            </footer>
                        )
                    }

            </div>
        </div>
    )

}


export default Home