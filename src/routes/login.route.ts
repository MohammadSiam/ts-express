import express from "express";
import { login } from "../controller/login.controller";

const router = express.Router();

// POST /login
router.post("/login", login);

export default router;
