import { VoiceModule } from "./voice/voice.module";
import { EmailModule } from "./email/email.module";
import { Module } from "@nestjs/common";
@Module({
  imports: [
    EmailModule,
    VoiceModule,
  ],
})
export class MainModule {}
