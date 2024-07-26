import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,

    imgURL: '',
    userInfo: {
        fullName: '',
        username: ''
    },

    income: [{
    title: "",
    amount: 0,
    date: "",
    note: "",
    }],

    expense: [{
        title: "",
        amount: 0,
        date: "",
        note: "",
    }]
}

export const ExpenseSlice = createSlice({
    name: "Expense",
    initialState,

    reducers: {
        login: (state, action) => {
            state.status = true
        },

        logout: (state, action) => {
            state.status = false;
            state.imgURL = ''
        },

        avatarURL: (state, action) => {
            if(state.status) {
                state.imgURL = action.payload

                console.log(state.imgURL)
                console.log(action.payload)
            }
        },

        getUser: (state, action) => {
            if(state.status) {
                state.userInfo = {
                    fullName: action.payload.fullName,
                    username: action.payload.username
                }
               
            }
        },

        addIncome: (state, action) => {
            if(state.status) {
                const incomeData = {
                    title: action.payload.title,
                    amount: action.payload.amount,
                    date: action.payload.date,
                    note: action.payload.Note,
                }

                state.income.push(incomeData)
                console.log(incomeData)
            }
        },

        addExpense: (state, action) => {
            if(state.status) {
                const expenseData = {
                    title: action.payload.title,
                    amount: action.payload.amount,
                    date: action.payload.date,
                    note: action.payload.note,
                    totalAmount: action.payload.totalAmount,
                }

                state.income.push(incomeData)
            }
        }
    }
})

export const {login, logout, addExpense, addIncome, avatarURL, getUser } = ExpenseSlice.actions
export default ExpenseSlice.reducer