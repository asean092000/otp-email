import { PartialType } from "@nestjs/swagger";
import { CreateEmailDto } from "./index";

export class UpdateEmailDto extends PartialType(CreateEmailDto) {}
