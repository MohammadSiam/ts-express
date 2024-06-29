import { Request, Response } from "express";
import { RequestHandler } from "express-serve-static-core";
import jwt from "jsonwebtoken";
import * as loginService from "../services/login.service";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginService.loginUser(email, password);
    if (token) {
      const decodedToken: any = jwt.decode(token);
      return res.status(200).json({
        token,
        userId: decodedToken.userId,
        Email: decodedToken.userEmail,
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    const adminUser = await loginService.adminUserService(email);
    // console.log(adminUser);
    return res.status(200).json(adminUser);
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const allUsers = await loginService.getAllUserService();
    return res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await loginService.getUserByUserId(+id);
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
