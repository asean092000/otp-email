import { Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";

@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          dirname: "./log/debug/", //path to where save loggin result
          filename: "debug.log", //name of file where will be saved logging result
          level: "debug",
        }),
        new winston.transports.File({
          dirname: "./log/info/",
          filename: "info.log",
          level: "info",
        }),
      ],
    }),
  ],
})
export class WinsModule {}
