import { WinsModule } from "./system/logger/loggerModule";
import { Module } from "@nestjs/common";
import { MainModule } from "./components/main.module";
import { ConfigSystemModule } from "./system/config.system/config.module";
import { ConfigModule } from "@nestjs/config";
import { typeOrmAsyncConfig } from "./system/config.system/typeorm.config";
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
  imports: [
    ConfigSystemModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule.forRoot(),
    MainModule,
    WinsModule,
  ],
})
export class AppModule {}
