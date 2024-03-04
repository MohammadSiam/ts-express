import { RequestHandler } from "express";
import { bookMeeting } from "../services/bookMeeting.service";

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
