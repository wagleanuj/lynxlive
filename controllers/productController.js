import { Op } from "sequelize";
import { Product } from "../models/productModel.js";
import { Currency } from "../utils.js";
import logger from "../logger.js";
/**
 * Gets the product by id
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.NextFunction} next 
 * @returns {*}
 */
export async function getProductById(req, res, next) {
    const { id } = req.params;
    const { currency } = req.query;
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
        logger.warn("Failed to get product", { id, currency, error: err.message })
        return res.status(500).json({ error: "Internal Server Error", result: null })
    }

}

/**
 * Gets most viewed products
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.NextFunction} next 
 * @returns {*}
 */
export async function getMostViewedProducts(req, res, next) {
    const { currency, limit } = req.query;
    try {
        const supportedCurrencies = new Set(['USD', 'CAD'])
        if (currency && !supportedCurrencies.has(currency)) {
            return res.status(400).json({ error: currency + " is not supported.", result: null })
        }
        const products = await Product.findAll({
            limit: parseInt(limit || '5'),
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
    } catch (err) {
        logger.warn("Failed to get most viewed products ", { limit, currency, error: err.message })
        return res.status(500).json({ error: "Internal Server Error", result: null })
    }
}