import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

//instantiate sequelize
export const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'mysql',
    username: process.env.DB_USERNAME,
})