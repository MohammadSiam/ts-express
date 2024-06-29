import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
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
    const jwtSecret: Secret = process.env.JWT_SECRET as Secret;

    // Check if user has super admin role
    if (user.role === "super admin") {
      // Generate JWT token with admin privileges
      const adminToken = jwt.sign(
        { userId: user.id, userEmail: user.email, role: "super admin" },
        jwtSecret,
        {
          expiresIn: "1h",
        }
      );
      return adminToken;
    }

    // Check if user has admin role
    if (user.role === "admin") {
      // Generate JWT token with admin privileges
      const adminToken = jwt.sign(
        { userId: user.id, userEmail: user.email, role: "admin" },
        jwtSecret,
        {
          expiresIn: "1h",
        }
      );
      return adminToken;
    }

    // Generate JWT token for regular user
    const token = jwt.sign(
      { userId: user.id, userEmail: user.email, role: "user" },
      jwtSecret,
      {
        expiresIn: "1h",
      }
    );
    return token;
  } catch (error) {
    throw error;
  }
};
//parallal puted the information from registration forms
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

export const adminUserService = async (email: string) => {
  try {
    const loginRepository = getRepository(Login);
    // const queryBuilder: SelectQueryBuilder<Login> =
    //   loginRepository.createQueryBuilder("login");
    // const user: any = await queryBuilder
    //   .where("login.email=:email", { email })
    //   .andWhere("login.role=:role", { role: "admin" })
    //   .getMany();
    const user = await loginRepository.findOne({
      where: { email, role: "admin" },
    });

    if (!user) {
      throw new Error("Admin not Found");
    }
    const token = jwt.sign(
      { userId: user.id, userEmail: user.email, role: user.role },
      process.env.JWT_SECRET as Secret,
      { expiresIn: "1h" }
    );
    return token;
  } catch (error) {
    throw error;
  }
};

export const getAllUserService = async () => {
  try {
    const loginRepository = getRepository(Login);
    const allUsers = await loginRepository.find({ relations: ["meetings"] });
    return allUsers;
  } catch (error) {
    throw error;
  }
};

export const getUserByUserId = async (userId: number) => {
  try {
    const loginRepository = getRepository(Login);
    const user = await loginRepository.find({
      where: { id: userId },
      relations: ["meetings"],
    });
    return user;
  } catch (error) {
    throw error;
  }
};
