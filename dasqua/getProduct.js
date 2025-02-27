const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');
const puppeteer = require('puppeteer');

async function getProduct(url) {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');

        // await page.goto(url, { waitUntil: 'load' });
        page.on('response', response => {
            console.log(url, "url")
            if (response.url().includes(url)) {
                console.log(`Ответ от ${url}: Статус ${response.status()}`);
            }
        });

        await page.goto(url, { waitUntil: 'load' });


        // console.log('HTTP статус:', response.status());

        // const content = await page.content();
        // console.log(content);



        await browser.close();
    } catch (error) {
        console.error('Ошибка при загрузке страницы:', error.message);
        return null;
    }
}

module.exports = getProduct