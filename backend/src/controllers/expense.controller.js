import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Expense } from "../models/expense.model.js";
import { User } from "../models/user.model.js";

const createExpense = asyncHandler( async(req, res) => {
    try {
        const {title, amount, date, Note } = req.body
        console.log(title)
    
    if(!title) {
        throw new ApiError(
            400, 
            "Title is missing"    
        )
    }

    if(!amount || !date || !Note){
        throw new ApiError(
            400,
            "Fill all the required fields"
        )
    }

    const user = await User.findById(req.user._id).select("-password -refreshToken")

    const income = await Expense.create({
        title,
        amount,
        date,
        Author: user._id,
        Note
    })

    const expenseBox = await Expense.findById(income._id)

    return res
    .status(200)
    .json(
       new ApiResponse(
        200,
        expenseBox,
        "Succesfully created an expense box"
       )
    )
    } catch (error) {
        throw new ApiError(500, "Failed to create Expense Box !!")   
    }

})

const deleteExpense = asyncHandler(async(req, res) => {
    try {
        
    const authorId = req.user._id
    if(!authorId){
        throw new ApiError(400, "author ID not available")
    }

    const deletedExpense = await Expense.findOneAndDelete(
        {
            Author: authorId,
        }
    )

    if(!deletedExpense) {
        throw new ApiError(400, "Error while deleting expense")
    }


    return res
    .status(200)
    .json(
        new ApiResponse(
            400,
            {},
            "Succesfully deleted Expense !!"
        )
    )
    } catch (error) {
        throw new ApiError(500, "Failed to delete expense")
    }

})

const getExpense = asyncHandler(async(req, res) => {
    
    try {
    
    const authorId = await User.findById(req.user._id)

    if(!authorId) {
        throw new ApiError(400, "Failed to find User")
    }

    const expense  = await Expense.find(
        {
            Author: authorId
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            expense,
            "Expense details fetched Succesfully !!"
        )
    )
    } catch (error) {
        console.error(error.message)
        throw new ApiError("Failed to fetch expense")
    }
})

const totalExpense = asyncHandler(async(req, res) => {
    try {
        
        const authorId = req.user._id
        if(!authorId) {
            throw new ApiError(400, "Failed to find User")
        }

        const expense = await Expense.find(
            {
                Author: authorId
            }
        )

        if(!expense) {
            throw new ApiError(400, "expense does not exist !!")
        }

        let total = 0;

        expense.forEach((data) => {
            total += data.amount
        })

        return res
        .status(200)
        .json(
            new ApiResponse(
                300,
                total,
                "Calculated total Expense !!"
            )
        )

    } catch (error) {
        
        console.error(error.message)
        throw new ApiError(500, "Failed to calculate totalExpense")
    
    }
})


const getMinimum = asyncHandler(async(req, res) => {
    try {

        const authorId = req.user._id
        const expenses = await Expense.find({
            Author: authorId
        })

        let minVal;

        if(expenses.length === 0) {
            minVal = 0;
        }

        else {
            minVal = expenses[0].amount

            for(let i = 1; i < expenses.length; i++) {
                if(expenses[i].amount < minVal) {
                    minVal = expenses[i].amount
                }
            }

        }

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                minVal,
                "Fetched min value"
            )
        )
    } catch (error) {
        console.error(error.message)
        throw new ApiError(500, error)
    }
})


const getMaximum = asyncHandler(async(req, res) => {
    try {
        const authorId = req.user._id
        const expenses = await Expense.find({
            Author: authorId
        })

        let maxVal

        if(expenses.length === 0) {
            maxVal = 0;
        }

        else {
            maxVal = expenses[0].amount

            for(let i = 1; i < expenses.length; i++) {
                if(expenses[i].amount > maxVal) {
                    maxVal = expenses[i].amount
                }
            }

        }

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                maxVal,
                "Fetched max value"
            )
        )
    } catch (error) {
        console.error(error.message)
        throw new ApiError(500, error)
    }
})


const fetchExpenses = async () => {
    try {
        const expenses = await Expense.find().select('date amount').lean();
        
        if(!expenses) {
            throw new Error(400, "Couldn't resolve expense")
        }


        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                expenses,
                "Failed to calculate expense"
            )
        )
        //return expenses;
    } catch (error) {
        console.error("Error fetching expenses:", error);
        return [];
    }
};


export {
    createExpense,
    deleteExpense,
    getExpense,
    totalExpense,
    getMinimum,
    getMaximum,
    fetchExpenses
}
