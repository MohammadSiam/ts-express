import { Request, RequestHandler, Response } from "express";
import { CreateRegistrationDto } from "../dtos/createRegistration.dto";
import * as serviceReg from "../services/registration.service";
import { plainToInstance } from "class-transformer";
import cloudinary from "../config/cloudinary.config";
import { toDataUri } from "../utils/dataUriParser";


export const registerUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const createRegistrationDto = plainToInstance(CreateRegistrationDto, JSON.parse(req.body.data));

    const file: any = req.file;
    const dataUri: any = toDataUri(file);

    const uploadToCloudinary = (dataUri: string) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(dataUri, (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        });

      });
    };

    const result: any = await uploadToCloudinary(dataUri);
    const { public_id } = result;
    const url = cloudinary.url(public_id, {
      width: 200,
      height: 200,
      crop: 'fill'
    });

    createRegistrationDto.imagePath = url;

    const data = await serviceReg.createRegistration(createRegistrationDto);
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const findRegisterById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const getUser = await serviceReg.getRegistrationUserById(parseInt(id));

    return res
      .status(200)
      .json({ message: "Find Register successfully", data: getUser });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserToAdmin: RequestHandler = async (req, res, next) => {
  const { email } = req.params;
  try {
    const update = await serviceReg.updateUserToAdminService(email);
    return res.status(200).json(update);
  } catch (error) {
    res.status(500).send("Error status update user to admin");
  }
};
export const getAllAdmin: RequestHandler = async (req, res, next) => {
  try {
    const allAdmin: any = await serviceReg.getAllAdminService();
    return res.status(200).json(allAdmin);
  } catch (error) {
    res.status(500).send("Error status to find admin");
  }
};

export const getSuperAdmin: RequestHandler = async (req, res, next) => {
  try {
    const superAdmin = await serviceReg.getSuperAdminService();
    return res.status(200).json(superAdmin);
  } catch (error) {
    res.status(500).send("Error status to find admin");
  }
};

export const getAdmin: RequestHandler = async (req, res, next) => {
  const { email } = req.params;
  try {
    const admin = await serviceReg.getAdminService(email);
    return res.status(200).json(admin);
  } catch (error) {
    res.status(500).send("Error status to find admin");
  }
};
