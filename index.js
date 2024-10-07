import express from "express";
import { Op, Sequelize } from "sequelize";
import dotenv from "dotenv";
import { sequelize } from "./models/db.js";
import { Product } from "./models/productModel.js";
import { Currency } from "./utils.js";
import { productRouter } from "./routes/products.js";

dotenv.config();

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



const app = express();
app.use(express.json());


app.get('/', (req, res, next) => {
    console.log('OK');
    res.send('OK');
})

//use versioning so that it helps us upgrade api without breaking existing version
app.use("/api/v1/products", productRouter)


init().then(() => {
    const port = process.env.SERVER_PORT
    app.listen(port, () => {
        console.log('Server is listening on port ', port);
    })
})
