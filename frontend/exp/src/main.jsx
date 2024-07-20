import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux"
import { store } from "./store/store.js"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Home from './components/Home/Home.jsx'
import Login from "./components/Login/Login.jsx"
import Register from "./components/Register/Register.jsx"
import Greetings from './components/Content/Greetings.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Greetings />} />
      <Route path='login' element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
