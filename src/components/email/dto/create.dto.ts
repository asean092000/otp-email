import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length, IsString, IsEmail } from "class-validator";

export class CreateEmailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export default CreateEmailDto;
