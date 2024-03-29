const http = require('http');
const url = require('url');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({
    path: './config.env'
});
const replacePlaceHolder = require('./modules/replaceTemplate');

let data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
data = JSON.parse(data);
const overviewLabel = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const productLabel = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const cardLabel = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' });

    let baseURL = `http://${req.headers.host}/`;
    let parsed = new URL(req.url,baseURL);
    
    if (parsed.pathname === '/' || parsed.pathname === '/home') {
        const cards = data.map((ele) => replacePlaceHolder(ele, cardLabel));
        const cardsHtml = cards.join('');
        const wholeHTML = overviewLabel.replace(/{%CARDS%}/g, cardsHtml);
        res.end(wholeHTML);
    }else if(parsed.pathname === '/product'){
        const prodID = parsed.searchParams.get('id');
        const productData = data.find( (ele) => prodID == ele.id);
        const productsHTML = replacePlaceHolder(productData, productLabel);
        res.end(productsHTML);
    }else if(parsed.pathname === '/api'){
        res.end(JSON.stringify(data));
    }else{
        res.end('PAGE NOT FOUND!');
    }
});

server.listen(process.env.PORT, () => {
    console.log('server starting at port 8080');
});