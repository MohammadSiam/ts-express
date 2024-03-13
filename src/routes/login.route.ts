import express from "express";
import { login, loginAdmin } from "../controller/login.controller";

const router = express.Router();

// POST /login
router.post("/login", login);
router.post("/login/admin", loginAdmin);

export default router;
