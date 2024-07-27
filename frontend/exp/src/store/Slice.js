import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,

    imgURL: '',
    userInfo: {
        fullName: '',
        username: ''
    },

    income: [],

    expense: [],

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
                console.log(state.income)
            }
        },

        addExpense: (state, action) => {
            if(state.status && action.payload.length !== 0) {
                action.payload.map((item) => {
                    state.expense.push(item)
                })

                console.log(action.payload)
                
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

        clearExpense: (state, action) => {
            state.expense = [{}]
        },

        testMethod: (state, action) => {
            console.log(action.payload)
        }
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
    clearExpense,
    testMethod
     
} = ExpenseSlice.actions
export default ExpenseSlice.reducer