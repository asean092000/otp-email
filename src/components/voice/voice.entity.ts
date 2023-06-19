import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "voices" })
export class Voice {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false, unique: false })
  public phoneNumber: string;

  @Column({ nullable: false, default: false })
  public isBlock: boolean;

  @Column({ nullable: false, default: 0 })
  public code: number;

  @Column({ nullable: false, default: 0 })
  public count: number;

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
