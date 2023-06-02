import { config } from "dotenv";

config();

const PORT = process.env.PORT ?? 8000;
const DB_HOST = process.env.DB_HOST ?? 'localhost';
const DB_DATABASE = process.env.DB_DATABASE ?? 'storybaz';
const DB_PORT = process.env.DB_PORT ?? 3306;
const DB_USER = process.env.DB_USER ?? 'root';
const DB_PASSWORD = process.env.DB_PASSWORD ?? 'root';


export {
    PORT,
    DB_HOST,
    DB_DATABASE,
    DB_PORT,
    DB_USER,
    DB_PASSWORD
};