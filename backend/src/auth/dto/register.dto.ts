import { ImageType } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  employment: string;

  @IsString()
  @IsNotEmpty()
  job: string;

  imageFront: string;
  imageBack: string;

  imageType: ImageType;
}
