import express from "express";
import {
  findRegisterById,
  registerUser,
} from "../controller/registration.controller";

const router = express.Router();

// POST /register
router.post("/register", registerUser);
router.get("/findRegisterById/:id", findRegisterById);

export default router;
