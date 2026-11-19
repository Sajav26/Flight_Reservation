import express from "express";
import {
    registerPassenger,
    loginPassenger,
} from "../controllers/authController.js";

const router = express.Router();

router.post('/register', registerPassenger);
router.post('/login', loginPassenger);

export default router;