import { ConnectionOptions } from "typeorm";
import { Registration } from "../models/registration.model";
import { Todos } from "../models/todos.model";

const connectionOptions: ConnectionOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "login_system",
  entities: [Todos, Registration],
  synchronize: true,
  logging: false,
};

export default connectionOptions;
