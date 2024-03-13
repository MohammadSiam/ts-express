import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("registration")
export class Registration {
  @PrimaryGeneratedColumn()
  registrationId!: number;

  @Column({ type: "varchar", nullable: false })
  username!: string;

  @Column({ type: "varchar", nullable: false })
  email!: string;

  @Column({ type: "varchar", nullable: false })
  phone!: string;

  @Column({ type: "varchar", nullable: false })
  department!: string;

  @Column({ type: "varchar", nullable: false })
  password!: string;

  @Column({ type: "varchar", nullable: false, default: "user" })
  role!: string;
}
