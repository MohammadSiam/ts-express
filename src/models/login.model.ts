import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("login")
export class Login {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: false })
  email!: string;

  @Column({ type: "varchar", nullable: false })
  password!: string;

  @Column({ type: "varchar", nullable: false, default: "user" })
  role!: string;
}
