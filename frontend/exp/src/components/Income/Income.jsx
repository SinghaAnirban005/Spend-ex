import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux"
import { addIncome } from "../../store/Slice.js"


function Income() {


    const [incomelist, setIncomeList] = useState([])
    
    

    const { register , handleSubmit } = useForm()
    const dispatch = useDispatch()

    const handleIncome = async(data) => {

        console.log(data)

        try {

            const response = await axios.post("/api/v1/incomes/create-income", data)

            if(!response) {
                console.log("Couldn't handle data resposne")
                throw new Error("Couldn't handle data resposne")
            }

            const incomeInfo = response.data.data
            console.log(incomeInfo)

            dispatch(addIncome(incomeInfo))
           
        
            setIncomeList(info)
        } 
        catch (error) {
            console.error(error.message)
            throw error
        }

    }

    return (
        <div className='flex-col min-h-[60em] w-[80em] p-6'>
          <div className='flex justify-between mb-2 h-[3em] items-center'>
            <h1 className='font-bold text-2xl'>Incomes</h1>
          </div>

        <div className='bg-yellow-500 flex justify-center h-[4em] items-center mb-2 rounded-xl text-lg'>
            <h1>Total Income : <span className='text-lime-700'>$xxx</span></h1>
        </div>

        <div className='flex justify-between px-6 bg-yellow-600 py-4 min-h-[50em]'>
            <div className='flex-col bg-rose-400 w-[20em] h-[30em]'>
                <form onSubmit={handleSubmit(handleIncome)} className='flex-col'>

                    <div className='flex justify-center'>
                    <input placeholder='Salary title' type='text' {
                        ...register("title", {
                            required: true
                        })
                    }
                    />
                    </div>

                    <div className='flex justify-center'>

                    <input placeholder='Salary Amount' type='number' {
                        ...register("amount", {
                            required: true
                        })
                    }
                    />

                    </div>


                    <div className='flex justify-center'>
                    <input placeholder='Enter a date' type='date' {
                        ...register("date", {
                            required: true
                        })
                    }
                    />

                    </div>

                   <div className='flex justify-center'>
                   <input placeholder='Add a reference' type='text' {
                        ...register("Note", {
                            required: true
                        })
                    }
                    />

                   </div> 

                    <button type='submit' className='flex justify-center bg-blue-800 rounded-xl p-2 hover:bg-blue-700'>
                        Add Income
                    </button>

                </form>
            </div>


            <div className='flex justify-center p-2 bg-rose-200 w-[37em] max-w-[37em]'>
               <li>
                {
                    incomelist.map((item) => {
                        <div>
                            <h1>
                                {item.title}
                            </h1>
                            <h2>
                                {item.note}
                            </h2>
                            <h3>
                                {item.amount}
                            </h3>
                        </div>
                    })
                }
               </li>
            </div>
        </div>
        

        </div>
    )
}

export default Income