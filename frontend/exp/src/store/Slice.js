import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,

    imgURL: '',
    userInfo: {
        fullName: '',
        username: ''
    },

    income: [],

    expense: [{
        title: "",
        amount: 0,
        date: "",
        note: "",
    }],

    recents: [
        {
            title: '',
            amount: ''
        }
    ]
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
            state.recents = []
            state.userInfo = {}
            state.income = []
            state.expense = []
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
            if(state.status && action.payload.length !== 0) {
                action.payload.map((item) => {
                    state.income.push(item)
                })

                console.log(action.payload)
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
        },

        userRecents: (state, action) => {
            if(state.status) {
            
                console.log(action.payload)
                action.payload.map((item) => {
                    state.recents.push(item)
                })

                console.log(state.recents)
            }
        },

        clearIncome: (state, action) => {
            state.income = [{}]
        },

        clearRecents: (state, action) => {
            state.recents = [{}]
        },

    }
})

export const {
    login, 
    logout, 
    addExpense, 
    addIncome, 
    avatarURL, 
    getUser, 
    userRecents, 
    clearIncome,
    clearRecents,
     
} = ExpenseSlice.actions
export default ExpenseSlice.reducer