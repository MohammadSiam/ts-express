import { Request, RequestHandler, Response } from "express";
import { createLogin } from "../services/login.service";
import {
  createRegistration,
  getRegistrationUserById,
} from "../services/registration.service";

export const registerUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { username, email, phone, department, password } = req.body;
    await createRegistration(username, email, phone, department, password);
    await createLogin(email, password);
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const findRegisterById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const getUser = await getRegistrationUserById(parseInt(id));

    return res
      .status(200)
      .json({ message: "Todo fetched successfully", data: getUser });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
