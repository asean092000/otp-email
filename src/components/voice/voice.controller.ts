// import { GetCurrentToken } from "../../common/backlist/get-current-token.decorator";
import {
  Controller,
  Post,
  HttpCode,
  Body,
  UnauthorizedException,
  Delete,
  Param,
} from "@nestjs/common";
import { VoiceService } from "./voice.service";
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { CreateVoiceDto } from "./voice/creat.otp.dto";
import { VerifyVoiceDto } from "./voice/verify.opt.dto";
// import * as bcrypt from "bcrypt";
@ApiTags("Voice")
@Controller("/api/v1/voice")
@ApiBearerAuth("Authorization")
export class VoiceController {
  constructor(private readonly otpService: VoiceService) {}

  @ApiOperation({
    summary: "Send sms otp to phone number",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully",
  })
  @Post("/send-code")
  async sendSMS(
    @Body() CreateVoiceDto: CreateVoiceDto,
    // @GetCurrentToken() acToken: string
  ) {
    // console.log(acToken);
    // if (
    //   typeof acToken === "undefined" ||
    //   !(await bcrypt.compare(process.env.KEY, acToken))
    // )
    //   throw new UnauthorizedException();

    return await this.otpService.sendSMS(CreateVoiceDto.phoneNumber);
  }

  @ApiOperation({
    summary: "Verify otp",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully",
  })
  @HttpCode(200)
  @Post("/verify-code")
  async verifyCode(
    @Body() verifyVoiceDto: VerifyVoiceDto,
    // @GetCurrentToken() acToken: string
  ) {
    // if (
    //   typeof acToken === "undefined" ||
    //   !(await bcrypt.compare(process.env.KEY, acToken))
    // )
    //   throw new UnauthorizedException();
    return await this.otpService.verifyCode(
      verifyVoiceDto.phoneNumber,
      verifyVoiceDto.smsCode
    );
  }

  @Delete(":phoneNumber")
  @ApiOperation({
    description: "Delete phoneNumber",
  })
  async delete(
    @Param("phoneNumber") phoneNumber: string,
    // @GetCurrentToken() acToken: string
  ): Promise<any> {
    // if (
    //   typeof acToken === "undefined" ||
    //   !(await bcrypt.compare(process.env.KEY, acToken))
    // )
      throw new UnauthorizedException();
    return this.otpService.delete(phoneNumber);
  }
}
