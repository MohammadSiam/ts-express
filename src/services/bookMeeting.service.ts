import { SelectQueryBuilder, getRepository } from "typeorm";
import { BookMeeting } from "../models/bookMeeting.model";

export const bookMeeting = async (bookingData: any) => {
  const meetingRepository = getRepository(BookMeeting);
  const newMeeting = meetingRepository.create(bookingData);
  const savedMeeting = await meetingRepository.save(newMeeting);
  return savedMeeting;
};

export const getMeetingsAll = async () => {
  const meetingsRepository = getRepository(BookMeeting);
  const allMeetings = await meetingsRepository.find();
  return allMeetings;
};

export const getAllMeetingsByDateService = async (
  date: string,
  roomNumber: string // Adjust the type of roomNumber to match its usage
): Promise<BookMeeting[]> => {
  try {
    // Get the meetings repository
    const bookMeetingRepository = getRepository(BookMeeting);

    // Create a query builder
    const queryBuilder: SelectQueryBuilder<BookMeeting> =
      bookMeetingRepository.createQueryBuilder("bookMeeting");

    // Find meetings where the date matches and roomNumber matches
    const meetings = await queryBuilder
      .where("bookMeeting.date = :date", { date })
      .andWhere("bookMeeting.roomNumber = :roomNumber", { roomNumber }) // Add this line
      .getMany();

    return meetings;
  } catch (error) {
    console.error("Error fetching meetings:", error);
    throw new Error("Error fetching meetings");
  }
};

export const getAllMeetingsByRoomNumberService = async (roomNumber: any) => {
  try {
    const bookMeetingRepository = getRepository(BookMeeting);
    // console.log(roomNumber);
    const meeting = await bookMeetingRepository.find({
      where: { roomNumber, status: "approved" },
    });
    return meeting;
  } catch (error) {
    console.error("Error fetching meetings:", error);
    throw new Error("Error fetching meetings");
  }
};

export const getMeetingByIdSerivce = async (
  meetingId: number
): Promise<any> => {
  const meetingRepository = getRepository(BookMeeting);
  const meeting = await meetingRepository.findOneBy({ meetingId });
  return meeting;
};

export const getMeetingsForUser = async (
  userId: number
): Promise<BookMeeting[]> => {
  const bookMeetingRepository = getRepository(BookMeeting);
  const meetings = await bookMeetingRepository.find({
    where: { userId: userId },
  });
  return meetings;
};

export const approveMeeting = async (meetingId: number, status: string) => {
  const meetingRepository = getRepository(BookMeeting);
  const meeting: any = await meetingRepository.findOneBy({ meetingId });
  if (!meeting) {
    throw new Error("Meeting Not Found");
  }
  meeting.status = status;
  await meetingRepository.save(meeting);
};
