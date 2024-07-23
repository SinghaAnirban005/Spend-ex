import mongoose, {Schema} from "mongoose"

const expenseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        amount: {
            type: Number,
            required: true,
            min: 0, 
        },
        date: {
            type: Date,
            required: true,
        },
        Note: {
            type: String, 
            required: true,
            trim: true,
        },
        Author: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
    },
    {
        timestamps: true
    }
)

export const Expense = mongoose.model("Expense", expenseSchema)