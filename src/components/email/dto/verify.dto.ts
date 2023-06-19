import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, IsNumber } from "class-validator";

export class VerifyEmailDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  code: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export default VerifyEmailDto;
