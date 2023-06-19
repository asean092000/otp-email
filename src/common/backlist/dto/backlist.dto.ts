import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class BacklistDto {
  @ApiProperty({
    description: "acToken of the user",
  })
  @IsNotEmpty()
  @IsString()
  acToken: string;

  @ApiProperty({
    description: "UserId of user",
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
