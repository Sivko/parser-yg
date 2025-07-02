const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const cheerio = require('cheerio');
puppeteer.use(StealthPlugin());

async function getProduct(url) {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // Установка заголовков и User-Agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            'Referer': 'https://www.vseinstrumenti.ru/',
            'Upgrade-Insecure-Requests': '1'
        });

        // Переход на главную страницу, чтобы получить cookies
        await page.goto('https://www.vseinstrumenti.ru/', { waitUntil: 'domcontentloaded' });

        // Получение cookies с главной страницы
        const cookies = await page.cookies();

        // Установка cookies для целевого URL
        await page.setCookie(...cookies.map(cookie => ({
            ...cookies,
            url: url // Добавляем URL, чтобы избежать ошибки
        })));

        // Переход на нужную страницу
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        const content = await page.content();

        await browser.close();

        // Использование cheerio для парсинга
        const $ = cheerio.load(content);

        // Например, получаем заголовок страницы
        // const title = $('h1').text();
        // console.log('Заголовок страницы:', title);

        // Поиск нужного контента, например, ссылки
        // $('a').each((index, element) => {
        //     console.log($(element).attr('href'));
        // });
        console.log(content)
    } catch (error) {
        console.error('Ошибка при загрузке страницы:', error.message);
    }
}

getProduct("https://www.vseinstrumenti.ru/product/indikator-dasqua-vysokotochnyj-tsifr-0-50mm-0-1mkm-so-stojkoj-i-keram-stolikom-130x130mm-7712-0045-11241284/");

module.exports = getProduct;