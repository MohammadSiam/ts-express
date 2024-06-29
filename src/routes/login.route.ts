import express from "express";
import * as loginController from "../controller/login.controller";

const router = express.Router();

// POST /login
router.post("/login", loginController.login);
router.post("/login/admin", loginController.loginAdmin);

router.get("/users", loginController.getAllUser);
router.get("/users/:id", loginController.getUserById);

export default router;
