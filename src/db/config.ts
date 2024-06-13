import { ConnectionOptions } from "typeorm";
import { BookMeeting } from "../models/bookMeeting.model";
import { Login } from "../models/login.model";
import { Registration } from "../models/registration.model";
import { Todos } from "../models/todos.model";

const connectionOptions: ConnectionOptions = {
  type: "mysql",
  host: "mysql-18acf246-siamk417-ca09.j.aivencloud.com",
  port: 14477,
  username: "avnadmin",
  password: "AVNS_EX5WddA-zAGScjrhpp2",
  database: "defaultdb",
  entities: [Todos, Registration, Login, BookMeeting],
  synchronize: true,
  logging: false,
};

export default connectionOptions;
