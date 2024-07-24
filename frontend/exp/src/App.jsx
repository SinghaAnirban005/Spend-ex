import { useState } from 'react'
import './App.css'
import { Outlet } from "react-router-dom"
import Home from "./components/Home/Home.jsx"

function App() {

  return (

    <div className='flex min-h-[60em] m-2 bg-blue-950 rounded-md'>
      <Home />
      <Outlet />
    </div>
    
  )

}

export default App
