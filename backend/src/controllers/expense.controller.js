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

export {
    createExpense,
    deleteExpense,
    getExpense,
    totalExpense
}
