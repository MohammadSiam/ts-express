import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import { createConnection } from "typeorm";
import connectionOptions from "./db/config";
import bookingRoutes from "./routes/bookMeeting.route";
import loginRoutes from "./routes/login.route";
import registrationRoutes from "./routes/registration.routes";
import todoRoutes from "./routes/todos.route";

import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(json());
app.use(cors());

app.use(urlencoded({ extended: true }));

app.use("/todos", todoRoutes);
app.use("/api", registrationRoutes);
app.use("/api", loginRoutes);
app.use("/book", bookingRoutes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

createConnection(connectionOptions)
  .then((connection) => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

app.listen(port, () => {
  console.log(`Server started on port 3000`);
});
