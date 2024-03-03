import { Request, Response } from "express";
import { createLogin } from "../services/login.service";
import { createRegistration } from "../services/registration.service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, phoneNumber, department, password } = req.body;
    await createRegistration(
      username,
      email,
      phoneNumber,
      department,
      password
    );
    await createLogin(email, password);
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
