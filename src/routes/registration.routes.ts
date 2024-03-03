import express from "express";
import { registerUser } from "../controller/registration.controller";

const router = express.Router();

// POST /register
router.post("/register", registerUser);

export default router;
