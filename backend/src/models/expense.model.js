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
    totalExpense: {
        type: Number,
    },
},
{
    timestamps: true
}
)

export const Expense = mongoose.model("Expense", expenseSchema)