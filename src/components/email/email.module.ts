import { Module } from "@nestjs/common";
import { EmailService } from "./email.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Email } from "./email.entity";
import { EmailController } from "./email.controller";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "smtp.sendgrid.net",
        auth: {
          user: "apikey",
          pass: "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",
        },
      },
    }),
    TypeOrmModule.forFeature([Email]),
  ],
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}

// transport: {
//   host: process.env.SMTP_HOST,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SEND_GRID_KEY,
//   },
// }
