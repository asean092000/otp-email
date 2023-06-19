import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateEmailDto, UpdateEmailDto, VerifyEmailDto } from "./dto/index";
import { Email } from "./email.entity";
import { SuccessResponse, ErrorResponse } from "src/system/BaseResponse/index";
import { STATUSCODE, MESSAGE, ERROR } from "src/system/constants";
import { generateRandomSixDigitsNumber } from "./randon-number";
import { MailerService } from "@nestjs-modules/mailer";
import { Logger } from "winston";

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email)
    private emailRepository: Repository<Email>,
    private mailService: MailerService,
    @Inject("winston")
    private readonly logger: Logger
  ) {}

  async getByName(email: string) {
    try {
      const foundEmail = await this.emailRepository.findOneBy({
        email,
      });

      if (!foundEmail) {
        return new ErrorResponse(
          STATUSCODE.COMMON_NOT_FOUND,
          `Email with id: ${email} not found!`,
          ERROR.NOT_FOUND
        );
      }

      return new SuccessResponse(
        STATUSCODE.COMMON_SUCCESS,
        foundEmail,
        MESSAGE.LIST_SUCCESS
      );
    } catch (error) {
      this.logger.debug(
        `${EmailService.name} is Logging error: ${JSON.stringify(error)}`
      );

      return new ErrorResponse(
        STATUSCODE.COMMON_NOT_FOUND,
        error,
        ERROR.NOT_FOUND
      );
    }
  }

  async getAll(): Promise<any> {
    try {
      const emails = await this.emailRepository.find({});

      return new SuccessResponse(
        STATUSCODE.COMMON_SUCCESS,
        emails,
        MESSAGE.LIST_SUCCESS
      );
    } catch (error) {
      this.logger.debug(
        `${EmailService.name} is Logging error: ${JSON.stringify(error)}`
      );
      return new ErrorResponse(
        STATUSCODE.COMMON_FAILED,
        error,
        MESSAGE.LIST_FAILED
      );
    }
  }

  async getOneById(id: number): Promise<any> {
    try {
      const email = await this.emailRepository.findOneBy({ id });

      return new SuccessResponse(
        STATUSCODE.COMMON_SUCCESS,
        email,
        MESSAGE.LIST_SUCCESS
      );
    } catch (error) {
      this.logger.debug(
        `${EmailService.name} is Logging error: ${JSON.stringify(error)}`
      );
      return new ErrorResponse(
        STATUSCODE.COMMON_NOT_FOUND,
        error,
        ERROR.NOT_FOUND
      );
    }
  }

  async verify(verifyDto: VerifyEmailDto): Promise<any> {
    const { email, code } = verifyDto;
    try {
      const emails = await this.emailRepository.findOneBy({ email });

      if (emails.code == code) {
        await this.emailRepository.delete(emails.id);

        return new SuccessResponse(
          STATUSCODE.COMMON_SUCCESS,
          { verify: true },
          MESSAGE.EMAIL_VERIFIED
        );
      }

      return new SuccessResponse(
        STATUSCODE.COMMON_SUCCESS,
        { verify: false },
        MESSAGE.EMAIL_FAILED
      );
    } catch (error) {
      this.logger.debug(
        `${EmailService.name} is Logging error: ${JSON.stringify(error)}`
      );
      return new ErrorResponse(
        STATUSCODE.COMMON_NOT_FOUND,
        error,
        ERROR.NOT_FOUND
      );
    }
  }

  async create(emailDto: CreateEmailDto): Promise<any> {
    try {
      let foundEmail = await this.emailRepository.findOne({
        where: {
          email: emailDto.email,
          isBlock: false,
        },
      });

      let data = {};
      if (foundEmail) {
        data = {
          ...foundEmail,
          code: generateRandomSixDigitsNumber(),
          updatedAt: new Date(),
        };
      } else {
        data = {
          ...emailDto,
          code: generateRandomSixDigitsNumber(),
        };
      }

      const createdEmail = await this.emailRepository.create(data);
      await this.emailRepository.save(createdEmail);
      const { code, ...rest } = createdEmail;

      let response = await this.mailService.sendMail({
        to: emailDto.email,
        from: `${process.env.SMTP_EMAIL}`,
        subject: `${process.env.SMTP_SUBJECT}`,
        text: `Vui lòng điền mã số ${code} để xác thực email của bạn!`,
      });

      return new SuccessResponse(
        STATUSCODE.COMMON_CREATE_SUCCESS,
        response,
        MESSAGE.CREATE_SUCCESS
      );
    } catch (error) {
      this.logger.debug(
        `${EmailService.name} is Logging error: ${JSON.stringify(error)}`
      );
      return new ErrorResponse(
        STATUSCODE.COMMON_FAILED,
        error,
        ERROR.CREATE_FAILED
      );
    }
  }

  async update(id: number, emailDto: UpdateEmailDto): Promise<any> {
    try {
      let foundEmail = await this.emailRepository.findOneBy({
        id,
      });

      if (!foundEmail) {
        return new ErrorResponse(
          STATUSCODE.COMMON_NOT_FOUND,
          `Email with id: ${id} not found!`,
          ERROR.NOT_FOUND
        );
      }

      foundEmail = {
        ...foundEmail,
        ...emailDto,
        updatedAt: new Date(),
      };
      await this.emailRepository.save(foundEmail);

      return new SuccessResponse(
        STATUSCODE.COMMON_UPDATE_SUCCESS,
        foundEmail,
        MESSAGE.UPDATE_SUCCESS
      );
    } catch (error) {
      this.logger.debug(
        `${EmailService.name} is Logging error: ${JSON.stringify(error)}`
      );
      return new ErrorResponse(
        STATUSCODE.COMMON_FAILED,
        error,
        ERROR.UPDATE_FAILED
      );
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const foundEmail = await this.emailRepository.findOneBy({
        id,
      });

      if (!foundEmail) {
        return new ErrorResponse(
          STATUSCODE.COMMON_NOT_FOUND,
          `Email with id: ${id} not found!`,
          ERROR.NOT_FOUND
        );
      }
      await this.emailRepository.delete(id);

      return new SuccessResponse(
        STATUSCODE.COMMON_DELETE_SUCCESS,
        `Email has deleted id: ${id} success!`,
        MESSAGE.DELETE_SUCCESS
      );
    } catch (error) {
      this.logger.debug(
        `${EmailService.name} is Logging error: ${JSON.stringify(error)}`
      );
      return new ErrorResponse(
        STATUSCODE.COMMON_FAILED,
        error,
        ERROR.DELETE_FAILED
      );
    }
  }
}
