import { Router } from "express"
import {
    createExpense,
    deleteExpense,
    getExpense,
    totalExpense
} from "../controllers/expense.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.use(verifyJWT)

router.route("/create-expense").post(createExpense)
router.route("/delete-expense").post(deleteExpense)
router.route("/getExpense").get(getExpense)
router.route("/total-expense").get(totalExpense)

export default router