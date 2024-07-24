import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Income } from "../models/income.model.js";
import { User } from "../models/user.model.js";

const createIncome = asyncHandler( async(req, res) => {
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
    const income = await Income.create({
        title,
        amount,
        date,
        Author: user._id,
        Note
    })

    const incomeBox = await Income.findById(income._id)

    return res
    .status(200)
    .json(
       new ApiResponse(
        200,
        incomeBox,
        "Succesfully created an income box"
       )
    )
    } catch (error) {
        throw new ApiError(500, "Failed to create Income Box !!")   
    }

})

const deleteIncome = asyncHandler(async(req, res) => {
    try {
        
    const authorId = req.user._id
    if(!authorId){
        throw new ApiError(400, "author ID not available")
    }

    const deletedIncome = await Income.findOneAndDelete(
        {
            Author: authorId,
        }
    )

    if(!deletedIncome) {
        throw new ApiError(400, "Error while deleting income")
    }


    return res
    .status(200)
    .json(
        new ApiResponse(
            400,
            {},
            "Succesfully deleted Income !!"
        )
    )
    } catch (error) {
        throw new ApiError(500, "Failed to delete income")
    }

})

const getIncome = asyncHandler(async(req, res) => {
    
    try {
    
    const authorId = await User.findById(req.user._id)

    if(!authorId) {
        throw new ApiError(400, "Failed to find User")
    }

    const income  = await Income.find(
        {
            Author: authorId
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            income,
            "Income details fetched Succesfully !!"
        )
    )
    } catch (error) {
        console.error(error.message)
        throw new ApiError("Failed to fetch income")
    }
})

const totalIncome = asyncHandler(async(req, res) => {
    try {
        
        const authorId = req.user._id
        if(!authorId) {
            throw new ApiError(400, "Failed to find User")
        }

        const income = await Income.find(
            {
                Author: authorId
            }
        )

        if(!income) {
            throw new ApiError(400, "Income does not exist !!")
        }

        let total = 0;

        income.forEach((data) => {
            total += data.amount
        })

        return res
        .status(200)
        .json(
            new ApiResponse(
                300,
                total,
                "Calculated total Income !!"
            )
        )

    } catch (error) {
        
        console.error(error.message)
        throw new ApiError(500, "Failed to calculate totalIncome")
    
    }
})

const getMinimum = asyncHandler(async(req, res) => {
    try {

        const authorId = req.user._id
        const incomes = await Income.find({
            Author: authorId
        })

        let minVal;

        if(incomes.length === 0) {
            minVal = 0;
        }

        else {
            minVal = incomes[0].amount

            for(let i = 1; i < incomes.length; i++) {
                if(incomes[i].amount < minVal) {
                    minVal = incomes[i].amount
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
        const incomes = await Income.find({
            Author: authorId
        })

        let maxVal

        if(incomes.length === 0) {
            maxVal = 0;
        }

        else {
            maxVal = incomes[0].amount

            for(let i = 1; i < incomes.length; i++) {
                if(incomes[i].amount > maxVal) {
                    maxVal = incomes[i].amount
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

const fetchIncome = asyncHandler(async(req, res) => {
    try {
        const incomes = await Income.find(
            {
                Author: req.user._id
            }
        ).select('date amount').lean()
       
        if(!incomes) {
            throw new ApiError(400, "Couldn't query income")
        }

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                incomes,
                "Fetched data",
            )
        )
    } catch (error) {
        console.error("Error fetching incomes:", error);
        return []
    }
})

export {
    createIncome,
    deleteIncome,
    getIncome,
    totalIncome,
    getMinimum,
    getMaximum,
    fetchIncome
}
