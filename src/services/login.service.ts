import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Login } from "../models/login.model";

export const loginUser = async (email: string, password: string) => {
  try {
    const loginRepository = getRepository(Login);
    const user = await loginRepository.findOne({ where: { email } });

    if (!user) {
      return null; // User not found
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return null; // Passwords don't match
    }
    const jwtSecret = process.env.JWT_SECRET || "default_secret";

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    throw error;
  }
};

export const createLogin = async (email: string, password: string) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the email and hashed password to the login table
    const loginRepository = getRepository(Login);
    const newLogin = loginRepository.create({
      email,
      password: hashedPassword,
    });
    await loginRepository.save(newLogin);
  } catch (error) {
    throw error;
  }
};
