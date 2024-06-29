import { FindManyOptions, SelectQueryBuilder, getRepository } from "typeorm";
import { CreateBookMeetingDto } from "../dtos/createBookMeeting.dto";
import { BookMeeting } from "../models/bookMeeting.model";
import { Login } from "../models/login.model";
import { Registration } from "../models/registration.model";

export const bookMeeting = async (
  createBookMeetingDto: CreateBookMeetingDto
) => {
  const meetingRepository = getRepository(BookMeeting);

  const loginRepository = getRepository(Login);
  const userId = createBookMeetingDto.userInfoId;
  const loginInfo: any = await loginRepository.findOne({
    where: { id: userId },
    relations: ["meetings"],
  });
  if (!loginInfo) return { message: "No user Info Found" };

  const newMeeting = meetingRepository.create(createBookMeetingDto);
  const savedMeeting = await meetingRepository.save(newMeeting);

  loginInfo.meetings = [...loginInfo.meetings, newMeeting];
  await loginRepository.save(loginInfo);

  return savedMeeting;
};

export const getMeetingsAll = async () => {
  const meetingsRepository = getRepository(BookMeeting);
  const allMeetings = await meetingsRepository.find({
    relations: ["userInfo"],
  });
  return allMeetings;
};

export const getAllMeetingsByDateRoomService = async (
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

export const getAllMeetingsByDateRoomAndStatusService = async (
  date: string,
  roomNumber: number,
  status: string
): Promise<BookMeeting[]> => {
  try {
    const meetingRepository = getRepository(BookMeeting);
    const info: any = await meetingRepository
      .createQueryBuilder("meeting")
      .select(["meeting.*"])
      .where("meeting.date=:date", { date })
      .andWhere("meeting.roomNumber=:roomNumber", { roomNumber })
      .andWhere("meeting.status=:status", { status })
      .getRawMany();
    return info;
  } catch (error) {
    console.error("Error fetching meetings:", error);
    throw new Error("Error fetching meetings");
  }
};

export const getAllMeetingsByDateService = async (date: any) => {
  try {
    const bookMeetingRepository = getRepository(BookMeeting);
    // console.log(roomNumber);
    const options: FindManyOptions<BookMeeting> = {
      where: { date },
    };
    const meeting = await bookMeetingRepository.find(options);
    return meeting;
  } catch (error) {
    console.error("Error fetching meetings:", error);
    throw new Error("Error fetching meetings");
  }
};

export const getApprovedMeetingsByRoomNumberService = async (
  roomNumber: any
) => {
  try {
    console.log(roomNumber);
    const bookMeetingRepository = getRepository(BookMeeting);
    // console.log(roomNumber);
    const options: FindManyOptions<BookMeeting> = {
      where: { roomNumber, status: "approved" as any },
    };
    const meeting = await bookMeetingRepository.find(options);
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

export const updatedMeetingStatusService = async (id: any, action: any) => {
  try {
    const meetingRepository = getRepository(BookMeeting);
    const meeting: any = await meetingRepository.findOneBy({ meetingId: id });

    if (
      meeting.status === null ||
      meeting.status === undefined ||
      meeting.status
    ) {
      meeting.status = action === "approve" ? "approved" : "rejected";
    } else {
      console.log("Meeting status already set."); // Optional: Add a log message or handle this case as needed.
    }

    const updateMeeting = await meetingRepository.save(meeting);

    return updateMeeting;
  } catch (error) {
    console.error("Error updating meeting status:", error);
    throw error; // Rethrow the error to be caught by the caller if needed
  }
};

export const updateUserToAdminService = async (email: any) => {
  try {
    const registrationRepository = getRepository(Registration);
    const loginRepository = getRepository(Login);

    const registration: any = await registrationRepository.findOneBy({ email });
    if (registration) {
      registration.role = "admin";
      await registrationRepository.save(registration);
    }

    // Find login record by email and update role to 'admin'
    const login = await loginRepository.findOneBy({ email });
    if (login) {
      login.role = "admin";
      await loginRepository.save(login);
    }
  } catch (error) {
    console.error("Error finding records:", error);
  }
};
