import { IsEmail } from "class-validator";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
@Entity({ name: "emails" })
export class Email {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false })
  public email: string;

  @Column({ nullable: false })
  public code: number;

  @Column({ nullable: false, default: false })
  public isBlock: boolean;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    name: "createdAt",
  })
  public createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
    name: "updatedAt",
  })
  public updatedAt!: Date;
}
