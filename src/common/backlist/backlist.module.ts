import { BacklistGuard } from "./backlist.guard";
import { Module } from "@nestjs/common";
import { BacklistService } from "./backlist.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Backlist } from "./backlist.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Backlist])],
  providers: [BacklistService],
  exports: [BacklistService],
})
export class BacklistModule {}
