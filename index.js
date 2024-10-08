import { config } from "./config.js";
import express from "express";
import { sequelize } from "./models/db.js";
import { productRouter } from "./routes/products.js";


async function init() {
    await sequelize.authenticate().then(res => {
        console.log('Authenticated to db');
    }).catch(err => {
        console.log('Could not connect to db.. exitting', err);
        process.exit(1);
    });
    await sequelize.sync().then(res => {
        console.log('Db Synced')
    }).catch(err => {
        console.log('Db could not be synced')
    })
}


//export app for test purposes
export const app = express();
app.use(express.json());


app.get('/', (req, res, next) => {
    return res.status('200').send('API is running on /api/');
})

//use versioning so that it helps us upgrade api without breaking existing version
app.use("/api/v1/products", productRouter)


init().then(() => {
    const port = config.SERVER_PORT;
    app.listen(port, () => {
        console.log('Server is listening on port ', port);
    })
})
