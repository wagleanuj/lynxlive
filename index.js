import express from "express";
import { Op, Sequelize } from "sequelize";
import dotenv from "dotenv";
import { sequelize } from "./models/db.js";
import { Product } from "./models/productModel.js";
import { Currency } from "./utils.js";

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
    const { currency, count } = req.body;
    const supportedCurrencies = new Set(['USD', 'CAD'])
    if (currency && !supportedCurrencies.has(currency)) {
        return res.status(400).json({ error: currency + " is not supported.", result: null })
    }
    const products = await Product.findAll({
        limit: count || 5,
        where: {
            productViewed: {
                [Op.gt]: 1
            }
        },
        order: [['productViewed', 'DESC']]
    });
    const exchangeRate = (currency && currency !== "USD") ? await Currency.getRate(currency) : 1;

    const data = products.map(product => {
        const json = product.toJSON();
        json.price = exchangeRate * json.price;
        return json;
    });
    return res.status(200).json({ result: data, error: null })

})

app.post('/product', async (req, res, next) => {
    const { id, currency } = req.body;
    try {
        const supportedCurrencies = new Set(['USD', 'CAD'])
        if (currency && !supportedCurrencies.has(currency)) {
            return res.status(400).json({ error: currency + " is not supported.", result: null })
        }
        const found = await Product.findOne({ where: { id: id } });
        
        if (!found) {
            return res.status(404).json({ error: "Product does not exist.", result: null });
        }

        //do conversion if necessary
        let price = found.price;
        if (currency && currency !== "USD") {
            price = await Currency.convert(found.price, currency);
        }
        const data = found.toJSON()

        //increment view count
        found.productViewed++;
        await found.save();

        return res.status(200).json({ error: null, result: { ...data, price } })
    } catch (err) {
        console.log('Error :', err.message);
        return res.status(500).json({ error: "Internal Server Error", result: null })
    }

})


init().then(() => {
    const port = process.env.SERVER_PORT
    app.listen(port, () => {
        console.log('Server is listening on port ', port);
    })
})
