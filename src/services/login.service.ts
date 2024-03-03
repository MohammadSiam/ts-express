import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Login } from "../models/login.model";
import { Registration } from "../models/registration.model";

export const loginUser = async (email: string, password: string) => {
  try {
    const registrationRepository = getRepository(Registration);
    const user = await registrationRepository.findOne({ where: { email } });

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
    const loginRepository = getRepository(Login);
    const newLogin = loginRepository.create({
      email,
      password,
    });
    await loginRepository.save(newLogin);
  } catch (error) {
    throw error;
  }
};
