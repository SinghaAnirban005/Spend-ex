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
import Income from './components/Income/Income.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Expense from './components/Expense/Expense.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Greetings />} />
      <Route path='login' element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path='income' element={<Income />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='expense' element={<Expense />} />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
