import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: "https://spend-ex-2.onrender.com",
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from "./routes/user.routes.js"
import incomeRouter from "./routes/income.routes.js"
import expenseRouter from "./routes/expense.routes.js"

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/incomes", incomeRouter)
app.use("/api/v1/expenses", expenseRouter)

export { app }