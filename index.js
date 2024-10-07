import express from "express";
import { Op, Sequelize } from "sequelize";
import dotenv from "dotenv";
import { sequelize } from "./models/db.js";
import { Product } from "./models/productModel.js";

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


app.post('/products', async (req, res, next) => {
    const { currency } = req.body;
    const products = await Product.findAll({
        limit: 5, 
        where: {
            productViewed: {
                [Op.gt]: 1
            }
        },
        order: ['productViewed', 'DESC']
    });

})

app.post('/product', async (req, res, next)=>{
    const {id, currency} = req.body;
    const found = await Product.findOne({where: {id: id}});
    const supportedCurrencies = new Set(['USD', 'CAD'])
    if(!found){
        return res.status(404).json({error: "Product does not exist.", result: null});
    }
    if(currency && !supportedCurrencies.has(currency)){
        return res.status(400).json({error: currency +" is not supported.", result: null})
    }

    //do conversion if necessary
    return res.status(200).json({error: null, result: found.toJSON()})

})


init().then(() => {
    const port = process.env.SERVER_PORT
    app.listen(port, () => {
        console.log('Server is listening on port ', port);
    })
})
