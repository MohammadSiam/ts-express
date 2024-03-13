import { RequestHandler } from "express";
import {
  approveMeeting,
  bookMeeting,
  getAllMeetingsByDateService,
  getAllMeetingsByRoomNumberService,
  getMeetingByIdSerivce,
  getMeetingsAll,
  getMeetingsForUser,
} from "../services/bookMeeting.service";
import { getRegistrationUserById } from "../services/registration.service";

export const bookMeetings: RequestHandler = async (req, res, next) => {
  try {
    const savedMeeting = await bookMeeting(req.body);
    return res
      .status(200)
      .json({ message: "Meeting created successfully", data: savedMeeting });
  } catch (error) {
    next(error);
  }
};

export const getAllMeetings: RequestHandler = async (req, res, next) => {
  try {
    const allMeetings = await getMeetingsAll();
    // console.log(allMeetings);
    const meetings = await Promise.all(
      allMeetings.map(async (meeting: any) => {
        const user = await getRegistrationUserById(meeting.userId);
        // If user is null, handle the case
        if (!user) {
          return { meeting, user: null };
        }
        return { meeting, username: user.username };
      })
    );
    return res.status(200).json({ data: meetings });
  } catch (error) {
    next(error);
  }
};

export const getAllMeetingsByDate: RequestHandler = async (
  req,
  res,
  next
): Promise<void> => {
  try {
    const { date, roomNumber } = req.params;
    // Call the service function to get meetings by date
    const meetings = await getAllMeetingsByDateService(date, roomNumber);

    // Send the meetings as a response
    res.json(meetings);
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllMeetingsByRoomNumber: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { num } = req.params;
    const roomNumbers = await getAllMeetingsByRoomNumberService(num);
    res.json(roomNumbers);
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMeetingById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getMeeting = await getMeetingByIdSerivce(parseInt(id));
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
    const getMeetingUser = await getMeetingsForUser(parseInt(id));
    return res
      .status(200)
      .json({ message: "Meeting fetched successfully", data: getMeetingUser });
  } catch (error) {
    next(error);
  }
};

export const approveMeetings: RequestHandler = async (req, res, next) => {
  const meetingId = parseInt(req.params.id);
  // req.bode.status
  try {
    await approveMeeting(meetingId, "approved");
    res.send("Meeting approved successfully");
  } catch (error) {
    console.error("Error approving meeting:", error);
    res.status(500).send("Error approving meeting");
  }
};

export const rejectMeeting: RequestHandler = async (req, res, next) => {
  const meetingId = parseInt(req.params.id);
  try {
    await approveMeeting(meetingId, "rejected"); // Mark meeting as rejected
    res.send("Meeting rejected successfully");
  } catch (error) {
    console.error("Error rejecting meeting:", error);
    res.status(500).send("Error rejecting meeting");
  }
};
