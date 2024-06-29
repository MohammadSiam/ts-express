import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";
import { MeetingStatus } from "../models/bookMeeting.model";

export class CreateBookMeetingDto {
  @IsNotEmpty()
  startTime!: string;

  @IsNotEmpty()
  endTime!: string;

  @IsNotEmpty()
  date!: string;

  @IsNumber()
  @IsNotEmpty()
  numberOfAttendees!: number;

  @IsString()
  @IsNotEmpty()
  organization!: string;

  @IsString()
  @IsNotEmpty()
  designation!: string;

  @IsNotEmpty()
  roomNumber!: number;

  @IsNotEmpty()
  userId!: number;

  @IsEnum(MeetingStatus)
  status: MeetingStatus = MeetingStatus.PENDING;

  @IsNumber()
  @IsEmpty()
  userInfoId?: number;
}
