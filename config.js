import dotenv from "dotenv"
dotenv.config();

const defaultConfig = {
    DB_USERNAME: process.env["DB_USERNAME"],
    DB_HOST: process.env["DB_HOST"],
    DB_NAME: process.env["DB_NAME"],
    DB_PASSWORD: process.env["DB_PASSWORD"],
    SERVER_PORT: process.env["SERVER_PORT"],
    CURRENCY_LAYER_API_KEY: process.env["CURRENCY_LAYER_API_KEY"]
}

const configs = {
    "development": defaultConfig,
    "test": { ...defaultConfig, DB_NAME: 'lynx_jest_test', SERVER_PORT: 4040 },
    "production": defaultConfig
}


export const config = configs[process.env.NODE_ENV || "development"];