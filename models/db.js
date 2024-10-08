import { Sequelize } from "sequelize";
import { config } from "../config.js";

//instantiate sequelize
export const sequelize = new Sequelize({
    host: config.DB_HOST,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    dialect: 'mysql',
    username: config.DB_USERNAME,
})