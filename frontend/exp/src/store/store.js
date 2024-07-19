import { configureStore } from "@reduxjs/toolkit"
import ExpenseSlice from "./Slice.js"

export const store = configureStore({
    reducer: ExpenseSlice
})