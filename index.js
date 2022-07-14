//Lib
import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';



//PORT
const PORT = process.env.PORT || 3000

const app = express();

//array
const items = []

//route
app.get('/', (req, res) => {
    axios.get('https://www.investing.com/crypto/currencies')
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)
           $(' tbody > tr', html).each((index, element) => {


              const name = $(element).find(  " td.left.bold.elp.name.cryptoName.first.js-currency-name > a" ).text();
              const symbol = $(element).find(" td.symb.js-currency-symbol").text();
              const price = $(element).find("td.price.js-currency-price > a").text()
              const marketCap =  $(element).find("td.js-market-cap").text()
              const vol =  $(element).find("td.js-24h-volume").text()
              const chgH = $(element).find("td.js-currency-change-24h.greenFont.pid-1057391-pcp").text()
              const chgD =  $(element).find("td.js-currency-change-7d.redFont").text()


              items.push({name , symbol, price, marketCap, vol, chgH, chgD})

           })




            return res.status(200).json(items)
        })


})






//app listen
app.listen(PORT, () => {console.log("running")})