import { RequestHandler } from "express";
import {
  bookMeeting,
  getMeetingByIdSerivce,
  getMeetingsAll,
  getMeetingsForUser,
} from "../services/bookMeeting.service";

export const bookMeetings: RequestHandler = async (req, res, next) => {
  try {
    const savedMeeting = await bookMeeting(req.body);
    return res
      .status(200)
      .json({ message: "Todo created successfully", data: savedMeeting });
  } catch (error) {
    next(error);
  }
};

export const getAllMeetings: RequestHandler = async (req, res, next) => {
  try {
    const allMeetings = await getMeetingsAll();
    return res
      .status(200)
      .json({ message: "Todo fetched successfully", data: allMeetings });
  } catch (error) {
    next(error);
  }
};

export const getMeetingById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getMeeting = await getMeetingByIdSerivce(parseInt(id));

    return res
      .status(200)
      .json({ message: "Todo fetched successfully", data: getMeeting });
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
      .json({ message: "Todo fetched successfully", data: getMeetingUser });
  } catch (error) {
    next(error);
  }
};
