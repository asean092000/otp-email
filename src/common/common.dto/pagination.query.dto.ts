import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsOptional, IsString } from "class-validator";
import { Paging } from "src/system/interfaces";
import { Order } from "src/system/constants/index";

export class PaginationQueryDto implements Paging {
  @IsOptional()
  @IsNumberString()
  @ApiProperty({ default: 10 })
  take: number;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ default: 1 })
  skip: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ default: Order.DESC })
  order: Order;

  @IsOptional()
  @IsString()
  @ApiProperty({
    default:
      '{"email":"member12@super.com","phone":"012345612","username":"member12"}',
  })
  keyword: string;
}
