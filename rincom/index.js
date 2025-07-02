const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.vseinstrumenti.ru/product/indikator-tsifrovoj-0-12-7mm-0-001mm-dasqua-5260-4205-11184860/?utm_referrer=https%3A%2F%2Fyandexwebcache.net%2F';

const headers = {
    'User-Agent': 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)',
    'Accept-Language': 'ru-RU,ru;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Referer': 'https://yandexwebcache.net/',
};

async function fetchData() {
    try {
        const response = await axios.get(url, { headers });
        const $ = cheerio.load(response.data);

        // Пример парсинга заголовка
        const title = $('h1').text().trim();
        console.log('Заголовок:', title);

        // Можно добавить парсинг других элементов страницы
    } catch (error) {
        console.error('Ошибка при запросе:', error.message);
    }
}

fetchData();