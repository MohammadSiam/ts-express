import { Request, RequestHandler, Response } from "express";
import { createLogin } from "../services/login.service";
import * as serviceReg from "../services/registration.service";

export const registerUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { username, email, phone, department, password } = req.body;
    await serviceReg.createRegistration(
      username,
      email,
      phone,
      department,
      password
    );
    await createLogin(email, password);
    return res.status(200).json({ message: "User registered successfully" });
  } catch (error: any) {
    console.error("Error registering user:", error);
    if (error.message === "Username is already in use") {
      return res.status(400).json({ message: "Username is already in use" });
    } else if (error.message === "Email is already in use") {
      return res.status(400).json({ message: "Email is already in use" });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const findRegisterById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const getUser = await serviceReg.getRegistrationUserById(parseInt(id));

    return res
      .status(200)
      .json({ message: "Find Register successfully", data: getUser });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserToAdmin: RequestHandler = async (req, res, next) => {
  const { email } = req.params;
  try {
    const update = await serviceReg.updateUserToAdminService(email);
    return res.status(200).json(update);
  } catch (error) {
    res.status(500).send("Error status update user to admin");
  }
};
export const getAllAdmin: RequestHandler = async (req, res, next) => {
  try {
    const allAdmin = await serviceReg.getAllAdminService();
    return res.status(200).json(allAdmin);
  } catch (error) {
    res.status(500).send("Error status to find admin");
  }
};

export const getSuperAdmin: RequestHandler = async (req, res, next) => {
  try {
    const superAdmin = await serviceReg.getSuperAdminService();
    return res.status(200).json(superAdmin);
  } catch (error) {
    res.status(500).send("Error status to find admin");
  }
};

export const getAdmin: RequestHandler = async (req, res, next) => {
  const { email } = req.params;
  try {
    const admin = await serviceReg.getAdminService(email);
    return res.status(200).json(admin);
  } catch (error) {
    res.status(500).send("Error status to find admin");
  }
};
