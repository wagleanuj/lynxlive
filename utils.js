import fetch from "node-fetch"
import { config } from "./config.js";
export const Currency = {
    convert: (amount, currency) => {
        return fetch(`https://api.currencylayer.com/live?access_key=${config.CURRENCY_LAYER_API_KEY}&currencies=${currency}&source=USD&format=1`)
            .then(res => res.json())
            .then(res => {
                const usdToCurrencyRate = res.quotes["USD" + currency];
                const amountInCurrency = amount * usdToCurrencyRate;
                return amountInCurrency;
            })
    },
    getRate: (currency)=>{
        return fetch(`https://api.currencylayer.com/live?access_key=${config.CURRENCY_LAYER_API_KEY}&currencies=${currency}&source=USD&format=1`)
        .then(res => res.json())
        .then(res => {
            const usdToCurrencyRate = res.quotes["USD" + currency];
            return usdToCurrencyRate;
        })
    }
}