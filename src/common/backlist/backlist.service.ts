import { Injectable } from "@nestjs/common";
import { Backlist } from "./backlist.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class BacklistService {
  constructor(
    @InjectRepository(Backlist)
    private backlistRepository: Repository<Backlist>
  ) {}

  async getOneByToken(userId: number, acToken: string) {
    return await this.backlistRepository.findOneBy({
      userId,
      acToken,
    });
  }

  async create(...data: any): Promise<void> {
    let firstItem = data.find((x) => x !== undefined);
    const createdBacklist = await this.backlistRepository.create(firstItem);
    await this.backlistRepository.save(createdBacklist);
  }
}
