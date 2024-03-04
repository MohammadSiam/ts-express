import express from "express";
import { bookMeetings } from "../controller/bookMeeting.controller";

const router = express.Router();

// POST /login
router.post("/booking", bookMeetings);

export default router;
