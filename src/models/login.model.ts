import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookMeeting } from "./bookMeeting.model";

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

  @OneToMany(() => BookMeeting, (meetings) => meetings.userInfo)
  meetings!: BookMeeting[];
}
