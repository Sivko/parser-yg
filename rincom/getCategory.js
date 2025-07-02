const cheerio = require('cheerio');
const axios = require('axios');

async function fetchCategory(url) {
    const { data: content } = await axios.get(url);
    const $ = cheerio.load(content);

    let data = [];
    const category = $("h1.title").text().trim();
    $(".smartfilter .bx-filter-parameters-box").each((i, el) => {
        const title = $(el).find(".bx-filter-parameters-box-title").text().trim();
        const values = $(el).find(".bx-filter-block").text().trim().replace(/[\t\n\r\\]/g, '');
        data.push({ category, title, values });
    });
    return data
}

// Запуск с нужным URL
const baseUrl = 'https://www.rinscom.com/katalog/plastiny-tverdosplavnye/';
fetchCategory(baseUrl).then(products => {
    console.log(products);
});

module.exports = fetchCategory