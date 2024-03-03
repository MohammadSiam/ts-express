import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("registration")
export class Registration {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: false })
  username!: string;

  @Column({ type: "varchar", nullable: false })
  email!: string;

  @Column({ type: "varchar", nullable: false })
  phoneNumber!: string;

  @Column({ type: "varchar", nullable: false })
  department!: string;

  @Column({ type: "varchar", nullable: false })
  password!: string;
}
