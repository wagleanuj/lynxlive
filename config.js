import dotenv from "dotenv";

if (process.env.NODE_ENV === 'test') {
    dotenv.config({
        path: ".env.test"
    });

} else if (process.env.NODE_ENV === 'production') {
    dotenv.config({
        path: ".env.production"
    });
} else {
    dotenv.config({
    });
}

const defaultConfig = {
    DB_USERNAME: process.env["DB_USERNAME"],
    DB_HOST: process.env["DB_HOST"],
    DB_NAME: process.env["DB_NAME"],
    DB_PASSWORD: process.env["DB_PASSWORD"],
    SERVER_PORT: process.env["SERVER_PORT"],
    CURRENCY_LAYER_API_KEY: process.env["CURRENCY_LAYER_API_KEY"]
}



export const config = defaultConfig