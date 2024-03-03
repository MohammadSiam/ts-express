import { json, urlencoded } from "body-parser";
import express, { Application } from "express";
import { createConnection } from "typeorm";
import connectionOptions from "./db/config";
import todoRoutes from "./routes/todos.route";

import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(json());

app.use(urlencoded({ extended: true }));

app.use("/todos", todoRoutes);

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

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
