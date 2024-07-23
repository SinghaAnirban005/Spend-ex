import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createIncome,
    deleteIncome,
    getIncome,
    totalIncome,
    getMaximum,
    getMinimum,
    fetchIncome
} from "../controllers/income.controller.js"

const router = Router()

router.use(verifyJWT)

router.route("/create-income").post(createIncome)
router.route("/delete-income").post(deleteIncome)
router.route("/getIncome").get(getIncome)
router.route("/total-income").get(totalIncome)
router.route("/get-maximum").get(getMaximum)
router.route("/get-minimum").get(getMinimum)
router.route("/fetchIncome").get(fetchIncome)


export default router