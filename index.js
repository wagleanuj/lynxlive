import { config } from "./config.js";
import express from "express";
import { sequelize } from "./models/db.js";
import { productRouter } from "./routes/products.js";
import morgan from "morgan";
import logger from "./logger.js";


async function init() {
    await sequelize.authenticate().then(res => {
        logger.info('Successfully authenticated to db.');
    }).catch(err => {
        logger.error("Failed to authenticate to db. Please check your configuration. ", { error: err.message })
        process.exit(1);
    });
    await sequelize.sync().then(res => {
        logger.info('Successfully synced db.');
    }).catch(err => {
        logger.error("Failed to sync db. ", { error: err.message });
        process.exit(1);
    })
}


export const app = express();

//log requests using morgan
app.use(morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim())
    }
}));



//export app for test purposes
app.use(express.json());


app.get('/', (req, res, next) => {
    return res.status('200').send('API is running on /api/');
})

//use versioning so that it helps us upgrade api without breaking existing version
app.use("/api/v1/products", productRouter)


init().then(() => {
    const port = config.SERVER_PORT;
    app.listen(port, () => {
        logger.info('Server is listening on port ', port);
    })
})
