import { Voice } from "./voice.entity";
import { Module } from "@nestjs/common";
import { VoiceController } from "./voice.controller";
import { VoiceService } from "./voice.service";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Voice])],
  controllers: [VoiceController],
  providers: [VoiceService],
})
export class VoiceModule {}
