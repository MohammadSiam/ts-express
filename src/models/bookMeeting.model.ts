import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

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

  @Column({ type: "varchar", nullable: false })
  numberOfAttendees!: number;

  @Column({ type: "varchar", nullable: false })
  organization!: string;

  @Column({ type: "varchar", nullable: false })
  designation!: string;

  @Column()
  roomNumber!: number;

  @Column()
  userId!: number;

  @Column({ default: "pending" }) // default status is pending
  status!: string;
}
