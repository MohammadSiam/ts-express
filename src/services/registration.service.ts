import bcrypt from "bcrypt";
import { getRepository } from "typeorm";
import { Registration } from "../models/registration.model";

export const createRegistration = async (
  username: string,
  email: string,
  phone: string,
  department: string,
  password: string
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const registrationRepository = getRepository(Registration);
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
