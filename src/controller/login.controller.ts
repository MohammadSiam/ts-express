import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { loginUser } from "../services/login.service";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    if (token) {
      const decodedToken: any = jwt.decode(token);
      return res
        .status(200)
        .json({
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
