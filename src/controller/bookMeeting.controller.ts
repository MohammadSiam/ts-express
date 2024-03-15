import { RequestHandler } from "express";
import * as service from "../services/bookMeeting.service";
import { getRegistrationUserById } from "../services/registration.service";

export const bookMeetings: RequestHandler = async (req, res, next) => {
  try {
    const savedMeeting = await service.bookMeeting(req.body);
    return res
      .status(200)
      .json({ message: "Meeting created successfully", data: savedMeeting });
  } catch (error) {
    next(error);
  }
};

export const getAllMeetings: RequestHandler = async (req, res, next) => {
  try {
    const allMeetings = await service.getMeetingsAll();
    // console.log(allMeetings);
    const meetings = await Promise.all(
      allMeetings.map(async (meeting: any) => {
        const user = await getRegistrationUserById(meeting.userId);
        // If user is null
        if (!user) {
          return { meeting, user: null };
        }
        return { meeting, username: user.username, email: user.email };
      })
    );
    return res.status(200).json({ data: meetings });
  } catch (error) {
    next(error);
  }
};

export const getAllMeetingsByDateRoom: RequestHandler = async (
  req,
  res,
  next
): Promise<void> => {
  try {
    const { date, roomNumber } = req.params;
    // Call the service function to get meetings by date
    const meetings = await service.getAllMeetingsByDateRoomService(
      date,
      roomNumber
    );

    // Send the meetings as a response
    res.json(meetings);
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllMeetingsByDate: RequestHandler = async (req, res, next) => {
  try {
    const { date } = req.params;
    const dates = await service.getAllMeetingsByDateService(date);
    res.json(dates);
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getApprovedMeetingsByRoomNumber: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { roomNumber } = req.params;

    const roomNumbers = await service.getApprovedMeetingsByRoomNumberService(
      roomNumber
    );
    res.json(roomNumbers);
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMeetingById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getMeeting = await service.getMeetingByIdSerivce(parseInt(id));
    const user = await getRegistrationUserById(parseInt(id));
    // console.log(user);

    return res.status(200).json({
      message: "Meeting fetched successfully",
      data: getMeeting,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const getMeetingUserId: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getMeetingUser = await service.getMeetingsForUser(parseInt(id));
    return res
      .status(200)
      .json({ message: "Meeting fetched successfully", data: getMeetingUser });
  } catch (error) {
    next(error);
  }
};

export const updateMeetingStatus: RequestHandler = async (req, res, next) => {
  const { id, action } = req.params;
  try {
    const updatedStatus = await service.updatedMeetingStatusService(id, action);
    return res.status(200).json(updatedStatus);
  } catch (error) {
    console.error("Error status update meeting:", error);
    res.status(500).send("Error status update meeting");
  }
};

export const updateUserToAdmin: RequestHandler = async (req, res, next) => {
  const { email } = req.params;
  console.log(email);
  try {
    const update = await service.updateUserToAdminService(email);
    return res.status(200).json(update);
  } catch (error) {
    res.status(500).send("Error status update user to admin");
  }
};
