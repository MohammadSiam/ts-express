import { RequestHandler } from "express";
import {
  bookMeeting,
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
    console.log(allMeetings);
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
    return res.status(200).json(meetings);
  } catch (error) {
    next(error);
  }
};

export const getMeetingById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getMeeting = await getMeetingByIdSerivce(parseInt(id));
    const user = await getRegistrationUserById(parseInt(id));
    // console.log(user);

    return res
      .status(200)
      .json({
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
