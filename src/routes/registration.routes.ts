import express from "express";
import * as register from "../controller/registration.controller";

const router = express.Router();

// POST /register
router.post("/register", register.registerUser);
router.get("/findRegisterById/:id", register.findRegisterById);
router.get("/findAllAdmin", register.getAllAdmin);
router.get("/findAdmin/:email", register.getAdmin);

router.put("/updateAdminRole/:email", register.updateUserToAdmin);

export default router;
