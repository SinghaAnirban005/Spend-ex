import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createIncome,
    deleteIncome,
    getIncome,
    totalIncome
} from "../controllers/income.controller.js"

const router = Router()

router.use(verifyJWT)

router.route("/create-income").post(createIncome)
router.route("/delete-income").post(deleteIncome)
router.route("/getIncome").get(getIncome)
router.route("/total-income").get(totalIncome)

export default router