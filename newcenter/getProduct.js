const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

async function getProduct(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        let productJson = null;

        $('script').each((i, script) => {
            const scriptContent = $(script).html();
            const match = scriptContent.match(/var product = (\{.*?\});/s);
            if (match) {
                productJson = JSON.parse(match[1]);
            }
        });

        return productJson;
    } catch (error) {
        console.error('Ошибка при загрузке страницы:', error);
        return null;
    }
}

module.exports = getProduct