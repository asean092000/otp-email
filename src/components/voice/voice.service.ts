import { generateRandomSixDigitsNumber } from "./../email/randon-number";
import { ERROR } from "../../system/constants/messageError";
import { SuccessResponse } from "../../system/BaseResponse/dto/response.dto";
import { STATUSCODE } from "../../system/constants/statusCode";
import { Voice } from "./voice.entity";
import { Injectable, Inject, HttpStatus, HttpException } from "@nestjs/common";
import { Logger } from "winston";
import { HttpService } from "@nestjs/axios";
import { ErrorResponse } from "src/system/interfaces";
import { firstValueFrom, map } from "rxjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MESSAGE } from "src/system/constants";
@Injectable()
export class VoiceService {
  private headersRequest = {
    "Content-Type": "application/json",
    "Accept-Encoding": "gzip,deflate,compress",
  };

  public constructor(
    private readonly httpService: HttpService,
    @Inject("winston")
    private readonly logger: Logger,
    @InjectRepository(Voice)
    private voiceRepository: Repository<Voice>
  ) {}

  async sendSMS(phoneNumber: string) {
    try {
      const voice = await this.voiceRepository.findOne({
        where: {
          phoneNumber,
          isBlock: false,
        },
      });

      if (voice?.count >= 3) {
        return {
          code: 4404,
          message:
            "Bạn đã nhập quá 3 lần xin vui lòng liên hệ chăm sóc khách hàng.",
        };
      }

      let createVoice = {};
      let count = 0;
      let code = generateRandomSixDigitsNumber();

      if (voice) {
        count = voice.count + 1;
        createVoice = {
          ...voice,
          phoneNumber,
          code,
          count,
          updatedAt: new Date(),
        };
      } else {
        count++;
        createVoice = {
          phoneNumber,
          code,
          count,
        };
        createVoice = await this.voiceRepository.create(createVoice);
      }
      let phone = phoneNumber.split("+84");
      await this.voiceRepository.save(createVoice);
      let data = {
        type: `${process.env.OTP_VOICE_TYPE}`,
        id: `${process.env.OTP_VOICE_ID}`,
        phone: `0${phone[1]}`,
        data: code,
        option: {},
      };

      return await firstValueFrom(
        this.httpService
          .post(`${process.env.OTP_VOICE_URL}`, data, {
            headers: this.headersRequest,
          })
          .pipe(map((resp) => resp.data))
      );
    } catch (error) {
      this.logger.error(
        `The connection was refused with data: ${JSON.stringify(
          new ErrorResponse(error, true, error.message)
        )}`
      );
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `The connection was refused. Please try one again!`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async verifyCode(phoneNumber: string, smsCode: number) {
    try {
      const voice = await this.voiceRepository.findOne({
        where: {
          phoneNumber,
          isBlock: false,
        },
      });

      if (voice?.code == smsCode) {
        await this.voiceRepository.remove(voice);
        return {
          verify: true,
          code: 2000,
        };
      }

      return {
        verify: false,
        code: 40404,
      };
    } catch (error) {
      this.logger.error(
        `The connection was refused with data: ${JSON.stringify(
          new ErrorResponse(error, true, error.message)
        )}`
      );
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async delete(phoneNumber: string): Promise<any> {
    try {
      const foundPermission = await this.voiceRepository.find({
        where: {
          phoneNumber,
        },
      });

      if (!foundPermission) {
        return new ErrorResponse(
          STATUSCODE.COMMON_NOT_FOUND,
          false,
          ERROR.NOT_FOUND
        );
      }
      await this.voiceRepository.remove(foundPermission);

      return new SuccessResponse(
        STATUSCODE.COMMON_DELETE_SUCCESS,
        `has deleted phoneNumber: ${phoneNumber} success!`,
        MESSAGE.DELETE_SUCCESS
      );
    } catch (error) {
      this.logger.debug(
        `${VoiceService.name} is Logging error: ${JSON.stringify(error)}`
      );
      return new ErrorResponse(
        STATUSCODE.COMMON_FAILED,
        error,
        ERROR.DELETE_FAILED
      );
    }
  }
}
