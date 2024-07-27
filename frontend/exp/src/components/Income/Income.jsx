import React, { useCallback } from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux"
import { addIncome, clearIncome, testMethod } from "../../store/Slice.js"
import { ApiError } from '../../../../../backend/src/utils/ApiError.js'


function Income() {

    const { register , handleSubmit } = useForm()
    const dispatch = useDispatch()
    const [income , setIncome] = useState(0)
    const uid = useSelector((state) => state.income)

    const incomes  = useSelector((state) => state.income)

    const handleIncome = useCallback( async(data) => {

        console.log(data)

        try {

            const response = await axios.post("/api/v1/incomes/create-income", data)

            if(!response) {
                console.log("Couldn't handle data resposne")
                throw new Error("Couldn't handle data resposne")
            }

            // const income = await axios.get("/api/v1/incomes/total-income")
            // setIncome(income.data.data)
            const totalIncome = await axios.get("/api/v1/incomes/total-income")
            setIncome(totalIncome.data.data)
           
        } 
        catch (error) {
            console.error(error.message)
            throw error
        }

    }, [])

    const handleDeletion = useCallback( async(id) => {
        try {
            //console.log(id)
            const res = await axios.delete(`/api/v1/incomes/delete-income/${id}`)
        
            if(!res) {
                throw new Error("Server error")
            }
         
            const totalIncome = await axios.get("/api/v1/incomes/total-income")
            setIncome(totalIncome.data.data)
            
        } catch (error) {
            console.error(error.message)
            throw new Error("Failed to delete income")
        }
        
    }, [])

    useEffect(() => {
        ;(
         async () => {
             try {

                dispatch(clearIncome())

                 const response = await axios.get("/api/v1/incomes/getIncome")
 
                 if(!response) {
                     throw new ApiError("Failed to validate response")
                 }
                 console.log(response)
               
                dispatch(addIncome(response.data.data))
                

                const totalIncome = await axios.get("/api/v1/incomes/total-income")
                setIncome(totalIncome.data.data)
             } catch (error) {
                 console.error(error.message)
                 throw error
             }
         }
        )()
     }, [handleIncome, handleDeletion, income])


    return (
        <div className='flex-col min-h-[60em] w-[80em] p-6 '>
          <div className='flex justify-between mb-2 h-[3em] items-center'>
            <h1 className='font-bold text-2xl text-white'>Incomes</h1>
          </div>

        <div className='flex bg-slate-400 font justify-center h-[4em] items-center mb-2 rounded-xl text-lg'>
            <h1 className='font-bold'>Total Income : <span className='text-lime-700'>${income}</span></h1>
        </div>

        <div className='flex justify-between px-6 py-4 min-h-[50em]'>
            <div className='flex-col w-[20em] h-[30em]'>
                <form onSubmit={handleSubmit(handleIncome)} className='flex-col'>

                    <div className='flex justify-center mt-[2em]'>
                    <input placeholder='Salary title' type='text' {
                        ...register("title", {
                            required: true
                        })
                    } 
                    className='h-[2em] w-[18em] rounded-md'
                    />
                    </div>

                    <div className='flex justify-center mt-[1em]'>

                    <input placeholder='Salary Amount' type='number' {
                        ...register("amount", {
                            required: true
                        })
                    }
                    className='h-[2em] w-[18em] rounded-md'
                    />

                    </div>


                    <div className='flex justify-center mt-[1em]'>
                    <input placeholder='Enter a date' type='date' {
                        ...register("date", {
                            required: true
                        })
                    }
                    className='h-[2em] w-[18em] rounded-md'
                    />

                    </div>

                   <div className='flex justify-center mt-[2em]'>
                   <input placeholder='Add a reference' type='text' {
                        ...register("Note", {
                            required: true
                        })
                    }
                    className='h-[5em] w-[18em] rounded-md'
                    />

                   </div> 

                    <div className='flex justify-start mt-[4em] px-4' >
                        <button type='submit' className='flex items-center px-4 justify-between bg-rose-400 w-[10em] h-[2em] hover:bg-rose-500 rounded-lg'>
                            Add Income
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScbMMl34NX38maM9Qs97XE33rlPIibkRlhpQ&s' alt='right-arrow' className='h-6 w-6 rounded-xl' />
                        </button>
                    </div>

                </form>
            </div>


            <div className=' flex justify-center p-2 w-[37em] max-w-[37em]'>
               <ul className="flex-col overflow-scroll max-h-[50em]">
                {
                    incomes.filter((_, index) => index != 0).reverse().map((item) => (
                        <li key={item._id}>
                        <div className='flex-col p-2 bg-lime-300 opacity-100 hover:opacity-75 my-2 h-[4em] w-[35em] rounded-lg overflow-scroll'>
                            <div className='flex justify-between'>
                                <div>
                                    <h1>{item.title}</h1>
                                </div>
                                <div onClick={() => handleDeletion(item._id)} key={item._id}>
                                    <img src='https://i.pinimg.com/564x/ec/08/61/ec08611575516717de6d93e75c9ea444.jpg' alt='bin' className='h-6 w-6 rounded-md cursor-pointer' />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='flex items-center mr-8'>
                                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1kKQ82pFi0w0AS00vPkpYqz3Zp4pRQJfoOw&s' alt='dollar' className='h-4 w-4 rounded-lg' />
                                    <h2>{item.amount}</h2>
                                </div>

                                <div className='flex items-center mr-8'>
                                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDX2PdV2MqZevly5QHTHk_KTh5woA3bDjZMw&s' alt='date' className='h-4 w-4 rounded-md' />
                                    <h2>{item.date.split("T")[0]}</h2>
                                </div>

                                <div className='flex items-center'>
                                    <img src='https://static-00.iconduck.com/assets.00/message-icon-512x463-tqzmxrt7.png' alt='msg' className='h-4 w-4 rounded-sm' />
                                    <h2>{item.Note}</h2>
                                </div>
                            </div>
                        </div>
                    </li>
                    ))
                }
               </ul>
            </div>
        </div>
        

        </div>
    )
}

export default Income