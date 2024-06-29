import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateRegistrationDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{10}$/, { message: "Phone number must be 10 digits" })
  phone!: string;

  @IsString()
  @IsNotEmpty()
  department!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  imagePath!: string;
}
