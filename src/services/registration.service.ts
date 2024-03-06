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
    // Check if username or email already exists
    const registrationRepository = getRepository(Registration);
    const existingUsername = await registrationRepository.findOne({
      where: { username },
    });
    const existingEmail = await registrationRepository.findOne({
      where: { email },
    });

    if (existingUsername) {
      throw new Error("Username is already in use");
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
  console.log(reg);
  return reg;
};

export const getNameRegistrationUser = async (id: number) => {
  const regRepository = getRepository(Registration);
  // console.log(id);
  const reg: any = await regRepository.findOneBy({ registrationId: id });
  // console.log(reg.username);
  return reg.username;
};
