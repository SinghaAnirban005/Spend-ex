import { Router } from "express"
import {
    createExpense,
    deleteExpense,
    getExpense,
    totalExpense,
    getMaximum,
    getMinimum,
    fetchExpenses
} from "../controllers/expense.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.use(verifyJWT)

router.route("/create-expense").post(createExpense)
router.route("/delete-expense").post(deleteExpense)
router.route("/getExpense").get(getExpense)
router.route("/total-expense").get(totalExpense)
router.route("/get-minimum").get(getMinimum)
router.route("/get-maximum").get(getMaximum)
router.route("/fetchExpense").get(fetchExpenses)

export default router