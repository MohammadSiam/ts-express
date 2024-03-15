import express from "express";
import * as booking from "../controller/bookMeeting.controller";

const router = express.Router();

// routes
router.post("/booking", booking.bookMeetings);

router.get("/getAllMeetings", booking.getAllMeetings);
router.get("/getMeetingById/:id", booking.getMeetingById);
router.get("/getMeetingByUserId/:id", booking.getMeetingUserId);
router.get(
  "/getAllMeetingsByDateRoom/:date/:roomNumber",
  booking.getAllMeetingsByDateRoom
);
router.get("/getAllMeetingsByDate/:date", booking.getAllMeetingsByDate);
router.get(
  "/getAllMeetingsByRoomNumber/:roomNumber",
  booking.getApprovedMeetingsByRoomNumber
);

router.put("/:id/:action", booking.updateMeetingStatus);
router.put("/updateAdminRole/:email", booking.updateUserToAdmin);
export default router;
