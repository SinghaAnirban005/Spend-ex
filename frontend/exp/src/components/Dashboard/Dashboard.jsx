import React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import Chart from 'chart.js/auto';
import Recent from "../Recents/Recent.jsx"

function Dashboard() {

    const [income, setIncome] = useState(0)
    const [expense, setExpense] = useState(0)
    const [total, setTotal] = useState(0)
    const [minI, setMinI] = useState(0)
    const [maxI, setMaxI] = useState(0)

    const [minE, setMinE] = useState(0)
    const [maxE, setMaxE] = useState(0)

    useEffect(() => {

        ;(async() => {
         try {
             const res1 = await axios.get("/api/v1/incomes/total-income")
             if(!res1) {
                 throw new Error("Failed to fetch income")
             }
 
             setIncome(res1.data.data)
 
             const res2 = await axios.get("/api/v1/expenses/total-expense")
             if(!res2) {
                 throw new Error("Failed to fetch expense")
             }
 
             setExpense(res2.data.data)
 
             const minIncome = await axios.get("/api/v1/incomes/get-minimum")
             const maxIncome = await axios.get("/api/v1/incomes/get-maximum")
 
             setMinI(minIncome.data.data)
             setMaxI(maxIncome.data.data)
 
             const minExpense = await axios.get("/api/v1/expenses/get-minimum")
             const maxExpense = await axios.get("/api/v1/expenses/get-maximum")
 
             setMinE(minExpense.data.data)
             setMaxE(maxExpense.data.data)
             
             const final = income - expense 
             setTotal(final)

             
            await createGraph()
            
         } catch (error) {
             console.error(error.message)
             throw new Error("Failed to fetch data")
         }
        })()
 
     }, [income, total, expense])
 

    const processIncomesAndExpenses = async () => {
        try {
            const expense = await axios.get("/api/v1/expenses/fetchExpense");
            const incomes = await axios.get("/api/v1/incomes/fetchIncome");
            console.log(...expense.data.data)
            console.log(...incomes.data.data)
            
            
            const inc = incomes.data.data
            const exp = expense.data.data
         
            const combinedData = [...inc, ...exp];
            combinedData.sort((a, b) => new Date(a.date) - new Date(b.date));
           
            console.log(combinedData)
    
            return combinedData;
        } catch (error) {
            console.error("Error processing incomes and expenses:", error.message);
            return [];
        }
    };
   

    const createGraph = async () => {
        const data = await processIncomesAndExpenses();

        const dates = data.map(item => new Date(item.date));
        const amounts = data.map(item => item.amount);

        console.log(dates)
        console.log(amounts)
        //const labels = data.map(item => item.title); // Example: Use title as label

        const ctx = document.getElementById('myChart').getContext('2d')
        
      
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Amount',
                    data: amounts,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        },
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Amount'
                        }
                    }
                }
            }
        });

        
    };

    
    return (
        <div className="flex min-h-[60em] w-[80em] p-6 ">
            
            {/* this div caters to all transaction and below */}
            <div className="flex-col min-w-[40em] mr-2">
                <div className="flex-col">
                    <div className="flex">
                        <h1 className="font-bold text-3xl text-white">All Transactions</h1>
                    </div>
                   
                    <div className="flex w-[40em] justify-center h-[40em] ">
                        <canvas id="myChart" className=""></canvas>
                    </div>
                    
                </div>
                

                <div className="flex-col h-[24em]">
                    <div className="flex justify-between">
                        <div className="flex-col bg-yellow-300 w-[18em] h-[5em] rounded-lg pt-[0.4em]">
                            <div className="flex justify-center">
                                <h1 className="font-bold text-lg">Total Income</h1>
                            </div>
                            <div  className="flex justify-center text-lime-600 text-3xl">
                                {`$${income}`}
                            </div>
                        </div>

                        <div className="flex-col bg-yellow-300 w-[18em] h-[5em] rounded-lg pt-[0.4em]">
                            <div className="flex justify-center">
                                <h1 className="font-bold text-lg">Total Expense</h1>
                            </div>
                            <div className="flex justify-center text-red-600 text-3xl">
                                {`$${expense}`}
                            </div>
                        </div>
                    </div>

                   <div className="flex justify-center mt-[3em]">
                    <div className="flex-col bg-yellow-500 w-[20em] h-[5em] rounded-lg pt-[0.5em]">
                            <div className="flex justify-center">
                                <h1 className="font-bold text-lg">Total Balance</h1>
                            </div>
                            <div className="flex justify-center">
                                {total < 0 ? <span className="text-red-600 text-3xl">{total}</span> : <span className="text-lime-600 text-3xl">${total}</span>}
                            </div>
                        </div>
                   </div>
                </div>
            </div>

            <div className="flex-col mt-8 w-[20em]">
                <div className="flex-col h-[28em]">
                    <div>
                        <h2 className="flex font-bold text-2xl text-white">Recent History</h2>
                    </div>
                    <div className="flex justify-center max-h-[24em] mt-4">
                        <Recent />
                    </div>
                </div>

                <div className="flex-col mt-12 h-[8em]">
                <div className="flex justify-between items-center p-1">
                    <div>
                        <h2 className="text-sm font-bold text-white">Min</h2>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Expense</h2>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-white">Max</h2>
                    </div>
                </div>
                <div className="flex justify-between h-[4em] rounded-xl items-center p-1 bg-slate-200 mt-2">
                    <p>
                        {`$${minE}`}
                    </p>
                    <p>
                        {`$${maxE}`}
                    </p>
                </div>
                </div>

                <div  className="flex-col mt-4 h-[8em]">
                <div className="flex justify-between items-center p-1">
                    <div>
                        <h2 className="text-sm font-bold text-white">Min</h2>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Salary</h2>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-white">Max</h2>
                    </div>
                </div>
                <div className="flex p-1 justify-between h-[4em] rounded-xl items-center bg-slate-200 mt-2">
                    <p>
                        {`$${minI}`}
                    </p>
                    <p>
                        {`$${maxI}`}
                    </p>
                </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard