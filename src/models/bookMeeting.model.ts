import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from "typeorm";
import { Login } from "./login.model";

export enum MeetingStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

@Entity("bookMeeting")
export class BookMeeting {
  @PrimaryGeneratedColumn()
  meetingId!: number;

  @Column({ type: "time", nullable: false })
  startTime!: Timestamp;

  @Column({ type: "time", nullable: false })
  endTime!: Timestamp;

  @Column({ type: "date", nullable: false })
  date!: Date;

  @Column({ type: "integer", nullable: false })
  numberOfAttendees!: number;

  @Column({ type: "varchar", nullable: false })
  organization!: string;

  @Column({ type: "varchar", nullable: false })
  designation!: string;

  @Column()
  roomNumber!: number;

  @Column()
  userId!: number;

  @Column({ default: MeetingStatus.PENDING }) // default status is pending  enum
  status!: MeetingStatus;

  @ManyToOne(() => Login, (user) => user.meetings)
  userInfo!: Login;
}
