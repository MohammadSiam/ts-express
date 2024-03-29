import bcrypt from "bcrypt";
import { getRepository } from "typeorm";
import { Login } from "../models/login.model";
import { Registration } from "../models/registration.model";

export const createRegistration = async (
  username: string,
  email: string,
  phone: string,
  department: string,
  password: string
) => {
  try {
    // Check if username or email already exists
    const registrationRepository = getRepository(Registration);

    const existingEmail = await registrationRepository.findOne({
      where: { email },
    });

    const existingPhone = await registrationRepository.findOne({
      where: { phone },
    });

    if (existingPhone) {
      throw new Error("PhoneNumber is already in use");
    }

    if (existingEmail) {
      throw new Error("Email is already in use");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new registration
    const newRegistration = registrationRepository.create({
      username,
      email,
      phone,
      department,
      password: hashedPassword,
    });
    await registrationRepository.save(newRegistration);
  } catch (error) {
    throw error;
  }
};

export const getRegistrationUserById = async (id: number) => {
  const regRepository = getRepository(Registration);
  // console.log(id);
  const reg = await regRepository.findOneBy({ registrationId: id });
  // console.log(reg);
  return reg;
};

export const getNameRegistrationUser = async (id: number) => {
  const regRepository = getRepository(Registration);
  // console.log(id);
  const reg: any = await regRepository.findOneBy({ registrationId: id });
  // console.log(reg.username);
  return reg.username;
};

export const updateUserToAdminService = async (email: any) => {
  try {
    const registrationRepository = getRepository(Registration);
    const loginRepository = getRepository(Login);

    const registration: any = await registrationRepository.findOneBy({ email });
    if (registration) {
      registration.role = "admin";
      await registrationRepository.save(registration);
    }

    // Find login record by email and update role to 'admin'
    const login = await loginRepository.findOneBy({ email });
    if (login) {
      login.role = "admin";
      await loginRepository.save(login);
    }
  } catch (error) {
    console.error("Error finding records:", error);
  }
};

export const getAllAdminService = async () => {
  try {
    const loginRepository = getRepository(Login);
    return await loginRepository.find({ where: { role: "admin" } });
  } catch (error) {
    console.error("Error finding records:", error);
  }
};

export const getSuperAdminService = async () => {
  try {
    const loginRepository = getRepository(Login);
    return await loginRepository.find({ where: { role: "super admin" } });
  } catch (error) {
    console.error("Error finding records:", error);
  }
};

export const getAdminService = async (email: any) => {
  try {
    const loginRepository = getRepository(Login);
    return await loginRepository.find({ where: { email, role: "admin" } });
  } catch (error) {
    console.error("Error finding records:", error);
  }
};
