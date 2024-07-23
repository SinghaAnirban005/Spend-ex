import React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import Chart from 'chart.js/auto';

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
 
             createGraph()
 
 
         } catch (error) {
             console.error(error.message)
             throw new Error("Failed to fetch data")
         }
        })()
 
     }, [income, total, expense])
 

    const processIncomesAndExpenses = async () => {
        try {
            const incomes = await axios.get("/api/v1/incomes/fetchIncome");
            const expenses = await axios.get("/api/v1/expenses/fetchExpense");
    
            // Example processing: Combine and sort by date
            const combinedData = [...incomes, ...expenses];
            combinedData.sort((a, b) => new Date(a.date) - new Date(b.date));
    
            return combinedData;
        } catch (error) {
            console.error("Error processing incomes and expenses:", error);
            return [];
        }
    };

   

    const createGraph = async () => {
        const data = await processIncomesAndExpenses();

        const dates = data.map(item => new Date(item.date));
        const amounts = data.map(item => item.amount);
        const labels = data.map(item => item.title); // Example: Use title as label

        const ctx = document.getElementById('myChart').getContext('2d');
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
        <div className="flex bg-rose-300 min-h-[60em] w-[80em] p-6 ">
            
            {/* this div caters to all transaction and below */}
            <div className="flex-col bg-slate-400 min-w-[40em] mr-2">
                <div className="flex-col">
                    <div className="flex">
                        <h1 className="font-bold text-3xl">All Transactions</h1>
                    </div>
                    <div className="flex w-[40em] justify-center h-[40em]">
                    <canvas id="myChart" className="w-[5em] h-[5em]"></canvas>
                    </div>
                </div>

                <div className="flex-col h-[24em]">
                    <div className="flex justify-between">
                        <div className="flex-col bg-rose-200 w-[18em] h-[5em] rounded-lg">
                            <div className="flex justify-center">
                                <h1>Total Income</h1>
                            </div>
                            <div className="flex justify-center">
                                {`$${income}`}
                            </div>
                        </div>

                        <div className="flex-col bg-rose-200 w-[18em] h-[5em] rounded-lg">
                            <div className="flex justify-center">
                                <h1>Total Expense</h1>
                            </div>
                            <div className="flex justify-center">
                                {`$${expense}`}
                            </div>
                        </div>
                    </div>

                   <div className="flex justify-center mt-[3em]">
                    <div className="flex-col bg-slate-300 w-[20em] h-[5em] rounded-lg">
                            <div className="flex justify-center">
                                <h1>Total Balance</h1>
                            </div>
                            <div className="flex justify-center">
                                {total < 0 ? <span className="text-red-600">{total}</span> : <span className="text-lime-600">${total}</span>}
                            </div>
                        </div>
                   </div>
                </div>
            </div>

            <div className="flex-col mt-8 w-[20em]">
                <div className="flex-col h-[28em]">
                    <div>
                        <h2 className="flex font-bold text-2xl">Recent History</h2>
                    </div>
                    <div className="flex justify-center max-h-[24em] mt-4 ">
                        <h3>list all here....</h3>
                    </div>
                </div>

                <div className="flex-col mt-4 h-[8em]">
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-sm font-bold">Min</h2>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Expense</h2>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold">Max</h2>
                    </div>
                </div>
                <div className="flex justify-between h-[4em] rounded-xl items-center bg-slate-200 mt-2">
                    <p>
                        {`$${minE}`}
                    </p>
                    <p>
                        {`$${maxE}`}
                    </p>
                </div>
                </div>

                <div  className="flex-col mt-4 h-[8em]">
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-sm font-bold">Min</h2>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Salary</h2>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold">Max</h2>
                    </div>
                </div>
                <div className="flex justify-between h-[4em] rounded-xl items-center bg-slate-200 mt-2">
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