import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Patch,
} from "@nestjs/common";
import { CreateEmailDto, UpdateEmailDto, VerifyEmailDto } from "./dto/index";
import { Email } from "./email.entity";
import { EmailService } from "./email.service";
import { Response } from "src/system/interfaces";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("/api/v1/email")
@ApiTags("Email")
export class EmailController {
  constructor(private EmailService: EmailService) {}

  @Post("send-email")
  @ApiOperation({
    description: "Create Email",
  })
  @ApiOkResponse({
    type: Response<Email>,
  })
  async sendEmail(@Body() EmailDto: CreateEmailDto): Promise<any> {
    return this.EmailService.create(EmailDto);
  }

  @Post("send-code")
  @ApiOperation({
    description: "Create Email",
  })
  @ApiOkResponse({
    type: Response<Email>,
  })
  async sendCode(@Body() verifyDto: VerifyEmailDto): Promise<any> {
    return this.EmailService.verify(verifyDto);
  }

  @Get("all")
  @ApiOperation({
    description: "Get all Email",
  })
  @ApiOkResponse({
    type: Response<Email[]>,
  })
  async GetAll(): Promise<any> {
    return this.EmailService.getAll();
  }

  @Get(":id")
  @ApiOperation({
    description: "Get Email by id",
  })
  @ApiOkResponse({
    type: Response<Email>,
  })
  async GetOne(@Param("id", ParseIntPipe) id: number): Promise<any> {
    return this.EmailService.getOneById(id);
  }

  @Patch(":id")
  @ApiOperation({
    description: "Update Email",
  })
  @ApiOkResponse({
    type: Response<Email>,
  })
  @UsePipes(ValidationPipe)
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() EmailDto: UpdateEmailDto
  ): Promise<any> {
    return this.EmailService.update(id, EmailDto);
  }

  @Delete(":id")
  @ApiOperation({
    description: "Delete Email",
  })
  async delete(@Param("id") id: number): Promise<any> {
    return this.EmailService.delete(id);
  }
}
