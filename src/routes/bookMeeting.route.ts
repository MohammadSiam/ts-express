import express from "express";
import * as booking from "../controller/bookMeeting.controller";

const router = express.Router();

// routes
router.post("/booking", booking.bookMeetings);

router.get("/getAllMeetings", booking.getAllMeetings);
router.get("/getMeetingById/:id", booking.getMeetingById);
router.get("/getMeetingByUserId/:id", booking.getMeetingUserId);
router.get(
  "/getAllMeetingsByDate/:date/:roomNumber",
  booking.getAllMeetingsByDate
);
router.get(
  "/getAllMeetingsByRoomNumber/:roomNumber",
  booking.getAllMeetingsByRoomNumber
);

router.put("/:id/:action", booking.updateMeetingStatus);
router.put("/updateAdminRole/:email", booking.updateUserToAdmin);
export default router;
