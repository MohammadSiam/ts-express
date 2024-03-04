import { getRepository } from "typeorm";
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

export const getMeetingByIdSerivce = async (id: number): Promise<any> => {
  const meetingRepository = getRepository(BookMeeting);
  const meeting = await meetingRepository.findBy({ id });
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
