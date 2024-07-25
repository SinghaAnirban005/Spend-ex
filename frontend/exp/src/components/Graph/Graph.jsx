import React, {useState, useEffect} from "react";
import { 
    Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
 } from "chart.js"
import axios from "axios"
 
import {Line} from "react-chartjs-2"

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
)

function Graph() {
    
    useEffect(() => {
        ;( async () => {
            const inc = await axios.get("/api/v1/incomes/fetchIncome")
            const exp = await axios.get("/api/v1/expenses/fetchExpense")

            setIncome(inc.data.data)
            setExpense(exp.data.data)
          
            
        })()
    }, [])
    

    const [income, setIncome] = useState([])
    const [expense, setExpense] = useState([])
    // const [incAmount, setInc] = useState([])
    // const [expAmount, setExp] = useState([])

    const data = {

        labels: expense.map((inc) => {
            return inc.date.split("T")[0]
        }),
        // labels: income.map((exp) => {
        //     return exp.date.split("T")[0]
        // }),

        datasets: [
            {
                label: "Expense",
                data: [
                    ...expense.map((data) => {
                        return data.amount
                    })
                ],
                backgroundColor: 'red',
                tension: 0.2
            },

            {
                label: "Income",
                data: [
                    ...income.map((item) => {
                        return item.amount
                    })
                ],
                backgroundColor: 'green',
                tension: 0.2
            },

        ]
    }

    return (
       
            <div className="flex border-black border-2 rounded-md bg-slate-200 pt-4 w-[40em] h-[24em]">
                <Line data={data} />
            </div>
      
    )
}


export default Graph