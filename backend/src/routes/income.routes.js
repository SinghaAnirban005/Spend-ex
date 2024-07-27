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

// router.use(verifyJWT)

router.route("/create-income").post(verifyJWT, createIncome)
router.route("/delete-income/:id").delete(deleteIncome)
router.route("/getIncome").get(verifyJWT, getIncome)
router.route("/total-income").get(verifyJWT, totalIncome)
router.route("/get-maximum").get(verifyJWT, getMaximum)
router.route("/get-minimum").get(verifyJWT, getMinimum)
router.route("/fetchIncome").get(verifyJWT, fetchIncome)


export default router