import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

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
}
