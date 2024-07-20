import { useState } from 'react'
import './App.css'
import { Outlet } from "react-router-dom"
import Home from "./components/Home/Home.jsx"

function App() {

  return (

    <div className='flex bg-slate-400 min-h-[60em] m-4'>
      <Home />
      <Outlet />
    </div>
    
  )

}

export default App
