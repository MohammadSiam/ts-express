import { IsEmail, IsEmpty, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateRegistrationDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  department!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsEmpty()
  imagePath?: string;
}
