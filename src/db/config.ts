import { ConnectionOptions } from 'typeorm';
import { config } from 'dotenv';
import { BookMeeting } from '../models/bookMeeting.model';
import { Login } from '../models/login.model';
import { Registration } from '../models/registration.model';
import { Todos } from '../models/todos.model';

// Load environment variables from .env file
config();

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Todos, Registration, Login, BookMeeting],
  synchronize: true,
  logging: false,
};

export default connectionOptions;
