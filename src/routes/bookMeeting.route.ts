import express from "express";
import {
  bookMeetings,
  getAllMeetings,
  getMeetingById,
  getMeetingUserId,
} from "../controller/bookMeeting.controller";

const router = express.Router();

// routes
router.post("/booking", bookMeetings);
router.get("/getAllMeetings", getAllMeetings);
router.get("/getMeetingById/:id", getMeetingById);
router.get("/getMeetingByUserId/:id", getMeetingUserId);

export default router;
