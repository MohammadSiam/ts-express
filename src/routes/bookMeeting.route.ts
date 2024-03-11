import express from "express";
import {
  approveMeetings,
  bookMeetings,
  getAllMeetings,
  getAllMeetingsByDate,
  getMeetingById,
  getMeetingUserId,
  rejectMeeting,
} from "../controller/bookMeeting.controller";

const router = express.Router();

// routes
router.post("/booking", bookMeetings);

router.get("/getAllMeetings", getAllMeetings);
router.get("/getMeetingById/:id", getMeetingById);
router.get("/getMeetingByUserId/:id", getMeetingUserId);
router.get("/getAllMeetingsByDate/:date", getAllMeetingsByDate);

router.put("/:id/approve", approveMeetings);
router.put("/:id/reject", rejectMeeting);

export default router;
